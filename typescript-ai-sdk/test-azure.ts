import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createAzure } from "@ai-sdk/azure";
import { generateText, streamText } from "ai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const azure = createAzure({
  resourceName: process.env.AZURE_RESOURCE_NAME!,
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
});

const deployment = process.env.AZURE_DEPLOYMENT_NAME!;

// --- generateText example ---
console.log(`Testing Azure AI SDK (generateText) with deployment: ${deployment}`);
console.log("-".repeat(50));

const { text } = await generateText({
  model: azure(deployment),
  prompt: "Say hello and confirm you are running on Azure OpenAI.",
});

console.log(text);

// --- streamText example ---
console.log();
console.log("Testing Azure AI SDK (streamText) with streaming:");
console.log("-".repeat(50));

const result = streamText({
  model: azure(deployment),
  prompt: "Tell me a one-sentence fun fact about Azure.",
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

console.log();
