export const VERSION = "0.2.0-alpha";
export const WORLD = {
    minX: -44,
    maxX: 44,
    minZ: -46,
    maxZ: 38,
    speed: 5.4,
    radius: 0.46,
};
export const SPAWN = { x: 0, z: 24 };
export const NPC = { x: -4, z: 14, name: "Capitã Elara", title: "Guarda dos caminhos" };
export const SHRINE = { x: -8, z: 20 };
export const XP_LEVELS = [0, 100, 240, 440, 700];
export const INVENTORY_SIZE = 24;
export const QUEST = {
    name: "A trilha volta a respirar",
    brumino: 3,
    cerne: 2,
    xp: 140,
    coins: 35,
    description: "A instabilidade do Nexo atingiu o bosque. Afaste as criaturas da estrada e proteja os caminhos da comunidade.",
};
export const SKILLS = {
    attack: {
        name: "Golpe de aço",
        damage: 15,
        cost: 0,
        cooldown: 750,
        range: 2.9,
    },
    cleave: { name: "Ruptura", damage: 31, cost: 25, cooldown: 5000, range: 3.5 },
    nova: {
        name: "Círculo de alvor",
        damage: 23,
        cost: 35,
        cooldown: 9000,
        range: 4.1,
    },
    guard: {
        name: "Barreira protetora",
        damage: 0,
        cost: 20,
        cooldown: 13000,
        range: 0,
    },
    focus: {
        name: "Pulso de cura",
        damage: 0,
        cost: 25,
        cooldown: 16000,
        range: 0,
    },
};
export const ITEMS = {
    trainingStaff: {
        name: "Cajado de aprendiz",
        description: "Foco rúnico de madeira e cristal.",
        kind: "weapon",
        value: 0,
        stack: 1,
        icon: "nova",
    },
    trainingBow: {
        name: "Arco do caminho",
        description: "Arco de exploração. Uso do Errante.",
        kind: "weapon",
        value: 0,
        stack: 1,
        icon: "cleave",
    },
    trainingFocus: {
        name: "Foco de ressonância",
        description: "Canaliza ondas de cura e impacto.",
        kind: "weapon",
        value: 0,
        stack: 1,
        icon: "nova",
    },
    dawnStaff: {
        name: "Cajado da Aurora",
        description: "+7 de dano. Uso do Arcanista.",
        kind: "weapon",
        value: 7,
        stack: 1,
        icon: "nova",
    },
    dawnBow: {
        name: "Arco da Aurora",
        description: "+7 de dano. Uso do Errante.",
        kind: "weapon",
        value: 7,
        stack: 1,
        icon: "cleave",
    },
    dawnFocus: {
        name: "Foco da Aurora",
        description: "+7 de dano. Uso do Ressonante.",
        kind: "weapon",
        value: 7,
        stack: 1,
        icon: "nova",
    },
    plateArmor: {
        name: "Placas da guarda",
        description: "Placas do Sentinela. Reduz 2 de dano.",
        kind: "armor",
        value: 2,
        stack: 1,
        icon: "shield",
    },
    clothArmor: {
        name: "Vestes de ressonância",
        description: "Tecido. Reduz 1 de dano.",
        kind: "armor",
        value: 1,
        stack: 1,
        icon: "shield",
    },
    leatherArmor: {
        name: "Gibão do caminho",
        description: "Couro do Errante. Reduz 2 de dano.",
        kind: "armor",
        value: 2,
        stack: 1,
        icon: "shield",
    },
    trainingSword: {
        name: "Espada de aprendiz",
        description: "Aço simples. O começo da jornada.",
        kind: "weapon",
        value: 0,
        stack: 1,
        icon: "sword",
    },
    tunic: {
        name: "Túnica do vale",
        description: "Proteção inicial. Reduz 1 de dano.",
        kind: "armor",
        value: 1,
        stack: 1,
        icon: "shield",
    },
    potion: {
        name: "Tônico de alvor",
        description: "Recupera 65 de vida. Recarga de 8 s.",
        kind: "consumable",
        value: 65,
        stack: 5,
        icon: "potion",
    },
    dawnSword: {
        name: "Fio da Aurora",
        description: "+7 de dano em cada golpe.",
        kind: "weapon",
        value: 7,
        stack: 1,
        icon: "sword",
    },
    barkArmor: {
        name: "Couraça de cerne",
        description: "Reduz 4 de dano recebido.",
        kind: "armor",
        value: 4,
        stack: 1,
        icon: "shield",
    },
    forestBlade: {
        name: "Lâmina da trilha",
        description: "+3 de dano em cada golpe.",
        kind: "weapon",
        value: 3,
        stack: 1,
        icon: "sword",
    },
};
export const ENEMY_TYPES = {
    brumino: {
        name: "Brumino",
        hp: 64,
        damage: 9,
        xp: 28,
        coins: 6,
        speed: 3.0,
        aggro: 6.5,
        range: 1.8,
        interval: 1500,
    },
    cerne: {
        name: "Cerne errante",
        hp: 108,
        damage: 14,
        xp: 46,
        coins: 10,
        speed: 2.3,
        aggro: 6,
        range: 2.1,
        interval: 2000,
    },
};
export const ENEMY_SPAWNS = [
    { id: "brumino-1", kind: "brumino", x: -9, z: -6 },
    { id: "brumino-2", kind: "brumino", x: 9, z: -10 },
    { id: "brumino-3", kind: "brumino", x: -20, z: -19 },
    { id: "brumino-4", kind: "brumino", x: 18, z: -24 },
    { id: "cerne-1", kind: "cerne", x: -10, z: -27 },
    { id: "cerne-2", kind: "cerne", x: 8, z: -32 },
    { id: "cerne-3", kind: "cerne", x: 25, z: -12 },
];
export const HOUSES = [
    { x: -13, z: 23, w: 7, d: 6, color: 0xd7c5a4, roof: 0x537d79 },
    { x: 12, z: 23, w: 7, d: 6, color: 0xe6cfac, roof: 0xb86548 },
    { x: 13, z: 11, w: 7, d: 6, color: 0xd6b994, roof: 0x4f7775 },
    { x: -15, z: 2, w: 8, d: 6, color: 0xe2c9ac, roof: 0xb86548 },
    { x: 27, z: 21, w: 6, d: 6, color: 0xd8c3a0, roof: 0x4e6670 },
];
export function seeded(seed) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let n = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        n ^= n + Math.imul(n ^ (n >>> 7), 61 | n);
        return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
    };
}
const rng = seeded(8347);
export const TREES = Array.from({ length: 112 }, (_, i) => {
    let x = 0, z = 0;
    do {
        x = -43 + rng() * 86;
        z = -45 + rng() * 81;
    } while (Math.abs(x) < 5.6 ||
        (z > -1 && z < 32 && Math.abs(x) < 30) ||
        ENEMY_SPAWNS.some((e) => Math.hypot(e.x - x, e.z - z) < 4));
    return { x, z, scale: 0.8 + rng() * 0.65, type: i % 3 };
});
export const OBSTACLES = [
    ...HOUSES,
    ...TREES.map((t) => ({ x: t.x, z: t.z, r: 0.32 * t.scale })),
    { x: -25, z: 14, r: 2 },
    { x: SHRINE.x, z: SHRINE.z, r: 1.4 },
    { x: NPC.x, z: NPC.z, r: 0.45 },
    { x: 31, z: -31, r: 2 },
    { x: -31, z: -28, r: 1.7 },
];
//# sourceMappingURL=config.js.map