import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

try:
    from models import Base
except ImportError:  # pragma: no cover - fallback for package-based imports
    from backend.models import Base

POSTGRES_URL = os.getenv("POSTGRES_URL", "").strip()

if POSTGRES_URL:
    DATABASE_URL = POSTGRES_URL
else:
    DATABASE_URL = "sqlite:///./crime_local.db"

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


def init_db():
    try:
        Base.metadata.create_all(bind=engine)
        print("[DB] Initialized database tables successfully.")
    except Exception as e:
        print(f"[DB Warning] Could not initialize database tables: {e}")
