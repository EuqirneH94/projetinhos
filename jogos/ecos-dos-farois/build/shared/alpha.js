export const FACTION_NAMES = {
    vigilia: "A Vigília",
    confluencia: "A Confluência",
};
export const RACE_NAMES = {
    valdarios: "Valdários",
    kordranios: "Kordrânios",
    eluvios: "Elúvios",
    naquiros: "Náquiros",
};
export const CLASS_NAMES = {
    sentinela: "Sentinela",
    arcanista: "Arcanista",
    errante: "Errante",
    ressonante: "Ressonante",
};
export const CLASS_DESCRIPTION = {
    sentinela: "Placas, escudo e combate próximo. Sustente a linha e proteja seus aliados.",
    arcanista: "Runas e energia fluida. Concentre o Nexo em descargas à distância.",
    errante: "Arco, couro e mobilidade. Escolha seu alvo e controle a distância.",
    ressonante: "Tecido, foco e ressonância. Alterne ataques, proteção e restauração.",
};
export const DEFAULT_CREATION = {
    factionId: "vigilia",
    raceId: "valdarios",
    classId: "sentinela",
    appearance: 0,
};
export const ABILITY_KEYS = [
    "attack",
    "cleave",
    "nova",
    "guard",
    "focus",
];
const spec = (name, damage, cost, cooldown, range, extra = {}) => ({ name, damage, cost, cooldown, range, ...extra });
export const CLASS_KITS = {
    sentinela: {
        attack: spec("Golpe de guarda", 15, 0, 750, 2.9),
        cleave: spec("Impacto do escudo", 31, 25, 5000, 3.5),
        nova: spec("Onda protetora", 23, 35, 9000, 4.1, { area: true }),
        guard: spec("Barreira protetora", 0, 20, 13000, 0, { shield: 6500 }),
        focus: spec("Fôlego da Vigília", 0, 25, 16000, 0, { heal: 48 }),
    },
    arcanista: {
        attack: spec("Faísca rúnica", 13, 0, 1100, 15),
        cleave: spec("Descarga Arcana", 38, 24, 4800, 17, { cast: 1100 }),
        nova: spec("Anel de ressonância", 29, 34, 9500, 5.8, { area: true }),
        guard: spec("Véu rúnico", 0, 23, 14000, 0, { shield: 5000 }),
        focus: spec("Recomposição arcana", 0, 27, 16000, 0, {
            heal: 42,
            cast: 1300,
        }),
    },
    errante: {
        attack: spec("Disparo preciso", 14, 0, 1000, 17),
        cleave: spec("Flecha especial", 34, 22, 4500, 19, { cast: 650 }),
        nova: spec("Rajada do bosque", 23, 32, 9500, 7, { area: true }),
        guard: spec("Passo cauteloso", 0, 18, 14000, 0, { shield: 4500 }),
        focus: spec("Fôlego do caminho", 0, 25, 16000, 0, { heal: 45 }),
    },
    ressonante: {
        attack: spec("Nota de impacto", 12, 0, 1100, 14),
        cleave: spec("Pulso dissonante", 30, 20, 4500, 16, { cast: 850 }),
        nova: spec("Onda harmônica", 22, 30, 9000, 5.8, { area: true }),
        guard: spec("Manto harmônico", 0, 20, 13000, 0, { shield: 6000 }),
        focus: spec("Pulso de cura", 0, 25, 7000, 14, { heal: 68, cast: 800 }),
    },
};
export const STARTER_WEAPON = {
    sentinela: "trainingSword",
    arcanista: "trainingStaff",
    errante: "trainingBow",
    ressonante: "trainingFocus",
};
export const REWARD_WEAPON = {
    sentinela: "dawnSword",
    arcanista: "dawnStaff",
    errante: "dawnBow",
    ressonante: "dawnFocus",
};
export const STARTER_ARMOR = {
    sentinela: "plateArmor",
    arcanista: "clothArmor",
    errante: "leatherArmor",
    ressonante: "clothArmor",
};
export const FACTION_NPCS = {
    vigilia: {
        name: "Capitã Elara",
        title: "Guarda dos caminhos",
        zone: "Refúgio da Vigília",
        wild: "Bosque das Ressonâncias",
        companions: ["Borin", "Mestre Orven"],
    },
    confluencia: {
        name: "Lyssara",
        title: "Guardiã dos fluxos",
        zone: "Clareira da Confluência",
        wild: "Jardins dos Ecos",
        companions: ["Neral", "Sáren"],
    },
};
export const FRAGMENTS = [
    { id: "eco-1", x: -21, z: -8 },
    { id: "eco-2", x: 22, z: -25 },
    { id: "eco-3", x: -3, z: -35 },
];
export const BOSS_ID = "nucleo-fraturado";
export function terrainHeight(x, z) {
    const outside = Math.max(0, Math.abs(x) - 31) / 14;
    const northern = Math.max(0, -z - 4) / 45;
    return (Math.sin(x * 0.12) * Math.sin(z * 0.11) * 0.34 * northern +
        outside * outside * 2.1);
}
export function factionOf(p) {
    return p.factionId ?? "vigilia";
}
//# sourceMappingURL=alpha.js.map