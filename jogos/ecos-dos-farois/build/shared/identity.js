/** Stable IDs; display names and class mechanics are separate. GDB DEC-003/004/005. */
export const FACTION_RACES = {
    vigilia: ['valdarios', 'kordranios'],
    confluencia: ['eluvios', 'naquiros']
};
export const CLASS_IDS = ['sentinela', 'arcanista', 'errante', 'ressonante'];
export function validFactionRace(faction, race) {
    return typeof faction === 'string' && Object.hasOwn(FACTION_RACES, faction) &&
        FACTION_RACES[faction].includes(race);
}
export const validNickname = (name) => typeof name === 'string' &&
    /^[\p{L}\p{N} _-]{3,18}$/u.test(name) && name.trim() === name && name.trim().length >= 3;
//# sourceMappingURL=identity.js.map