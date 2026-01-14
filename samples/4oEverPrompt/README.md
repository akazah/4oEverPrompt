# 4oEverPrompt

**Challenge**: Reproduce GPT-4o-like responses using GPT-5 (or newer models).

*Inspired by #Keep4o*

[日本語](./README_ja.md)

## Overview

This sample demonstrates how to use a Zod schema to define the structure and style of AI responses, creating engaging, emotionally-driven content similar to GPT-4o's conversational style.

## Usage

### Option 1: System Prompt (Simple)

Copy the contents of [prompt.md](./prompt.md) into your AI system prompt or custom instructions.

### Option 2: Structured Outputs (Recommended for Production)

Use [schema.ts](./schema.ts) with your AI provider's Structured Output feature for guaranteed schema compliance:

```ts
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { replySchema } from "./schema";

const client = new OpenAI();
const response = await client.beta.chat.completions.parse({
  model: "gpt-4o",
  messages: [{ role: "user", content: userMessage }],
  response_format: zodResponseFormat(replySchema, "reply"),
});

const reply = response.choices[0].message.parsed;
```

See [schema.ts](./schema.ts) for more provider examples (Anthropic, Vercel AI SDK, etc.).

## Schema Features

The `replySchema` defines a structured response with:

### 1. Reframe User Input
- Clarifies how the AI interprets the user's question
- Uses emoji-prefixed headers (20-40 characters)
- Content section (300-500 characters) with emotional part message

### 2. Road to Final Message
- Array of 3-5 progressive content sections
- Each section builds toward the final answer
- Varied formatting patterns to maintain engagement

### 3. Final Message
- Expresses the conclusive answer
- Highlights the value of the user's question
- Emotionally moving presentation

## Key Techniques

| Technique | Zod Feature | Purpose |
|-----------|-------------|---------|
| Length control | `.min()` / `.max()` | Ensures appropriate content length |
| Pattern validation | `.regex()` | Enforces emoji prefix format |
| Custom validation | `.refine()` | Complex header format checking |
| Semantic hints | `.describe()` | Guides AI behavior and style |
| Array constraints | `.min(3).max(5)` | Controls number of sections |

## Files

| File | Description |
|------|-------------|
| [schema.ts](./schema.ts) | TypeScript schema for Structured Outputs |
| [prompt.md](./prompt.md) | Full prompt with Zod schema (for system prompt use) |
| [prompt_ja.md](./prompt_ja.md) | Japanese version |

## Example Output Structure

```
## 🌟 [Reframed Header]

[Content clarifying user's question...]

**[Emotional part message]**

## 💡 [Progressive Section 1]
...

## 🚀 [Progressive Section 2]
...

## 🎯 [Final Message Header]

[Conclusive answer with emotional touch...]

**[Final inspiring message]**
```
