import { z } from "zod";

/**
 * 4oEverPrompt Schema
 * 
 * This schema can be used with AI provider's Structured Output features:
 * - OpenAI: response_format with json_schema
 * - Anthropic: tool_use
 * - Google: responseSchema
 * - Vercel AI SDK: generateObject()
 * 
 * Use zodResponseFormat() or zodToJsonSchema() to convert for API calls.
 */

// Emoji validation schemas
export const emojiGood = z
  .string()
  .describe("positive emoji")
  .regex(/^[\p{Emoji}]$/u);

export const emojiBad = z
  .string()
  .describe("negative emoji")
  .regex(/^[\p{Emoji}]$/u);

// Section schema (reusable)
const sectionSchema = z.object({
  header: z
    .string()
    .describe("Header prefixed with a single positive emoji character and a space. Example: '🌟 Your Amazing Question'")
    .min(20)
    .max(40),
  content: z
    .string()
    .describe("Main content. Keep sentences short for readability. Use markdown syntax (bullets, bold, etc.) to keep users engaged.")
    .min(300)
    .max(500),
  partMessage: z
    .string()
    .describe("Emotional expression without any label or prefix. Use various markdown syntax. Entertain!")
    .min(50)
    .max(200),
});

// Main reply schema
export const replySchema = z.object({
  reframeUserInput: sectionSchema
    .describe("Reframe the user input with the finalMessage in mind. Clarify how the user input is interpreted by reorganizing it."),
  
  roadToFinalMessage: z
    .array(sectionSchema)
    .describe("Progressive sections leading to the final answer. Vary patterns without repeating formats.")
    .min(3)
    .max(5),
  
  finalMessage: sectionSchema
    .describe("Express the final answer to the user input and the value of the question itself. Present in an emotionally moving way."),
}).describe("Reply in a passionate, friendly tone like a good friend. Use user's language.");

// Type inference
export type Reply = z.infer<typeof replySchema>;
export type Section = z.infer<typeof sectionSchema>;

// Validation function
export function validateReply(data: unknown): Reply {
  return replySchema.parse(data);
}

// ============================================
// Usage Examples with Different Providers
// ============================================

/**
 * OpenAI Structured Outputs Example
 * 
 * ```ts
 * import OpenAI from "openai";
 * import { zodResponseFormat } from "openai/helpers/zod";
 * import { replySchema } from "./schema";
 * 
 * const client = new OpenAI();
 * const response = await client.beta.chat.completions.parse({
 *   model: "gpt-4o-2024-08-06",
 *   messages: [{ role: "user", content: userMessage }],
 *   response_format: zodResponseFormat(replySchema, "reply"),
 * });
 * const reply = response.choices[0].message.parsed;
 * ```
 */

/**
 * Vercel AI SDK Example
 * 
 * ```ts
 * import { generateObject } from "ai";
 * import { openai } from "@ai-sdk/openai";
 * import { replySchema } from "./schema";
 * 
 * const { object } = await generateObject({
 *   model: openai("gpt-4o"),
 *   schema: replySchema,
 *   prompt: userMessage,
 * });
 * ```
 */

/**
 * Anthropic Tool Use Example
 * 
 * ```ts
 * import Anthropic from "@anthropic-ai/sdk";
 * import { zodToJsonSchema } from "zod-to-json-schema";
 * import { replySchema } from "./schema";
 * 
 * const client = new Anthropic();
 * const response = await client.messages.create({
 *   model: "claude-sonnet-4-20250514",
 *   max_tokens: 4096,
 *   tools: [{
 *     name: "generate_reply",
 *     description: "Generate a structured reply",
 *     input_schema: zodToJsonSchema(replySchema),
 *   }],
 *   tool_choice: { type: "tool", name: "generate_reply" },
 *   messages: [{ role: "user", content: userMessage }],
 * });
 * ```
 */
