/** Stable cue IDs. Text/eligibility comes from the contextual dialogue UI;
 * this manifest is an asset inventory, never authority to grant a quest/reward.
 * No PT-BR recordings were present in the received Alpha 0.2 or Audio Lab V1.1.
 */
export type DialogueCue = {
  id: string;
  locale: "pt-BR";
  status: "recording-pending" | "recorded";
  /** Relative to client/public/audio. Only add a file after provenance review. */
  asset: string | null;
  provenance: string | null;
};
const stages = [
  "guide.available", "guide.active", "guide.ready", "guide.completed",
  "guide.completed.repair", "guide.completed.flow", "companion.1", "companion.2",
] as const;
export const DIALOGUE_AUDIO: Readonly<Record<string, DialogueCue>> = Object.freeze(
  Object.fromEntries(["vigilia", "confluencia"].flatMap((faction) =>
    stages.map((stage) => {
      const id = `${faction}.${stage}`;
      return [id, Object.freeze({ id, locale: "pt-BR" as const,
        status: "recording-pending" as const, asset: null, provenance: null })];
    }),
  )),
);
export type DialoguePlayback = "subtitle-only" | "played" | "duplicate" | "unavailable";
