/**
 * Ecos dos Faróis · iconografia vetorial autoral V2.
 * Ícones temporários de produção (SVG inline): não representam artes finais
 * aprovadas da Bíblia. Escapam de URLs externas e não carregam scripts.
 */
import type { ClassId, FactionId, RaceId } from '../../shared/identity.js';
import type { SkillId } from '../../shared/types.js';

type Mark = { path: string; color: string; title: string };
const marks: Record<string, Mark> = {
  'f:vigilia': { title: 'A Vigília', color: '#dfbc79', path: '<path d="M12 2 19 6v6c0 6-4 9-7 10-3-1-7-4-7-10V6Z"/><path d="M12 5v13M9 10h6"/><path d="M7 16h10"/>' },
  'f:confluencia': { title: 'A Confluência', color: '#9fd9ce', path: '<path d="M12 3c5 1 8 5 7 9-1 6-9 10-14 5-3-3-2-8 2-10 4-2 8 0 9 3 1 3-2 6-5 5-2-1-2-3-1-4"/><path d="M18 4 21 7M4 19l3 2"/>' },
  'r:valdarios': { title: 'Valdários', color: '#e2c88e', path: '<path d="M5 20V9l7-6 7 6v11"/><path d="M9 19v-7l3-2 3 2v7M3 20h18M9 7l3-2 3 2"/>' },
  'r:kordranios': { title: 'Kordrânios', color: '#d6a16f', path: '<path d="m12 2 8 5 2 8-6 7H8l-6-7 2-8Z"/><path d="m12 2-2 9 6 11M4 7l6 4 12 4M2 15l8-4"/>' },
  'r:eluvios': { title: 'Elúvios', color: '#bcb6ec', path: '<path d="M12 2c5 5 6 9 2 13l-2 7-2-7C6 11 7 7 12 2Z"/><path d="M12 6v10M5 12c2-3 4-3 7-1 3-2 5-2 7 1"/>' },
  'r:naquiros': { title: 'Náquiros', color: '#8bdfd6', path: '<path d="M12 3c-4 3-5 5-5 8-3-2-4-1-5 1 2 2 4 3 6 3 1 3 3 5 4 7 1-2 3-4 4-7 2 0 4-1 6-3-1-2-2-3-5-1 0-3-1-5-5-8Z"/><path d="M9 11h.1m5.8 0h.1M10 15c1 1 3 1 4 0"/>' },
  'c:sentinela': { title: 'Sentinela', color: '#d4b87e', path: '<path d="m12 2 7 4v7c0 4-3 7-7 9-4-2-7-5-7-9V6Z"/><path d="M12 5v13M8 11h8"/>' },
  'c:arcanista': { title: 'Arcanista', color: '#9b99fa', path: '<circle cx="12" cy="12" r="8"/><path d="m12 3 3 9-3 9-3-9ZM4 12h16M5.5 6.5l13 11"/>' },
  'c:errante': { title: 'Errante', color: '#b7dc8e', path: '<path d="M6 3c15 1 15 17 0 18M4 12h16m-5-4 5 4-5 4"/><path d="M8 7c2 2 2 8 0 10"/>' },
  'c:ressonante': { title: 'Ressonante', color: '#7fd5eb', path: '<path d="m12 2 5 8-5 12-5-12Z"/><path d="M4 9c-3 2-3 4 0 6M20 9c3 2 3 4 0 6M2 5C-1 9-1 15 2 19M22 5c3 4 3 10 0 14"/>' },
};
const skills: Record<ClassId, Record<SkillId, Mark>> = {
  sentinela: {
    attack: { title: 'Golpe de guarda', color: '#edc482', path: '<path d="m5 20 14-16M13 4l7-1-1 7M4 13l7 7M3 21l5-5"/>' },
    cleave: { title: 'Impacto do escudo', color: '#f1c67e', path: '<path d="M12 2 20 6v8l-8 8-8-8V6Z"/><path d="m8 9 8 6M16 9l-8 6"/>' },
    nova: { title: 'Onda protetora', color: '#efdca7', path: '<path d="M12 3 19 7v7l-7 7-7-7V7Z"/><path d="M2 12h3m14 0h3M12 8v8"/>' },
    guard: { title: 'Barreira protetora', color: '#9dd7ed', path: '<path d="M12 2 20 6v8c0 4-5 7-8 8-3-1-8-4-8-8V6Z"/><path d="M7 11h10M12 6v12"/>' },
    focus: { title: 'Fôlego da Vigília', color: '#a3d9c0', path: '<path d="M3 14c4-7 7-2 9-10 2 8 5 3 9 10-3 3-6 4-9 7-3-3-6-4-9-7Z"/><path d="M12 10v7M9 13h6"/>' },
  },
  arcanista: {
    attack: { title: 'Faísca rúnica', color: '#b2b0ff', path: '<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>' },
    cleave: { title: 'Descarga Arcana', color: '#ae92ff', path: '<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/><circle cx="12" cy="12" r="5"/>' },
    nova: { title: 'Anel de ressonância', color: '#92b9ff', path: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 1v5m0 12v5M1 12h5m12 0h5"/>' },
    guard: { title: 'Véu rúnico', color: '#d1a7ff', path: '<path d="M12 2 20 10l-8 12-8-12Z"/><path d="M7 10h10M12 4v14"/>' },
    focus: { title: 'Recomposição arcana', color: '#89e2e3', path: '<path d="m12 2 8 10-8 10L4 12Z"/><path d="M12 7v10M7 12h10"/>' },
  },
  errante: {
    attack: { title: 'Disparo preciso', color: '#bfe39a', path: '<path d="M6 2c15 1 15 19 0 20M3 12h18m-5-5 5 5-5 5"/>' },
    cleave: { title: 'Flecha especial', color: '#a3da7d', path: '<path d="M2 20 20 3m-7 0h7v7M6 10l8 8"/>' },
    nova: { title: 'Rajada do bosque', color: '#c8db91', path: '<path d="M3 18 19 4m-11 14L22 8M2 11l10-9M16 4h5v5M17 8h5v5"/>' },
    guard: { title: 'Passo cauteloso', color: '#8cd8ac', path: '<path d="M4 20c5-6 11-8 16-16M4 10h7M13 17h7"/><path d="m8 6-4 4 4 4"/>' },
    focus: { title: 'Fôlego do caminho', color: '#c4e6a8', path: '<path d="M12 21c-6-4-9-9-7-13s7-1 7 2c0-3 5-6 7-2s-1 9-7 13Z"/><path d="M7 13h10"/>' },
  },
  ressonante: {
    attack: { title: 'Nota de impacto', color: '#8bd9ed', path: '<path d="M10 5v13a3 3 0 1 1-2-3V7l11-3v11a3 3 0 1 1-2-3V4Z"/>' },
    cleave: { title: 'Pulso dissonante', color: '#9ccff5', path: '<path d="M2 12h4l3-7 5 14 3-7h5"/>' },
    nova: { title: 'Onda harmônica', color: '#8de7da', path: '<circle cx="12" cy="12" r="3"/><path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14M2 2a14 14 0 0 0 0 20M22 2a14 14 0 0 1 0 20"/>' },
    guard: { title: 'Manto harmônico', color: '#a1dcf5', path: '<path d="M12 2 20 8v9l-8 5-8-5V8Z"/><path d="M7 12c2-3 4 3 6 0s4-3 4 0"/>' },
    focus: { title: 'Pulso de cura', color: '#9be3ca', path: '<circle cx="12" cy="12" r="9"/><path d="M12 6v12M6 12h12"/>' },
  },
};
function svg(mark: Mark, extraClass: string): string {
  return `<svg class="edf-mark ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="${mark.color}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${mark.title}">${mark.path}</svg>`;
}
export const factionMark = (id: FactionId) => svg(marks[`f:${id}`], 'edf-mark-faction');
export const raceMark = (id: RaceId) => svg(marks[`r:${id}`], 'edf-mark-race');
export const classMark = (id: ClassId) => svg(marks[`c:${id}`], 'edf-mark-class');
export const skillMark = (id: ClassId, skill: SkillId) => svg(skills[id][skill], 'edf-mark-skill');
