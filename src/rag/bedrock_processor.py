import boto3
import json
import time
import os
from botocore.exceptions import ClientError
from config import AWS_REGION, BEDROCK_MODEL_ID, TITAN_EMBEDDING_MODEL_ID
from src.utils.logger import setup_logger

logger = setup_logger("Bedrock-Service")

def get_bedrock_client():
    return boto3.client(
        service_name='bedrock-runtime',
        region_name=AWS_REGION
    )

def get_titan_embedding(text: str):
    """
    Generate 1024-dimension embedding using Amazon Titan Text Embeddings v2.
    """
    client = get_bedrock_client()
    
    body = json.dumps({
        "inputText": text,
        "dimensions": 1024,
        "normalize": True
    })
    
    for attempt in range(5): # Exponential backoff for Bedrock throttles
        try:
            response = client.invoke_model(
                body=body,
                modelId=TITAN_EMBEDDING_MODEL_ID,
                accept='application/json',
                contentType='application/json'
            )
            response_body = json.loads(response.get('body').read())
            return response_body.get('embedding')
            
        except ClientError as e:
            if e.response['Error']['Code'] == 'ThrottlingException':
                wait_time = 2 ** attempt
                logger.warning(f"Bedrock Throttling. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            else:
                logger.error(f"Bedrock Embedding error: {e}")
                raise e
    return None

def ask_claude(prompt: str, max_tokens: int = 1000):
    """
    Send prompt to Anthropic Claude 3 Sonnet via Bedrock.
    """
    client = get_bedrock_client()
    
    # Claude 3 message format
    body = json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": max_tokens,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ],
        "temperature": 0.5,
        "top_p": 0.9
    })
    
    for attempt in range(5):
        try:
            response = client.invoke_model(
                body=body,
                modelId=BEDROCK_MODEL_ID,
                accept='application/json',
                contentType='application/json'
            )
            response_body = json.loads(response.get('body').read())
            # Extract content from Claude 3 response
            return response_body['content'][0]['text']
            
        except ClientError as e:
            if e.response['Error']['Code'] == 'ThrottlingException':
                wait_time = 2 ** attempt
                logger.warning(f"Bedrock Throttling. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            else:
                logger.error(f"Bedrock LLM error: {e}")
                raise e
    return None

if __name__ == "__main__":
    # Quick test
    test_text = "What is SchemeSense?"
    print(f"Testing Titan Embedding for: '{test_text}'")
    emb = get_titan_embedding(test_text)
    if emb:
        print(f"Generated embedding of length {len(emb)}")
        
    print("\nTesting Claude 3 Sonnet...")
    ans = ask_claude("Say hello in one word.")
    print(f"Claude says: {ans}")
