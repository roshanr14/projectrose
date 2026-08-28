export type FitnessGoal = 'fat_loss' | 'muscle_building' | 'endurance' | 'mobility_flexibility' | 'general_health';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced' | 'athlete';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  goal: FitnessGoal;
  level: FitnessLevel;
  targetWeightKg: number;
  currentWeightKg: number;
  heightCm: number;
  dailyCalorieTarget: number;
  dailyWaterTargetMl: number;
  streakDays: number;
  totalWorkoutsCompleted: number;
  totalMinutesTrained: number;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string; // e.g. 'Chest', 'Quadriceps', 'Back', 'Core', 'Shoulders', 'Full Body'
  secondaryMuscles?: string[];
  equipment: 'Bodyweight' | 'Dumbbells' | 'Barbell' | 'Resistance Bands' | 'Kettlebell' | 'Pull-Up Bar' | 'Cable';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Strength' | 'Hypertrophy' | 'HIIT' | 'Mobility' | 'Cardio';
  defaultSets: number;
  defaultReps: string;
  defaultRestSec: number;
  instructions: string[];
  formTips: string[];
  videoThumbnail: string;
  videoUrl?: string;
}

export interface WorkoutSessionExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string;
  restSec: number;
  notes?: string;
  completed?: boolean;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  subtitle: string;
  category: 'HIIT & Shred' | 'Hypertrophy Strength' | 'Calisthenics Master' | 'Mobility & Recovery' | 'Core & Abs' | 'Full Body Blitz';
  durationMin: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  caloriesBurnEstimate: number;
  thumbnail: string;
  description: string;
  trainer: {
    name: string;
    role: string;
    avatar: string;
  };
  exercises: WorkoutSessionExercise[];
  videoUrl?: string;
}

export interface WorkoutProgram {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  weeks: number;
  workoutsPerWeek: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: 'Fat Loss' | 'Muscle Gain' | 'Athletic Conditioning' | 'Home Workout' | 'Mobility';
  thumbnail: string;
  bannerImage: string;
  description: string;
  highlights: string[];
  equipmentNeeded: string[];
  routines: WorkoutRoutine[];
}

export interface MealRecipe {
  id: string;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Post-Workout Snack' | 'Smoothie';
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  prepTimeMin: number;
  image: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

export interface DailyActivityLog {
  date: string; // YYYY-MM-DD
  caloriesBurned: number;
  minutesActive: number;
  waterMl: number;
  steps: number;
  workoutsLogged: string[]; // routine IDs
  caloriesConsumed: number;
  proteinConsumedG: number;
}

export interface TransformationStory {
  id: string;
  name: string;
  achievement: string;
  duration: string;
  weightChange: string;
  quote: string;
  image: string;
  verified: boolean;
}
