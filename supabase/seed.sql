-- ==============================================================================
-- PULSEFIT FITNESS CHANNEL - SUPABASE SEED DATA
-- ==============================================================================

-- 1. Insert Workout Programs
INSERT INTO public.programs (id, title, tagline, slug, weeks, workouts_per_week, difficulty, category, thumbnail, banner_image, description, highlights, equipment_needed)
VALUES 
(
    'prog-1',
    'PULSE 30: Rapid Shred & Athletic Conditioning',
    'Transform body composition, boost VO2 max, and build functional athletic power in 30 days.',
    'pulse-30-shred',
    4,
    4,
    'Intermediate',
    'Fat Loss',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    'Our flagship 4-week fat-loss and athletic conditioning system.',
    ARRAY['30-day progressive training roadmap', 'High-impact metabolic conditioning + heavy compound days', 'Targeted core strength and athletic mobility protocols'],
    ARRAY['Dumbbells', 'Pull-Up Bar', 'Kettlebell']
),
(
    'prog-2',
    'APEX HYPERTROPHY: Lean Muscle Blueprint',
    'Evidence-based muscle building protocol focusing on progressive overload and optimal volume.',
    'apex-hypertrophy',
    8,
    5,
    'Advanced',
    'Muscle Gain',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1400&q=80',
    'An advanced 8-week push-pull-legs and upper-lower split.',
    ARRAY['Comprehensive upper & lower body hypertrophy split', 'Intelligent RPE auto-regulation guides', 'Hypertrophy mechanics for back and chest density'],
    ARRAY['Barbell & Plates', 'Adjustable Bench', 'Dumbbells']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Exercises
INSERT INTO public.exercises (id, name, target_muscle, equipment, difficulty, category, default_sets, default_reps, default_rest_sec, instructions, form_tips, video_thumbnail, video_url)
VALUES
(
    'ex-1',
    'Barbell High-Bar Back Squat',
    'Quadriceps',
    'Barbell',
    'Intermediate',
    'Strength',
    4,
    '6-8 reps',
    120,
    ARRAY['Position barbell across upper trapezius muscles.', 'Break at the hips and knees simultaneously.', 'Drive through mid-foot while keeping chest upright.'],
    ARRAY['Maintain a neutral spine.', 'Do not let knees cave inward.'],
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    'https://www.youtube.com/embed/bEv6CCg2BC8'
),
(
    'ex-2',
    'Incline Dumbbell Chest Press',
    'Chest',
    'Dumbbells',
    'Intermediate',
    'Hypertrophy',
    3,
    '8-12 reps',
    90,
    ARRAY['Set adjustable bench to 30-degrees incline.', 'Lower dumbbells with elbows at 45-degree angle.', 'Press upward and squeeze pecs at top.'],
    ARRAY['Avoid excessive bench angle.', 'Keep wrists stacked above elbows.'],
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    'https://www.youtube.com/embed/8iPEnn-ltC8'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Recipes
INSERT INTO public.meal_recipes (id, title, category, calories, protein_g, carbs_g, fat_g, prep_time_min, image, tags, ingredients, instructions)
VALUES
(
    'rec-1',
    'Anabolic Power Berry Overnight Oats',
    'Breakfast',
    480,
    38,
    56,
    10,
    5,
    'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
    ARRAY['High Protein', 'Meal Prep', 'Quick Breakfast'],
    ARRAY['60g Rolled Oats', '1 scoop Whey Isolate Protein', '150ml Almond Milk', '100g 0% Greek Yogurt', 'Fresh Blueberries'],
    ARRAY['Mix oats, protein, and chia seeds in a jar.', 'Add almond milk and Greek yogurt.', 'Refrigerate overnight and top with berries.']
),
(
    'rec-2',
    'Grilled Lemon Herb Chicken & Quinoa Harvest Bowl',
    'Lunch',
    560,
    48,
    52,
    14,
    20,
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ARRAY['Clean Fuel', 'High Protein', 'Post Workout'],
    ARRAY['180g Chicken Breast', '120g Cooked Quinoa', '100g Sweet Potato', 'Steamed Broccoli', 'Avocado slice'],
    ARRAY['Season and grill chicken for 6-7 min per side.', 'Assemble bowl with quinoa and veggies.', 'Slice chicken and drizzle lemon herb dressing.']
)
ON CONFLICT (id) DO NOTHING;
