import type { SkillId, Snapshot } from "../../shared/types.js";
import {
  ENEMY_TYPES,
  HOUSES,
  INVENTORY_SIZE,
  ITEMS,
  NPC,
  QUEST,
  SHRINE,
  SKILLS,
  XP_LEVELS,
} from "../../shared/config.js";
import {
  FACTION_RACES,
  type FactionId,
  type RaceId,
  type ClassId,
} from "../../shared/identity.js";
import {
  ABILITY_KEYS,
  CLASS_NAMES,
  CLASS_DESCRIPTION,
  CLASS_KITS,
  DEFAULT_CREATION,
  FACTION_NAMES,
  FACTION_NPCS,
  FRAGMENTS,
  RACE_NAMES,
  REWARD_WEAPON,
  factionOf,
  type Creation,
} from "../../shared/alpha.js";
import { distance } from "../../shared/movement.js";
import { factionMark, raceMark, classMark, skillMark } from "./iconography.js";
import { DEFAULT_AUDIO, type AudioSettings } from "./audio-synth.js";
import { actionHint } from "./ui-state.js";
import { CRAFT_STATION, RECIPE, MATERIAL, TAMING } from "../../shared/extended.js";
export function icon(name: string) {
  const paths: Record<string, string> = {
    bow: '<path d="M5 3c15 0 15 18 0 18L9 12ZM3 12h18m-4-4 4 4-4 4"/>',
    bolt: '<path d="m14 2-9 12h6l-1 8L20 9h-7Z"/>',
    note: '<path d="M8 18V6l10-3v12 M8 10l10-3"/><ellipse cx="5" cy="19" rx="3" ry="2"/><ellipse cx="15" cy="16" rx="3" ry="2"/>',
    heart: '<path d="M12 21 3.5 12A5 5 0 0 1 12 5a5 5 0 0 1 8.5 7Z M12 8v8m-4-4h8"/>',
    ring: '<ellipse cx="12" cy="13" rx="10" ry="5"/><ellipse cx="12" cy="13" rx="5" ry="2.5"/><path d="M12 2v6m-3-3 3 3 3-3"/>',
    sword: '<path d="m14 4 6-1-1 6-8 8-4-4Z M4 20l4-4 M4 12l8 8"/>',
    cleave: '<path d="m5 20 13-13 M13 4l7-1-1 7 M3 8c2-4 8-6 12-3 M4 4v5h5"/>',
    nova: '<path d="m12 2 2.8 6.2L22 11l-7.2 2.7L12 21l-2.7-7.3L2 11l7.3-2.8Z"/><path d="M4 20h3 M19 3v3"/>',
    shield:
      '<path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Z M12 6v11 M8 10h8"/>',
    potion:
      '<path d="M9 2h6 M10 2v6l-5 8c-2 4 2 6 7 6s9-2 7-6l-5-8V2 M8 14h8"/>',
    bag: '<path d="M5 8h14l2 13H3Z M8 8V5a4 4 0 0 1 8 0v3 M8 13h8 M9 17h6"/>',
    scroll:
      '<path d="M6 3h13v16H7c-4 0-4-5 0-5V3H4v4 M10 7h6 M10 11h6 M9 19v3h13v-5"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M12 6v12 M15 8h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.sword}</svg>`;
}
export const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export class UI {
  onjoin = (_name: string) => {};
  onresume = (_token: string) => {};
  onexit = () => {};
  onquality = () => false;
  onskill = (_skill: SkillId) => {};
  onrespawn = () => {};
  onzoom = (_delta: number) => {};
  onjoystick = (_x: number, _z: number) => {};
  onquest = (_action: "accept" | "complete") => {};
  onitem = (_action: "use" | "equip" | "discard", _slot: number) => {};
  oninteract = () => {};
  onworld = (_choice: "repair" | "flow") => {};
  oncreation = (_c: Creation) => {};
  oncopy = () => {};
  onaudio = (_key: keyof AudioSettings, _value: number | boolean) => {};
  onunlockaudio = () => {};
  onuitone = () => {};
  onDialogue = (_id: string, _text: string) => {};
  onDialogueClose = () => {};
  onreducedEffects = (_value: boolean) => {};
  onSkillPreview = (_skill: SkillId | null) => {};
  oncraft = () => {};
  oncompanion = (_action: "capture" | "attack" | "follow" | "stay" | "passive" | "recall" | "activate", _target?: string) => {};
  reducedEffects = false;
  creation: Creation = { ...DEFAULT_CREATION };
  current: Snapshot | null = null;
  online = false;
  private audioSettings = { ...DEFAULT_AUDIO };
  private bagKey = "";
  private questKey = "";
  private kitKey = "";
  private npcDialog = false;
  private panelFocus: HTMLElement | null = null;
  private selected: string | null = null;
  private tooltipSkill: SkillId | null = null;
  private extendedDialog: "craft" | "companion" | null = null;
  private extendedKey = "";
  private panelRoot: HTMLElement;
  private notices = new Map<string, { element: HTMLElement; count: number; timer: ReturnType<typeof setTimeout> }>();
  constructor(root: HTMLElement) {
    this.panelRoot = root;
    root.innerHTML = `
 <header class="topbar"><div class="wordmark"><span class="brand-glyph">◇</span><span>ECOS DOS FARÓIS<small>FANTASIA HEROICA ARCANA</small></span><b class="build">ALPHA 0.3 · CANDIDATA</b></div><div class="top-actions"><button id="sound-button" aria-label="Configurar áudio">♫</button><button id="quality">Qualidade: alta</button><button id="help-button">Controles <kbd>H</kbd></button><button id="exit" hidden>Sair</button></div></header>
 <section id="entry" class="entry"><div class="eyebrow">QUANDO A LUZ SE APAGA, O MUNDO MUDA.</div><h1>Escolha<br>seu caminho.</h1><p class="intro">Dois povos unidos pela vigília.<br>Dois povos guiados pelas correntes.<br>Uma mesma luz começa a falhar.</p>
 <form id="entry-form" class="entry-card"><div class="creation-step"><span>01</span> SUA FACÇÃO</div><div class="faction-options"><button type="button" data-faction="vigilia" class="selected">${factionMark("vigilia")}A Vigília</button><button type="button" data-faction="confluencia">${factionMark("confluencia")}A Confluência</button></div>
 <label class="race-row" for="race"><span class="creation-step"><span>02</span> SEU POVO</span><select id="race"></select></label>
 <div class="creation-step"><span>03</span> SUA CLASSE</div><div class="class-options">${(["sentinela", "arcanista", "errante", "ressonante"] as ClassId[]).map((id, i) => `<button type="button" data-class="${id}" class="${i === 0 ? "selected" : ""}">${classMark(id)}<span>${CLASS_NAMES[id]}</span></button>`).join("")}</div><p id="class-description" class="class-description"></p>
 <div class="appearance-inline"><span class="creation-step"><span>04</span> APARÊNCIA</span><div class="appearance-options">${[0, 1, 2].map((i) => `<button type="button" data-appearance="${i}" class="swatch swatch-${i} ${i === 0 ? "selected" : ""}" aria-label="Aparência ${i + 1}"></button>`).join("")}</div></div>
 <label class="name-label" for="nickname">Como devemos chamar você?</label><input id="nickname" maxlength="18" minlength="3" placeholder="Nome do personagem" autocomplete="nickname" required>
 <button class="primary" id="enter" type="submit">Entrar no mundo <span>→</span></button><button type="button" id="continue" class="secondary" hidden>Continuar jornada</button>
 <details class="recovery"><summary>Tenho uma chave de retorno</summary><input id="recovery-token" aria-label="Chave privada de retorno" maxlength="43" autocomplete="off" placeholder="Cole sua chave privada"><button type="button" id="recover" class="secondary">Recuperar personagem</button></details><p id="entry-error" role="status"></p><small class="entry-note">Progresso salvo neste servidor · mundo compartilhado</small></form></section>
 <div id="preview-caption"><span id="preview-race">${raceMark("valdarios")} VALDÁRIOS</span><strong id="preview-class">Sentinela</strong><small id="preview-faction">A Vigília</small><span class="preview-detail">A aparência não altera seus atributos.</span></div>
 <div id="hud" hidden>
 <section class="vitals panel"><div class="avatar"><span id="class-avatar">◇</span><b id="level">1</b></div><div class="vitals-body"><div class="name-row"><strong id="name"></strong><small id="class-label"></small></div><div class="bar health"><i id="health-fill"></i><span id="health-text"></span></div><div class="bar energy"><i id="energy-fill"></i><span id="energy-text"></span></div></div></section>
 <aside class="world-info"><div class="zone-label"><span class="eyebrow" id="faction-label"></span><h2 id="zone"></h2><small id="connection"></small></div><button id="map-toggle" class="map-toggle" aria-expanded="true" aria-controls="map-wrap" title="Mostrar ou recolher mapa">Mapa da região <span>⌃</span></button><div class="panel map-wrap" id="map-wrap"><canvas id="minimap" width="220" height="200" aria-label="Mapa da região"></canvas><span class="map-north">N</span></div><section class="quest-tracker panel" id="quest-tracker"></section></aside>
 <section id="target" class="target panel" hidden><span class="eyebrow" id="target-kind">ALVO SELECIONADO</span><strong id="target-name"></strong><div class="bar health"><i id="target-fill"></i><span id="target-text"></span></div><small id="target-state"></small><small id="target-distance"></small></section>
 <section id="cast" class="cast panel" hidden><span id="cast-label"></span><div class="bar"><i id="cast-fill"></i></div></section>
 <div class="combat-hint"><kbd>Tab</kbd> selecionar alvo · <kbd>1</kbd> autoataque · <kbd>E</kbd> interagir</div>
 <div id="action-feedback" class="action-feedback" role="status" hidden></div><div id="skill-tooltip" class="skill-tooltip panel" role="tooltip" hidden></div>
 <nav class="hotbar panel" aria-label="Habilidades e atalhos">${ABILITY_KEYS.map((skill, i) => `<button class="skill" id="skill-${skill}"><kbd>${i + 1}</kbd>${skillMark("sentinela", skill)}<i class="cooldown-cover"></i><b class="cooldown-number"></b><span></span><small></small><em class="skill-state"></em></button>`).join("")}<button id="quick-potion" class="skill potion-skill"><kbd>6</kbd>${icon("potion")}<i class="cooldown-cover"></i><b class="cooldown-number"></b><span>Tônico</span><small id="potion-count"></small></button><div class="utility-buttons"><button id="bag-button" title="Mochila · I">${icon("bag")}<span>Mochila <kbd>I</kbd></span></button><button id="journal-button" title="Diário · J">${icon("scroll")}<span>Diário <kbd>J</kbd></span></button></div></nav>
 <button id="context" class="context panel" hidden></button>
 <div class="xp-wrap"><div class="xp-caption" id="xp-caption"></div><div class="xp-bar"><i id="xp-fill"></i></div></div><div class="bottom-brand">ECOS DOS FARÓIS <span>·</span> NEXO FORTE TECNOLOGIA</div>
 <div id="joystick" class="joystick"><span></span></div><div class="touch-zoom"><button id="zoom-in" aria-label="Aproximar">+</button><button id="zoom-out" aria-label="Afastar">−</button></div>
 <section id="bag" class="inventory panel" hidden><header><div><span class="eyebrow">MOCHILA DO VIAJANTE</span><h2>O que você carrega</h2></div><button id="bag-close" aria-label="Fechar mochila">×</button></header><div id="equipment"></div><div class="inventory-heading"><span id="bag-capacity"></span><strong id="coins"></strong></div><div id="inventory-slots"></div><div class="bag-services"><button id="craft-button" class="secondary">Ofício · alquimia</button><button id="companion-button" class="secondary">Companheiro do Errante</button></div></section></div>
 <div id="toasts" aria-live="polite" aria-relevant="additions text"></div>
 <div id="network-overlay" class="overlay" hidden><div class="modal"><span class="eyebrow">ENTRE DOIS CAMINHOS</span><h2>Retornando ao mundo</h2><p id="network-text"></p><button id="network-exit" class="secondary">Voltar à entrada</button></div></div>
 <div id="help" class="overlay" hidden><div class="modal"><span class="eyebrow">GUIA DO VIAJANTE</span><h2>Encontre seu caminho</h2><div class="help-grid"><kbd>W A S D</kbd><span>Mover o personagem</span><kbd>Mouse direito</kbd><span>Segurar e arrastar para girar a câmera</span><kbd>Roda</kbd><span>Aproximar ou afastar</span><kbd>Tab / clique</kbd><span>Selecionar uma criatura</span><kbd>1 / espaço</kbd><span>Ativar ou interromper autoataques</span><kbd>2–5</kbd><span>Habilidades · Q e R também usam 2 e 3</span><kbd>6</kbd><span>Usar tônico</span><kbd>E / F</kbd><span>Interagir / coletar saque</span><kbd>I / J</kbd><span>Mochila / diário</span><kbd>M / H / Esc</kbd><span>Silêncio / ajuda / fechar painéis</span></div><p>Converse com a guia junto à estrada. Fora de combate, o Farol recupera sua vida. Uma queda não apaga seu progresso.</p><button id="help-close" class="primary">Voltar à aventura</button><button id="copy-key" class="secondary">Copiar minha chave de retorno</button><small class="key-note">Sua chave dá acesso ao personagem. Guarde em local privado.</small><a class="account-link" href="/accounts.html">Gerenciar personagens de uma conta de teste</a></div></div>
 <div id="dialog" class="overlay" hidden><div class="modal quest-modal" id="dialog-content"></div></div>
 <div id="death" class="overlay death-overlay" hidden><div class="modal"><span class="eyebrow">A LUZ AINDA ALCANÇA VOCÊ</span><h2>Uma pausa na jornada.</h2><p>Seu equipamento e progresso continuam com você.</p><button id="respawn" class="primary">Retornar ao Farol</button></div></div>
 <section id="audio-panel" class="audio-panel panel" hidden><header><span class="eyebrow">SONS DO MUNDO</span><button id="audio-close" aria-label="Fechar áudio">×</button></header><h2>A voz do Nexo.</h2>${(["master", "music", "ambience", "effects", "voice"] as const).map((k) => `<label for="audio-${k}"><span>${{ master: "Volume geral", music: "Música", ambience: "Ambiente", effects: "Efeitos", voice: "Voz" }[k]}</span><output id="audio-${k}-value"></output></label><input id="audio-${k}" data-audio="${k}" type="range" min="0" max="100" value="${DEFAULT_AUDIO[k] * 100}">`).join("")}<label class="effects-setting" for="reduced-effects"><input id="reduced-effects" type="checkbox"><span>Reduzir efeitos e movimento</span></label><button id="audio-mute" class="secondary">Silenciar tudo</button><small id="audio-state"></small><small class="voice-note">Diálogos com legendas; gravações de voz pendentes.</small></section>`;
    this.races();
    this.creationUI();
    this.el("entry-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = this.el<HTMLInputElement>("nickname").value.trim();
      if (!/^[\p{L}\p{N} _-]{3,18}$/u.test(name)) {
        this.el("entry-error").textContent =
          "Use de 3 a 18 letras, números, espaços, _ ou -.";
        return;
      }
      this.onjoin(name);
    });
    root.querySelectorAll<HTMLButtonElement>("[data-faction]").forEach(
      (b) =>
        (b.onclick = () => {
          this.creation.factionId = b.dataset.faction as FactionId;
          this.creation.raceId = FACTION_RACES[this.creation.factionId][0];
          this.races();
          this.creationUI();
        }),
    );
    this.el<HTMLSelectElement>("race").onchange = () => {
      this.creation.raceId = this.el<HTMLSelectElement>("race").value as RaceId;
      this.creationUI();
    };
    root.querySelectorAll<HTMLButtonElement>("[data-class]").forEach(
      (b) =>
        (b.onclick = () => {
          this.creation.classId = b.dataset.class as ClassId;
          this.creationUI();
        }),
    );
    root.querySelectorAll<HTMLButtonElement>("[data-appearance]").forEach(
      (b) =>
        (b.onclick = () => {
          this.creation.appearance = Number(b.dataset.appearance);
          this.creationUI();
        }),
    );
    let last: { token: string; nickname: string } | null = null;
    try {
      last = JSON.parse(localStorage.getItem("nexo.last") ?? "null");
    } catch {}
    if (last?.token) {
      this.el("continue").hidden = false;
      this.el("continue").textContent = `Continuar como ${last.nickname}`;
      this.el("continue").onclick = () => this.onresume(last!.token);
    }
    this.el("recover").onclick = () => {
      const t = this.el<HTMLInputElement>("recovery-token").value.trim();
      if (/^[A-Za-z0-9_-]{43}$/.test(t)) this.onresume(t);
      else
        this.el("entry-error").textContent =
          "A chave precisa ter 43 caracteres.";
    };
    for (const skill of ABILITY_KEYS) {
      const button = this.el("skill-" + skill);
      button.setAttribute("aria-describedby", "skill-tooltip");
      button.onclick = () => this.onskill(skill);
      button.addEventListener("pointerenter", () => this.showSkill(skill));
      button.addEventListener("focus", () => this.showSkill(skill));
      button.addEventListener("pointerleave", () => this.hideSkill());
      button.addEventListener("blur", () => this.hideSkill());
    }
    this.el("map-toggle").onclick = () => {
      const hidden = !this.el("map-wrap").hidden;
      this.el("map-wrap").hidden = hidden;
      this.el("map-toggle").setAttribute("aria-expanded", String(!hidden));
    };
    try { this.reducedEffects = localStorage.getItem("edf.reducedEffects") === "true" || !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; } catch {}
    this.el<HTMLInputElement>("reduced-effects").checked = this.reducedEffects;
    this.el<HTMLInputElement>("reduced-effects").onchange = (event) => {
      this.reducedEffects = (event.target as HTMLInputElement).checked;
      root.classList.toggle("reduced-effects", this.reducedEffects);
      try { localStorage.setItem("edf.reducedEffects", String(this.reducedEffects)); } catch {}
      this.onreducedEffects(this.reducedEffects);
    };
    root.classList.toggle("reduced-effects", this.reducedEffects);
    // Menus keep native keyboard navigation; their keystrokes must not trigger combat.
    root.addEventListener("keydown", (event) => {
      if (!this.modalOpen || !(event.target as HTMLElement).closest(".overlay,.inventory,.audio-panel")) return;
      if (event.key === "Escape") { event.preventDefault(); this.closePanels(); }
      event.stopPropagation();
    });
    this.el("quality").onclick = () => {
      this.el("quality").textContent = this.onquality()
        ? "Qualidade: econômica"
        : "Qualidade: alta";
    };
    this.el("exit").onclick = this.el("network-exit").onclick = () =>
      this.onexit();
    this.el("help-button").onclick = () => this.help();
    this.el("help-close").onclick = () => this.help(false);
    this.el("copy-key").onclick = () => this.oncopy();
    this.el("bag-button").onclick = () => this.toggleBag();
    this.el("bag-close").onclick = () => this.toggleBag(false);
    this.el("craft-button").onclick = () => this.crafting();
    this.el("companion-button").onclick = () => this.companion();
    this.el("journal-button").onclick = () => this.journal();
    this.el("quick-potion").onclick = () => this.quickPotion();
    this.el("respawn").onclick = () => this.onrespawn();
    this.el("context").onclick = () => this.oninteract();
    this.el("zoom-in").onclick = () => this.onzoom(-180);
    this.el("zoom-out").onclick = () => this.onzoom(180);
    this.el("inventory-slots").onclick = (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>(
        "[data-item-action]",
      );
      if (b)
        this.onitem(
          b.dataset.itemAction as "equip" | "use" | "discard",
          Number(b.dataset.slot),
        );
    };
    this.el("dialog-content").onclick = (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>(
        "[data-dialog-action]",
      );
      if (!b) return;
      const a = b.dataset.dialogAction;
      if (a === "craft") { this.oncraft(); return; }
      if (a?.startsWith("companion-")) {
        const action = a.slice(10) as Parameters<UI["oncompanion"]>[0];
        this.oncompanion(action, action === "capture" || action === "attack" ? this.selected ?? undefined : undefined);
        this.closeDialog(); return;
      }
      if (a === "accept" || a === "complete") this.onquest(a);
      if (a === "repair" || a === "flow") this.onworld(a);
      this.closeDialog();
    };
    this.el("sound-button").onclick = () => {
      this.panel("audio-panel", this.el("audio-panel").hidden);
      this.onunlockaudio();
    };
    this.el("audio-close").onclick = () => this.panel("audio-panel", false);
    this.el("audio-mute").onclick = () => this.toggleSound();
    this.el("audio-panel").addEventListener("input", (e) => {
      const i = e.target as HTMLInputElement;
      if (i.dataset.audio)
        this.onaudio(
          i.dataset.audio as keyof AudioSettings,
          Number(i.value) / 100,
        );
    });
    root.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("button")) this.onuitone();
    });
    const stick = this.el("joystick"),
      thumb = stick.firstElementChild as HTMLElement;
    let active: number | null = null;
    const drag = (e: PointerEvent) => {
      const r = stick.getBoundingClientRect(),
        dx = (e.clientX - r.left - r.width / 2) / 34,
        dz = (e.clientY - r.top - r.height / 2) / 34,
        l = Math.max(1, Math.hypot(dx, dz));
      thumb.style.transform = `translate(${(dx / l) * 24}px,${(dz / l) * 24}px)`;
      this.onjoystick(dx / l, dz / l);
    };
    stick.onpointerdown = (e) => {
      active = e.pointerId;
      stick.setPointerCapture(active);
      drag(e);
    };
    stick.onpointermove = (e) => {
      if (e.pointerId === active) drag(e);
    };
    stick.onpointerup = stick.onpointercancel = () => {
      active = null;
      thumb.style.transform = "";
      this.onjoystick(0, 0);
    };
    const dialog = this.el("dialog"), dialogContent = this.el("dialog-content");
    new window.MutationObserver(() => {
      if (dialog.isConnected && !dialog.hidden) (dialogContent.querySelector("button,input") as HTMLElement | null)?.focus({ preventScroll: true });
    }).observe(dialogContent, { childList: true });
    this.audioLevels(this.audioSettings, false);
  }
  el<T extends HTMLElement = HTMLElement>(id: string) {
    return document.getElementById(id) as T;
  }
  private races() {
    const s = this.el<HTMLSelectElement>("race");
    s.replaceChildren();
    for (const id of FACTION_RACES[this.creation.factionId]) {
      const option = document.createElement("option");
      option.textContent = RACE_NAMES[id];
      option.value = id;
      s.add(option);
    }
    s.value = this.creation.raceId;
  }
  private creationUI() {
    for (const [selector, key] of [
      ["[data-faction]", "faction"],
      ["[data-class]", "class"],
      ["[data-appearance]", "appearance"],
    ] as const)
      this.el("entry")
        .querySelectorAll<HTMLElement>(selector)
        .forEach((b) =>
          b.classList.toggle(
            "selected",
            b.dataset[key] ===
              String(
                key === "faction"
                  ? this.creation.factionId
                  : key === "class"
                    ? this.creation.classId
                    : this.creation.appearance,
              ),
          ),
        );
    this.el("class-description").textContent =
      CLASS_DESCRIPTION[this.creation.classId];
    this.el("preview-race").innerHTML = `${raceMark(this.creation.raceId)} ${RACE_NAMES[this.creation.raceId]}`;
    this.el("preview-class").textContent = CLASS_NAMES[this.creation.classId];
    this.el("preview-faction").textContent =
      FACTION_NAMES[this.creation.factionId];
    this.oncreation({ ...this.creation });
  }
  get modalOpen() {
    return ["help", "dialog", "bag", "audio-panel", "death", "network-overlay"].some(id => !this.el(id).hidden);
  }
  private panel(id: string, open: boolean) {
    const panel = this.el(id);
    const wasOpen = !panel.hidden;
    if (open && !wasOpen) {
      if (!this.modalOpen) this.panelFocus = document.activeElement as HTMLElement;
      for (const other of ["help", "dialog", "bag", "audio-panel"]) {
        if (other === id || this.el(other).hidden) continue;
        this.el(other).hidden = true;
        if (other === "dialog") this.onDialogueClose();
      }
    }
    panel.hidden = !open;
    // Native Tab stays on the available controls; no scripted Tab loop or game shortcut.
    this.panelRoot.querySelectorAll("[data-panel-inert]").forEach(element => {
      element.removeAttribute("inert"); element.removeAttribute("data-panel-inert");
    });
    const focusPanel = open ? panel : ["help", "dialog", "bag", "audio-panel", "death", "network-overlay"].map(key => this.el(key)).find(element => !element.hidden);
    if (focusPanel) {
      const isolate = (parent: HTMLElement) => {
        for (const child of parent.children) {
          if (child === focusPanel || child.id === "toasts") continue;
          if (child.contains(focusPanel)) isolate(child as HTMLElement);
          else { child.setAttribute("inert", ""); child.setAttribute("data-panel-inert", ""); }
        }
      };
      isolate(this.panelRoot);
    }
    if (open) {
      this.hideSkill();
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("aria-label", { help: "Controles", dialog: "Conversa e diário", bag: "Mochila", "audio-panel": "Áudio e acessibilidade" }[id] ?? id);
      (panel.querySelector("button,input,select") as HTMLElement | null)?.focus({ preventScroll: true });
    } else if (wasOpen && this.panelFocus?.isConnected) {
      this.panelFocus.focus({ preventScroll: true });
      this.panelFocus = null;
    }
  }
  private showSkill(skill: SkillId) {
    if (this.tooltipSkill !== skill) this.onSkillPreview(skill);
    this.tooltipSkill = skill;
    if (!this.current || this.modalOpen) return;
    const hint = actionHint(this.current, skill, Date.now(), this.selected);
    this.el("skill-tooltip").innerHTML = `<strong>${esc(hint.skill.name)}</strong><span>${esc(hint.reach)}</span><span>${hint.skill.cost} energia · ${hint.skill.cooldown / 1000} s de recarga${hint.skill.cast ? ` · ${hint.skill.cast / 1000} s de conjuração` : ""}</span><small>${esc(hint.reason || "Pronto · confirmação e efeitos pelo servidor")}</small>`;
    this.el("skill-tooltip").hidden = false;
  }
  private hideSkill() {
    if (this.tooltipSkill !== null) this.onSkillPreview(null);
    this.tooltipSkill = null;
    this.el("skill-tooltip").hidden = true;
  }
  help(open = this.el("help").hidden) {
    this.panel("help", open);
  }
  toggleBag(open = this.el("bag").hidden) {
    this.panel("bag", open);
  }
  closeDialog() {
    this.extendedDialog = null;
    this.panel("dialog", false);
    this.npcDialog = false;
    this.onDialogueClose();
  }
  closePanels() {
    this.help(false);
    this.closeDialog();
    this.toggleBag(false);
    this.panel("audio-panel", false);
  }
  toggleSound() {
    this.onaudio("enabled", !this.audioSettings.enabled);
  }
  audioLevels(settings: AudioSettings, ready: boolean) {
    this.audioSettings = { ...settings };
    for (const k of ["master", "music", "ambience", "effects", "voice"] as const) {
      this.el<HTMLInputElement>("audio-" + k).value = String(
        Math.round(settings[k] * 100),
      );
      this.el("audio-" + k + "-value").textContent =
        `${Math.round(settings[k] * 100)}%`;
    }
    this.el("audio-mute").textContent = settings.enabled
      ? "Silenciar tudo · M"
      : "Ativar som · M";
    this.el("sound-button").classList.toggle("muted", !settings.enabled);
    this.el("audio-state").textContent = settings.enabled
      ? ready
        ? "Preferências salvas neste navegador."
        : "Toque para ativar o áudio."
      : "Som silenciado.";
  }
  toast(text: string, kind = "info") {
    const key = `${kind}:${text}`, old = this.notices.get(key);
    if (old) {
      old.count++;
      old.element.textContent = `${text} ×${old.count}`;
      clearTimeout(old.timer);
      old.timer = setTimeout(() => { old.element.remove(); this.notices.delete(key); }, 4200);
      return;
    }
    const element = document.createElement("div");
    element.className = "toast " + kind;
    element.textContent = text;
    this.el("toasts").append(element);
    const timer = setTimeout(() => { element.remove(); this.notices.delete(key); }, 4200);
    this.notices.set(key, { element, count: 1, timer });
    while (this.notices.size > 3) {
      const oldestKey = this.notices.keys().next().value!;
      const oldest = this.notices.get(oldestKey)!;
      clearTimeout(oldest.timer); oldest.element.remove(); this.notices.delete(oldestKey);
    }
  }
  showKey(token: string) {
    this.extendedDialog = null;
    this.panel("dialog", true);
    this.el("dialog-content").innerHTML =
      `<span class="eyebrow">RETORNO AO MUNDO</span><h2>Guarde sua chave.</h2><p>Quem possui esta chave consegue abrir seu personagem neste servidor.</p><input id="private-key" readonly value="${esc(token)}"><button class="primary" data-dialog-action="close">Já guardei</button>`;
    this.el<HTMLInputElement>("private-key").select();
  }
  status(status: string, text = "") {
    if (status === "online") {
      this.online = true;
      this.el("entry").parentElement?.classList.add("in-world");
      this.el("entry").hidden = true;
      this.el("preview-caption").hidden = true;
      this.el("hud").hidden = false;
      this.el("exit").hidden = false;
      this.panel("network-overlay", false);
      this.el<HTMLButtonElement>("enter").disabled = false;
    } else if (status === "connecting") {
      this.el("entry-error").textContent = "Abrindo os caminhos…";
      this.el<HTMLButtonElement>("enter").disabled = true;
    } else {
      this.online = false;
      this.closePanels();
      this.panel("death", false);
      this.panel("network-overlay", true);
      this.el("network-text").textContent = text;
      this.el<HTMLButtonElement>("enter").disabled = false;
    }
  }
  quickPotion() {
    const i =
      this.current?.you.inventory.findIndex((s) => s.item === "potion") ?? -1;
    if (i < 0)
      this.toast("Você não tem tônicos. Colete as recompensas das criaturas.");
    else this.onitem("use", i);
  }
  context(kind: "npc" | "loot" | "fragment" | "farol" | "craft" | null) {
    this.el("context").hidden = !kind;
    if (kind)
      this.el("context").innerHTML =
        `<kbd>${kind === "loot" ? "F" : "E"}</kbd> ${kind === "loot" ? "Coletar recompensa" : kind === "fragment" ? "Sintonizar ressonância" : kind === "farol" ? "Restaurar o Farol" : kind === "craft" ? "Bancada de Alquimia" : "Conversar"} <span>→</span>`;
  }
  crafting() {
    if (!this.current) return;
    this.extendedDialog = "craft";
    this.npcDialog = false;
    this.onDialogueClose();
    this.panel("dialog", true);
    const p = this.current.you, materials = p.materials?.seivaClara ?? 0;
    const nearby = distance(p, CRAFT_STATION) <= CRAFT_STATION.range;
    const unlocked = p.quest.state === "completed";
    const reason = !unlocked ? "Conclua a missão da estrada para aprender esta receita." : !nearby ? "Aproxime-se da bancada junto ao refúgio." : materials < RECIPE.materialCost || p.coins < RECIPE.coinCost ? "Você ainda precisa reunir os insumos." : p.inventory.length >= INVENTORY_SIZE && !p.inventory.some(i => i.item === "potion" && i.quantity < 20) ? "Reserve espaço na mochila antes de fabricar." : "Receita pronta para solicitar ao servidor.";
    this.el("dialog-content").innerHTML = `<span class="eyebrow">OFÍCIO EXPERIMENTAL · ALQUIMIA</span><h2>${RECIPE.name}</h2><p>Na ${CRAFT_STATION.name}, prepare um tônico com a seiva recolhida de criaturas. A receita e os valores desta Alpha são experimentais.</p><div class="objectives"><div>${MATERIAL.name}<strong>${materials} / ${RECIPE.materialCost}</strong></div><div>Moedas<strong>${p.coins} / ${RECIPE.coinCost}</strong></div><div>Produto<strong>1 tônico</strong></div></div><p id="craft-reason">${reason}</p><button class="primary" data-dialog-action="craft" ${!nearby || !unlocked || materials < RECIPE.materialCost || p.coins < RECIPE.coinCost ? "disabled" : ""}>Preparar tônico</button><button class="secondary" data-dialog-action="close">Voltar à aventura</button>`;
  }
  companion() {
    if (!this.current) return;
    this.extendedDialog = "companion";
    this.npcDialog = false;
    this.onDialogueClose();
    this.panel("dialog", true);
    const p = this.current.you, c = p.companion;
    const isErrante = p.classId === "errante";
    this.el("dialog-content").innerHTML = `<span class="eyebrow">LAÇO DO ERRANTE · EXPERIMENTAL</span><h2>${c ? esc(c.name) : "Um aliado no caminho"}</h2>${!isErrante ? "<p>A captura está disponível ao Errante. Outros personagens mantêm suas habilidades e equipamento.</p>" : !c ? `<p>Conclua a missão da estrada. Selecione um Brumino comum com ${TAMING.minHp * 100}–${TAMING.maxHp * 100}% de vida e fique a até ${TAMING.range} m. O vínculo exige ${TAMING.duration / 1000} s sem interrupção.</p><p>Um único companheiro pode ser vinculado nesta Alpha. A criatura precisa estar selecionada no mundo.</p><button class="primary" data-dialog-action="companion-capture" ${!this.selected || p.quest.state !== "completed" ? "disabled" : ""}>Iniciar vínculo com o alvo</button>` : `<p>${c.active ? "Companheiro ativo" : "Companheiro recolhido"} · ${c.mode === "follow" ? "Seguindo" : c.mode === "stay" ? "Aguardando" : "Passivo"}. Ativar ou recolher exige 4 s fora de combate.</p><div class="companion-actions">${(c.active ? [["follow", "Seguir"], ["stay", "Aguardar aqui"], ["passive", "Não atacar"], ["attack", "Atacar meu alvo"], ["recall", "Recolher"]] : [["activate", "Chamar companheiro"]]).map(([action, label]) => `<button class="secondary" data-dialog-action="companion-${action}" ${action === "attack" && !this.selected ? "disabled" : ""}>${label}</button>`).join("")}</div>`}<button class="secondary" data-dialog-action="close">Voltar à aventura</button>`;
  }
  private objectives() {
    const q = this.current!.you.quest;
    return `<div class="objectives"><div class="${q.brumino >= QUEST.brumino ? "done" : ""}">Bruminos afastados <strong>${q.brumino} / ${QUEST.brumino}</strong></div><div class="${q.cerne >= QUEST.cerne ? "done" : ""}">Cernes estabilizados <strong>${q.cerne} / ${QUEST.cerne}</strong></div></div>`;
  }
  private rewards() {
    const id = this.current?.you.classId;
    return `<div class="quest-rewards"><small>RECOMPENSAS</small><strong>${QUEST.xp} XP · ${QUEST.coins} moedas</strong><span>${ITEMS[id ? REWARD_WEAPON[id] : "dawnSword"].name}</span></div>`;
  }
  journal() {
    if (!this.current) return;
    this.extendedDialog = null;
    this.npcDialog = false;
    this.onDialogueClose();
    this.panel("dialog", true);
    const p = this.current.you,
      f = factionOf(p),
      s = p.story;
    this.el("dialog-content").innerHTML =
      `<span class="eyebrow">DIÁRIO · ${FACTION_NAMES[f]}</span><h2>Os caminhos e a luz</h2><p>A instabilidade do Nexo atinge as criaturas e os condutores da região.</p><h3>1. A trilha volta a respirar</h3>${this.objectives()}<p>${p.quest.state === "available" ? "Converse com " + FACTION_NPCS[f].name + " junto à estrada." : p.quest.state === "ready" ? "Retorne à guia para receber sua recompensa." : p.quest.state === "completed" ? "Concluída." : "Proteja os caminhos ao norte do refúgio."}</p><h3>2. O condutor partido</h3><p>${p.quest.state !== "completed" ? "Disponível após proteger os caminhos." : s?.restored ? "O Farol foi restaurado. Sua escolha: " + (s.choice === "repair" ? "reparar os condutores." : "restabelecer a circulação do fluxo.") : "Sintonize três ressonâncias, desfaça o Núcleo Fraturado ao norte e retorne ao Farol."}</p><div class="objectives"><div>Ecos sintonizados <strong>${s?.fragments.length ?? 0} / 3</strong></div><div>Núcleo Fraturado <strong>${s?.boss ? "Desfeito" : "Ativo"}</strong></div></div><button class="primary" data-dialog-action="close">Voltar à aventura</button>`;
  }
  talk(id = "guide") {
    if (!this.current || this.current.you.dead) return;
    this.extendedDialog = null;
    const p = this.current.you,
      f = factionOf(p),
      guide = FACTION_NPCS[f];
    const loc =
      id === "companion-1"
        ? { x: -10, z: 18 }
        : id === "companion-2"
          ? { x: 6, z: 10 }
          : NPC;
    if (distance(p, loc) > 3.2) {
      this.toast("Aproxime-se de " + guide.name + " ou de outro habitante.");
      return;
    }
    this.npcDialog = true;
    this.panel("dialog", true);
    if (id !== "guide") {
      const i = id === "companion-1" ? 0 : 1;
      const speech = i === 0 ? "Os condutores não estão quebrando por desgaste. Algo mudou no ritmo da ressonância. Observe os ecos entre as árvores." : "As medidas não apontam uma vontade por trás da instabilidade. Precisamos compreender o fenômeno antes de dar um nome ao inimigo.";
      this.onDialogue(`${f}.companion.${i + 1}`, speech);
      this.el("dialog-content").innerHTML =
        `<span class="eyebrow">${FACTION_NAMES[f]}</span><h2>${guide.companions[i]}</h2><p class="speech">${speech}</p><p>Fale com ${guide.name} para organizar a investigação.</p><button class="primary" data-dialog-action="close">Até breve</button>`;
      return;
    }
    const q = p.quest,
      speech =
        q.state === "available"
          ? f === "vigilia"
            ? "As luzes do caminho falharam outra vez. As criaturas chegaram perto das casas. Precisamos abrir a estrada antes de investigar o Farol."
            : "O fluxo que alimenta as raízes mudou. As criaturas já não reconhecem seus territórios. Primeiro, precisamos proteger quem vive aqui."
          : q.state === "active"
            ? "Ainda há criaturas instáveis na estrada. Você não precisa enfrentá-las todas de uma vez. Volte ao Farol se precisar recuperar as forças."
            : q.state === "ready"
              ? "A estrada voltou a respirar. Você nos deu tempo para investigar os condutores. Aceite este equipamento e procure as três ressonâncias no bosque."
              : p.story?.restored
                ? p.story.choice === "flow"
                  ? "O fluxo voltou a circular. Ainda precisamos estudar as consequências, mas hoje a luz encontrou seu ritmo."
                  : "Os condutores estão firmes outra vez. Registraremos o procedimento para que ninguém precise improvisar na próxima crise."
                : "Agora procure as três ressonâncias no bosque e desfaça o Núcleo Fraturado no extremo norte. Depois, leve sua descoberta ao Farol.";
    this.onDialogue(`${f}.guide.${q.state}${p.story?.restored ? "." + p.story.choice : ""}`, speech);
    this.el("dialog-content").innerHTML =
      `<span class="eyebrow">${guide.title} · ${FACTION_NAMES[f]}</span><h2>${guide.name}</h2><p class="speech">${speech}</p><h3>${QUEST.name}</h3>${this.objectives()}${this.rewards()}${q.state === "available" ? '<button class="primary" data-dialog-action="accept">Vou proteger os caminhos</button>' : q.state === "ready" ? '<button class="primary" data-dialog-action="complete">Receber recompensa</button>' : '<button class="primary" data-dialog-action="close">Continuar a jornada</button>'}<button class="secondary" data-dialog-action="close">Até breve</button>`;
  }
  restoreDialog() {
    if (!this.current) return;
    this.extendedDialog = null;
    this.npcDialog = false;
    this.onDialogueClose();
    this.panel("dialog", true);
    const s = this.current.you.story,
      ready = !!s && s.fragments.length === 3 && s.boss && !s.restored;
    this.el("dialog-content").innerHTML =
      `<span class="eyebrow">O CONDUTOR PARTIDO</span><h2>A luz procura um ritmo.</h2><p>${s?.restored ? "A ressonância está equilibrada. O registro da sua escolha permanece com este personagem." : ready ? "Os ecos se encaixam, mas há dois caminhos para estabilizar o Farol. Ambos preservam a comunidade." : "Sintonize os três ecos e desfaça o Núcleo Fraturado antes de restaurar o Farol."}</p>${ready ? '<button class="primary" data-dialog-action="repair">Reparar e alinhar os condutores</button><button class="secondary" data-dialog-action="flow">Restabelecer a circulação do fluxo</button><small class="key-note">A escolha altera o diálogo de desfecho. As recompensas são equivalentes.</small>' : ""}<button class="secondary" data-dialog-action="close">Voltar à aventura</button>`;
  }
  private progressUI() {
    const p = this.current!.you,
      f = factionOf(p),
      s = p.story,
      key = JSON.stringify([p.quest, s]);
    if (key !== this.questKey) {
      this.questKey = key;
      this.el("quest-tracker").innerHTML =
        `<span class="eyebrow">${s?.restored ? "JORNADA CONCLUÍDA" : p.quest.state === "completed" ? "O CONDUTOR PARTIDO" : "MISSÃO DA REGIÃO"}</span><h3>${s?.restored ? "O Farol voltou a ressoar" : p.quest.state === "completed" ? "Reúna os ecos do Nexo" : QUEST.name}</h3>${p.quest.state === "available" ? "<p>Converse com " + FACTION_NPCS[f].name + " junto à estrada.</p>" : p.quest.state === "completed" ? `<p>Ecos sintonizados <b>${s?.fragments.length ?? 0}/3</b><br>Núcleo Fraturado <b>${s?.boss ? "Desfeito" : "Ativo"}</b></p><p>${s?.restored ? "Continue explorando ou experimente outra classe." : "Retorne ao Farol após reunir os ecos."}</p>` : this.objectives()}<button id="tracker-journal">Abrir diário <kbd>J</kbd></button>`;
      this.el("tracker-journal").onclick = () => this.journal();
    }
    const cap = XP_LEVELS[4],
      base = XP_LEVELS[p.level - 1],
      next = XP_LEVELS[Math.min(4, p.level)],
      ratio = p.level === 5 ? 1 : (p.xp - base) / (next - base);
    this.el("xp-fill").style.width = `${ratio * 100}%`;
    this.el("xp-caption").textContent =
      p.level === 5
        ? "NÍVEL 5 · LIMITE DESTA ALPHA"
        : `NÍVEL ${p.level} · ${p.xp - base} / ${next - base} XP`;
    this.el("potion-count").textContent =
      String(
        p.inventory
          .filter((i) => i.item === "potion")
          .reduce((n, i) => n + i.quantity, 0),
      ) + " na mochila";
    const bagKey = JSON.stringify([p.inventory, p.weapon, p.armor, p.coins]);
    if (bagKey === this.bagKey) return;
    this.bagKey = bagKey;
    this.el("equipment").innerHTML = (
      [
        ["Arma", p.weapon],
        ["Proteção", p.armor],
      ] as const
    )
      .map(
        ([label, id]) =>
          `<div class="equipped">${icon(ITEMS[id].icon)}<div><small>${label}</small><strong>${ITEMS[id].name}</strong><span>${ITEMS[id].description}</span></div></div>`,
      )
      .join("");
    this.el("bag-capacity").textContent =
      `${p.inventory.length} / ${INVENTORY_SIZE} espaços`;
    this.el("coins").textContent = `${p.coins} moedas`;
    this.el("inventory-slots").innerHTML = Array.from(
      { length: INVENTORY_SIZE },
      (_, i) => {
        const slot = p.inventory[i];
        if (!slot) return '<div class="inventory-empty">◇</div>';
        const item = ITEMS[slot.item];
        return `<div class="inventory-slot">${icon(item.icon)}<div><strong>${item.name}</strong><small>${item.description}</small></div><b>${slot.quantity > 1 ? slot.quantity : ""}</b><button data-item-action="${item.kind === "consumable" ? "use" : "equip"}" data-slot="${i}">${item.kind === "consumable" ? "Usar" : "Equipar"}</button><button data-item-action="discard" data-slot="${i}" aria-label="Descartar uma unidade">×</button></div>`;
      },
    ).join("");
  }
  update(state: Snapshot, rtt: number) {
    this.current = state;
    const p = state.you,
      f = factionOf(p);
    this.el("name").textContent = p.nickname;
    this.el("level").textContent = String(p.level);
    this.el("class-label").textContent = CLASS_NAMES[p.classId ?? "sentinela"];
    this.el("faction-label").textContent = FACTION_NAMES[f];
    this.el("health-fill").style.width = `${(p.hp / p.maxHp) * 100}%`;
    this.el("health-text").textContent = `Vida ${Math.ceil(p.hp)} / ${p.maxHp}`;
    this.el("energy-fill").style.width = `${p.energy}%`;
    this.el("energy-text").textContent = `Energia ${Math.floor(p.energy)} / 100`;
    this.el("zone").textContent =
      p.z < 0 ? FACTION_NPCS[f].wild : FACTION_NPCS[f].zone;
    this.el("connection").textContent =
      `${state.players.length} viajante${state.players.length > 1 ? "s" : ""} · ${rtt || "…"} ms`;
    const kitKey = p.classId ?? "legacy";
    if (kitKey !== this.kitKey) {
      this.kitKey = kitKey;
      for (const key of ABILITY_KEYS) {
        const a = p.classId ? CLASS_KITS[p.classId][key] : SKILLS[key],
          b = this.el("skill-" + key);
        b.querySelector("svg")!.outerHTML = skillMark(p.classId ?? "sentinela", key);
        b.querySelector("span")!.textContent = a.name;
        b.querySelector("small")!.textContent = a.cost
          ? `${a.cost} energia`
          : "Autoataque";
        const hint = actionHint(state, key, Date.now(), this.selected);
        b.title = hint.description;
        b.setAttribute("aria-label", hint.description);
      }
    }
    this.map(state);
    this.progressUI();
    const extendedKey = JSON.stringify([p.materials, p.crafting, p.companion, p.coins, p.inventory]);
    if (extendedKey !== this.extendedKey) {
      this.extendedKey = extendedKey;
      if (!this.el("dialog").hidden && this.extendedDialog === "craft") this.crafting();
      if (!this.el("dialog").hidden && this.extendedDialog === "companion") this.companion();
    }
  }
  animate(now: number, selected: string | null) {
    if (!this.current) return;
    const p = this.current.you;
    this.selected = selected;
    for (const key of ABILITY_KEYS) {
      const a = p.classId ? CLASS_KITS[p.classId][key] : SKILLS[key],
        b = this.el<HTMLButtonElement>("skill-" + key),
        left = Math.max(0, (p.cooldowns[key] ?? 0) - now);
      const hint = actionHint(this.current, key, now, selected);
      b.disabled = left > 0 || p.dead || p.energy < a.cost;
      b.classList.toggle("out-of-range", hint.reason.startsWith("Fora de alcance"));
      b.classList.toggle("needs-target", hint.reason.startsWith("Selecione"));
      b.querySelector(".skill-state")!.textContent = left > 0 ? "Recarga" : p.energy < a.cost ? "Sem energia" : hint.reason.startsWith("Fora de alcance") ? "Fora de alcance" : hint.reason.startsWith("Selecione") ? "Escolha alvo" : hint.reason.startsWith("Nenhuma criatura") ? "Área vazia" : hint.reason === "Vida completa" ? "Vida completa" : hint.reason.startsWith("Conjuração") ? "Conjurando" : hint.reason.startsWith("Alvo retornando") ? "Invulnerável" : "Pronto";
      b.setAttribute("aria-label", `${hint.description} ${hint.reason || "Pronto"}`);
      (b.querySelector(".cooldown-cover") as HTMLElement).style.height =
        `${Math.min(100, (left / a.cooldown) * 100)}%`;
      b.querySelector(".cooldown-number")!.textContent =
        left > 0 ? (left / 1000).toFixed(1) : "";
    }
    const enemy = this.current.enemies.find(
        (e) => e.id === selected && e.state !== "dead",
      ),
      ally = this.current.players.find((a) => a.id === selected && !a.dead);
    this.el("target").hidden = !enemy && !ally;
    if (enemy || ally) {
      const e = enemy ?? ally!;
      this.el("target-kind").textContent = enemy ? "◆ CRIATURA HOSTIL" : "◇ VIAJANTE ALIADO";
      this.el("target").classList.toggle("allied", !!ally);
      this.el("target-distance").textContent = `${distance(p, e).toFixed(1)} m de você`;
      this.el("target-name").textContent = enemy
        ? enemy.elite
          ? "Núcleo Fraturado"
          : ENEMY_TYPES[enemy.kind].name
        : ally!.nickname;
      this.el("target-fill").style.width = `${(e.hp / e.maxHp) * 100}%`;
      this.el("target-text").textContent = `${Math.ceil(e.hp)} / ${e.maxHp}`;
      this.el("target-state").textContent = enemy
        ? {
            patrol: "Patrulhando",
            chase: "Em perseguição",
            attack: "Em combate",
            return: "Retornando · invulnerável",
            dead: "",
          }[enemy.state]
        : "Aliado · selecione para receber cura";
    }
    if (this.tooltipSkill && !p.casting) this.showSkill(this.tooltipSkill);
    else if (p.casting) this.hideSkill();
    this.el("cast").hidden = !p.casting;
    if (p.casting) {
      const a = CLASS_KITS[p.classId ?? "arcanista"][p.casting.skill];
      this.el("cast-label").textContent =
        `${a.name} · ${Math.max(0, (p.casting.endsAt - now) / 1000).toFixed(1)} s`;
      this.el("cast-fill").style.width =
        `${Math.max(0, Math.min(100, (1 - (p.casting.endsAt - now) / (a.cast ?? 1000)) * 100))}%`;
    }
    if (p.taming) {
      this.el("cast").hidden = false;
      this.el("cast-label").textContent = `Criando vínculo · ${Math.max(0, (p.taming.endsAt - now) / 1000).toFixed(1)} s`;
      this.el("cast-fill").style.width = `${Math.max(0, Math.min(100, (now - p.taming.startedAt) / (p.taming.endsAt - p.taming.startedAt) * 100))}%`;
    }
    if (this.el("death").hidden === p.dead) {
      if (p.dead) this.closePanels();
      this.panel("death", p.dead);
    }
    if (p.dead) {
      const left = Math.max(0, Math.ceil((p.respawnAt - now) / 1000));
      this.el<HTMLButtonElement>("respawn").disabled = left > 0;
      this.el("respawn").textContent = left
        ? `A luz se recompõe… ${left}s`
        : "Retornar ao Farol";
    }
    const left = Math.max(0, p.potionAt - now),
      b = this.el<HTMLButtonElement>("quick-potion");
    b.disabled =
      p.dead || left > 0 || !p.inventory.some((s) => s.item === "potion");
    (b.querySelector(".cooldown-cover") as HTMLElement).style.height =
      `${(left / 8000) * 100}%`;
    b.querySelector(".cooldown-number")!.textContent = left
      ? (left / 1000).toFixed(1)
      : "";
  }
  private map(state: Snapshot) {
    const c = this.el<HTMLCanvasElement>("minimap").getContext("2d")!;
    c.clearRect(0, 0, 220, 200);
    c.fillStyle = factionOf(state.you) === "vigilia" ? "#334e41" : "#394d5b";
    c.fillRect(0, 0, 220, 200);
    const x = (v: number) => ((v + 44) / 88) * 220,
      z = (v: number) => ((v + 46) / 84) * 200;
    c.fillStyle = "#66735b";
    c.fillRect(0, z(0), 220, 200 - z(0));
    c.strokeStyle = "#b3a17c";
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(110, 0);
    c.lineTo(110, 200);
    c.stroke();
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(35, z(15));
    c.lineTo(185, z(15));
    c.stroke();
    c.fillStyle = "#9d9a83";
    for (const h of HOUSES) c.fillRect(x(h.x) - 6, z(h.z) - 5, 12, 10);
    for (const e of state.enemies)
      if (e.state !== "dead") {
        c.fillStyle = e.elite ? "#c18bc5" : "#ce8676";
        const r = e.elite ? 4 : 2.5;
        c.fillRect(x(e.x) - r, z(e.z) - r, r * 2, r * 2);
      }
    for (const n of FRAGMENTS)
      if (!state.you.story?.fragments.includes(n.id)) {
        c.fillStyle = "#7bc9cf";
        c.fillRect(x(n.x) - 2, z(n.z) - 2, 4, 4);
      }
    c.fillStyle = "#efce8a";
    c.beginPath();
    c.arc(x(NPC.x), z(NPC.z), 3, 0, 7);
    c.fill();
    c.fillStyle = "#a9dbce";
    c.fillRect(x(SHRINE.x) - 3, z(SHRINE.z) - 3, 6, 6);
    for (const p of state.players) {
      c.fillStyle = p.id === state.you.id ? "#fff2c9" : "#92c5dc";
      c.beginPath();
      c.arc(x(p.x), z(p.z), p.id === state.you.id ? 4 : 3, 0, 7);
      c.fill();
    }
  }
}
