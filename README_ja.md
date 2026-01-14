# Zod AI プロンプトサンプル集

**Zod TypeScript スキーマ**をAI言語モデルへの構造化プロンプトとして使用するテクニックを示すサンプル集です。

[English](./README.md)

## コンセプト

Zodスキーマは、AIに対する強力で型安全なプロンプトとして活用できます。スキーマ定義をLLMに提供することで、以下のことが可能になります：

- **AI出力の構造化** - 予測可能なフォーマットで出力を得る
- **レスポンスの検証** - 定義された制約に対してバリデーション
- **AI動作のガイド** - スキーマの説明とrefineによる制御
- **出力長の制御** - min/max制約による長さ管理
- **パターンの強制** - 正規表現やカスタムバリデーション

このアプローチは、自由形式のAI生成と型安全なアプリケーション開発のギャップを埋めます。

## Structured Outputs との併用

本番環境では、AIプロバイダーが提供する**Structured Output**機能の使用を推奨します。これにより、レスポンスがZodスキーマに厳密に準拠することが保証されます：

| プロバイダー | 機能 | 変換方法 |
|-------------|------|----------|
| **OpenAI** | [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) | `openai/helpers/zod` の `zodResponseFormat()` |
| **Anthropic** | [Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) | `zod-to-json-schema` の `zodToJsonSchema()` |
| **Google** | [responseSchema](https://ai.google.dev/gemini-api/docs/json-mode) | `zodToJsonSchema()` |
| **Vercel AI SDK** | [generateObject()](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data) | Zodネイティブサポート |

### 例: OpenAI Structured Outputs

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

const reply = response.choices[0].message.parsed; // Reply型として取得
```

### 例: Vercel AI SDK

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

## インストール

```sh
npm install
```

## サンプル

### [4oEverPrompt](./samples/4oEverPrompt/)

GPT-5などの新しいモデルを使用して、GPT-4oのようなフレンドリーで魅力的なレスポンスを再現するためのプロンプト技術です。スキーマは以下の構造化された返答フォーマットを定義します：

- 絵文字プレフィックス付きヘッダー
- ユーザー入力のリフレーム（再解釈）セクション
- 最終メッセージに向けた段階的コンテンツセクション
- マークダウンフォーマットを使った感情的で楽しい文体

**#Keep4o ムーブメントにインスパイアされています。**

## 依存関係

- **Zod**: ^4.0.2

## コントリビューション

新しいサンプルの貢献を歓迎します！各サンプルは、ZodスキーマをAIプロンプトとして使用するユニークなテクニックを示すものであるべきです。

## ライセンス

MIT
