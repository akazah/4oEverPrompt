import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { replySchema } from "../src/replySchema";

const makeText = (length: number): string => "a".repeat(length);
const makeHeader = (): string => `😀${makeText(18)}`;

const baseMessage = {
  header: makeHeader(),
  content: makeText(300),
  partMessage: makeText(50),
};

describe("replySchema", () => {
  it("accepts a valid reply payload", () => {
    const result = replySchema.safeParse({
      reframeUserInput: baseMessage,
      roadToFinalMessage: [baseMessage, baseMessage, baseMessage],
      finalMessage: baseMessage,
    });

    assert.equal(result.success, true);
  });

  it("rejects content that is too short", () => {
    const result = replySchema.safeParse({
      reframeUserInput: { ...baseMessage, content: makeText(10) },
      roadToFinalMessage: [baseMessage, baseMessage, baseMessage],
      finalMessage: baseMessage,
    });

    assert.equal(result.success, false);
  });
});
