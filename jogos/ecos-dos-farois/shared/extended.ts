/** Alpha 0.3 laboratory content. Names, recipe and tuning are experimental, not final canon. */
export const CRAFT_STATION = { x: 2, z: 14, name: "Bancada de Alquimia", range: 3.2 } as const;
export const RECIPE = { id: "tonico-caminho", name: "Tônico do caminho", materialCost: 2, coinCost: 3, output: "potion" } as const;
export const MATERIAL = { id: "seivaClara", name: "Seiva clara", cap: 99 } as const;
export const TAMING = { minHp: 0.2, maxHp: 0.4, range: 8, duration: 8000, speciesId: "brumino-comum" } as const;
export type CompanionMode = "follow" | "stay" | "passive";
export type CompanionSave = {
  id: string;
  speciesId: "brumino-comum";
  name: string;
  active: boolean;
  mode: CompanionMode;
};
export type PublicCompanion = {
  id: string;
  ownerId: string;
  name: string;
  x: number;
  z: number;
  angle: number;
  mode: CompanionMode;
  state: "following" | "staying" | "attacking";
};
export type TamingProgress = { target: string; startedAt: number; endsAt: number };
export type ExtendedMessage =
  | { type: "craft"; recipeId: "tonico-caminho"; operation: number }
  | { type: "companion"; action: "capture" | "attack"; target: string }
  | { type: "companion"; action: "follow" | "stay" | "passive" | "recall" | "activate" };
