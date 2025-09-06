from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import models
from database import engine, SessionLocal
from routers import blog, auth, comment
import logging
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Test database connection
def test_db_connection():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        logger.info("✅ Database connection successful")
        return True
    except Exception as e:
        logger.error(f"❌ Database connection failed: {str(e)}")
        return False

# Test the connection
db_connected = test_db_connection()

# Initialize FastAPI app
app = FastAPI(
    title="Modern Chyrp API",
    description="A modern blogging platform API with multiple content types",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(blog.router)
app.include_router(comment.router)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Health check endpoint
@app.get("/")
def read_root():
    status = "connected" if db_connected else "disconnected"
    return {
        "message": "Modern Chyrp API is running",
        "database": status,
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

# Database info endpoint
@app.get("/db-info")
def db_info():
    try:
        db = SessionLocal()
        if os.getenv("DATABASE_URL", "").startswith("postgresql"):
            result = db.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """))
        else:
            result = db.execute(text("SELECT name FROM sqlite_master WHERE type='table'"))
        
        tables = [row[0] for row in result]
        db.close()
        return {"tables": tables}
    except Exception as e:
        return {"error": str(e)}