# Zod AI Prompt Samples

A collection of sample prompts that demonstrate techniques for using **Zod TypeScript schemas** as structured prompts for AI language models.

[日本語](./README_ja.md)

## Concept

Zod schemas can be used as powerful, type-safe prompts for AI. By providing a schema definition to an LLM, you can:

- **Structure AI outputs** with predictable formats
- **Validate responses** against defined constraints
- **Guide AI behavior** through schema descriptions and refinements
- **Control output length** with min/max constraints
- **Enforce patterns** with regex and custom validations

This approach bridges the gap between free-form AI generation and type-safe application development.

## Using with Structured Outputs

For production use, we recommend using **Structured Output** features provided by AI providers. This ensures responses strictly conform to your Zod schema:

| Provider | Feature | Conversion |
|----------|---------|------------|
| **OpenAI** | [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) | `zodResponseFormat()` from `openai/helpers/zod` |
| **Anthropic** | [Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) | `zodToJsonSchema()` from `zod-to-json-schema` |
| **Google** | [responseSchema](https://ai.google.dev/gemini-api/docs/json-mode) | `zodToJsonSchema()` |
| **Vercel AI SDK** | [generateObject()](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data) | Native Zod support |

### Example: OpenAI Structured Outputs

```ts
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { replySchema } from "./samples/4oEverPrompt/schema";

const client = new OpenAI();
const response = await client.beta.chat.completions.parse({
  model: "gpt-4o",
  messages: [{ role: "user", content: userMessage }],
  response_format: zodResponseFormat(replySchema, "reply"),
});

const reply = response.choices[0].message.parsed; // Typed as Reply
```

### Example: Vercel AI SDK

```ts
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { replySchema } from "./samples/4oEverPrompt/schema";

const { object } = await generateObject({
  model: openai("gpt-4o"),
  schema: replySchema,
  prompt: userMessage,
});
```

## Installation

```sh
npm install
```

## Samples

### [4oEverPrompt](./samples/4oEverPrompt/)

A prompt technique designed to reproduce GPT-4o-like friendly, engaging responses using newer models like GPT-5. The schema defines a structured reply format with:

- Emoji-prefixed headers
- Reframed user input section
- Progressive content sections leading to a final message
- Emotional, entertaining writing style with markdown formatting

**Inspired by #Keep4o movement.**

## Dependencies

- **Zod**: ^4.0.2

## Contributing

Feel free to contribute new samples! Each sample should demonstrate a unique technique for using Zod schemas as AI prompts.

## License

MIT
