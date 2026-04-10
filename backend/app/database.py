import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load .env file if exists
load_dotenv()

# Configuration from environment variables or defaults
DB_USER = os.getenv("DB_USER", "lele")
DB_PASSWORD = os.getenv("DB_PASSWORD", "yes")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_NAME = os.getenv("DB_NAME", "budidaya_lele")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency untuk session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
