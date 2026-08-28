from fastapi import APIRouter, Query
from typing import List, Optional
from backend.app.models.schemas import ExerciseSchema

router = APIRouter(prefix="/exercises", tags=["Exercise Biomechanics Directory"])

SAMPLE_EXERCISES = [
    {
        "id": "ex-1",
        "name": "Barbell High-Bar Back Squat",
        "target_muscle": "Quadriceps",
        "equipment": "Barbell",
        "difficulty": "Intermediate",
        "category": "Strength",
        "default_sets": 4,
        "default_reps": "6-8 reps",
        "default_rest_sec": 120,
        "instructions": [
            "Position barbell across upper trapezius muscles.",
            "Break at the hips and knees simultaneously.",
            "Drive through mid-foot while keeping chest upright."
        ],
        "form_tips": [
            "Maintain a neutral spine.",
            "Do not let knees cave inward."
        ],
        "video_thumbnail": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
        "video_url": "https://www.youtube.com/embed/bEv6CCg2BC8"
    },
    {
        "id": "ex-2",
        "name": "Incline Dumbbell Chest Press",
        "target_muscle": "Chest",
        "equipment": "Dumbbells",
        "difficulty": "Intermediate",
        "category": "Hypertrophy",
        "default_sets": 3,
        "default_reps": "8-12 reps",
        "default_rest_sec": 90,
        "instructions": [
            "Set bench to 30-degree incline.",
            "Lower dumbbells with elbows at 45-degree angle.",
            "Press upward and squeeze chest at top."
        ],
        "form_tips": [
            "Keep wrists stacked over elbows."
        ],
        "video_thumbnail": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        "video_url": "https://www.youtube.com/embed/8iPEnn-ltC8"
    }
]

@router.get("", response_model=List[ExerciseSchema])
def get_exercises(
    muscle: Optional[str] = Query(None, description="Filter by target muscle group"),
    search: Optional[str] = Query(None, description="Search keyword in exercise name")
):
    """Retrieve exercises from the biomechanics vault with optional filtering."""
    results = SAMPLE_EXERCISES
    if muscle and muscle.lower() != "all":
        results = [e for e in results if e["target_muscle"].lower() == muscle.lower()]
    if search:
        s = search.lower()
        results = [e for e in results if s in e["name"].lower() or s in e["target_muscle"].lower()]
    return results
