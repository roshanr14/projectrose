import { WorkoutProgram, WorkoutRoutine } from '../types';

export const mockRoutines: WorkoutRoutine[] = [
  {
    id: 'rt-1',
    title: 'Full-Body Athletic Power Blitz',
    subtitle: 'Compound power, explosive hips, and core stability',
    category: 'Full Body Blitz',
    durationMin: 45,
    difficulty: 'Intermediate',
    caloriesBurnEstimate: 420,
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'High-energy full body routine targeting maximum muscle fiber recruitment and metabolic conditioning.',
    trainer: {
      name: 'Marcus Vance',
      role: 'Head Strength Coach',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/cbKkB3POqaY',
    exercises: [
      { exerciseId: 'ex-1', exerciseName: 'Barbell High-Bar Back Squat', sets: 4, reps: '8 reps', restSec: 90, notes: 'Focus on depth and explosive upward drive' },
      { exerciseId: 'ex-2', exerciseName: 'Incline Dumbbell Chest Press', sets: 3, reps: '10 reps', restSec: 75, notes: '3-second negative descent on every rep' },
      { exerciseId: 'ex-3', exerciseName: 'Pull-Ups (Overhand Grip)', sets: 4, reps: '8-10 reps', restSec: 90, notes: 'Dead hang pause at bottom' },
      { exerciseId: 'ex-5', exerciseName: 'High-Intensity Kettlebell Swings', sets: 3, reps: '20 reps', restSec: 60, notes: 'Hips snap forward aggressively' },
      { exerciseId: 'ex-6', exerciseName: 'Hanging Knee/Leg Raises', sets: 3, reps: '15 reps', restSec: 45, notes: 'Controlled tempo, no swinging' }
    ]
  },
  {
    id: 'rt-2',
    title: 'Hypertrophy Upper Body Sculpt',
    subtitle: 'Chest, lats, shoulders, and arm supersets',
    category: 'Hypertrophy Strength',
    durationMin: 50,
    difficulty: 'Advanced',
    caloriesBurnEstimate: 380,
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted upper body volume designed to optimize muscle hypertrophy, shoulder width, and back density.',
    trainer: {
      name: 'Elena Rostova',
      role: 'Physique & Mobility Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/j6U9UoR1UvQ',
    exercises: [
      { exerciseId: 'ex-2', exerciseName: 'Incline Dumbbell Chest Press', sets: 4, reps: '8-12 reps', restSec: 90 },
      { exerciseId: 'ex-3', exerciseName: 'Pull-Ups (Overhand Grip)', sets: 4, reps: 'Failure', restSec: 90 },
      { exerciseId: 'ex-7', exerciseName: 'Overhead Dumbbell Shoulder Press', sets: 3, reps: '10 reps', restSec: 75 },
      { exerciseId: 'ex-6', exerciseName: 'Hanging Knee/Leg Raises', sets: 3, reps: '15 reps', restSec: 60 }
    ]
  },
  {
    id: 'rt-3',
    title: 'Metabolic HIIT & Core Inferno',
    subtitle: 'Calorie furnace intervals with no heavy equipment',
    category: 'HIIT & Shred',
    durationMin: 30,
    difficulty: 'Intermediate',
    caloriesBurnEstimate: 360,
    thumbnail: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80',
    description: 'Fast-paced high-intensity interval training engineered to elevate EPOC and incinerate fat in 30 minutes.',
    trainer: {
      name: 'Marcus Vance',
      role: 'Head Strength Coach',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/M0uO8X3_tEA',
    exercises: [
      { exerciseId: 'ex-5', exerciseName: 'High-Intensity Kettlebell Swings', sets: 4, reps: '40 sec work', restSec: 20 },
      { exerciseId: 'ex-6', exerciseName: 'Hanging Knee/Leg Raises', sets: 4, reps: '15 reps', restSec: 30 },
      { exerciseId: 'ex-8', exerciseName: 'Dynamic Thoracic & Hip Mobility Flow', sets: 3, reps: '60 sec flow', restSec: 30 }
    ]
  },
  {
    id: 'rt-4',
    title: 'Total Body Mobility & Joint Longevity',
    subtitle: 'Hip openers, thoracic rotation, and posture restoration',
    category: 'Mobility & Recovery',
    durationMin: 25,
    difficulty: 'Beginner',
    caloriesBurnEstimate: 140,
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    description: 'Essential restorative session to decompress the spine, unlock tight hips, and accelerate recovery.',
    trainer: {
      name: 'Elena Rostova',
      role: 'Physique & Mobility Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/4BOTvaHMwBw',
    exercises: [
      { exerciseId: 'ex-8', exerciseName: 'Dynamic Thoracic & Hip Mobility Flow', sets: 3, reps: '10 reps each side', restSec: 30 }
    ]
  }
];

export const mockPrograms: WorkoutProgram[] = [
  {
    id: 'prog-1',
    title: 'ROSE 30: Rapid Shred & Athletic Conditioning',
    tagline: 'Transform body composition, boost VO2 max, and build functional athletic power in 30 days.',
    slug: 'rose-30-shred',
    weeks: 4,
    workoutsPerWeek: 4,
    difficulty: 'Intermediate',
    category: 'Fat Loss',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    description: 'Our flagship 4-week fat-loss and athletic conditioning system. Combines high-output metabolic conditioning with compound strength progressions to melt fat while protecting lean muscle mass.',
    highlights: [
      '30-day progressive training roadmap with daily video guidance',
      'High-impact metabolic conditioning + heavy compound days',
      'Targeted core strength and athletic mobility protocols',
      'Zero fluff: maximum efficiency in 35-45 minutes per session'
    ],
    equipmentNeeded: ['Dumbbells', 'Pull-Up Bar / Resistance Band', 'Kettlebell (Optional)'],
    routines: [mockRoutines[0], mockRoutines[2], mockRoutines[1], mockRoutines[3]]
  },
  {
    id: 'prog-2',
    title: 'APEX HYPERTROPHY: Lean Muscle Blueprint',
    tagline: 'Evidence-based muscle building protocol focusing on progressive overload and optimal volume.',
    slug: 'apex-hypertrophy',
    weeks: 8,
    workoutsPerWeek: 5,
    difficulty: 'Advanced',
    category: 'Muscle Gain',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1400&q=80',
    description: 'An advanced 8-week push-pull-legs and upper-lower split built around science-backed rep tempos, mechanical tension, and periodized volume loading.',
    highlights: [
      'Comprehensive upper & lower body hypertrophy split',
      'Intelligent RPE (Rate of Perceived Exertion) auto-regulation guides',
      'Hypertrophy mechanics for chest, shoulders, arms, and back density',
      'Dedicated active recovery and joint deload modules'
    ],
    equipmentNeeded: ['Barbell & Plates', 'Adjustable Bench', 'Dumbbells'],
    routines: [mockRoutines[1], mockRoutines[0], mockRoutines[1]]
  },
  {
    id: 'prog-3',
    title: 'ZERO BOUNDARIES: Calisthenics & Bodyweight Master',
    tagline: 'Master your own bodyweight with progressive calisthenics, core control, and movement flow.',
    slug: 'zero-boundaries-calisthenics',
    weeks: 6,
    workoutsPerWeek: 4,
    difficulty: 'All Levels',
    category: 'Home Workout',
    thumbnail: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80',
    description: 'No gym? No problem. Unlock elite bodyweight strength, master pull-ups and push-up progressions, and develop a rock-solid athletic physique from anywhere.',
    highlights: [
      '100% home or outdoor park friendly routines',
      'Progressions from beginner push-ups to muscle-up foundation',
      'Handstand and gymnastic core conditioning',
      'Wrist, shoulder, and ankle bulletproofing'
    ],
    equipmentNeeded: ['Bodyweight Only (Pull-Up Bar recommended)'],
    routines: [mockRoutines[2], mockRoutines[3], mockRoutines[0]]
  }
];
