from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from mangum import Mangum
from crewai import Crew
from src.chatbot.tasks import create_recommendation_task
from src.chatbot.agents import scholar_agent, support_agent
from src.verification.production_ocr import ocr_processor
from src.utils.logger import setup_logger
import os
import shutil

# Setup production logger
logger = setup_logger("SchemeSense-API")

app = FastAPI(title="SchemeSense API")
handler = Mangum(app)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, allow all. In production, restrict to specific domains.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    logger.info("Starting up SchemeSense API (Production Mode)...")

class ChatRequest(BaseModel):
    query: str

@app.post("/scrape")
async def trigger_scrape():
    logger.info("Manual scrape triggered via API.")
    try:
        from src.scraper.collector import run_expanded_scrape
        run_expanded_scrape()
        logger.info("Scraping completed successfully.")
        return {"message": "Scraping of 50+ sites completed. Run /process to embed."}
    except Exception as e:
        logger.error(f"Scraping failed: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Scraping process failed internally.")

@app.post("/process")
async def process_data():
    logger.info("Data processing/embedding triggered via API.")
    try:
        from src.rag.processor import process_and_store_chunks
        process_and_store_chunks()
        logger.info("Data processing completed successfully.")
        return {"message": "Data chunked and embedded into SQLite successfully."}
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Embedding process failed internally.")

@app.post("/chat")
async def chat(request: ChatRequest):
    if not request.query:
        logger.warning("Chat request received with empty query.")
        raise HTTPException(status_code=400, detail="Query is required")
    
    logger.info(f"Chat request received: {request.query[:50]}...")
    try:
        # Run CrewAI (Scholar Agent now handles its own retrieval via tool)
        tasks = create_recommendation_task(request.query)
        crew = Crew(
            agents=[scholar_agent, support_agent],
            tasks=tasks,
            verbose=False # Keep CrewAI quiet in logs
        )
        
        result = crew.kickoff()
        logger.info("Chat response generated successfully.")
        return {"response": str(result.raw)}
    except Exception as e:
        logger.error(f"Chat failed: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="AI generation failed.")

@app.post("/verify")
async def verify(file: UploadFile = File(...)):
    logger.info(f"Production verification request received for file: {file.filename}")
    # Save temporary file
    file_path = f"temp_{file.filename}"
    # Mock user_id for now - in production this comes from JWT/Auth header
    user_id = "test_user_production"
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # 1. Process using Production OCR (S3 -> Textract -> DynamoDB)
        result = ocr_processor.process_and_verify(file_path, user_id)
        
        # 2. Cleanup
        if os.path.exists(file_path):
            os.remove(file_path)
        
        return {
            "submission_id": result['submission_id'],
            "extracted_data": result['extracted_data'],
            "message": "Document processed and stored securely in AWS."
        }
    except Exception as e:
        logger.error(f"Verification failed for {file.filename}: {str(e)}", exc_info=True)
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting local dev server on port 5000...")
    uvicorn.run(app, host="0.0.0.0", port=5000)
