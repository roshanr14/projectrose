from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import settings
from backend.app.routes import programs, exercises, nutrition, dashboard

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="REST API backend for ROSEFIT Fitness Channel Platform & Dashboard."
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all during dev/staging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(programs.router, prefix=settings.API_PREFIX)
app.include_router(exercises.router, prefix=settings.API_PREFIX)
app.include_router(nutrition.router, prefix=settings.API_PREFIX)
app.include_router(dashboard.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "channel": "ROSEFIT Fitness Channel API",
        "status": "online",
        "docs_url": "/docs",
        "version": settings.VERSION
    }

@app.get("/api/health")
def healthcheck():
    return {
        "status": "healthy",
        "timestamp": "2026-08-27T12:00:00Z"
    }
