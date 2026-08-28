from fastapi import APIRouter, HTTPException
from typing import List, Optional
from backend.app.models.schemas import ProgramSchema, RoutineSchema

router = APIRouter(prefix="/programs", tags=["Programs & Workouts"])

# In-memory structured fitness data
SAMPLE_PROGRAMS = [
    {
        "id": "prog-1",
        "title": "ROSE 30: Rapid Shred & Conditioning",
        "tagline": "Transform body composition, boost VO2 max, and build functional athletic power in 30 days.",
        "slug": "rose-30-shred",
        "weeks": 4,
        "workouts_per_week": 4,
        "difficulty": "Intermediate",
        "category": "Fat Loss",
        "thumbnail": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        "description": "Flagship 4-week fat-loss and athletic conditioning system.",
        "highlights": [
            "30-day progressive training roadmap",
            "High-impact metabolic conditioning + heavy compound days",
            "Targeted core strength and athletic mobility"
        ],
        "equipment_needed": ["Dumbbells", "Pull-Up Bar", "Kettlebell"]
    },
    {
        "id": "prog-2",
        "title": "APEX HYPERTROPHY: Lean Muscle Blueprint",
        "tagline": "Evidence-based muscle building protocol focusing on progressive overload.",
        "slug": "apex-hypertrophy",
        "weeks": 8,
        "workouts_per_week": 5,
        "difficulty": "Advanced",
        "category": "Muscle Gain",
        "thumbnail": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        "description": "An advanced 8-week push-pull-legs split built around science-backed rep tempos.",
        "highlights": [
            "Upper & lower body hypertrophy split",
            "Intelligent RPE auto-regulation",
            "Joint deload modules"
        ],
        "equipment_needed": ["Barbell & Plates", "Adjustable Bench", "Dumbbells"]
    }
]

@router.get("", response_model=List[ProgramSchema])
def get_all_programs(category: Optional[str] = None):
    """Retrieve all signature workout programs, optionally filtered by category."""
    if category and category.lower() != "all":
        return [p for p in SAMPLE_PROGRAMS if p["category"].lower() == category.lower()]
    return SAMPLE_PROGRAMS

@router.get("/{program_id}", response_model=ProgramSchema)
def get_program_by_id(program_id: str):
    """Get details for a specific workout program."""
    for p in SAMPLE_PROGRAMS:
        if p["id"] == program_id or p["slug"] == program_id:
            return p
    raise HTTPException(status_code=404, detail="Program not found")
