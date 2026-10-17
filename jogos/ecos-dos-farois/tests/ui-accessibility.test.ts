import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { UI } from '../client/src/ui.js';
import { actionHint } from '../client/src/ui-state.js';
import { Game } from '../server/src/game.js';
import { NPC } from '../shared/config.js';
import { CRAFT_STATION } from '../shared/extended.js';
import { DEFAULT_AUDIO } from '../client/src/audio-synth.js';
import { DEFAULT_CREATION } from '../shared/alpha.js';

function setup() {
  const dom = new JSDOM('<!doctype html><div id="app"></div>', { url: 'http://localhost:5173' });
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
    HTMLInputElement: dom.window.HTMLInputElement, localStorage: dom.window.localStorage });
  dom.window.HTMLCanvasElement.prototype.getContext = (() => ({ clearRect() {}, fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, arc() {}, fill() {} })) as never;
  const ui = new UI(document.getElementById('app')!), game = new Game(), p = game.connect(game.create('UIViajante', { ...DEFAULT_CREATION, classId: 'ressonante' }));
  ui.status('online');
  const update = () => { ui.update(game.snapshot(p.id), 32); return game.snapshot(p.id); };
  const click = (id: string) => ui.el<HTMLButtonElement>(id).click();
  update();
  return { dom, ui, game, p, update, click };
}

test('menus preservam foco e Tab nativo sem disparar atalhos do mundo', async () => {
  const { dom, ui, click } = setup();
  try {
    ui.el('help-button').focus(); click('help-button');
    assert.equal(document.activeElement?.id, 'help-close');
    assert.equal(ui.el('hud').hasAttribute('inert'), true, 'controles cobertos não recebem foco');
    let worldKeys = 0;
    dom.window.addEventListener('keydown', () => worldKeys++);
    const tab = new dom.window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.activeElement!.dispatchEvent(tab);
    assert.equal(tab.defaultPrevented, false, 'o navegador mantém a navegação Tab');
    assert.equal(worldKeys, 0, 'Input não recebe Tab do menu');
    const escape = new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    document.activeElement!.dispatchEvent(escape);
    assert.equal(ui.modalOpen, false);
    assert.equal(ui.el('hud').hasAttribute('inert'), false, 'fechar devolve controles ao mundo');
    assert.equal(document.activeElement?.id, 'help-button');
    assert.equal(worldKeys, 0);
    click('bag-button'); assert.equal(ui.modalOpen, true);
    click('sound-button'); assert.equal(ui.el('bag').hidden, true, 'somente um painel de controle aberto');
    assert.equal(ui.el('audio-panel').hidden, false);
  } finally { dom.window.close(); }
});

test('alvo, alcance, recarga, falta de recurso e área têm explicações distinguíveis', () => {
  const { dom, ui, p, update } = setup();
  try {
    const state = update(), enemy = state.enemies[0];
    assert.ok(enemy);
    enemy.x = p.x + 30; enemy.z = p.z;
    assert.match(actionHint(state, 'cleave', 1000, enemy.id).reason, /Fora de alcance/);
    ui.update(state, 35); ui.animate(1000, enemy.id);
    assert.match(ui.el('target-distance').textContent!, /30.0 m/);
    assert.match(ui.el('target-kind').textContent!, /HOSTIL/);
    assert.match(ui.el('skill-cleave').getAttribute('aria-label')!, /Fora de alcance/);
    state.you.energy = 0;
    assert.match(actionHint(state, 'cleave', 1000, enemy.id).reason, /Energia insuficiente/);
    state.you.energy = 100; state.you.cooldowns.cleave = 4000;
    assert.equal(actionHint(state, 'cleave', 1000, enemy.id).reason, 'Recarga · 3.0 s');
    state.you.cooldowns.cleave = 0;
    assert.match(actionHint(state, 'nova', 1000, null).reach, /Área ao seu redor · raio 5.8 m/);
    assert.equal(actionHint(state, 'cleave', 1000, null).reason, 'Selecione um alvo');
    // These hints never modify state or spend resources, even when an action is impossible.
    assert.equal(state.you.energy, 100); assert.equal(state.you.cooldowns.cleave, 0);
  } finally { dom.window.close(); }
});

test('cura distingue aliado fora do alcance e autocura; tooltip anuncia custo e origem', () => {
  const { dom, ui, game, p, update } = setup();
  try {
    const ally = game.connect(game.create('AliadoUI', { ...DEFAULT_CREATION, classId: 'sentinela' }));
    ally.x = p.x + 20; ally.z = p.z; ally.hp = 1;
    p.hp = 1;
    const state = update();
    assert.match(actionHint(state, 'focus', 0, ally.id).reason, /Fora de alcance/);
    assert.equal(actionHint(state, 'focus', 0, null).reach, 'Em você');
    ui.animate(0, ally.id); assert.match(ui.el('target-kind').textContent!, /ALIADO/);
    let preview: unknown = null;
    ui.onSkillPreview = skill => { preview = skill; };
    ui.el('skill-nova').dispatchEvent(new dom.window.Event('pointerenter'));
    assert.equal(preview, 'nova');
    assert.equal(ui.el('skill-tooltip').hidden, false);
    assert.match(ui.el('skill-tooltip').textContent!, /raio 5.8 m/);
    ui.el('skill-nova').dispatchEvent(new dom.window.Event('pointerleave'));
    assert.equal(preview, null); assert.equal(ui.el('skill-tooltip').hidden, true);
  } finally { dom.window.close(); }
});

