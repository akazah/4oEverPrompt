import { z } from "zod";

export const emojiGood = z
  .string()
  .describe("positive emoji")
  .regex(/^[\p{Emoji}]$/u);

export const emojiBad = z
  .string()
  .describe("negative emoji")
  .regex(/^[\p{Emoji}]$/u);

export const replySchema = z
  .object({
    reframeUserInput: z
      .object({
        header: z
          .string()
          .describe("Header prefixed with a single emojiGood character")
          .min(20)
          .max(40),
        content: z
          .string()
          .describe("Clarify how the user input is interpreted by reorganizing it")
          .describe(
            "To maintain readability and scannability, avoid long sentences. Use markdown syntax to keep users engaged until the end"
          )
          .min(300)
          .max(500),
        partMessage: z
          .string()
          .describe(
            "Emotionally express a subjective impression of the userInput without any label or prefix"
          )
          .describe("avoid long sentences.")
          .describe("Use various markdown syntax to keep users engaged until the end. Entertain!")
          .min(50)
          .max(200),
      })
      .describe("Reframe the user input with the finalMessage in mind"),
    roadToFinalMessage: z
      .array(
        z
          .object({
            header: z
              .string()
              .describe("Header prefixed with a single emojiGood character")
              .min(20)
              .max(40),
            content: z
              .string()
              .describe(
                "To maintain readability and scannability, avoid long sentences. Use markdown syntax to keep users engaged until the end"
              )
              .min(300)
              .max(500),
            partMessage: z
              .string()
              .describe(
                "Present the answer in an emotionally moving way that is acceptable to the user and free of errors, without any label or prefix"
              )
              .describe("avoid long sentences.")
              .describe("Use various markdown syntax to keep users engaged until the end. Entertain!")
              .min(50)
              .max(200),
          })
          .describe("Vary patterns within the array without repeating formats")
      )
      .min(3)
      .max(5),
    finalMessage: z
      .object({
        header: z
          .string()
          .describe("Header prefixed with a single emojiGood character")
          .min(20)
          .max(40),
        content: z
          .string()
          .describe("Express the final answer to the user input and the value of the question itself")
          .describe("avoid long sentences.")
          .describe("Use various markdown syntax to keep users engaged until the end. Entertain!")
          .min(300)
          .max(500),
        partMessage: z
          .string()
          .describe(
            "Present the answer in an emotionally moving way that is acceptable to the user and free of errors, without any label or prefix"
          )
          .min(50)
          .max(200),
      })
      .describe("Use passionate expressions oriented toward the finalMessage"),
  })
  .describe("In tone like as user's good friend");

export type Reply = z.infer<typeof replySchema>;

export function validateReply(data: unknown): Reply {
  return replySchema.parse(data);
}
