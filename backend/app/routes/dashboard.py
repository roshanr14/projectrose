from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from backend.app.models.schemas import LogWorkoutRequest, UpdateProfileRequest

router = APIRouter(prefix="/dashboard", tags=["Athlete Dashboard Operations"])

@router.get("/summary/{user_id}")
def get_user_dashboard_summary(user_id: str) -> Dict[str, Any]:
    """Fetch athlete dashboard metrics, streak days, and active program status."""
    return {
        "user_id": user_id,
        "streak_days": 7,
        "total_workouts_completed": 24,
        "total_minutes_trained": 960,
        "daily_activity": {
            "calories_burned": 520,
            "minutes_active": 45,
            "water_ml": 2250,
            "steps": 8430
        },
        "active_program_id": "prog-1",
        "status": "active"
    }

@router.post("/log-workout")
def log_workout_session(req: LogWorkoutRequest) -> Dict[str, Any]:
    """Log a completed workout session and update athlete stats."""
    return {
        "success": True,
        "message": f"Successfully logged {req.duration_minutes} min session ({req.calories_burned} kcal)",
        "logged_at": "2026-08-27T12:00:00Z"
    }

@router.patch("/profile/{user_id}")
def update_athlete_profile(user_id: str, req: UpdateProfileRequest) -> Dict[str, Any]:
    """Update athlete preferences, weight targets, or goals."""
    return {
        "success": True,
        "user_id": user_id,
        "updated_fields": req.model_dump(exclude_unset=True)
    }