test('fala ocorre apenas em conversa próxima; fechar interrompe sem remover legenda do diário', () => {
  const { dom, ui, p, update } = setup();
  try {
    const calls: [string, string][] = []; let closed = 0;
    ui.onDialogue = (id, text) => calls.push([id, text]); ui.onDialogueClose = () => { closed++; };
    p.x = NPC.x + 20; p.z = NPC.z; update(); ui.talk();
    assert.equal(calls.length, 0);
    p.x = NPC.x; p.z = NPC.z + 2; update(); ui.talk();
    assert.equal(calls.length, 1); assert.equal(calls[0][0], 'vigilia.guide.available');
    assert.ok(ui.el('dialog-content').textContent?.includes(calls[0][1]));
    ui.closeDialog(); assert.equal(closed, 1);
    ui.journal(); assert.equal(calls.length, 1, 'diário não repete a fala');
  } finally { dom.window.close(); }
});

test('voz, efeitos reduzidos e mapa têm controles independentes persistentes', () => {
  const { dom, ui, click } = setup();
  try {
    let changed: unknown = null; ui.onaudio = (k, v) => { changed = [k, v]; };
    ui.audioLevels({ ...DEFAULT_AUDIO, voice: 0.3 }, true);
    assert.equal(ui.el('audio-voice-value').textContent, '30%');
    const voice = ui.el<HTMLInputElement>('audio-voice'); voice.value = '60';
    voice.dispatchEvent(new dom.window.Event('input', { bubbles: true })); assert.deepEqual(changed, ['voice', 0.6]);
    let reduced = false; ui.onreducedEffects = value => { reduced = value; };
    const effects = ui.el<HTMLInputElement>('reduced-effects'); effects.checked = true;
    effects.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
    assert.equal(reduced, true); assert.equal(localStorage.getItem('edf.reducedEffects'), 'true');
    click('map-toggle'); assert.equal(ui.el('map-wrap').hidden, true); assert.equal(ui.el('map-toggle').getAttribute('aria-expanded'), 'false');
    click('map-toggle'); assert.equal(ui.el('map-wrap').hidden, false);
  } finally { dom.window.close(); }
});

test('ofício e companheiro usam ações reais sem fabricar confirmações de sucesso', () => {
  const { dom, ui, p, update, click } = setup();
  try {
    p.quest.state = 'completed'; p.x = CRAFT_STATION.x; p.z = CRAFT_STATION.z;
    p.materials = { seivaClara: 2 }; p.coins = 3; update();
    let crafts = 0; ui.oncraft = () => crafts++;
    click('craft-button');
    const b = ui.el('dialog-content').querySelector<HTMLButtonElement>('[data-dialog-action="craft"]')!;
    assert.equal(b.disabled, false); b.click(); assert.equal(crafts, 1);
    assert.equal(p.materials.seivaClara, 2, 'UI só solicita; não consome localmente');
    ui.closeDialog(); p.classId = 'sentinela'; update(); ui.companion();
    assert.match(ui.el('dialog-content').textContent!, /disponível ao Errante/);
    assert.equal(ui.el('dialog-content').querySelector('[data-dialog-action="companion-capture"]'), null);
  } finally { dom.window.close(); }
});

test('avisos de combate repetidos são coalescidos e uma nova falha continua visível', () => {
  const { dom, ui } = setup();
  try {
    ui.toast('O alvo está fora do alcance.', 'error');
    ui.toast('O alvo está fora do alcance.', 'error');
    ui.toast('Energia insuficiente.', 'error');
    const notices = ui.el('toasts');
    assert.equal(notices.children.length, 2);
    assert.match(notices.textContent!, /fora do alcance. ×2/);
    assert.match(notices.textContent!, /Energia insuficiente/);
    ui.toast('Conexão encerrada.', 'error');
    assert.equal(notices.children.length, 3);
    assert.match(notices.lastElementChild!.textContent!, /Conexão encerrada/);
  } finally { dom.window.close(); }
});

test('queda e desconexão substituem os menus e mantêm os controles de recuperação acessíveis', () => {
  const { dom, ui, p, update, click } = setup();
  try {
    click('bag-button');
    p.dead = true; p.respawnAt = 0; update(); ui.animate(Date.now(), null);
    assert.equal(ui.el('bag').hidden, true);
    assert.equal(ui.el('death').hidden, false);
    assert.equal(ui.el('death').hasAttribute('inert'), false);
    assert.equal(ui.el('respawn').closest('[inert]'), null);
    ui.status('offline', 'Conexão encerrada para teste');
    assert.equal(ui.el('death').hidden, true);
    assert.equal(ui.el('network-overlay').hidden, false);
    assert.equal(ui.el('network-exit').closest('[inert]'), null);
    p.dead = false; ui.status('online'); update(); ui.animate(Date.now(), null);
    assert.equal(ui.el('network-overlay').hidden, true);
    assert.equal(ui.el('hud').hasAttribute('inert'), false);
  } finally { dom.window.close(); }
});
