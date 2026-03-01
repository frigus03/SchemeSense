from crewai.tools import tool
from src.rag.bedrock_processor import get_titan_embedding
from src.db.dynamo_manager import db_manager
import numpy as np

@tool
def scheme_retrieval_tool(query: str):
    """
    Search for official government scheme information based on a user query.
    Uses Amazon Bedrock Titan Embeddings and DynamoDB for production retrieval.
    """
    try:
        # 1. Get embedding for the query using Titan v2
        query_emb = get_titan_embedding(query)
        if not query_emb:
            return "Error: Could not generate embedding for the query."
        
        # 2. Get all chunks from DynamoDB (Temporary Scan for MVP/Small dataset)
        # Note: In Phase 4.3, we will shift this to a Vector DB or OpenSearch
        chunks = db_manager.scan_embeddings()
        
        if not chunks:
            return "No relevant scheme information found in the database. Please ensure data is migrated to DynamoDB."
        
        # 3. Perform manual similarity search
            results = []
            q_vec = np.array(query_emb, dtype=np.float32)
            
            for chunk in chunks:
                # Embedding is stored as a list/json in DynamoDB
                emb_vec = np.array(chunk['embedding'], dtype=np.float32)
                
                # Cosine Similarity
                dot_product = np.dot(q_vec, emb_vec)
                norm_q = np.linalg.norm(q_vec)
                norm_e = np.linalg.norm(emb_vec)
                
                if norm_q == 0 or norm_e == 0:
                    similarity = 0.0
                else:
                    similarity = dot_product / (norm_q * norm_e)
                
                results.append({
                    "text": chunk['chunk_text'],
                    "url": chunk['scheme_url'],
                    "score": float(similarity)
                })
            
            # Sort by score descending
            results.sort(key=lambda x: x['score'], reverse=True)
            results = results[:5]
        
        # 4. Format results
        formatted_results = []
        for res in results:
            # Handle both list and dict formats from SQLite/Dynamo search functions
            text = res.get('text') or res[0]
            url = res.get('url') or res[2]
            formatted_results.append(f"Source: {url}\nContent: {text}\n---")
            
        return "\n".join(formatted_results)
    except Exception as e:
        return f"Error during retrieval: {str(e)}"
