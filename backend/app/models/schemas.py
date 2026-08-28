from pydantic import BaseModel, Field
from typing import List, Optional

class ExerciseSchema(BaseModel):
    id: str
    name: str
    target_muscle: str
    equipment: str
    difficulty: str
    category: str
    default_sets: int
    default_reps: str
    default_rest_sec: int
    instructions: List[str]
    form_tips: List[str]
    video_thumbnail: str
    video_url: Optional[str] = None

class RoutineExerciseSchema(BaseModel):
    exercise_id: str
    exercise_name: str
    sets: int
    reps: str
    rest_sec: int
    notes: Optional[str] = None

class RoutineSchema(BaseModel):
    id: str
    title: str
    subtitle: str
    category: str
    duration_min: int
    difficulty: str
    calories_burn_estimate: int
    thumbnail: str
    description: str
    exercises: List[RoutineExerciseSchema]

class ProgramSchema(BaseModel):
    id: str
    title: str
    tagline: str
    slug: str
    weeks: int
    workouts_per_week: int
    difficulty: str
    category: str
    thumbnail: str
    description: str
    highlights: List[str]
    equipment_needed: List[str]

class MacroCalculationRequest(BaseModel):
    weight_kg: float = Field(..., ge=30, le=250)
    goal: str = Field(default="fat_loss") # "fat_loss", "muscle_building", "general_health"
    activity_level: str = Field(default="moderate") # "light", "moderate", "intense"

class MacroCalculationResponse(BaseModel):
    target_calories: int
    protein_g: int
    carbs_g: int
    fat_g: int
    water_target_ml: int

class LogWorkoutRequest(BaseModel):
    user_id: str
    routine_id: str
    duration_minutes: int
    calories_burned: int
    notes: Optional[str] = None

class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    goal: Optional[str] = None
    level: Optional[str] = None
    target_weight_kg: Optional[float] = None
    current_weight_kg: Optional[float] = None
    height_cm: Optional[float] = None
