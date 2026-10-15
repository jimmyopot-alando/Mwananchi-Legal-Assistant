# ai-services/reasoning/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from nlp_pipeline import analyze_text
from compliance import check_compliance
from document_ai import draft_document

app = FastAPI(title="Legal Reasoning API", version="1.0")

# Request schema
class ReasoningRequest(BaseModel):
    text: str
    task: str  # "analysis", "compliance", "draft"

# Response schema
class ReasoningResponse(BaseModel):
    task: str
    result: dict

@app.post("/reason")
async def reason(request: ReasoningRequest):
    try:
        if request.task == "analysis":
            result = analyze_text(request.text)
        elif request.task == "compliance":
            result = check_compliance(request.text)
        elif request.task == "draft":
            result = draft_document(request.text)
        else:
            raise HTTPException(status_code=400, detail="Invalid task type")

        return ReasoningResponse(task=request.task, result=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reasoning error: {str(e)}")
