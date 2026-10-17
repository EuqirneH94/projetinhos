import { CRAFT_STATION, RECIPE, MATERIAL, TAMING } from "../../shared/extended.js";
import { FACTION_NPCS, BOSS_ID, CLASS_KITS, FRAGMENTS, REWARD_WEAPON, STARTER_ARMOR, STARTER_WEAPON, factionOf, } from "../../shared/alpha.js";
import { randomUUID } from "node:crypto";
import { ENEMY_SPAWNS, ENEMY_TYPES, INVENTORY_SIZE, ITEMS, NPC, QUEST, SKILLS, SHRINE, SPAWN, WORLD, XP_LEVELS, } from "../../shared/config.js";
import { blocked, distance, move } from "../../shared/movement.js";
export class Game {
    now;
    /** Durable commit of a complete character before extended transactions publish effects. */
    commitPlayer;
    companions = new Map();
    captures = new Map();
    players = new Map();
    enemies = new Map();
    loot = new Map();
    events = [];
    notices = [];
    dirty = new Set();
    tick = 0;
    constructor(now = () => Date.now()) {
        this.now = now;
        ENEMY_SPAWNS.forEach((s, i) => this.enemies.set(s.id, {
            ...s,
            angle: 0,
            hp: ENEMY_TYPES[s.kind].hp,
            maxHp: ENEMY_TYPES[s.kind].hp,
            state: "patrol",
            home: { x: s.x, z: s.z },
            attackAt: 0,
            respawnAt: 0,
            cycle: 0,
            participants: new Map(),
            seed: i * 1.7,
        }));
        const base = [...this.enemies.values()];
        for (const e of base)
            this.enemies.set(`confluencia_${e.id}`, {
                ...e,
                id: `confluencia_${e.id}`,
                factionId: "confluencia",
                home: { ...e.home },
                participants: new Map(),
            });
        for (const factionId of ["vigilia", "confluencia"]) {
            const id = factionId === "vigilia" ? BOSS_ID : `confluencia_${BOSS_ID}`;
            this.enemies.set(id, {
                id,
                kind: "cerne",
                x: 0,
                z: -40,
                home: { x: 0, z: -40 },
                angle: 0,
                hp: 290,
                maxHp: 290,
                state: "patrol",
                attackAt: 0,
                respawnAt: 0,
                cycle: 0,
                participants: new Map(),
                seed: 23,
                elite: true,
                factionId,
            });
        }
    }
    create(nickname, identity) {
        const p = {
            id: randomUUID(),
            nickname,
            ...SPAWN,
            angle: 0,
            hp: 120,
            energy: 100,
            xp: 0,
            level: 1,
            coins: 0,
            inventory: [{ item: "potion", quantity: 3 }],
            weapon: "trainingSword",
            armor: "tunic",
            quest: { state: "available", brumino: 0, cerne: 0 },
            dead: false,
            respawnAt: 0,
            potionAt: 0,
            cooldowns: { attack: 0, cleave: 0, nova: 0 },
        };
        if (identity) {
            Object.assign(p, identity);
            p.angle = Math.PI;
            p.weapon = STARTER_WEAPON[identity.classId];
            p.armor = STARTER_ARMOR[identity.classId];
            p.story = { fragments: [], boss: false, restored: false };
        }
        return p;
    }
    connect(saved) {
        this.cancelCapture(saved.id);
        const p = {
            ...structuredClone(saved),
            input: { x: 0, z: 0, at: 0, seq: -1 },
            lastCombat: this.now(),
        };
        if (p.x < WORLD.minX + WORLD.radius ||
            p.x > WORLD.maxX - WORLD.radius ||
            p.z < WORLD.minZ + WORLD.radius ||
            p.z > WORLD.maxZ - WORLD.radius ||
            blocked(p.x, p.z)) {
            p.x = SPAWN.x;
            p.z = SPAWN.z;
        }
        this.placeNear(p);
        this.players.set(p.id, p);
        this.companions.delete(p.id);
        if (p.classId === "errante" && p.companion?.active && !p.dead)
            this.spawnCompanion(p);
        return p;
    }
    placeNear(p) {
        const occupied = (x, z) => [...this.players.values()].some((a) => a.id !== p.id &&
            factionOf(a) === factionOf(p) &&
            !a.dead &&
            Math.hypot(a.x - x, a.z - z) < 1.12);
        if (!occupied(p.x, p.z))
            return;
        for (let ring = 1; ring <= 4; ring++)
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2, x = p.x + Math.cos(angle) * ring * 1.4, z = p.z + Math.sin(angle) * ring * 1.4;
                if (x > WORLD.minX + 0.6 &&
                    x < WORLD.maxX - 0.6 &&
                    z > WORLD.minZ + 0.6 &&
                    z < WORLD.maxZ - 0.6 &&
                    !blocked(x, z) &&
                    !occupied(x, z)) {
                    p.x = x;
                    p.z = z;
                    return;
                }
            }
    }
    save(p) {
        const { input: _i, lastCombat: _c, casting: _cast, barrierUntil: _barrier, globalUntil: _global, ...saved } = p;
        return structuredClone(saved);
    }
    hp(p) {
        return 120 + (p.level - 1) * 24;
    }
    emit(e) {
        const entity = (e.sourceId
            ? (this.players.get(e.sourceId) ?? this.enemies.get(e.sourceId))
            : undefined) ??
            (e.targetId
                ? (this.players.get(e.targetId) ?? this.enemies.get(e.targetId))
                : undefined);
        this.events.push({
            ...e,
            factionId: entity ? factionOf(entity) : (e.factionId ?? "vigilia"),
        });
    }
    spec(p, skill) {
        return p.classId
            ? CLASS_KITS[p.classId][skill]
            : {
                ...SKILLS[skill],
                area: skill === "nova",
                heal: skill === "focus" ? 48 : undefined,
                shield: skill === "guard" ? 6000 : undefined,
            };
    }
    notice(p, text, kind = "info") {
        this.notices.push({ id: p.id, text, kind });
    }
    action(p, msg) {
        if (msg.type === "move") {
            if (msg.x || msg.z)
                this.cancelCapture(p.id, "O movimento interrompeu a domesticação.");
            if ((msg.x || msg.z) && p.casting) {
                p.casting = undefined;
                this.notice(p, "Conjuração interrompida pelo movimento.");
            }
            if (msg.seq > p.input.seq)
                p.input = { x: msg.x, z: msg.z, at: this.now(), seq: msg.seq };
            return;
        }
        if (msg.type === "respawn") {
            if (!p.dead || this.now() < p.respawnAt) {
                this.notice(p, "Aguarde a luz do farol para retornar.", "error");
                return;
            }
            p.dead = false;
            p.casting = undefined;
            p.x = SPAWN.x;
            p.z = SPAWN.z;
            p.hp = this.hp(p);
            p.energy = 100;
            p.input.x = p.input.z = 0;
            this.placeNear(p);
            this.emit({ kind: "respawn", x: p.x, z: p.z, targetId: p.id });
            this.dirty.add(p.id);
            this.notice(p, "O Farol da região acolhe você novamente.", "success");
            return;
        }
        if (p.dead) {
            this.notice(p, "Retorne ao farol antes de agir.", "error");
            return;
        }
        if (msg.type === "skill") {
            this.cancelCapture(p.id, "A ação de combate interrompeu a domesticação.");
            this.skill(p, msg.skill, msg.target);
        }
        else if (msg.type === "quest")
            this.quest(p, msg.action);
        else if (msg.type === "loot")
            this.collect(p, msg.id);
        else if (msg.type === "item")
            this.item(p, msg.action, msg.slot);
        else if (msg.type === "world")
            this.world(p, msg);
        else if (msg.type === "craft")
            this.craft(p, msg);
        else if (msg.type === "companion")
            this.companionAction(p, msg);
    }
    step(dt = 0.05) {
        this.tick++;
        dt = Math.max(0, Math.min(0.05, dt));
        const now = this.now();
        for (const p of this.players.values())
            if (!p.dead) {
                if (now - p.input.at < 250) {
                    move(p, p.input.x, p.input.z, dt, WORLD.speed);
                    if (Math.hypot(p.input.x, p.input.z) > 0)
                        p.angle = Math.atan2(p.input.x, p.input.z);
                }
                if (p.casting && now >= p.casting.endsAt) {
                    const cast = p.casting;
                    p.casting = undefined;
                    this.skill(p, cast.skill, cast.target, true);
                }
                p.energy = Math.min(100, p.energy + 12 * dt);
                if (distance(p, SHRINE) < 7 && now - p.lastCombat > 4000)
                    p.hp = Math.min(this.hp(p), p.hp + 18 * dt);
            }
        this.captureStep(now);
        for (const e of this.enemies.values())
            this.enemyStep(e, dt, now);
        this.companionStep(dt, now);
        for (const [id, l] of this.loot)
            if (now > l.expiresAt)
                this.loot.delete(id);
    }
    skill(p, skill, target, resolved = false) {
        const s = this.spec(p, skill), now = this.now();
        if (p.classId && skill !== "attack" && (p.globalUntil ?? 0) > now) {
            this.notice(p, "Aguarde a recuperação da ação anterior.", "error");
            return;
        }
        if (p.casting) {
            this.notice(p, "Conclua a conjuração atual ou mova-se para interromper.", "error");
            return;
        }
        if ((p.cooldowns[skill] ?? 0) > now) {
            this.notice(p, "A habilidade ainda está recarregando.", "error");
            return;
        }
        if (p.energy < s.cost) {
            this.notice(p, "Energia insuficiente.", "error");
            return;
        }
        const targets = [];
        if (s.damage > 0) {
            if (s.area) {
                for (const e of this.enemies.values())
                    if (factionOf(e) === factionOf(p) &&
                        e.state !== "dead" &&
                        e.state !== "return" &&
                        !this.captures.has(e.id) &&
                        distance(p, e) <= s.range)
                        targets.push(e);
            }
            else {
                const e = target ? this.enemies.get(target) : undefined;
                if (!e || e.state === "dead" || factionOf(e) !== factionOf(p)) {
                    this.notice(p, "Selecione uma criatura viva. Use Tab ou clique no alvo.", "error");
                    return;
                }
                if (this.captures.has(e.id)) {
                    this.notice(p, "Essa fera está em domesticação. Aguarde a conclusão.", "error");
                    return;
                }
                if (e.state === "return") {
                    this.notice(p, "Esse inimigo está retornando à origem.", "error");
                    return;
                }
                if (distance(p, e) > s.range) {
                    this.notice(p, "O alvo está fora do alcance. Chegue mais perto.", "error");
                    return;
                }
                targets.push(e);
                p.angle = Math.atan2(e.x - p.x, e.z - p.z);
            }
            if (!targets.length) {
                this.notice(p, "Nenhum inimigo ao alcance da área.", "error");
                return;
            }
        }
        let recipient = p;
        if (s.heal && p.classId === "ressonante" && target) {
            const ally = this.players.get(target);
            if (ally) {
                if (ally.dead ||
                    factionOf(ally) !== factionOf(p) ||
                    distance(p, ally) > s.range) {
                    this.notice(p, "O aliado está fora do alcance da cura.", "error");
                    return;
                }
                recipient = ally;
            }
        }
        if (s.heal && recipient.hp >= this.hp(recipient)) {
            this.notice(p, "A vida já está completa.");
            return;
        }
        if (s.cast && !resolved) {
            p.casting = { skill, target, endsAt: now + s.cast };
            p.input.x = p.input.z = 0;
            return;
        }
        if (p.classId && skill !== "attack")
            p.globalUntil = now + 650;
        p.energy -= s.cost;
        p.cooldowns[skill] = now + s.cooldown;
        p.lastCombat = now;
        this.dirty.add(p.id);
        if (s.shield) {
            p.barrierUntil = now + s.shield;
            this.emit({
                kind: "barrier",
                x: p.x,
                z: p.z,
                sourceId: p.id,
                targetId: p.id,
                skill,
                classId: p.classId,
            });
        }
        if (s.heal) {
            const amount = Math.min(s.heal + (p.level - 1) * 7, this.hp(recipient) - recipient.hp);
            recipient.hp += amount;
            this.dirty.add(recipient.id);
            this.emit({
                kind: "heal",
                x: recipient.x,
                z: recipient.z,
                sourceId: p.id,
                targetId: recipient.id,
                amount,
                skill,
                classId: p.classId,
            });
        }
        if (s.damage <= 0)
            return;
        const first = targets[0];
        this.emit({
            kind: s.area ? "nova" : s.range > 6 ? "projectile" : "slash",
            x: p.x,
            z: p.z,
            sourceId: p.id,
            targetId: first?.id,
            targetX: first?.x,
            targetZ: first?.z,
            skill,
            classId: p.classId,
        });
        const damage = s.damage + (p.level - 1) * 4 + ITEMS[p.weapon].value;
        for (const e of targets) {
            const actual = Math.min(damage, e.hp);
            e.hp -= actual;
            e.participants.set(p.id, (e.participants.get(p.id) ?? 0) + actual);
            if (!e.target || !this.players.has(e.target)) {
                e.target = p.id;
                e.attackAt = now + 650;
            }
            e.state = "chase";
            this.emit({
                kind: "hit",
                x: e.x,
                z: e.z,
                amount: actual,
                targetId: e.id,
                sourceId: p.id,
                classId: p.classId,
            });
            if (e.hp <= 0)
                this.kill(e);
        }
    }
    visible(a, b) {
        const n = Math.max(1, Math.ceil(distance(a, b) / 0.25));
        for (let i = 1; i < n; i++)
            if (blocked(a.x + (b.x - a.x) * i / n, a.z + (b.z - a.z) * i / n, 0.1))
                return false;
        return true;
    }
    applyExtended(p, candidate) {
        const saved = this.save(candidate);
        this.commitPlayer?.(saved);
        Object.assign(p, saved);
        this.dirty.add(p.id);
    }
    craft(p, msg) {
        if (p.quest.state !== "completed") {
            this.notice(p, "Conclua a missão dos caminhos para usar a bancada de Alquimia.", "error");
            return;
        }
        if (distance(p, CRAFT_STATION) > CRAFT_STATION.range || !this.visible(p, CRAFT_STATION)) {
            this.notice(p, "Aproxime-se da bancada de Alquimia na aldeia.", "error");
            return;
        }
        const serial = p.crafting?.serial ?? 0;
        if (msg.operation <= serial) {
            this.notice(p, "Essa operação de fabricação já foi processada.");
            return;
        }
        if (msg.recipeId !== RECIPE.id || msg.operation !== serial + 1) {
            this.notice(p, "Receita ou sequência de fabricação inválida. Aguarde a confirmação.", "error");
            return;
        }
        if ((p.materials?.seivaClara ?? 0) < RECIPE.materialCost || p.coins < RECIPE.coinCost) {
            this.notice(p, "São necessárias 2 seivas claras e 3 moedas para preparar o tônico.", "error");
            return;
        }
        const candidate = { ...p, ...this.save(p) };
        if (!this.addItem(candidate, RECIPE.output)) {
            this.notice(p, "Mochila cheia. Os materiais e as moedas foram preservados.", "error");
            return;
        }
        candidate.materials = { seivaClara: candidate.materials.seivaClara - RECIPE.materialCost };
        candidate.coins -= RECIPE.coinCost;
        candidate.crafting = { serial: msg.operation };
        this.applyExtended(p, candidate);
        this.emit({ kind: "loot", x: p.x, z: p.z, targetId: p.id });
        this.notice(p, "Tônico preparado. Receita experimental de Alquimia.", "success");
    }
    captureOf(ownerId) {
        const c = [...this.captures.values()].find((c) => c.ownerId === ownerId);
        return c ? { target: c.target, startedAt: c.startedAt, endsAt: c.endsAt } : undefined;
    }
    cancelCapture(ownerId, reason) {
        for (const [id, c] of this.captures)
            if (c.ownerId === ownerId) {
                this.captures.delete(id);
                const p = this.players.get(ownerId);
                if (p && reason)
                    this.notice(p, reason, "error");
            }
    }
    /** Called before removing a connection; reservations and actors cannot survive their owner. */
    disconnect(id) {
        this.cancelCapture(id);
        this.companions.delete(id);
    }
    spawnCompanion(p) {
        if (!p.companion?.active || p.classId !== "errante" || p.dead)
            return;
        // One actor map entry per owner. Reconnect/activate replaces rather than appends.
        this.companions.set(p.id, {
            id: p.companion.id, ownerId: p.id, name: p.companion.name,
            x: p.x, z: p.z, angle: p.angle, mode: p.companion.mode,
            state: p.companion.mode === "stay" ? "staying" : "following", attackAt: 0,
        });
    }
    companionAction(p, msg) {
        if (p.classId !== "errante") {
            this.notice(p, "A domesticação e os comandos de fera pertencem ao Errante.", "error");
            return;
        }
        if (msg.action === "capture") {
            if (p.quest.state !== "completed") {
                this.notice(p, "Conclua primeiro a missão dos caminhos para iniciar a domesticação.", "error");
                return;
            }
            if (p.companion) {
                this.notice(p, "Este recorte permite um vínculo por Errante. Seu companheiro foi preservado.", "error");
                return;
            }
            if (this.captureOf(p.id)) {
                this.notice(p, "Uma domesticação já está em andamento.", "error");
                return;
            }
            const e = this.enemies.get(msg.target);
            if (!e || e.kind !== "brumino" || e.elite || factionOf(e) !== factionOf(p) || e.state === "dead" || e.state === "return") {
                this.notice(p, "Selecione um Brumino comum vivo do seu início. Outras espécies estão pendentes.", "error");
                return;
            }
            if (this.captures.has(e.id)) {
                this.notice(p, "Outro Errante está formando confiança com essa fera.", "error");
                return;
            }
            if (e.hp / e.maxHp < TAMING.minHp || e.hp / e.maxHp > TAMING.maxHp) {
                this.notice(p, "Enfraqueça a fera até 20–40% de vida e cesse os ataques.", "error");
                return;
            }
            if (distance(p, e) > TAMING.range || !this.visible(p, e)) {
                this.notice(p, "A domesticação exige até 8 m e um caminho visual livre.", "error");
                return;
            }
            const now = this.now();
            p.input.x = p.input.z = 0;
            p.casting = undefined;
            this.captures.set(e.id, {
                target: e.id, ownerId: p.id, startedAt: now, endsAt: now + TAMING.duration,
                x: p.x, z: p.z, hp: p.hp, combat: p.lastCombat, enemyHp: e.hp,
            });
            this.notice(p, "Confiança em formação: permaneça imóvel por 8 segundos, sem atacar.");
            return;
        }
        if (!p.companion) {
            this.notice(p, "Você ainda não possui um vínculo de fera.", "error");
            return;
        }
        if (msg.action === "attack") {
            const actor = this.companions.get(p.id), e = this.enemies.get(msg.target);
            if (!actor || !e || e.state === "dead" || e.state === "return" || factionOf(e) !== factionOf(p) || this.captures.has(e.id) || distance(p, e) > 12 || !this.visible(p, e)) {
                this.notice(p, "Comande um companheiro ativo contra um alvo vivo, visível e a até 12 m.", "error");
                return;
            }
            actor.target = e.id;
            actor.state = "attacking";
            return;
        }
        if ((msg.action === "recall" || msg.action === "activate") && this.now() - p.lastCombat < 4000) {
            this.notice(p, "Aguarde 4 segundos fora de combate para recolher ou ativar a fera.", "error");
            return;
        }
        const candidate = { ...p, ...this.save(p) };
        const companion = candidate.companion;
        if (msg.action === "recall")
            companion.active = false;
        else if (msg.action === "activate")
            companion.active = true;
        else {
            if (!companion.active) {
                this.notice(p, "Ative a fera antes de emitir comandos.", "error");
                return;
            }
            companion.mode = msg.action;
        }
        this.applyExtended(p, candidate);
        if (!companion.active)
            this.companions.delete(p.id);
        else {
            const actor = this.companions.get(p.id);
            if (!actor)
                this.spawnCompanion(p);
            else {
                actor.mode = companion.mode;
                actor.target = undefined;
                actor.state = companion.mode === "stay" ? "staying" : "following";
            }
        }
        this.notice(p, msg.action === "recall" ? "Fera recolhida; o vínculo foi preservado." : "Comando confirmado.", "success");
    }
    captureStep(now) {
        for (const [id, c] of this.captures) {
            const p = this.players.get(c.ownerId), e = this.enemies.get(id);
            if (!p || p.dead || p.classId !== "errante" || p.companion || !e || e.state === "dead" || e.hp !== c.enemyHp || p.hp < c.hp || p.lastCombat !== c.combat || distance(p, c) > 0.1 || distance(p, e) > TAMING.range || !this.visible(p, e)) {
                this.cancelCapture(c.ownerId, "A domesticação foi interrompida; nenhum vínculo foi consumido.");
                continue;
            }
            if (now < c.endsAt)
                continue;
            const candidate = { ...p, ...this.save(p) };
            candidate.companion = { id: randomUUID(), speciesId: TAMING.speciesId, name: "Brumino vinculado", active: true, mode: "follow" };
            try {
                this.applyExtended(p, candidate);
            }
            finally {
                this.captures.delete(id);
            }
            // The durable character is committed before resolving the wild actor; no kill/loot reward.
            e.state = "dead";
            e.hp = 0;
            e.target = undefined;
            e.respawnAt = now + 22000;
            e.participants.clear();
            this.spawnCompanion(p);
            this.notice(p, "Confiança estabelecida. Um companheiro ativo; captura não concede saque de abate.", "success");
        }
    }
    companionStep(dt, now) {
        for (const [ownerId, actor] of this.companions) {
            const p = this.players.get(ownerId);
            if (!p || !p.companion?.active) {
                this.companions.delete(ownerId);
                continue;
            }
            if (p.dead) {
                const candidate = { ...p, ...this.save(p) };
                candidate.companion.active = false;
                this.applyExtended(p, candidate);
                this.companions.delete(ownerId);
                continue;
            }
            let e = actor.target ? this.enemies.get(actor.target) : undefined;
            if (e && (e.state === "dead" || e.state === "return" || factionOf(e) !== factionOf(p) || this.captures.has(e.id) || distance(p, e) > 18)) {
                e = undefined;
                actor.target = undefined;
            }
            if (e) {
                actor.state = "attacking";
                const d = distance(actor, e);
                if (d > 1.8) {
                    actor.angle = Math.atan2(e.x - actor.x, e.z - actor.z);
                    move(actor, (e.x - actor.x) / d, (e.z - actor.z) / d, dt, 5.8, 0.3);
                }
                else if (now >= actor.attackAt && this.visible(actor, e)) {
                    actor.attackAt = now + 1200;
                    const actual = Math.min(e.hp, 8 + (p.level - 1) * 2);
                    e.hp -= actual;
                    e.participants.set(p.id, (e.participants.get(p.id) ?? 0) + actual);
                    if (!e.target) {
                        e.target = p.id;
                        e.attackAt = now + 650;
                    }
                    e.state = "chase";
                    p.lastCombat = now;
                    this.emit({ kind: "hit", x: e.x, z: e.z, targetId: e.id, sourceId: p.id, amount: actual });
                    if (e.hp <= 0)
                        this.kill(e);
                }
            }
            else if (actor.mode !== "stay") {
                actor.state = "following";
                const d = distance(actor, p);
                if (d > 1.5) {
                    actor.angle = Math.atan2(p.x - actor.x, p.z - actor.z);
                    move(actor, (p.x - actor.x) / d, (p.z - actor.z) / d, dt, 5.8, 0.3);
                }
            }
            else
                actor.state = "staying";
        }
    }
    world(p, msg) {
        if (p.quest.state !== "completed") {
            this.notice(p, "Conclua primeiro a proteção dos caminhos.", "error");
            return;
        }
        const story = (p.story ??= { fragments: [], boss: false, restored: false });
        if (msg.action === "attune") {
            const node = FRAGMENTS.find((n) => n.id === msg.id);
            if (!node ||
                distance(p, node) > 3.2 ||
                story.fragments.includes(node.id)) {
                this.notice(p, "Aproxime-se de uma ressonância ainda não sintonizada.", "error");
                return;
            }
            story.fragments.push(node.id);
            this.emit({ kind: "attune", x: node.x, z: node.z, targetId: p.id });
            this.notice(p, `Ressonância sintonizada: ${story.fragments.length}/3.`, "success");
        }
        else {
            if (distance(p, SHRINE) > 4.5 ||
                story.fragments.length < 3 ||
                !story.boss ||
                story.restored ||
                !["repair", "flow"].includes(msg.choice ?? "")) {
                this.notice(p, "Sintonize os três ecos, vença o Núcleo Fraturado e aproxime-se do Farol.", "error");
                return;
            }
            story.restored = true;
            story.choice = msg.choice;
            p.coins += 30;
            this.gainXp(p, 130);
            this.emit({ kind: "restore", x: SHRINE.x, z: SHRINE.z, targetId: p.id });
            this.notice(p, "O Farol recupera a harmonia. Sua escolha foi registrada. +30 moedas.", "success");
        }
        this.dirty.add(p.id);
    }
    kill(e) {
        if (e.state === "dead")
            return;
        e.hp = 0;
        e.state = "dead";
        e.target = undefined;
        e.respawnAt = this.now() + 22000;
        e.cycle++;
        const eligible = [...e.participants.entries()]
            .map(([id, damage]) => ({ p: this.players.get(id), damage }))
            .filter((v) => !!v.p && !v.p.dead && distance(v.p, e) <= 18)
            .sort((a, b) => b.damage - a.damage || a.p.id.localeCompare(b.p.id));
        for (const { p } of eligible) {
            this.rewardKill(p, e);
            if (e.elite) {
                p.story ??= { fragments: [], boss: false, restored: false };
                p.story.boss = true;
                this.notice(p, "O Núcleo Fraturado foi desfeito. Reúna os três ecos e retorne ao Farol.", "success");
                this.dirty.add(p.id);
            }
        }
        if (eligible[0]) {
            const l = {
                factionId: factionOf(e),
                id: randomUUID(),
                x: e.x,
                z: e.z,
                ownerId: eligible[0].p.id,
                coins: ENEMY_TYPES[e.kind].coins,
                item: e.kind === "cerne" && e.cycle % 2 === 1
                    ? "barkArmor"
                    : e.kind === "brumino" && e.cycle % 4 === 0
                        ? "forestBlade"
                        : "potion",
                expiresAt: this.now() + 60000,
            };
            this.loot.set(l.id, l);
            this.notice(eligible[0].p, "Uma recompensa caiu no chão. Aproxime-se e pressione F.");
        }
        e.participants.clear();
        this.emit({ kind: "death", x: e.x, z: e.z, targetId: e.id });
    }
    rewardKill(p, e) {
        const previousXp = p.xp;
        this.gainXp(p, ENEMY_TYPES[e.kind].xp);
        const materials = p.materials ??= { seivaClara: 0 };
        materials.seivaClara = Math.min(MATERIAL.cap, materials.seivaClara + (e.kind === "cerne" ? 2 : 1));
        if (p.quest.state === "active") {
            p.quest[e.kind] = Math.min(QUEST[e.kind], p.quest[e.kind] + 1);
            if (p.quest.brumino >= QUEST.brumino && p.quest.cerne >= QUEST.cerne) {
                p.quest.state = "ready";
                this.notice(p, `A trilha está segura. Volte para ${FACTION_NPCS[factionOf(p)].name} e receba a recompensa.`, "success");
            }
        }
        const gained = p.xp - previousXp;
        this.dirty.add(p.id);
        this.notice(p, `${gained ? "+" + gained + " XP · " : ""}${ENEMY_TYPES[e.kind].name} abatido.`, "success");
    }
    gainXp(p, amount) {
        p.xp = Math.min(XP_LEVELS[4], p.xp + amount);
        const before = p.level;
        p.level = XP_LEVELS.reduce((level, threshold, index) => (p.xp >= threshold ? index + 1 : level), 1);
        if (p.level > before) {
            p.hp = this.hp(p);
            p.energy = 100;
            this.emit({ kind: "level", x: p.x, z: p.z, targetId: p.id });
            this.notice(p, `Nível ${p.level}! Vida e energia restauradas.`, "success");
        }
        this.dirty.add(p.id);
    }
    addItem(p, item, quantity = 1) {
        const inventory = structuredClone(p.inventory), spec = ITEMS[item];
        let remaining = quantity;
        for (const slot of inventory)
            if (slot.item === item && slot.quantity < spec.stack) {
                const n = Math.min(spec.stack - slot.quantity, remaining);
                slot.quantity += n;
                remaining -= n;
            }
        while (remaining > 0) {
            if (inventory.length >= INVENTORY_SIZE)
                return false;
            const n = Math.min(spec.stack, remaining);
            inventory.push({ item, quantity: n });
            remaining -= n;
        }
        p.inventory = inventory;
        return true;
    }
    collect(p, id) {
        const l = this.loot.get(id);
        if (!l || l.expiresAt < this.now()) {
            this.notice(p, "Essa recompensa já foi coletada ou desapareceu.", "error");
            return;
        }
        if (l.ownerId !== p.id) {
            this.notice(p, "A recompensa pertence ao viajante que mais contribuiu com dano.", "error");
            return;
        }
        if (distance(p, l) > 3.2) {
            this.notice(p, "Aproxime-se da recompensa para coletar.", "error");
            return;
        }
        if (!this.addItem(p, l.item)) {
            this.notice(p, "Inventário cheio. Use um tônico ou descarte um item antes de coletar.", "error");
            return;
        }
        // Handler síncrono: o registro é removido antes de outro jogador poder processar a mesma coleta.
        this.loot.delete(id);
        p.coins += l.coins;
        this.dirty.add(p.id);
        this.emit({ kind: "loot", x: p.x, z: p.z, targetId: p.id });
        this.notice(p, `+${l.coins} moedas · ${ITEMS[l.item].name}`, "success");
    }
    item(p, action, index) {
        const slot = p.inventory[index];
        if (!slot) {
            this.notice(p, "Esse espaço do inventário está vazio.", "error");
            return;
        }
        const spec = ITEMS[slot.item];
        if (action === "equip" && p.classId) {
            const allowed = spec.kind === "weapon"
                ? p.classId === "sentinela"
                    ? ["trainingSword", "dawnSword", "forestBlade"]
                    : p.classId === "arcanista"
                        ? ["trainingStaff", "dawnStaff"]
                        : p.classId === "errante"
                            ? ["trainingBow", "dawnBow"]
                            : ["trainingFocus", "dawnFocus"]
                : p.classId === "sentinela"
                    ? ["plateArmor", "barkArmor", "tunic"]
                    : p.classId === "errante"
                        ? ["leatherArmor", "barkArmor", "tunic"]
                        : ["clothArmor", "tunic"];
            if (!allowed.includes(slot.item)) {
                this.notice(p, "Sua classe não pode equipar esse item.", "error");
                return;
            }
        }
        if (action === "discard") {
            if (--slot.quantity <= 0)
                p.inventory.splice(index, 1);
            this.dirty.add(p.id);
            this.notice(p, "Uma unidade do item foi descartada.");
            return;
        }
        if (action === "equip") {
            if (spec.kind === "consumable") {
                this.notice(p, "Esse item deve ser usado.", "error");
                return;
            }
            const key = spec.kind === "weapon" ? "weapon" : "armor", previous = p[key];
            p[key] = slot.item;
            p.inventory[index] = { item: previous, quantity: 1 };
            this.dirty.add(p.id);
            this.notice(p, `${spec.name} equipado.`, "success");
            return;
        }
        if (spec.kind !== "consumable") {
            this.notice(p, "Esse equipamento precisa ser equipado.", "error");
            return;
        }
        if (this.now() < p.potionAt) {
            this.notice(p, "O tônico está recarregando.", "error");
            return;
        }
        if (p.hp >= this.hp(p)) {
            this.notice(p, "Sua vida já está completa.");
            return;
        }
        const amount = Math.min(spec.value, this.hp(p) - p.hp);
        p.hp += amount;
        p.potionAt = this.now() + 8000;
        if (--slot.quantity <= 0)
            p.inventory.splice(index, 1);
        this.dirty.add(p.id);
        this.emit({
            kind: "heal",
            x: p.x,
            z: p.z,
            amount: Math.round(amount),
            targetId: p.id,
        });
    }
    quest(p, action) {
        if (distance(p, NPC) > 3.2) {
            this.notice(p, `Converse com ${FACTION_NPCS[factionOf(p)].name} para tratar da missão.`, "error");
            return;
        }
        if (action === "accept") {
            if (p.quest.state !== "available") {
                this.notice(p, "Essa missão já foi aceita ou concluída.", "error");
                return;
            }
            p.quest.state = "active";
            this.dirty.add(p.id);
            this.notice(p, "Missão aceita. Siga a estrada ao norte até o bosque.", "success");
            this.emit({ kind: "questAccept", x: p.x, z: p.z, targetId: p.id });
        }
        else {
            if (p.quest.state !== "ready") {
                this.notice(p, "Conclua os objetivos da missão antes de receber a recompensa.", "error");
                return;
            }
            if (!this.addItem(p, p.classId ? REWARD_WEAPON[p.classId] : "dawnSword")) {
                this.notice(p, "Libere um espaço no inventário para receber o equipamento da sua classe.", "error");
                return;
            }
            const previousXp = p.xp;
            p.quest.state = "completed";
            p.coins += QUEST.coins;
            this.gainXp(p, QUEST.xp);
            this.dirty.add(p.id);
            this.emit({ kind: "questComplete", x: p.x, z: p.z, targetId: p.id });
            this.notice(p, `Missão concluída! +${p.xp - previousXp} XP · +${QUEST.coins} moedas. Abra a mochila para equipar sua recompensa.`, "success");
        }
    }
    enemyStep(e, dt, now) {
        const spec = ENEMY_TYPES[e.kind];
        if (this.captures.has(e.id))
            return;
        if (e.state === "dead") {
            if (now >= e.respawnAt) {
                e.x = e.home.x;
                e.z = e.home.z;
                e.hp = e.maxHp;
                e.state = "patrol";
                e.participants.clear();
            }
            else
                return;
        }
        let p = e.target ? this.players.get(e.target) : undefined;
        if (e.state !== "return" &&
            (!p ||
                p.dead ||
                factionOf(p) !== factionOf(e) ||
                p.z > 1 ||
                distance(p, e.home) > 15 ||
                distance(e, e.home) > 12)) {
            if (e.target) {
                e.state = "return";
                e.target = undefined;
                e.participants.clear();
                p = undefined;
            }
        }
        if (e.state === "return") {
            if (distance(e, e.home) < 0.45) {
                e.x = e.home.x;
                e.z = e.home.z;
                e.hp = e.maxHp;
                e.state = "patrol";
            }
            else
                this.walkEnemy(e, e.home, spec.speed * 1.3, dt);
            return;
        }
        if (!p || p.dead) {
            p = [...this.players.values()]
                .filter((a) => !a.dead &&
                factionOf(a) === factionOf(e) &&
                a.z <= 1 &&
                distance(a, e.home) <= 15 &&
                distance(a, e) < spec.aggro)
                .sort((a, b) => distance(a, e) - distance(b, e))[0];
            if (p) {
                e.target = p.id;
                e.attackAt = now + 650;
                e.state = "chase";
            }
        }
        if (p && !p.dead) {
            e.angle = Math.atan2(p.x - e.x, p.z - e.z);
            if (distance(e, p) > spec.range) {
                e.state = "chase";
                this.walkEnemy(e, p, spec.speed, dt);
            }
            else {
                e.state = "attack";
                if (now >= e.attackAt) {
                    e.attackAt = now + spec.interval;
                    const damage = Math.max(1, (e.elite ? spec.damage * 1.4 : spec.damage) - ITEMS[p.armor].value);
                    const reduced = (p.barrierUntil ?? 0) > now ? Math.ceil(damage * 0.35) : damage;
                    p.hp = Math.max(0, p.hp - reduced);
                    p.lastCombat = now;
                    this.dirty.add(p.id);
                    this.emit({
                        kind: "hit",
                        x: p.x,
                        z: p.z,
                        amount: reduced,
                        targetId: p.id,
                        sourceId: e.id,
                    });
                    if (p.hp <= 0) {
                        p.dead = true;
                        p.casting = undefined;
                        p.respawnAt = now + 3000;
                        p.input.x = p.input.z = 0;
                        this.emit({ kind: "death", x: p.x, z: p.z, targetId: p.id });
                        this.notice(p, "Sua jornada continua. A luz do farol permitirá seu retorno.");
                    }
                }
            }
        }
        else {
            e.state = "patrol";
            const dest = {
                x: e.home.x + Math.cos(now / 6200 + e.seed) * 2.2,
                z: e.home.z + Math.sin(now / 6200 + e.seed) * 2.2,
            };
            this.walkEnemy(e, dest, 0.9, dt);
        }
    }
    walkEnemy(e, target, speed, dt) {
        const d = distance(e, target);
        if (d < 0.08)
            return;
        const x = (target.x - e.x) / d, z = (target.z - e.z) / d, before = { x: e.x, z: e.z };
        const radius = e.kind === "cerne" ? 0.52 : 0.4;
        e.angle = Math.atan2(x, z);
        move(e, x, z, dt, Math.min(speed, d / Math.max(dt, 0.001)), radius);
        if (distance(before, e) < speed * dt * 0.15) {
            const side = Math.sin(e.seed + 1) >= 0 ? 1 : -1;
            move(e, -z * side, x * side, dt, speed, radius);
        }
    }
    snapshot(id, events = []) {
        const p = this.players.get(id);
        const you = {
            ...this.save(p),
            taming: this.captureOf(p.id),
            maxHp: this.hp(p),
            maxEnergy: 100,
            ack: p.input.seq,
            barrier: (p.barrierUntil ?? 0) > this.now(),
            casting: p.casting
                ? { skill: p.casting.skill, endsAt: p.casting.endsAt }
                : undefined,
        };
        return {
            type: "state",
            time: this.now(),
            tick: this.tick,
            you,
            events: events.filter((e) => factionOf(e) === factionOf(p)),
            players: [...this.players.values()]
                .filter((a) => factionOf(a) === factionOf(p))
                .map((a) => ({
                id: a.id,
                nickname: a.nickname,
                factionId: a.factionId,
                raceId: a.raceId,
                classId: a.classId,
                appearance: a.appearance,
                barrier: (a.barrierUntil ?? 0) > this.now(),
                casting: a.casting
                    ? { skill: a.casting.skill, endsAt: a.casting.endsAt }
                    : undefined,
                x: a.x,
                z: a.z,
                angle: a.angle,
                hp: a.hp,
                maxHp: this.hp(a),
                energy: a.energy,
                level: a.level,
                dead: a.dead,
                weapon: a.weapon,
                moving: !a.dead &&
                    this.now() - a.input.at < 250 &&
                    Math.hypot(a.input.x, a.input.z) > 0,
            })),
            enemies: [...this.enemies.values()]
                .filter((e) => factionOf(e) === factionOf(p))
                .map((e) => ({
                id: e.id,
                kind: e.kind,
                factionId: e.factionId,
                elite: e.elite,
                x: e.x,
                z: e.z,
                angle: e.angle,
                hp: e.hp,
                maxHp: e.maxHp,
                state: e.state,
            })),
            companions: [...this.companions.values()]
                .filter((c) => { const owner = this.players.get(c.ownerId); return owner && factionOf(owner) === factionOf(p); })
                .map(({ target: _target, attackAt: _at, ...c }) => ({ ...c })),
            loot: [...this.loot.values()].filter((l) => factionOf(l) === factionOf(p)),
        };
    }
}
//# sourceMappingURL=game.js.map