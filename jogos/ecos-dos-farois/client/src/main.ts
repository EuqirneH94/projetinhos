import { CRAFT_STATION, RECIPE } from "../../shared/extended.js";
import { CLASS_KITS, FRAGMENTS, factionOf } from "../../shared/alpha.js";
import "./style.css";
import { SceneView } from "./scene.js";
import { Input } from "./input.js";
import { Network } from "./network.js";
import { UI } from "./ui.js";
import { distance, move } from "../../shared/movement.js";
import type { Snapshot } from "../../shared/types.js";
import { NPC, SHRINE } from "../../shared/config.js";
import { SceneAudio } from "./audio.js";
const ui = new UI(document.getElementById("app")!);
const audio = new SceneAudio();
audio.onchange = (settings, ready) => ui.audioLevels(settings, ready);
ui.onaudio = (key, value) => audio.set(key, value);
ui.onunlockaudio = () => {
  void audio.unlock();
};
ui.onuitone = () => audio.ui();
ui.audioLevels(audio.settings, false);
window.addEventListener(
  "pointerdown",
  () => {
    void audio.unlock();
  },
  { once: true },
);
window.addEventListener(
  "keydown",
  () => {
    void audio.unlock();
  },
  { once: true },
);
let view: SceneView;
try {
  view = new SceneView(document.getElementById("world") as HTMLCanvasElement);
} catch {
  document.getElementById("entry-error")!.textContent =
    "Seu navegador não iniciou o WebGL. Ative a aceleração de hardware e use Chrome, Edge ou Firefox atual.";
  throw new Error("WebGL indisponível");
}
ui.oncreation = (c) => view.setCreation(c);
view.setCreation(ui.creation);
ui.onreducedEffects = value => view.setReducedEffects(value);
view.setReducedEffects(ui.reducedEffects);
ui.onDialogue = (id, text) => { void audio.dialogue(id, text); };
ui.onDialogueClose = () => audio.closeDialogue();
ui.onSkillPreview = skill => {
  const spec = skill ? CLASS_KITS[net.state?.you.classId ?? ui.creation.classId][skill] : undefined;
  view.setAbilityPreview(spec?.range ?? 0, !!spec?.area);
};
const input = new Input(view.canvas, view),
  net = new Network();
let auto = false,
  autoAt = 0;
let local: { x: number; z: number; angle: number } | null = null,
  selected: string | null = null,
  seq = 0;
