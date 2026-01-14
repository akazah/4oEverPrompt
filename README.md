# Zod AI Prompt Samples

A collection of sample prompts that demonstrate techniques for using **Zod TypeScript schemas** as structured prompts for AI language models.

## Concept

Zod schemas can be used as powerful, type-safe prompts for AI. By providing a schema definition to an LLM, you can:

- **Structure AI outputs** with predictable formats
- **Validate responses** against defined constraints
- **Guide AI behavior** through schema descriptions and refinements
- **Control output length** with min/max constraints
- **Enforce patterns** with regex and custom validations

This approach bridges the gap between free-form AI generation and type-safe application development.

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
