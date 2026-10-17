import { INVENTORY_SIZE } from "../../shared/config.js";
import {
  validFactionRace,
  validNickname,
  CLASS_IDS,
} from "../../shared/identity.js";
import type { ClientMessage } from "../../shared/types.js";
const exact = (o: Record<string, unknown>, keys: string[]) =>
  Object.keys(o).every((k) => keys.includes(k));
const finite = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v);
const id = (v: unknown): v is string =>
  typeof v === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(v);
export function parseMessage(raw: string): ClientMessage | null {
  if (Buffer.byteLength(raw, "utf8") > 512) return null;
  let o: Record<string, unknown>;
  try {
    o = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!o || Array.isArray(o) || typeof o !== "object") return null;
  switch (o.type) {
    case "account_login":
      return exact(o, ["type", "token"]) &&
        typeof o.token === "string" &&
        /^[A-Za-z0-9_-]{43}$/.test(o.token)
        ? (o as ClientMessage)
        : null;
    case "character_list":
    case "character_leave":
      return exact(o, ["type"]) ? (o as ClientMessage) : null;
    case "character_enter":
      return exact(o, ["type", "characterId"]) && id(o.characterId)
        ? (o as ClientMessage)
        : null;
    case "character_create":
      return exact(o, ["type", "nickname", "factionId", "raceId", "classId"]) &&
        validNickname(o.nickname) &&
        validFactionRace(o.factionId, o.raceId) &&
        (CLASS_IDS as readonly unknown[]).includes(o.classId)
        ? (o as ClientMessage)
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
            (CLASS_IDS as readonly unknown[]).includes(o.classId) &&
            Number.isInteger(o.appearance) &&
            (o.appearance as number) >= 0 &&
            (o.appearance as number) <= 2))
        ? (o as ClientMessage)
        : null;
    case "resume":
      return exact(o, ["type", "token"]) &&
        typeof o.token === "string" &&
        /^[A-Za-z0-9_-]{43}$/.test(o.token)
        ? (o as ClientMessage)
        : null;
    case "move":
      return exact(o, ["type", "seq", "x", "z"]) &&
        Number.isSafeInteger(o.seq) &&
        (o.seq as number) >= 0 &&
        finite(o.x) &&
        finite(o.z) &&
        Math.abs(o.x) <= 1 &&
        Math.abs(o.z) <= 1
        ? (o as ClientMessage)
        : null;
    case "skill":
      return exact(o, ["type", "skill", "target"]) &&
        ["attack", "cleave", "nova", "guard", "focus"].includes(
          o.skill as string,
        ) &&
        (o.target === undefined || id(o.target))
        ? (o as ClientMessage)
        : null;
    case "quest":
      return exact(o, ["type", "action"]) &&
        ["accept", "complete"].includes(o.action as string)
        ? (o as ClientMessage)
        : null;
    case "loot":
      return exact(o, ["type", "id"]) && id(o.id) ? (o as ClientMessage) : null;
    case "item":
      return exact(o, ["type", "action", "slot"]) &&
        ["use", "equip", "discard"].includes(o.action as string) &&
        Number.isInteger(o.slot) &&
        (o.slot as number) >= 0 &&
        (o.slot as number) < INVENTORY_SIZE
        ? (o as ClientMessage)
        : null;
    case "world":
      return exact(o, ["type", "action", "id", "choice"]) &&
        ((o.action === "attune" && id(o.id) && o.choice === undefined) ||
          (o.action === "restore" &&
            ["repair", "flow"].includes(o.choice as string) &&
            o.id === undefined))
        ? (o as ClientMessage)
        : null;
    case "craft":
      return exact(o, ["type", "recipeId", "operation"]) &&
        o.recipeId === "tonico-caminho" && Number.isSafeInteger(o.operation) &&
        (o.operation as number) > 0
        ? (o as ClientMessage) : null;
    case "companion":
      return ["capture", "attack"].includes(o.action as string)
        ? exact(o, ["type", "action", "target"]) && id(o.target) ? (o as ClientMessage) : null
        : exact(o, ["type", "action"]) && ["follow", "stay", "passive", "recall", "activate"].includes(o.action as string)
          ? (o as ClientMessage) : null;
    case "respawn":
      return exact(o, ["type"]) ? (o as ClientMessage) : null;
    case "ping":
      return exact(o, ["type", "at"]) && finite(o.at) && o.at > 0 && o.at < 1e15
        ? (o as ClientMessage)
        : null;
    default:
      return null;
  }
}
