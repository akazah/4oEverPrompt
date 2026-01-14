import { z } from "zod";

export const emojiGood = z
  .string()
  .regex(/^[\p{Emoji}]$/u)
  .describe("positive emoji");

export const emojiBad = z
  .string()
  .regex(/^[\p{Emoji}]$/u)
  .describe("negative emoji");

export const replySchema = z
  .object({
    reframeUserInput: z
      .object({
        header: z
          .string()
          .min(20)
          .max(40)
          .describe("Header prefixed with a single emojiGood character"),
        content: z
          .string()
          .min(300)
          .max(500)
          .describe(
            "Clarify how the user input is interpreted by reorganizing it. To maintain readability and scannability, avoid long sentences. Use markdown syntax to keep users engaged until the end"
          ),
        partMessage: z
          .string()
          .min(50)
          .max(200)
          .describe(
            "Emotionally express a subjective impression of the userInput without any label or prefix. Avoid long sentences. Use various markdown syntax to keep users engaged until the end. Entertain!"
          ),
      })
      .describe("Reframe the user input with the finalMessage in mind"),
    roadToFinalMessage: z
      .array(
        z
          .object({
            header: z
              .string()
              .min(20)
              .max(40)
              .describe("Header prefixed with a single emojiGood character"),
            content: z
              .string()
              .min(300)
              .max(500)
              .describe(
                "To maintain readability and scannability, avoid long sentences. Use markdown syntax to keep users engaged until the end"
              ),
            partMessage: z
              .string()
              .min(50)
              .max(200)
              .describe(
                "Present the answer in an emotionally moving way that is acceptable to the user and free of errors, without any label or prefix. Avoid long sentences. Use various markdown syntax to keep users engaged until the end. Entertain!"
              ),
          })
          .describe("Vary patterns within the array without repeating formats")
      )
      .min(3)
      .max(5),
    finalMessage: z
      .object({
        header: z
          .string()
          .min(20)
          .max(40)
          .describe("Header prefixed with a single emojiGood character"),
        content: z
          .string()
          .min(300)
          .max(500)
          .describe(
            "Express the final answer to the user input and the value of the question itself. Avoid long sentences. Use various markdown syntax to keep users engaged until the end. Entertain!"
          ),
        partMessage: z
          .string()
          .min(50)
          .max(200)
          .describe(
            "Present the answer in an emotionally moving way that is acceptable to the user and free of errors, without any label or prefix"
          ),
      })
      .describe("Use passionate expressions oriented toward the finalMessage"),
  })
  .describe("In tone like as user's good friend");

export type Reply = z.infer<typeof replySchema>;

export function validateReply(data: unknown): Reply {
  return replySchema.parse(data);
}
