import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { UI } from '../client/src/ui.js';
import { Game } from '../server/src/game.js';
import { DEFAULT_AUDIO } from '../client/src/audio-synth.js';
import { NPC } from '../shared/config.js';
function domSetup() {
  const dom = new JSDOM('<!doctype html><div id="app"></div>', { url: 'http://localhost:5173' });
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
    HTMLInputElement: dom.window.HTMLInputElement, localStorage: dom.window.localStorage, sessionStorage: dom.window.sessionStorage, confirm: () => true });
  // Simula apenas o mapa 2D. Não é verificação visual nem substitui WebGL no navegador.
  dom.window.HTMLCanvasElement.prototype.getContext = (() => ({ clearRect() {}, fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, arc() {}, fill() {} })) as never;
  const ui = new UI(document.getElementById('app')!), game = new Game(), p = game.connect(game.create('Arin'));
  return { dom, ui, game, p, click: (id: string) => ui.el<HTMLButtonElement>(id).click() };
}
test('interface inicializa; entrada, ajuda, mochila, missão e ações usam os callbacks', () => {
  const { dom, ui, game, p, click } = domSetup();
  try {
    let entered = ''; ui.onjoin = name => { entered = name; }; ui.el<HTMLInputElement>('nickname').value = 'Luiz Henrique';
    ui.el('entry-form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })); assert.equal(entered, 'Luiz Henrique');
    ui.status('online'); ui.update(game.snapshot(p.id), 32); assert.equal(ui.el('hud').hidden, false); assert.equal(ui.el('name').textContent, 'Arin');
    click('help-button'); assert.equal(ui.el('help').hidden, false); click('help-close'); assert.equal(ui.el('help').hidden, true);
    click('bag-button'); assert.equal(ui.el('bag').hidden, false); click('bag-close'); assert.equal(ui.el('bag').hidden, true);
    let action = ''; ui.onskill = skill => { action = skill; }; click('skill-cleave'); assert.equal(action, 'cleave');
    ui.onitem = (kind, slot) => { action = `${kind}:${slot}`; }; click('quick-potion'); assert.equal(action, 'use:0');
    p.x = NPC.x; p.z = NPC.z + 2; ui.update(game.snapshot(p.id), 32); ui.talk(); assert.equal(ui.el('dialog').hidden, false);
    ui.onquest = kind => { action = kind; }; (ui.el('dialog-content').querySelector('[data-dialog-action="accept"]') as HTMLButtonElement).click(); assert.equal(action, 'accept'); assert.equal(ui.el('dialog').hidden, true);
    click('journal-button'); assert.equal(ui.el('dialog').hidden, false); ui.closePanels(); assert.equal(ui.modalOpen, false);
  } finally { dom.window.close(); }
});
test('volumes, silenciar e contagem de recarga respondem na interface', () => {
  const { dom, ui, game, p, click } = domSetup();
  try {
    let changed: unknown = null; ui.onaudio = (key, value) => { changed = [key, value]; }; click('sound-button'); assert.equal(ui.el('audio-panel').hidden, false);
    const range = ui.el<HTMLInputElement>('audio-music'); range.value = '20'; range.dispatchEvent(new dom.window.Event('input', { bubbles: true })); assert.deepEqual(changed, ['music', 0.2]);
    click('audio-mute'); assert.deepEqual(changed, ['enabled', false]); ui.audioLevels({ ...DEFAULT_AUDIO, enabled: false }, true); assert.equal(ui.el('sound-button').classList.contains('muted'), true);
    p.cooldowns.cleave = Date.now() + 4000; ui.update(game.snapshot(p.id), 10); ui.animate(Date.now(), null); assert.equal(ui.el<HTMLButtonElement>('skill-cleave').disabled, true);
    p.cooldowns.cleave = 0; ui.update(game.snapshot(p.id), 10); ui.animate(Date.now(), null); assert.equal(ui.el<HTMLButtonElement>('skill-cleave').disabled, false);
    ui.oncopy = () => { changed = 'copy'; }; click('copy-key'); assert.equal(changed, 'copy'); ui.showKey('x'.repeat(43)); assert.equal(ui.el<HTMLInputElement>('private-key').value.length, 43);
  } finally { dom.window.close(); }
});
