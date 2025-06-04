from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import openai
import os
from datetime import datetime
import uvicorn
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="WorkflowIQ AI Services",
    description="AI-powered process discovery, optimization, and analytics",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# Pydantic Models
class ProcessDiscoveryRequest(BaseModel):
    document_text: Optional[str] = None
    document_url: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class ProcessOptimizationRequest(BaseModel):
    process_id: str
    current_metrics: Dict[str, Any]
    goals: List[str]
    constraints: List[str] = []

class AITaskResponse(BaseModel):
    task_id: str
    status: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "ai-services",
        "version": "1.0.0"
    }

# Process Discovery Endpoint
@app.post("/api/ai/discover-process", response_model=AITaskResponse)
async def discover_process(request: ProcessDiscoveryRequest, background_tasks: BackgroundTasks):
    """
    Analyze documents or text to discover business processes using AI
    """
    try:
        task_id = f"discover_{datetime.utcnow().timestamp()}"
        
        # Start background task for process discovery
        background_tasks.add_task(
            process_discovery_task,
            task_id,
            request.document_text,
            request.context
        )
        
        return AITaskResponse(
            task_id=task_id,
            status="processing"
        )
    
    except Exception as e:
        logger.error(f"Error in process discovery: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Process Optimization Endpoint
@app.post("/api/ai/optimize-process", response_model=AITaskResponse)
async def optimize_process(request: ProcessOptimizationRequest, background_tasks: BackgroundTasks):
    """
    Generate optimization suggestions for business processes using AI
    """
    try:
        task_id = f"optimize_{datetime.utcnow().timestamp()}"
        
        # Start background task for process optimization
        background_tasks.add_task(
            process_optimization_task,
            task_id,
            request.process_id,
            request.current_metrics,
            request.goals,
            request.constraints
        )
        
        return AITaskResponse(
            task_id=task_id,
            status="processing"
        )
    
    except Exception as e:
        logger.error(f"Error in process optimization: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Task status endpoint
@app.get("/api/ai/task/{task_id}", response_model=AITaskResponse)
async def get_task_status(task_id: str):
    """
    Get the status of an AI task
    """
    # In a real implementation, this would check a database or cache
    # For demo purposes, we'll return a mock response
    return AITaskResponse(
        task_id=task_id,
        status="completed",
        result={
            "insights": [
                "Process has 3 potential bottlenecks",
                "Average completion time can be reduced by 25%",
                "2 steps can be automated"
            ],
            "recommendations": [
                {
                    "title": "Automate approval step",
                    "description": "Replace manual approval with rule-based automation",
                    "impact": "high",
                    "effort": "medium"
                }
            ]
        }
    )

# Background task functions
async def process_discovery_task(task_id: str, document_text: Optional[str], context: Optional[Dict]):
    """
    Background task for process discovery using OpenAI
    """
    try:
        logger.info(f"Starting process discovery task {task_id}")
        
        if not document_text:
            return
        
        prompt = f"""
        Analyze the following business document and extract the business process steps:
        
        Document: {document_text}
        
        Please identify:
        1. Main process steps in chronological order
        2. Decision points and branches
        3. Roles and responsibilities
        4. Inputs and outputs for each step
        5. Potential bottlenecks or inefficiencies
        
        Format your response as a structured JSON with process steps, stakeholders, and insights.
        """
        
        # Call OpenAI API (mock implementation)
        # In real implementation, you would call openai.chat.completions.create()
        logger.info(f"Process discovery completed for task {task_id}")
        
    except Exception as e:
        logger.error(f"Error in process discovery task {task_id}: {str(e)}")

async def process_optimization_task(
    task_id: str, 
    process_id: str, 
    metrics: Dict[str, Any], 
    goals: List[str], 
    constraints: List[str]
):
    """
    Background task for process optimization using OpenAI
    """
    try:
        logger.info(f"Starting process optimization task {task_id}")
        
        prompt = f"""
        Analyze the following business process and suggest optimizations:
        
        Process ID: {process_id}
        Current Metrics: {metrics}
        Goals: {goals}
        Constraints: {constraints}
        
        Please provide:
        1. Specific optimization recommendations
        2. Expected impact on metrics
        3. Implementation difficulty
        4. Risk assessment
        5. Step-by-step implementation plan
        
        Format your response as structured JSON with prioritized recommendations.
        """
        
        # Call OpenAI API (mock implementation)
        logger.info(f"Process optimization completed for task {task_id}")
        
    except Exception as e:
        logger.error(f"Error in process optimization task {task_id}: {str(e)}")

# Document Analysis Endpoint
@app.post("/api/ai/analyze-document")
async def analyze_document(document_url: str):
    """
    Analyze uploaded documents for process information
    """
    try:
        # Mock implementation - in real app, this would download and analyze the document
        return {
            "document_type": "process_manual",
            "extracted_processes": [
                {
                    "name": "Customer Onboarding",
                    "steps": 8,
                    "estimated_time": "2-3 days",
                    "complexity": "medium"
                }
            ],
            "confidence": 0.85
        }
    
    except Exception as e:
        logger.error(f"Error in document analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Semantic Search Endpoint
@app.post("/api/ai/semantic-search")
async def semantic_search(query: str, resource_types: Optional[List[str]] = None):
    """
    Perform semantic search across workflows and processes
    """
    try:
        # Mock implementation - in real app, this would use vector embeddings
        return {
            "results": [
                {
                    "id": "workflow_123",
                    "type": "workflow",
                    "title": "Employee Onboarding Process",
                    "content": "Complete workflow for new employee setup...",
                    "score": 0.92,
                    "metadata": {
                        "department": "HR",
                        "last_updated": "2024-01-15"
                    }
                }
            ],
            "total_results": 1,
            "execution_time": 0.15
        }
    
    except Exception as e:
        logger.error(f"Error in semantic search: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    ) 