ui.onquality = () => view.quality();
ui.oncopy = async () => {
  if (!net.token) {
    ui.toast("Entre no vale para salvar sua chave.");
    return;
  }
  try {
    await navigator.clipboard.writeText(net.token);
    ui.toast("Chave copiada. Guarde em local privado.", "success");
  } catch {
    ui.showKey(net.token);
  }
};
ui.onskill = (skill) => {
  if (skill === "attack") {
    auto = !auto;
    ui.el("skill-attack").classList.toggle("auto-active", auto);
  }
  if (!auto && skill === "attack") return;
  net.send({
    type: "skill",
    skill,
    ...(selected && skill !== "nova" && skill !== "guard"
      ? { target: selected }
      : {}),
  });
};
ui.oncraft = () => {
  if (net.state) net.send({ type: "craft", recipeId: RECIPE.id, operation: (net.state.you.crafting?.serial ?? 0) + 1 });
};
ui.oncompanion = (action, target) => {
  if (action === "capture" || action === "attack") {
    const id = target ?? selected;
    if (!id) { ui.toast("Selecione uma criatura com Tab ou clique antes de dar este comando.", "error"); return; }
    net.send({ type: "companion", action, target: id });
  } else net.send({ type: "companion", action });
};
ui.onworld = (choice) => net.send({ type: "world", action: "restore", choice });
ui.onrespawn = () => net.send({ type: "respawn" });
ui.onquest = (action) => net.send({ type: "quest", action });
ui.onitem = (action, slot) => net.send({ type: "item", action, slot });
function nearestLoot() {
  return net.state?.loot
    .filter((l) => l.ownerId === net.id)
    .sort(
      (a, b) => distance(a, net.state!.you) - distance(b, net.state!.you),
    )[0];
}
function collect(id?: string) {
  const l = id ? net.state?.loot.find((l) => l.id === id) : nearestLoot();
  if (l) net.send({ type: "loot", id: l.id });
  else ui.toast("Nenhuma recompensa disponível.");
}
ui.oninteract = () => {
  const l = nearestLoot();
  if (l && net.state && distance(l, net.state.you) <= 3.2) collect(l.id);
  else if (net.state) {
    const p = net.state.you;
    if (distance(p, CRAFT_STATION) <= CRAFT_STATION.range) { ui.crafting(); return; }
    const node = FRAGMENTS.find(
      (n) => distance(n, p) < 3.2 && !p.story?.fragments.includes(n.id),
    );
    if (node && p.quest.state === "completed")
      net.send({ type: "world", action: "attune", id: node.id });
    else if (distance(p, SHRINE) < 4.5 && p.quest.state === "completed")
      ui.restoreDialog();
    else {
      const id =
        distance(p, { x: -10, z: 18 }) < 3.2
          ? "companion-1"
          : distance(p, { x: 6, z: 10 }) < 3.2
            ? "companion-2"
            : "guide";
      ui.talk(id);
    }
  }
};
ui.onzoom = (delta) => view.zoomBy(delta);
ui.onjoystick = (x, z) => {
  input.joystick = { x, z };
};
ui.onjoin = (name) => {
  void audio.unlock();
  local = null;
  seq = 0;
  net.connect({ type: "join", nickname: name, ...ui.creation });
};
ui.onresume = (token) => {
  void audio.unlock();
  local = null;
  seq = 0;
  net.connect({ type: "resume", token });
};
ui.onexit = () => {
  net.disconnect();
  input.clear();
  sessionStorage.removeItem("nexo.session");
  sessionStorage.removeItem("edf.account-session");
  location.reload();
};
net.onnotice = (text, kind) => {
  ui.toast(text, kind);
  if (kind === "error") audio.ui(true);
};
net.onstatus = (status, text) => {
  ui.status(status, text);
  input.enabled = status === "online";
  if (status !== "online") input.clear();
  if (status === "online") {
    seq = 0;
    local = null;
    view.yaw = 0;
    view.canvas.tabIndex = 0;
    view.canvas.focus({ preventScroll: true });
  }
};
net.onstate = (state: Snapshot) => {
  if (!local || distance(local, state.you) > 2 || state.you.dead)
    local = { x: state.you.x, z: state.you.z, angle: state.you.angle };
  else {
    local.x += (state.you.x - local.x) * 0.25;
    local.z += (state.you.z - local.z) * 0.25;
  }
  ui.update(state, net.rtt);
  audio.state(state);
  const p = state.you,
    node = FRAGMENTS.find(
      (n) => distance(n, p) < 3.2 && !p.story?.fragments.includes(n.id),
    );
  const l = nearestLoot();
  ui.context(
    !state.you.dead && l && distance(l, state.you) <= 3.2
      ? "loot"
      : !state.you.dead && distance(state.you, CRAFT_STATION) <= CRAFT_STATION.range
        ? "craft"
      : !state.you.dead && distance(state.you, NPC) <= 3.2
        ? "npc"
        : !p.dead && p.quest.state === "completed" && node
          ? "fragment"
          : !p.dead &&
              p.quest.state === "completed" &&
              distance(p, SHRINE) < 4.5
            ? "farol"
            : !p.dead &&
                (distance(p, { x: -10, z: 18 }) < 3.2 ||
                  distance(p, { x: 6, z: 10 }) < 3.2)
              ? "npc"
              : null,
  );
};
input.onkey = (key) => {
  if (key === "m") {
    ui.toggleSound();
    return;
  }
  if (key === "h") {
    ui.help();
    input.clear();
  }
  if (key === "escape") {
    auto = false;
    ui.el("skill-attack").classList.remove("auto-active");
    ui.closePanels();
    input.clear();
    selected = null;
    return;
  }
  if (key === "j") {
    ui.journal();
    input.clear();
    return;
  }
  if (ui.modalOpen) return;
  if (key === "i") ui.toggleBag();
  if (key === "e") {
    ui.oninteract();
    input.clear();
  }
  if (key === "f") collect();
  if (key === "4") ui.onskill("guard");
  if (key === "5") ui.onskill("focus");
  if (key === "6") ui.quickPotion();
  if (key === "1" || key === " ") ui.onskill("attack");
  if (key === "2" || key === "q") ui.onskill("cleave");
  if (key === "3" || key === "r") ui.onskill("nova");
  if (key === "tab" && net.state && local) {
    const targets = net.state.enemies
      .filter((e) => e.state !== "dead" && distance(e, local!) < 18)
      .sort((a, b) => distance(a, local!) - distance(b, local!));
    const i = targets.findIndex((e) => e.id === selected);
    selected = targets[(i + 1) % targets.length]?.id ?? null;
  }
};
input.onclick = (x, y) => {
  const hit = view.pick(x, y);
  if (hit?.kind === "enemy") selected = hit.id;
  else if (hit?.kind === "player") {
    selected = hit.id;
  } else if (hit?.kind === "fragment") {
    const node = FRAGMENTS.find((n) => n.id === hit.id);
    if (node && net.state && distance(net.state.you, node) <= 3.2)
      ui.oninteract();
    else ui.toast("Aproxime-se da ressonância para sintonizar.");
  } else if (hit?.kind === "npc") {
    ui.talk(hit.id);
    input.clear();
  } else if (hit?.kind === "loot") collect(hit.id);
  else selected = null;
};

