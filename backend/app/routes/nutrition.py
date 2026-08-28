from fastapi import APIRouter
from backend.app.models.schemas import MacroCalculationRequest, MacroCalculationResponse

router = APIRouter(prefix="/nutrition", tags=["Nutrition & Macros"])

@router.post("/calculate-macros", response_model=MacroCalculationResponse)
def calculate_custom_macros(req: MacroCalculationRequest):
    """Calculate customized daily calorie, protein, carbohydrate, and fat targets based on athlete metrics."""
    # Mifflin-St Jeor estimate
    bmr = (10 * req.weight_kg) + (6.25 * 175) - (5 * 28) + 5
    
    activity_multiplier = 1.55 # moderate
    if req.activity_level == "light":
        activity_multiplier = 1.375
    elif req.activity_level == "intense":
        activity_multiplier = 1.725
        
    tdee = int(bmr * activity_multiplier)
    
    target_cal = tdee
    if req.goal == "fat_loss":
        target_cal = tdee - 450
    elif req.goal == "muscle_building":
        target_cal = tdee + 300
        
    # High protein partitioning: 2.0g/kg
    protein_g = int(req.weight_kg * 2.0)
    protein_cal = protein_g * 4
    
    # 25% healthy fats
    fat_cal = target_cal * 0.25
    fat_g = int(fat_cal / 9)
    
    # Carbs fill remainder
    carb_cal = target_cal - protein_cal - fat_cal
    carbs_g = max(50, int(carb_cal / 4))
    
    water_ml = int(req.weight_kg * 40) # 40ml per kg
    
    return MacroCalculationResponse(
        target_calories=target_cal,
        protein_g=protein_g,
        carbs_g=carbs_g,
        fat_g=fat_g,
        water_target_ml=water_ml
    )
