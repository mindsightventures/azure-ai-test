import os
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

api_key = os.environ["AZURE_OPENAI_API_KEY"]

client = OpenAI(
    base_url=os.environ["AZURE_OPENAI_ENDPOINT"],
    api_key=api_key,
    default_headers={"api-key": api_key},
)

deployment = os.environ["AZURE_DEPLOYMENT_NAME"]

print(f"Testing Azure OpenAI with deployment: {deployment}")
print("-" * 50)

response = client.responses.create(
    model=deployment,
    input="Say hello and confirm you are running on Azure OpenAI.",
)

print(response.output_text)
