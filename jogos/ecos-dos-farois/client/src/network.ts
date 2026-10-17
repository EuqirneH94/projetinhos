import type {
  ClientMessage,
  LegacyClientMessage,
  PublicEnemy,
  PublicPlayer,
  ServerMessage,
  Snapshot,
} from "../../shared/types.js";
type Status = "connecting" | "online" | "offline" | "blocked";
/** Uma pausa longa do event loop não prova queda do servidor. */
export function connectionTimedOut(
  now: number,
  lastFrame: number,
  lastCheck: number,
  hidden: boolean,
) {
  return !hidden && now - lastFrame > 15000 && now - lastCheck < 6000;
}
export class Network {
  ws: WebSocket | null = null;
  state: Snapshot | null = null;
  history: Snapshot[] = [];
  id = "";
  token = "";
  rtt = 0;
  offset = 0;
  onstate = (_state: Snapshot) => {};
  onnotice = (_text: string, _kind = "info") => {};
  onstatus = (_status: Status, _text = "") => {};
  private timer: ReturnType<typeof setTimeout> | null = null;
  private stopped = false;
  private attempt = 0;
  private ping: ReturnType<typeof setInterval> | null = null;
  private lastFrame = 0;
  private lastWatchdog = 0;
  connect(
    message:
      | Extract<LegacyClientMessage, { type: "join" }>
      | { type: "resume"; token: string }
      | { type: "account_login"; token: string },
    characterId?: string,
  ) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const previous = this.ws;
    this.ws = null;
    previous?.close();
    this.stopped = false;
    this.onstatus("connecting");
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://${location.host}/ws`);
    this.ws = ws;
    const reconnect = () =>
      this.connect(
        message.type === "account_login"
          ? message
          : { type: "resume", token: this.token },
        characterId,
      );
    ws.onopen = () => ws.send(JSON.stringify(message));
    ws.onmessage = (event) => {
      if (this.ws !== ws) return;
      let msg: ServerMessage;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }
      if (msg.type === "account_ready") {
        if (characterId) this.send({ type: "character_enter", characterId });
      } else if (msg.type === "account_error") {
        const reason =
          msg.code === "ACCOUNT_IN_USE"
            ? "Esta conta já está jogando. Saia da primeira sessão antes de entrar aqui."
            : "Não foi possível autorizar a conta ou o personagem.";
        this.onnotice(reason, "error");
        this.onstatus("blocked", reason);
        if (this.ping) clearInterval(this.ping);
        this.stopped = true;
        ws.close();
      } else if (msg.type === "welcome" || msg.type === "character_entered") {
        this.id = msg.type === "welcome" ? msg.id : msg.character.id;
        this.token = msg.type === "welcome" ? msg.token : "";
        this.attempt = 0;
        this.history = [];
        this.state = null;
        if (msg.type === "welcome") {
          sessionStorage.setItem("nexo.session", msg.token);
          localStorage.setItem(
            "nexo.last",
            JSON.stringify({ token: msg.token, nickname: msg.nickname }),
          );
        }
        this.lastFrame = Date.now();
        this.lastWatchdog = this.lastFrame;
        this.onstatus("online");
        if (this.ping) clearInterval(this.ping);
        this.ping = setInterval(() => {
          const now = Date.now(),
            late = connectionTimedOut(
              now,
              this.lastFrame,
              this.lastWatchdog,
              document.hidden,
            );
          this.lastWatchdog = now;
          if (late && !this.stopped) {
            this.ws = null;
            ws.close();
            if (this.ping) clearInterval(this.ping);
            this.onstatus("offline", "O vale não responde. Reconectando…");
            this.timer = setTimeout(reconnect, 1000);
          } else this.send({ type: "ping", at: Date.now() });
        }, 3000);
      } else if (msg.type === "state") {
        this.lastFrame = Date.now();
        if (!this.history.length) this.offset = msg.time - Date.now();
        else this.offset += (msg.time - Date.now() - this.offset) * 0.06;
        this.state = msg;
        this.history.push(msg);
        if (this.history.length > 24) this.history.shift();
        this.onstate(msg);
      } else if (msg.type === "notice") this.onnotice(msg.text, msg.kind);
      else if (msg.type === "pong") this.rtt = Math.max(0, Date.now() - msg.at);
    };
    ws.onerror = () => {};
    ws.onclose = (e) => {
      if (this.ws !== ws || this.stopped) return;
      if (this.ping) clearInterval(this.ping);
      if (
        e.code === 4001 ||
        e.code === 4003 ||
        e.code === 1008 ||
        e.code === 1009
      ) {
        this.onstatus(
          "blocked",
          e.code === 4001
            ? "Este viajante foi aberto em outra aba."
            : e.code === 4003
              ? "Chave de retorno inválida ou expirada."
              : "A conexão foi encerrada pelo servidor.",
        );
        return;
      }
      this.onstatus(
        "offline",
        "Conexão interrompida. Tentando retornar ao vale…",
      );
      if (this.token || message.type === "account_login")
        this.timer = setTimeout(
          reconnect,
          Math.min(10000, 1000 * 2 ** this.attempt++),
        );
      else
        this.onstatus(
          "blocked",
          "Servidor indisponível. Confira os dois terminais e tente entrar novamente.",
        );
    };
  }
  send(msg: ClientMessage) {
    if (this.ws?.readyState === WebSocket.OPEN)
      this.ws.send(JSON.stringify(msg));
  }
  disconnect() {
    this.stopped = true;
    if (this.timer) clearTimeout(this.timer);
    if (this.ping) clearInterval(this.ping);
    this.ws?.close();
    this.ws = null;
    this.state = null;
    this.history = [];
    this.id = "";
    this.token = "";
  }
  interpolated(): { players: PublicPlayer[]; enemies: PublicEnemy[] } | null {
    if (!this.state) return null;
    const time = Date.now() + this.offset - 120;
    let a = this.history[0],
      b = this.history[this.history.length - 1];
    for (let i = 1; i < this.history.length; i++)
      if (this.history[i].time >= time) {
        a = this.history[i - 1];
        b = this.history[i];
        break;
      }
    const t = Math.max(
      0,
      Math.min(1, (time - a.time) / Math.max(1, b.time - a.time)),
    );
    const blend = <
      P extends { id: string; x: number; z: number; angle: number },
    >(
      prev: P[],
      next: P[],
    ): P[] =>
      next.map((n) => {
        const p = prev.find((p) => p.id === n.id);
        if (!p || Math.hypot(n.x - p.x, n.z - p.z) > 5) return n;
        const da = Math.atan2(
          Math.sin(n.angle - p.angle),
          Math.cos(n.angle - p.angle),
        );
        return {
          ...n,
          x: p.x + (n.x - p.x) * t,
          z: p.z + (n.z - p.z) * t,
          angle: p.angle + da * t,
        };
      });
    return {
      players: blend(a.players, b.players),
      enemies: blend(a.enemies, b.enemies),
    };
  }
}
