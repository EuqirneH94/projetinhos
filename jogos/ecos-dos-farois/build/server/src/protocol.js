import { INVENTORY_SIZE } from "../../shared/config.js";
import { validFactionRace, validNickname, CLASS_IDS, } from "../../shared/identity.js";
const exact = (o, keys) => Object.keys(o).every((k) => keys.includes(k));
const finite = (v) => typeof v === "number" && Number.isFinite(v);
const id = (v) => typeof v === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(v);
export function parseMessage(raw) {
    if (Buffer.byteLength(raw, "utf8") > 512)
        return null;
    let o;
    try {
        o = JSON.parse(raw);
    }
    catch {
        return null;
    }
    if (!o || Array.isArray(o) || typeof o !== "object")
        return null;
    switch (o.type) {
        case "account_login":
            return exact(o, ["type", "token"]) &&
                typeof o.token === "string" &&
                /^[A-Za-z0-9_-]{43}$/.test(o.token)
                ? o
                : null;
        case "character_list":
        case "character_leave":
            return exact(o, ["type"]) ? o : null;
        case "character_enter":
            return exact(o, ["type", "characterId"]) && id(o.characterId)
                ? o
                : null;
        case "character_create":
            return exact(o, ["type", "nickname", "factionId", "raceId", "classId"]) &&
                validNickname(o.nickname) &&
                validFactionRace(o.factionId, o.raceId) &&
                CLASS_IDS.includes(o.classId)
                ? o
                : null;
        case "join":
            return exact(o, [
                "type",
                "nickname",
                "factionId",
                "raceId",
                "classId",
                "appearance",
            ]) &&
                typeof o.nickname === "string" &&
                /^[\p{L}\p{N} _-]{3,18}$/u.test(o.nickname) &&
                o.nickname.trim() === o.nickname &&
                o.nickname.trim().length >= 3 &&
                ((o.factionId === undefined &&
                    o.raceId === undefined &&
                    o.classId === undefined &&
                    o.appearance === undefined) ||
                    (validFactionRace(o.factionId, o.raceId) &&
                        CLASS_IDS.includes(o.classId) &&
                        Number.isInteger(o.appearance) &&
                        o.appearance >= 0 &&
                        o.appearance <= 2))
                ? o
                : null;
        case "resume":
            return exact(o, ["type", "token"]) &&
                typeof o.token === "string" &&
                /^[A-Za-z0-9_-]{43}$/.test(o.token)
                ? o
                : null;
        case "move":
            return exact(o, ["type", "seq", "x", "z"]) &&
                Number.isSafeInteger(o.seq) &&
                o.seq >= 0 &&
                finite(o.x) &&
                finite(o.z) &&
                Math.abs(o.x) <= 1 &&
                Math.abs(o.z) <= 1
                ? o
                : null;
        case "skill":
            return exact(o, ["type", "skill", "target"]) &&
                ["attack", "cleave", "nova", "guard", "focus"].includes(o.skill) &&
                (o.target === undefined || id(o.target))
                ? o
                : null;
        case "quest":
            return exact(o, ["type", "action"]) &&
                ["accept", "complete"].includes(o.action)
                ? o
                : null;
        case "loot":
            return exact(o, ["type", "id"]) && id(o.id) ? o : null;
        case "item":
            return exact(o, ["type", "action", "slot"]) &&
                ["use", "equip", "discard"].includes(o.action) &&
                Number.isInteger(o.slot) &&
                o.slot >= 0 &&
                o.slot < INVENTORY_SIZE
                ? o
                : null;
        case "world":
            return exact(o, ["type", "action", "id", "choice"]) &&
                ((o.action === "attune" && id(o.id) && o.choice === undefined) ||
                    (o.action === "restore" &&
                        ["repair", "flow"].includes(o.choice) &&
                        o.id === undefined))
                ? o
                : null;
        case "craft":
            return exact(o, ["type", "recipeId", "operation"]) &&
                o.recipeId === "tonico-caminho" && Number.isSafeInteger(o.operation) &&
                o.operation > 0
                ? o : null;
        case "companion":
            return ["capture", "attack"].includes(o.action)
                ? exact(o, ["type", "action", "target"]) && id(o.target) ? o : null
                : exact(o, ["type", "action"]) && ["follow", "stay", "passive", "recall", "activate"].includes(o.action)
                    ? o : null;
        case "respawn":
            return exact(o, ["type"]) ? o : null;
        case "ping":
            return exact(o, ["type", "at"]) && finite(o.at) && o.at > 0 && o.at < 1e15
                ? o
                : null;
        default:
            return null;
    }
}
//# sourceMappingURL=protocol.js.map