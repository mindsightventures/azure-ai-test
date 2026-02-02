import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.AZURE_OPENAI_API_KEY!;

const client = new OpenAI({
  baseURL: process.env.AZURE_OPENAI_ENDPOINT,
  apiKey,
  defaultHeaders: { "api-key": apiKey },
});

const deployment = process.env.AZURE_DEPLOYMENT_NAME!;

console.log(`Testing Azure OpenAI (streaming) with deployment: ${deployment}`);
console.log("-".repeat(50));

const stream = client.responses.stream({
  model: deployment,
  input: "Say hello and confirm you are running on Azure OpenAI.",
});

for await (const event of stream) {
  if (
    event.type === "response.output_text.delta" &&
    "delta" in event
  ) {
    process.stdout.write(event.delta as string);
  }
}

console.log();
