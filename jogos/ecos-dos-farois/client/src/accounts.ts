import { FACTION_RACES, type FactionId, type RaceId, type ClassId } from '../../shared/identity.js';
import type { ClientMessage, ServerMessage } from '../../shared/types.js';
const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const labels: Record<RaceId, string> = { valdarios: 'Valdários', kordranios: 'Kordrânios', eluvios: 'Elúvios', naquiros: 'Náquiros' };
let ws: WebSocket | undefined, token = '';
const status = (text: string) => { el('status').textContent = text; };
const races = () => {
  const select = el<HTMLSelectElement>('race'); select.replaceChildren();
  for (const race of FACTION_RACES[el<HTMLSelectElement>('faction').value as FactionId]) select.add(new Option(labels[race], race));
};
races(); el('faction').onchange = races;
const send = (msg: ClientMessage) => { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg)); else status('Conecte sua conta primeiro.'); };
el('login').onsubmit = event => {
  event.preventDefault(); ws?.close(); el('management').hidden = true; el('characters').replaceChildren(); token = el<HTMLInputElement>('token').value.trim();
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) { status('Chave inválida.'); return; }
  ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);
  const current = ws;
  current.onopen = () => { if (current === ws) current.send(JSON.stringify({ type: 'account_login', token })); };
  current.onmessage = event => {
    if (current !== ws) return;
    const msg = JSON.parse(event.data) as ServerMessage;
    if (msg.type === 'account_ready') { el('management').hidden = false; status('Conta conectada. No máximo oito personagens.'); el<HTMLInputElement>('token').value = ''; }
    if (msg.type === 'account_error') status(({ ACCOUNT_IN_USE: 'A conta já está jogando.', CHARACTER_LIMIT: 'Limite de oito personagens atingido.', UNAUTHORIZED: 'Chave inválida ou expirada.', ACCOUNTS_DISABLED: 'Contas não estão ativadas neste servidor.' } as Record<string,string>)[msg.code] ?? 'Operação recusada pelo servidor.');
    if (msg.type === 'character_list') {
      el('characters').replaceChildren();
      for (const c of msg.characters) {
        const item = document.createElement('li'), button = document.createElement('button');
        item.textContent = `${c.nickname} · ${c.factionId} · ${labels[c.raceId]} · ${c.classId} `;
        button.textContent = 'Entrar no mundo';
        button.onclick = () => {
          sessionStorage.setItem('edf.account-session', JSON.stringify({ token, characterId: c.id }));
          sessionStorage.removeItem('nexo.session'); current.close(); location.assign(new URLSearchParams(location.search).get('character') === 'naquiro-male' ? '/?character=naquiro-male' : '/');
        };
        item.append(button); el('characters').append(item);
      }
      el<HTMLButtonElement>('create').querySelector<HTMLButtonElement>('button')!.disabled = msg.characters.length >= 8;
    }
  };
  current.onclose = () => { if (current === ws) { el('management').hidden = true; status('Conexão de conta encerrada.'); } };
  current.onerror = () => status('Servidor indisponível.');
};
el('create').onsubmit = event => {
  event.preventDefault();
  send({ type: 'character_create', nickname: el<HTMLInputElement>('name').value.trim(), factionId: el<HTMLSelectElement>('faction').value as FactionId, raceId: el<HTMLSelectElement>('race').value as RaceId, classId: el<HTMLSelectElement>('class').value as ClassId });
};
el('logout').onclick = () => { ws?.close(); token = ''; sessionStorage.removeItem('edf.account-session'); el('management').hidden = true; };
