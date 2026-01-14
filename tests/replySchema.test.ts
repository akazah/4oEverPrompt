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

describe("replySchema descriptions", () => {
  // Helper to get nested schema shape in Zod 4
  const getShape = (schema: any) => schema.def?.shape ?? schema.shape;

  it("reframeUserInput.content has combined description", () => {
    const shape = getShape(replySchema);
    const reframeShape = getShape(shape.reframeUserInput);
    const description = reframeShape.content.description;

    assert.ok(description !== undefined, "Description should be defined");
    // Verify all parts of the description are present (should be combined, not overwritten)
    assert.ok(
      description.includes("Clarify how the user input is interpreted"),
      "Should include clarification instruction"
    );
    assert.ok(
      description.includes("avoid long sentences"),
      "Should include readability instruction"
    );
    assert.ok(
      description.includes("markdown syntax"),
      "Should include markdown instruction"
    );
  });

  it("reframeUserInput.partMessage has combined description", () => {
    const shape = getShape(replySchema);
    const reframeShape = getShape(shape.reframeUserInput);
    const description = reframeShape.partMessage.description;

    assert.ok(description !== undefined, "Description should be defined");
    assert.ok(
      description.includes("Emotionally express"),
      "Should include emotional expression instruction"
    );
    assert.ok(
      description.toLowerCase().includes("avoid long sentences"),
      "Should include brevity instruction"
    );
    assert.ok(
      description.includes("markdown syntax"),
      "Should include markdown instruction"
    );
  });

  it("roadToFinalMessage.partMessage has combined description", () => {
    const shape = getShape(replySchema);
    const arrayElement = shape.roadToFinalMessage.element;
    const elementShape = getShape(arrayElement);
    const description = elementShape.partMessage.description;

    assert.ok(description !== undefined, "Description should be defined");
    assert.ok(
      description.includes("emotionally moving way"),
      "Should include emotional instruction"
    );
    assert.ok(
      description.toLowerCase().includes("avoid long sentences"),
      "Should include brevity instruction"
    );
    assert.ok(
      description.includes("markdown syntax"),
      "Should include markdown instruction"
    );
  });

  it("finalMessage.content has combined description", () => {
    const shape = getShape(replySchema);
    const finalShape = getShape(shape.finalMessage);
    const description = finalShape.content.description;

    assert.ok(description !== undefined, "Description should be defined");
    assert.ok(
      description.includes("Express the final answer"),
      "Should include final answer instruction"
    );
    assert.ok(
      description.toLowerCase().includes("avoid long sentences"),
      "Should include brevity instruction"
    );
    assert.ok(
      description.includes("markdown syntax"),
      "Should include markdown instruction"
    );
  });
});
