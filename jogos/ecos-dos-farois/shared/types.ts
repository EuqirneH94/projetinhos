import type { CompanionSave, ExtendedMessage, PublicCompanion, TamingProgress } from "./extended.js";
import type { ClassId, FactionId, RaceId } from "./identity.js";
import type { AccountMessage, AccountReply } from "./identity.js";
export type EnemyKind = "brumino" | "cerne";
export type SkillId = "attack" | "cleave" | "nova" | "guard" | "focus";
export type ItemId =
  | "trainingSword"
  | "tunic"
  | "potion"
  | "dawnSword"
  | "barkArmor"
  | "forestBlade"
  | "trainingStaff"
  | "trainingBow"
  | "trainingFocus"
  | "dawnStaff"
  | "dawnBow"
  | "dawnFocus"
  | "plateArmor"
  | "clothArmor"
  | "leatherArmor";
export type InventorySlot = { item: ItemId; quantity: number };
export type Quest = {
  state: "available" | "active" | "ready" | "completed";
  brumino: number;
  cerne: number;
};
export type PlayerSave = {
  /** Additive per-character fields; absent in legacy saves. No SQLite schema migration. */
  materials?: { seivaClara: number };
  crafting?: { serial: number };
  companion?: CompanionSave;
  factionId?: FactionId;
  raceId?: RaceId;
  classId?: ClassId;
  appearance?: number;
  story?: {
    fragments: string[];
    boss: boolean;
    restored: boolean;
    choice?: "repair" | "flow";
  };
  id: string;
  nickname: string;
  x: number;
  z: number;
  angle: number;
  hp: number;
  energy: number;
  xp: number;
  level: number;
  coins: number;
  inventory: InventorySlot[];
  weapon: ItemId;
  armor: ItemId;
  quest: Quest;
  dead: boolean;
  respawnAt: number;
  potionAt: number;
  cooldowns: Record<"attack" | "cleave" | "nova", number> &
    Partial<Record<"guard" | "focus", number>>;
};
export type PublicPlayer = {
  factionId?: FactionId;
  raceId?: RaceId;
  classId?: ClassId;
  appearance?: number;
  barrier?: boolean;
  casting?: { skill: SkillId; endsAt: number };
  id: string;
  nickname: string;
  x: number;
  z: number;
  angle: number;
  hp: number;
  maxHp: number;
  energy: number;
  level: number;
  dead: boolean;
  weapon: ItemId;
  moving: boolean;
};
export type Self = PlayerSave & {
  taming?: TamingProgress;
  barrier?: boolean;
  casting?: { skill: SkillId; endsAt: number };
  maxHp: number;
  maxEnergy: number;
  ack: number;
};
export type EnemyState = "patrol" | "chase" | "attack" | "return" | "dead";
export type PublicEnemy = {
  factionId?: FactionId;
  elite?: boolean;
  id: string;
  kind: EnemyKind;
  x: number;
  z: number;
  angle: number;
  hp: number;
  maxHp: number;
  state: EnemyState;
};
export type Loot = {
  factionId?: FactionId;
  id: string;
  x: number;
  z: number;
  ownerId: string;
  coins: number;
  item: ItemId;
  expiresAt: number;
};
export type GameEvent = {
  factionId?: FactionId;
  skill?: SkillId;
  classId?: ClassId;
  targetX?: number;
  targetZ?: number;
  kind:
    | "hit"
    | "heal"
    | "death"
    | "level"
    | "nova"
    | "slash"
    | "loot"
    | "questAccept"
    | "questComplete"
    | "respawn"
    | "barrier"
    | "projectile"
    | "attune"
    | "restore";
  x: number;
  z: number;
  amount?: number;
  targetId?: string;
  sourceId?: string;
};
export type Snapshot = {
  type: "state";
  time: number;
  tick: number;
  players: PublicPlayer[];
  enemies: PublicEnemy[];
  loot: Loot[];
  companions?: PublicCompanion[];
  you: Self;
  events: GameEvent[];
};
export type ClientMessage = AccountMessage | LegacyClientMessage;
export type LegacyClientMessage =
  | ExtendedMessage
  | {
      type: "join";
      nickname: string;
      factionId?: FactionId;
      raceId?: RaceId;
      classId?: ClassId;
      appearance?: number;
    }
  | { type: "resume"; token: string }
  | { type: "move"; seq: number; x: number; z: number }
  | { type: "skill"; skill: SkillId; target?: string }
  | { type: "quest"; action: "accept" | "complete" }
  | { type: "loot"; id: string }
  | { type: "item"; action: "use" | "equip" | "discard"; slot: number }
  | {
      type: "world";
      action: "attune" | "restore";
      id?: string;
      choice?: "repair" | "flow";
    }
  | { type: "respawn" }
  | { type: "ping"; at: number };
export type ServerMessage =
  | AccountReply
  | Snapshot
  | { type: "welcome"; id: string; token: string; nickname: string }
  | { type: "notice"; text: string; kind: "info" | "error" | "success" }
  | { type: "pong"; at: number };