let accountSession: { token: string; characterId: string } | undefined;
try {
  const saved = JSON.parse(
    sessionStorage.getItem("edf.account-session") ?? "null",
  );
  if (
    saved &&
    /^[A-Za-z0-9_-]{43}$/.test(saved.token) &&
    /^[A-Za-z0-9_-]{1,80}$/.test(saved.characterId)
  )
    accountSession = saved;
} catch {
  sessionStorage.removeItem("edf.account-session");
}
const token = sessionStorage.getItem("nexo.session");
if (accountSession) {
  const label = document.querySelector("#hud .name-row small");
  if (label) label.textContent = "PERSONAGEM";
  document.getElementById("copy-key")!.hidden = true;
  net.connect(
    { type: "account_login", token: accountSession.token },
    accountSession.characterId,
  );
} else if (token) ui.onresume(token);
let last = performance.now(),
  sendAt = 0;
function frame(time: number) {
  const frameInterval = time - last;
  const dt = Math.min(0.05, frameInterval / 1000);
  last = time;
  if (net.state && local && input.enabled) {
    const dir = !ui.modalOpen ? input.direction(view.yaw) : { x: 0, z: 0 };
    if (!net.state.you.dead) {
      move(local, dir.x, dir.z, dt);
      if (Math.hypot(dir.x, dir.z) > 0) local.angle = Math.atan2(dir.x, dir.z);
    }
    audio.position(
      local,
      Math.hypot(dir.x, dir.z) > 0,
      net.state.you.dead,
      view.yaw,
    );
    if (time - sendAt >= 50) {
      net.send({ type: "move", seq: seq++, ...dir });
      sendAt = time;
    }
  }
  if (
    auto &&
    net.state &&
    selected &&
    !ui.modalOpen &&
    !net.state.you.dead &&
    !net.state.you.casting &&
    time > autoAt
  ) {
    const p = net.state.you,
      e = net.state.enemies.find(
        (e) => e.id === selected && e.state !== "dead" && e.state !== "return",
      ),
      s = CLASS_KITS[p.classId ?? "sentinela"].attack;
    if (
      e &&
      distance(p, e) <= s.range &&
      Date.now() + net.offset >= (p.cooldowns.attack ?? 0)
    ) {
      net.send({ type: "skill", skill: "attack", target: selected });
      autoAt = time + Math.max(750, s.cooldown);
    } else if (!e) {
      auto = false;
      ui.el("skill-attack").classList.remove("auto-active");
    }
  }
  ui.animate(Date.now() + net.offset, selected);
  view.update(net.state, net.interpolated(), local, selected, time / 1000, dt);
  const metrics = (window as unknown as { edfMetrics: Record<string, unknown> })
    .edfMetrics;
  if (metrics) metrics.frameIntervalMs = Math.round(frameInterval * 10) / 10;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
