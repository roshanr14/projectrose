-- ==============================================================================
-- PULSEFIT FITNESS CHANNEL - SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ATHLETE PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    goal TEXT DEFAULT 'fat_loss' CHECK (goal IN ('fat_loss', 'muscle_building', 'endurance', 'mobility_flexibility', 'general_health')),
    level TEXT DEFAULT 'intermediate' CHECK (level IN ('beginner', 'intermediate', 'advanced', 'athlete')),
    target_weight_kg NUMERIC(5,2) DEFAULT 75.0,
    current_weight_kg NUMERIC(5,2) DEFAULT 80.0,
    height_cm NUMERIC(5,2) DEFAULT 178.0,
    daily_calorie_target INTEGER DEFAULT 2250,
    daily_water_target_ml INTEGER DEFAULT 3000,
    streak_days INTEGER DEFAULT 1,
    total_workouts_completed INTEGER DEFAULT 0,
    total_minutes_trained INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. WORKOUT PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS public.programs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT,
    slug TEXT UNIQUE NOT NULL,
    weeks INTEGER NOT NULL DEFAULT 4,
    workouts_per_week INTEGER NOT NULL DEFAULT 4,
    difficulty TEXT NOT NULL,
    category TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    banner_image TEXT,
    description TEXT NOT NULL,
    highlights TEXT[],
    equipment_needed TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. WORKOUT ROUTINES TABLE
CREATE TABLE IF NOT EXISTS public.routines (
    id TEXT PRIMARY KEY,
    program_id TEXT REFERENCES public.programs(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    duration_min INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    calories_burn_estimate INTEGER NOT NULL,
    thumbnail TEXT NOT NULL,
    description TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EXERCISE BIOMECHANICS DIRECTORY TABLE
CREATE TABLE IF NOT EXISTS public.exercises (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    target_muscle TEXT NOT NULL,
    secondary_muscles TEXT[],
    equipment TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    category TEXT NOT NULL,
    default_sets INTEGER NOT NULL DEFAULT 3,
    default_reps TEXT NOT NULL DEFAULT '8-12 reps',
    default_rest_sec INTEGER NOT NULL DEFAULT 90,
    instructions TEXT[] NOT NULL,
    form_tips TEXT[] NOT NULL,
    video_thumbnail TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ROUTINE EXERCISE JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.routine_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    routine_id TEXT REFERENCES public.routines(id) ON DELETE CASCADE,
    exercise_id TEXT REFERENCES public.exercises(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL DEFAULT 1,
    sets INTEGER NOT NULL DEFAULT 3,
    reps TEXT NOT NULL DEFAULT '10 reps',
    rest_sec INTEGER NOT NULL DEFAULT 60,
    notes TEXT
);

-- 6. USER COMPLETED WORKOUTS LOG
CREATE TABLE IF NOT EXISTS public.user_workout_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    routine_id TEXT REFERENCES public.routines(id) ON DELETE SET NULL,
    duration_minutes INTEGER NOT NULL,
    calories_burned INTEGER NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. USER DAILY METRICS & HYDRATION
CREATE TABLE IF NOT EXISTS public.user_daily_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    log_date DATE DEFAULT CURRENT_DATE NOT NULL,
    water_ml INTEGER DEFAULT 0 NOT NULL,
    calories_consumed INTEGER DEFAULT 0 NOT NULL,
    protein_consumed_g INTEGER DEFAULT 0 NOT NULL,
    steps INTEGER DEFAULT 0 NOT NULL,
    weight_kg NUMERIC(5,2),
    UNIQUE(user_id, log_date)
);

-- 8. HIGH-PROTEIN MEAL RECIPES TABLE
CREATE TABLE IF NOT EXISTS public.meal_recipes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    calories INTEGER NOT NULL,
    protein_g INTEGER NOT NULL,
    carbs_g INTEGER NOT NULL,
    fat_g INTEGER NOT NULL,
    prep_time_min INTEGER NOT NULL,
    image TEXT NOT NULL,
    tags TEXT[],
    ingredients TEXT[] NOT NULL,
    instructions TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_recipes ENABLE ROW LEVEL SECURITY;

-- Public content readable by anyone
CREATE POLICY "Public programs are viewable by all users" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public routines are viewable by all users" ON public.routines FOR SELECT USING (true);
CREATE POLICY "Public exercises are viewable by all users" ON public.exercises FOR SELECT USING (true);
CREATE POLICY "Public routine exercises are viewable by all users" ON public.routine_exercises FOR SELECT USING (true);
CREATE POLICY "Public meal recipes are viewable by all users" ON public.meal_recipes FOR SELECT USING (true);

-- User data readable & editable only by the owner
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own workout logs" ON public.user_workout_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workout logs" ON public.user_workout_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own daily metrics" ON public.user_daily_metrics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert/update own daily metrics" ON public.user_daily_metrics FOR ALL USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATED TRIGGER: Create Profile on User Signup (Email & Google OAuth)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id, 
        email, 
        full_name, 
        avatar_url, 
        goal
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
        COALESCE(NEW.raw_user_meta_data->>'goal', 'fat_loss')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
