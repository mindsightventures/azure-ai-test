# Azure AI Foundry OpenAI Access Tests

Three test scripts to verify Azure AI Foundry OpenAI access using the Responses API.

| Folder | SDK | Language |
|---|---|---|
| `python/` | [openai](https://pypi.org/project/openai/) | Python |
| `typescript-openai/` | [openai](https://www.npmjs.com/package/openai) | TypeScript |
| `typescript-ai-sdk/` | [@ai-sdk/azure](https://www.npmjs.com/package/@ai-sdk/azure) + [ai](https://www.npmjs.com/package/ai) | TypeScript |

## Prerequisites

- Python 3.11+ and [Poetry](https://python-poetry.org/)
- Node.js 20+ and [pnpm](https://pnpm.io/)

## Configuration

Copy the example env file and fill in your Azure AI Foundry credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `AZURE_OPENAI_ENDPOINT` | Full OpenAI-compatible endpoint URL (e.g. `https://<resource>.openai.azure.com/openai/v1/`) |
| `AZURE_OPENAI_API_KEY` | API key from Azure AI Foundry |
| `AZURE_DEPLOYMENT_NAME` | Deployed model name (e.g. `gpt-4o`, `gpt-5.2-chat`) |
| `AZURE_RESOURCE_NAME` | Azure resource name (used by Vercel AI SDK to construct the endpoint) |
| `AZURE_API_VERSION` | API version (e.g. `2025-04-01-preview`) |

## Running the tests

### Python

```bash
cd python
poetry install
poetry run python test_azure.py
```

Uses the standard `OpenAI` client with `base_url` pointed at the Azure endpoint and `client.responses.create()` to make a single request.

### TypeScript — OpenAI SDK

```bash
cd typescript-openai
pnpm install
pnpm tsx test-azure.ts
```

Uses the `openai` npm package with `client.responses.stream()` to stream the response token by token.

### TypeScript — Vercel AI SDK

```bash
cd typescript-ai-sdk
pnpm install
pnpm tsx test-azure.ts
```

Uses `@ai-sdk/azure` with `createAzure({ resourceName, apiKey })` and demonstrates both `generateText()` (full response) and `streamText()` (streaming).
