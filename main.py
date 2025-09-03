from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import models
from database import engine, SessionLocal
from routers import blog, auth, comment

# Create tables in PostgreSQL if they don't exist
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Blog API",
    description="A comprehensive blog API with multiple content types"
)

# Routers
app.include_router(auth.router)
app.include_router(blog.router)
app.include_router(comment.router)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Health check endpoint
@app.get("/")
def read_root():
    return {"message": "Blog API is running"}

# Test DB connection (useful for logs on Render)
@app.on_event("startup")
def test_db_connection():
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        db.close()
        print("✅ Database connection successful")
    except Exception as e:
        print(f"❌ Database connection failed: {str(e)}")
