import os
from pathlib import Path
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = PROJECT_ROOT / ".env"

# Load environment variables FIRST
load_dotenv(dotenv_path=ENV_PATH, override=False)

required_vars = [
    "CATALYST_PROJECT_ID", "CATALYST_AUTH_TOKEN",
    "QUICKML_ORG_ID", "QUICKML_AUTH_TOKEN",
    "POSTGRES_URL", "NEO4J_URI", "NEO4J_USER", "NEO4J_PASSWORD", "QDRANT_URL"
]

for var in required_vars:
    if not os.getenv(var):
        print(f"WARNING: Missing environment variable: {var}")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from pydantic_settings import BaseSettings

from agents.quickml_xai_engine import QuickMLExplainableAI, test_quickml_connection
from agents.langgraph_orchestrator import crime_graph
from langchain_core.messages import HumanMessage
from catalyst_wrapper import init_catalyst_client
from database import init_db
import json


class Settings(BaseSettings):
    catalyst_project_id: str = ""
    catalyst_auth_token: str = ""

    class Config:
        env_file = str(ENV_PATH)
        extra = "ignore"


settings = Settings()

CATALYST_PROJECT_ID = os.getenv("CATALYST_PROJECT_ID", "")
CATALYST_AUTH_TOKEN = os.getenv("CATALYST_AUTH_TOKEN", "")

trusted_origins = os.getenv("TRUSTED_ORIGINS", "*").split(",")
trusted_origins = [origin.strip() for origin in trusted_origins if origin.strip()]

app = FastAPI(title="Crime Analytics AI Platform - Zoho Catalyst Edition")

app.add_middleware(
    CORSMiddleware,
    allow_origins=trusted_origins if trusted_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create QuickML instance AFTER loading env vars
quickml_ai = QuickMLExplainableAI()


@app.on_event("startup")
def startup_event():
    try:
        init_db()
    except Exception as e:
        print(f"Database init warning: {e}")
    try:
        client = init_catalyst_client()
    except Exception as e:
        print(f"Catalyst init warning: {e}")


class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []


class ChatResponse(BaseModel):
    response: str
    evidence_trail: Optional[Dict[str, Any]] = None


@app.get("/health")
def health_check():
    return {
        "catalyst": True,
        "quickml": test_quickml_connection()
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        messages = [HumanMessage(content=msg["content"]) for msg in request.history if msg.get("role") == "user"]
        messages.append(HumanMessage(content=request.message))

        graph_result = crime_graph.invoke({"messages": messages, "next_step": "", "database_context": {}})

        result_messages = graph_result.get("messages", [])
        if not result_messages:
            return ChatResponse(
                response="Sorry, the analysis engine returned no result. Please try rephrasing your query.",
                evidence_trail=None
            )

        database_context = {"query": request.message, "graph_analysis": result_messages[-1].content}

        ai_response = quickml_ai.generate_explainable_response(user_query=request.message, database_context=database_context)
        return ChatResponse(response=ai_response, evidence_trail=database_context)

    except Exception as e:
        return ChatResponse(response=f"Sorry, something went wrong: {str(e)}", evidence_trail=None)


from database import SessionLocal
from models import CaseMaster, Accused, Victim, CaseStatusMaster, CrimeHead, Unit, Employee
from sqlalchemy import func


@app.get("/api/dashboard")
def dashboard_stats():
    db = SessionLocal()
    try:
        total_firs = db.query(func.count(CaseMaster.CaseMasterID)).scalar() or 0
        total_accused = db.query(func.count(Accused.AccusedMasterID)).scalar() or 0
        total_victims = db.query(func.count(Victim.VictimMasterID)).scalar() or 0
        return {
            "total_firs": total_firs,
            "total_accused": total_accused,
            "total_victims": total_victims,
        }
    except Exception as e:
        return {"error": str(e), "total_firs": 0, "total_accused": 0, "total_victims": 0}
    finally:
        db.close()


@app.get("/api/firs")
def get_firs(limit: int = 50, search: str = "", status: str = ""):
    db = SessionLocal()
    try:
        q = db.query(CaseMaster)
        if search:
            q = q.filter(
                CaseMaster.CrimeNo.ilike(f"%{search}%") |
                CaseMaster.BriefFacts.ilike(f"%{search}%")
            )
        cases = q.limit(limit).all()
        return [{"id": c.CaseMasterID, "crime_no": c.CrimeNo, "case_no": c.CaseNo,
                 "brief_facts": c.BriefFacts, "date": str(c.CrimeRegisteredDate),
                 "status_id": c.CaseStatusID, "category_id": c.CaseCategoryID} for c in cases]
    except Exception as e:
        return []
    finally:
        db.close()


@app.get("/api/firs/{case_id}")
def get_fir_detail(case_id: int):
    db = SessionLocal()
    try:
        c = db.query(CaseMaster).filter(CaseMaster.CaseMasterID == case_id).first()
        if not c:
            raise HTTPException(status_code=404, detail="Case not found")
        accused = [{"id": a.AccusedMasterID, "name": a.AccusedName, "age": a.AgeYear} for a in c.accused]
        victims = [{"id": v.VictimMasterID, "name": v.VictimName, "age": v.AgeYear} for v in c.victims]
        return {"id": c.CaseMasterID, "crime_no": c.CrimeNo, "case_no": c.CaseNo,
                "brief_facts": c.BriefFacts, "date": str(c.CrimeRegisteredDate),
                "accused": accused, "victims": victims}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


@app.get("/api/accused")
def get_accused(limit: int = 50, search: str = ""):
    db = SessionLocal()
    try:
        q = db.query(Accused)
        if search:
            q = q.filter(Accused.AccusedName.ilike(f"%{search}%"))
        rows = q.limit(limit).all()
        return [{"id": a.AccusedMasterID, "name": a.AccusedName, "age": a.AgeYear,
                 "case_id": a.CaseMasterID, "person_id": a.PersonID} for a in rows]
    except Exception:
        return []
    finally:
        db.close()


@app.get("/api/analytics")
def get_analytics():
    db = SessionLocal()
    try:
        by_status = db.query(CaseMaster.CaseStatusID, func.count(CaseMaster.CaseMasterID))\
            .group_by(CaseMaster.CaseStatusID).all()
        by_crime = db.query(CaseMaster.CrimeMajorHeadID, func.count(CaseMaster.CaseMasterID))\
            .group_by(CaseMaster.CrimeMajorHeadID).limit(10).all()
        total = db.query(func.count(CaseMaster.CaseMasterID)).scalar() or 0
        return {
            "total_cases": total,
            "by_status": [{ "status_id": r[0], "count": r[1]} for r in by_status],
            "by_crime_head": [{"crime_head_id": r[0], "count": r[1]} for r in by_crime],
        }
    except Exception as e:
        return {"error": str(e), "total_cases": 0, "by_status": [], "by_crime_head": []}
    finally:
        db.close()


@app.get("/api/hotspots")
def get_hotspots():
    db = SessionLocal()
    try:
        rows = db.query(CaseMaster.PoliceStationID, func.count(CaseMaster.CaseMasterID).label("count"))\
            .group_by(CaseMaster.PoliceStationID)\
            .order_by(func.count(CaseMaster.CaseMasterID).desc())\
            .limit(10).all()
        return [{"station_id": r[0], "case_count": r[1]} for r in rows]
    except Exception:
        return []
    finally:
        db.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
