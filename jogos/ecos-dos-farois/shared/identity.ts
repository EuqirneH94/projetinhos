/** Stable IDs; display names and class mechanics are separate. GDB DEC-003/004/005. */
export const FACTION_RACES = {
  vigilia: ['valdarios', 'kordranios'],
  confluencia: ['eluvios', 'naquiros']
} as const;
export const CLASS_IDS = ['sentinela', 'arcanista', 'errante', 'ressonante'] as const;
export type FactionId = keyof typeof FACTION_RACES;
export type RaceId = (typeof FACTION_RACES)[FactionId][number];
export type ClassId = typeof CLASS_IDS[number];
export type CharacterInfo = {
  id: string; nickname: string; slot: number; factionId: FactionId; raceId: RaceId;
  classId: ClassId; mode: 'prototype';
};
export type CharacterInput = Pick<CharacterInfo, 'nickname' | 'factionId' | 'raceId' | 'classId'>;
export type AccountMessage =
  | { type: 'account_login'; token: string }
  | { type: 'character_list' }
  | ({ type: 'character_create' } & CharacterInput)
  | { type: 'character_enter'; characterId: string }
  | { type: 'character_leave' };
export type AccountReply =
  | { type: 'account_ready'; accountId: string; classes: readonly ClassId[]; classSelection: boolean }
  | { type: 'character_list'; characters: CharacterInfo[] }
  | { type: 'character_entered'; character: CharacterInfo }
  | { type: 'character_left' }
  | { type: 'account_error'; code: string };
export function validFactionRace(faction: unknown, race: unknown): faction is FactionId {
  return typeof faction === 'string' && Object.hasOwn(FACTION_RACES, faction) &&
    (FACTION_RACES[faction as FactionId] as readonly unknown[]).includes(race);
}
export const validNickname = (name: unknown): name is string => typeof name === 'string' &&
  /^[\p{L}\p{N} _-]{3,18}$/u.test(name) && name.trim() === name && name.trim().length >= 3;
