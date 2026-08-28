import { Exercise } from '../types';

export const mockExercises: Exercise[] = [
  {
    id: 'ex-1',
    name: 'Barbell High-Bar Back Squat',
    targetMuscle: 'Quadriceps',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Lower Back', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    category: 'Strength',
    defaultSets: 4,
    defaultReps: '6-8 reps',
    defaultRestSec: 120,
    instructions: [
      'Position barbell across upper trapezius muscles with a tight grip and retracted scapulae.',
      'Unrack the bar and take two clean steps back. Set feet slightly wider than shoulder-width with toes flared 15-30 degrees.',
      'Brace core deeply 360 degrees via diaphragmatic breathing (Valsalva maneuver).',
      'Break at the hips and knees simultaneously, descending under control until thighs are parallel or below parallel.',
      'Drive through mid-foot while keeping chest upright and knees tracking over toes.'
    ],
    formTips: [
      'Maintain a neutral spine throughout the entire range of motion.',
      'Do not let knees cave inward during the concentric drive.',
      'Keep weight balanced over the midfoot, not solely on heels or toes.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/bEv6CCg2BC8'
  },
  {
    id: 'ex-2',
    name: 'Incline Dumbbell Chest Press',
    targetMuscle: 'Chest',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    category: 'Hypertrophy',
    defaultSets: 3,
    defaultReps: '8-12 reps',
    defaultRestSec: 90,
    instructions: [
      'Set adjustable bench to approximately 30-degrees incline.',
      'Sit down with dumbbells resting vertically on your knees. Kick dumbbells up to shoulder level as you lean back.',
      'Retract and depress your shoulder blades into the bench and plant your feet firmly on the floor.',
      'Lower the dumbbells in an arc with elbows at a 45-degree angle to your torso until you feel a deep chest stretch.',
      'Press upward and slightly inward, squeezing the clavicular head of the pecs at the top.'
    ],
    formTips: [
      'Avoid excessive bench angle (>45 deg) to prevent overworking the front deltoids.',
      'Keep your wrists stacked directly above your elbows throughout the movement.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8'
  },
  {
    id: 'ex-3',
    name: 'Pull-Ups (Overhand Grip)',
    targetMuscle: 'Back',
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoids', 'Core', 'Forearms'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Intermediate',
    category: 'Strength',
    defaultSets: 4,
    defaultReps: '6-10 reps',
    defaultRestSec: 90,
    instructions: [
      'Grip the pull-up bar with hands just outside shoulder width, palms facing away (pronated grip).',
      'Hang with arms fully extended into a dead hang, engage your core, and depress your scapulae.',
      'Pull your chest toward the bar by driving your elbows down and back toward your hip pockets.',
      'Continue pulling until your chin clears the bar or upper chest touches the bar.',
      'Lower yourself slowly with full control for 2-3 seconds until arms are straight.'
    ],
    formTips: [
      'Avoid swinging or using momentum (kipping).',
      'Focus on mind-muscle connection with the lats rather than pulling purely with your arms.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g'
  },
  {
    id: 'ex-4',
    name: 'Romanian Deadlift (RDL)',
    targetMuscle: 'Hamstrings',
    secondaryMuscles: ['Glutes', 'Erector Spinae', 'Forearms'],
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    category: 'Hypertrophy',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    defaultRestSec: 90,
    instructions: [
      'Stand upright with feet hip-width apart holding dumbbells in front of thighs.',
      'Unlock your knees slightly (soft bend) and keep that knee angle locked during the entire rep.',
      'Hinge backward at the hips as if trying to touch the wall behind you with your glutes.',
      'Keep the dumbbells skimming close along your thighs and shins until you feel a deep stretch in hamstrings.',
      'Drive hips forward and contract glutes powerfully to return to the starting position.'
    ],
    formTips: [
      'Do not squat the weight down; the motion is a pure hip hinge.',
      'Keep your back flat and neck aligned with your spine.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/JCXUYuzwNrM'
  },
  {
    id: 'ex-5',
    name: 'High-Intensity Kettlebell Swings',
    targetMuscle: 'Full Body',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Shoulders', 'Core'],
    equipment: 'Kettlebell',
    difficulty: 'Beginner',
    category: 'HIIT',
    defaultSets: 4,
    defaultReps: '45 sec on / 15 sec off',
    defaultRestSec: 45,
    instructions: [
      'Stand with feet shoulder-width apart, kettlebell placed about a foot in front of you.',
      'Hinge down, grab kettlebell handle with both hands, and hike it back between your legs like a center in football.',
      'Powerfully extend your hips and knees to propel the bell upward to chest level.',
      'Let gravity guide the bell back down into the hip hinge and smoothly repeat.'
    ],
    formTips: [
      'The power comes 100% from hip thrust, not lifting with your shoulders.',
      'Squeeze your glutes at the top lockout.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/YSxHifyI6s8'
  },
  {
    id: 'ex-6',
    name: 'Hanging Knee/Leg Raises',
    targetMuscle: 'Core',
    secondaryMuscles: ['Hip Flexors', 'Forearms'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Intermediate',
    category: 'Strength',
    defaultSets: 3,
    defaultReps: '12-15 reps',
    defaultRestSec: 60,
    instructions: [
      'Hang from a pull-up bar with arms straight and shoulder-width grip.',
      'Roll your pelvis posteriorly and lift knees/legs up toward your chest.',
      'Pause for a 1-second contraction at the top where abdominal tension peaks.',
      'Lower legs back down slowly under control without swinging.'
    ],
    formTips: [
      'Do not use momentum to swing legs up; control the contraction.',
      'Exhale completely as you curl your pelvis up.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/hdng3Nm1x_E'
  },
  {
    id: 'ex-7',
    name: 'Overhead Dumbbell Shoulder Press',
    targetMuscle: 'Shoulders',
    secondaryMuscles: ['Triceps Brachii', 'Upper Traps', 'Core'],
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    category: 'Strength',
    defaultSets: 3,
    defaultReps: '8-10 reps',
    defaultRestSec: 90,
    instructions: [
      'Sit on bench or stand upright with feet hip-width apart and core engaged.',
      'Bring dumbbells to ear level with palms facing forward and elbows slightly tucked (30-degree scapular plane).',
      'Press dumbbells overhead until arms are extended without clanking weights together.',
      'Lower with control back to ear level.'
    ],
    formTips: [
      'Avoid excessively arching your lower back as weights go up.',
      'Keep glutes and abdominal muscles tight throughout.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/qEwKCR5JCog'
  },
  {
    id: 'ex-8',
    name: 'Dynamic Thoracic & Hip Mobility Flow',
    targetMuscle: 'Mobility',
    secondaryMuscles: ['Hip Adductors', 'Thoracic Spine', 'Hamstrings'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    category: 'Mobility',
    defaultSets: 3,
    defaultReps: '10 reps per side',
    defaultRestSec: 45,
    instructions: [
      'Start in a deep push-up position and step right foot outside right hand into World’s Greatest Stretch.',
      'Reach right arm up toward ceiling, rotating through thoracic spine.',
      'Shift weight back to stretch right hamstring, then return to plank.',
      'Repeat fluidly on alternating sides.'
    ],
    formTips: [
      'Breathe deeply in sync with each rotational movement.',
      'Keep grounded back leg active and knee off the ground.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/4BOTvaHMwBw'
  }
];
