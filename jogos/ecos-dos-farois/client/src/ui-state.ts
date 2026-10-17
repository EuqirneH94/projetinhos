import { CLASS_KITS, type SkillSpec } from '../../shared/alpha.js';
import { SKILLS } from '../../shared/config.js';
import { distance } from '../../shared/movement.js';
import type { SkillId, Snapshot } from '../../shared/types.js';

/** Display-only hints. The server remains authoritative for every action. */
export function actionHint(state: Snapshot, key: SkillId, now: number, selected: string | null) {
  const p = state.you;
  const skill: SkillSpec = p.classId ? CLASS_KITS[p.classId][key] : SKILLS[key];
  const remaining = Math.max(0, (p.cooldowns[key] ?? 0) - now);
  const target = state.enemies.find(e => e.id === selected && e.state !== 'dead')
    ?? state.players.find(e => e.id === selected && !e.dead);
  const remoteHeal = key === 'focus' && p.classId === 'ressonante' && !!target && 'nickname' in target;
  const area = skill.area || key === "nova";
  const needsTarget = skill.damage > 0 && !area;
  const targetDistance = target ? distance(p, target) : null;
  let reason = '';
  if (p.dead) reason = 'Personagem caído';
  else if (remaining > 0) reason = `Recarga · ${(remaining / 1000).toFixed(1)} s`;
  else if (p.energy < skill.cost) reason = `Energia insuficiente · ${skill.cost} necessária`;
  else if (p.casting) reason = 'Conjuração em andamento';
  else if (needsTarget && target && 'state' in target && target.state === 'return') reason = 'Alvo retornando · invulnerável';
  else if (needsTarget && !target) reason = 'Selecione um alvo';
  else if ((needsTarget || remoteHeal) && targetDistance !== null && targetDistance > skill.range)
    reason = `Fora de alcance · ${targetDistance.toFixed(1)} / ${skill.range} m`;
  else if (needsTarget && target && 'nickname' in target) reason = 'Selecione uma criatura hostil';
  if (!reason && area && !state.enemies.some(e => e.state !== "dead" && e.state !== "return" && distance(p, e) <= skill.range)) reason = "Nenhuma criatura na área";
  const recipient = remoteHeal ? target! : p;
  if (!reason && skill.heal && recipient.hp >= recipient.maxHp) reason = "Vida completa";
  const reach = area ? `Área ao seu redor · raio ${skill.range} m`
    : skill.range === 0 || (skill.heal && !remoteHeal) ? 'Em você'
    : `Alcance ${skill.range} m`;
  return { skill, remaining, targetDistance, reason, reach,
    description: `${skill.name}. ${reach}. ${skill.cost ? `${skill.cost} de energia` : 'Sem custo'}. Recarga ${skill.cooldown / 1000} s.${skill.cast ? ` Conjuração ${skill.cast / 1000} s.` : ''}` };
}
