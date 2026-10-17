import test from "node:test";
import assert from "node:assert/strict";
import { connectionTimedOut } from "../client/src/network.js";
test("pausa longa de renderização não fecha imediatamente um socket com mensagens pendentes", () => {
  const started = 100000;
  assert.equal(
    connectionTimedOut(started + 18000, started, started, false),
    false,
  );
  // Depois de dar uma volta ao event loop, o snapshot atrasado é processado.
  assert.equal(
    connectionTimedOut(
      started + 21000,
      started + 18050,
      started + 18000,
      false,
    ),
    false,
  );
});
test("servidor silencioso com event loop responsivo é detectado; aba oculta aguarda retomada", () => {
  assert.equal(connectionTimedOut(121000, 100000, 118000, false), true);
  assert.equal(connectionTimedOut(121000, 100000, 118000, true), false);
  assert.equal(connectionTimedOut(110000, 100000, 107000, false), false);
});
