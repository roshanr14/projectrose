import { MealRecipe } from '../types';

export const mockMealRecipes: MealRecipe[] = [
  {
    id: 'rec-1',
    title: 'Anabolic Power Berry Overnight Oats',
    category: 'Breakfast',
    calories: 480,
    proteinG: 38,
    carbsG: 56,
    fatG: 10,
    prepTimeMin: 5,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
    tags: ['High Protein', 'Meal Prep', 'Quick Breakfast'],
    ingredients: [
      '60g Rolled Oats',
      '1 scoop (30g) Whey or Plant Isolate Protein (Vanilla)',
      '150ml Unsweetened Almond Milk',
      '100g 0% Greek Yogurt',
      '50g Fresh Blueberries & Strawberries',
      '10g Chia Seeds',
      'Pinch of Cinnamon'
    ],
    instructions: [
      'In a glass jar, mix rolled oats, protein powder, and chia seeds.',
      'Pour in almond milk and Greek yogurt, stirring thoroughly until no dry powder clumps remain.',
      'Cover with lid and refrigerate overnight (or minimum 4 hours).',
      'Top with fresh blueberries and cinnamon right before eating.'
    ]
  },
  {
    id: 'rec-2',
    title: 'Grilled Lemon Herb Chicken & Quinoa Harvest Bowl',
    category: 'Lunch',
    calories: 560,
    proteinG: 48,
    carbsG: 52,
    fatG: 14,
    prepTimeMin: 20,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tags: ['Clean Fuel', 'High Protein', 'Post Workout'],
    ingredients: [
      '180g Boneless Skinless Chicken Breast',
      '120g Cooked Tri-Color Quinoa',
      '100g Roasted Sweet Potato cubes',
      '80g Steamed Broccoli Florets',
      '30g Sliced Avocado',
      '1 tbsp Lemon Juice, Garlic Powder, Oregano & Olive Oil dressing'
    ],
    instructions: [
      'Season chicken breast with garlic powder, smoked paprika, oregano, salt, and pepper.',
      'Grill or pan-sear chicken on medium-high heat for 6-7 minutes per side until internal temperature reaches 165°F (74°C).',
      'Assemble bowl starting with cooked quinoa as the base, followed by roasted sweet potatoes and steamed broccoli.',
      'Slice chicken into strips, arrange on top with sliced avocado, and drizzle with fresh lemon-herb dressing.'
    ]
  },
  {
    id: 'rec-3',
    title: 'Crispy Pan-Seared Salmon with Asparagus & Jasmine Rice',
    category: 'Dinner',
    calories: 620,
    proteinG: 42,
    carbsG: 45,
    fatG: 22,
    prepTimeMin: 20,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    tags: ['Omega-3 Rich', 'High Protein', 'Heart Healthy'],
    ingredients: [
      '180g Wild Salmon Fillet (Skin on)',
      '130g Steamed Fragrant Jasmine Rice',
      '120g Fresh Asparagus spears',
      '1 tsp Olive Oil',
      '1 clove Minced Garlic',
      'Fresh dill & Lemon wedges'
    ],
    instructions: [
      'Pat salmon dry with paper towels and season with sea salt and cracked black pepper.',
      'Heat olive oil in a non-stick skillet over medium-high heat. Place salmon skin-side down and press gently for 4 minutes until skin is golden and crispy.',
      'Flip salmon and cook for an additional 3 minutes.',
      'In the same pan, saute asparagus with minced garlic for 3-4 minutes.',
      'Plate with warm jasmine rice, fresh dill, and squeeze lemon wedge over the fillet.'
    ]
  },
  {
    id: 'rec-4',
    title: 'Electrolyte Muscle Recovery Smoothie',
    category: 'Smoothie',
    calories: 340,
    proteinG: 32,
    carbsG: 42,
    fatG: 4,
    prepTimeMin: 3,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    tags: ['Fast Recovery', 'Post Workout', 'Electrolytes'],
    ingredients: [
      '1 scoop (30g) Whey Protein Isolate (Chocolate or Natural)',
      '1 medium Frozen Banana',
      '150g Frozen Dark Cherries (Anti-inflammatory)',
      '200ml Coconut Water (Natural potassium & electrolytes)',
      'Handful of baby spinach',
      'Ice cubes'
    ],
    instructions: [
      'Add coconut water and protein powder to high-speed blender.',
      'Add frozen banana, dark cherries, spinach, and ice.',
      'Blend on high for 45-60 seconds until creamy and smooth.',
      'Consume within 30-45 minutes post-workout for optimal glycogen and protein replenishment.'
    ]
  }
];
