import React, { useState } from 'react';
import { mockMealRecipes } from '../../data/mockNutrition';
import { MealRecipe, FitnessGoal } from '../../types';
import { Utensils, Calculator, Flame, Zap, Clock, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { AuthMode } from '../auth/AuthModal';

interface NutritionSectionProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export const NutritionSection: React.FC<NutritionSectionProps> = ({ onOpenAuth }) => {
  const [calcWeightKg, setCalcWeightKg] = useState<number>(75);
  const [calcGoal, setCalcGoal] = useState<FitnessGoal>('fat_loss');
  const [calcActivity, setCalcActivity] = useState<string>('moderate');
  const [activeRecipeModal, setActiveRecipeModal] = useState<MealRecipe | null>(null);

  // Dynamic Macro Calculation Formula
  const calculateMacros = () => {
    let bmr = 10 * calcWeightKg + 6.25 * 175 - 5 * 28 + 5;
    let activityMultiplier = 1.55; // moderate
    if (calcActivity === 'light') activityMultiplier = 1.375;
    if (calcActivity === 'intense') activityMultiplier = 1.725;

    let tdee = Math.round(bmr * activityMultiplier);
    let targetCalories = tdee;
    if (calcGoal === 'fat_loss') targetCalories = Math.round(tdee - 450);
    if (calcGoal === 'muscle_building') targetCalories = Math.round(tdee + 300);

    // Protein: 2.0g per kg
    const proteinG = Math.round(calcWeightKg * 2.0);
    const proteinCal = proteinG * 4;

    // Fat: 25% of calories
    const fatCal = targetCalories * 0.25;
    const fatG = Math.round(fatCal / 9);

    // Carbs: Remaining calories
    const carbCal = targetCalories - proteinCal - fatCal;
    const carbsG = Math.max(50, Math.round(carbCal / 4));

    return { targetCalories, proteinG, carbsG, fatG };
  };

  const macros = calculateMacros();

  return (
    <section id="nutrition" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag tag-coral">
            <Utensils size={14} />
            <span>PERFORMANCE FUEL</span>
          </div>
          <h2 className="section-title">NUTRITION & MACRONUTRIENT MASTERY</h2>
          <p className="section-subtitle">
            Fuel your training without counting every grain of rice or falling into restrictive crash diet traps. Real food optimized for body composition.
          </p>
        </div>

        {/* Interactive Macro Calculator & Guidelines */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px', marginBottom: '70px', alignItems: 'center' }} className="nutrition-grid">
          
          {/* Interactive Calculator Card */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, rgba(18, 24, 34, 0.95) 0%, rgba(12, 16, 23, 0.95) 100%)',
              border: '1px solid var(--border-medium)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 71, 87, 0.15)',
                color: 'var(--accent-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calculator size={20} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Channel Daily Macro Calculator</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.8125rem' }}>Body Weight (kg)</label>
                <input
                  type="number"
                  min="40"
                  max="180"
                  className="form-input"
                  value={calcWeightKg}
                  onChange={(e) => setCalcWeightKg(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.8125rem' }}>Daily Activity</label>
                <select
                  className="form-input"
                  value={calcActivity}
                  onChange={(e) => setCalcActivity(e.target.value)}
                  style={{ background: 'var(--bg-input)' }}
                >
                  <option value="light">Light (1-2 workouts/wk)</option>
                  <option value="moderate">Moderate (3-4 workouts/wk)</option>
                  <option value="intense">Intense (5-6 workouts/wk)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ fontSize: '0.8125rem' }}>Target Fitness Goal</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'fat_loss', label: 'Fat Loss' },
                  { id: 'general_health', label: 'Maintenance' },
                  { id: 'muscle_building', label: 'Muscle Gain' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setCalcGoal(g.id as FitnessGoal)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: calcGoal === g.id ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.04)',
                      color: calcGoal === g.id ? '#fff' : 'var(--text-secondary)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      border: calcGoal === g.id ? '1px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Target Results Box */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Estimated Daily Energy:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff6b81' }}>
                  {macros.targetCalories} <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>kcal/day</span>
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>PROTEIN</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{macros.proteinG}g</div>
                </div>
                <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#22d3ee', fontWeight: 600 }}>CARBS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{macros.carbsG}g</div>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>FATS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{macros.fatG}g</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Explainer & Value Proposition */}
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.25 }}>
              Precision Nutrition That Actually Fits Your Daily Routine
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Inside your personal dashboard, your target macros automatically adjust as your body weight and weekly workout volume evolve. Log meals in seconds with our high-protein recipe database.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Optimal Protein Partitioning</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Target 1.8g - 2.2g of high biological value protein per kg to optimize muscle protein synthesis (MPS).</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Zap size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Peri-Workout Carbohydrates</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Strategic carbohydrate timing before and after lifting maximizes glycogen replenishment and reduces soreness.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenAuth('signup')}
              className="btn btn-coral"
              style={{ padding: '12px 24px' }}
            >
              <span>Save My Targets to Dashboard</span>
            </button>
          </div>

        </div>

        {/* Featured High-Protein Recipe Cards */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Channel High-Protein Recipe Vault</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Quick to prepare, delicious, and macro-balanced.</p>
            </div>
          </div>

          <div className="grid-4">
            {mockMealRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="glass-card card-hover-effect"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--bg-card-solid)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(19, 25, 36, 0.95) 0%, transparent 60%)'
                    }} />
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span className="badge badge-coral">{recipe.category}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.7)', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: '#fff' }}>
                      <Clock size={12} />
                      <span>{recipe.prepTimeMin} min prep</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                      {recipe.title}
                    </h4>

                    {/* Macros */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '12px', background: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: 'var(--radius-md)' }}>
                      <span><strong>{recipe.calories}</strong> kcal</span>
                      <span style={{ color: 'var(--accent-primary)' }}><strong>{recipe.proteinG}g</strong> Pro</span>
                      <span><strong>{recipe.carbsG}g</strong> Carb</span>
                      <span><strong>{recipe.fatG}g</strong> Fat</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 16px 16px 16px' }}>
                  <button
                    onClick={() => setActiveRecipeModal(recipe)}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '7px 12px', fontSize: '0.8125rem' }}
                  >
                    <span>View Ingredients & Prep</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recipe Detail Modal */}
      {activeRecipeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 7, 10, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveRecipeModal(null);
          }}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '650px',
              background: 'var(--bg-card-solid)',
              borderRadius: 'var(--radius-xl)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveRecipeModal(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'var(--text-muted)',
                padding: '6px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-coral">{activeRecipeModal.category}</span>
              <span className="badge badge-emerald">{activeRecipeModal.proteinG}g Protein</span>
              <span className="badge badge-amber">{activeRecipeModal.calories} Calories</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
              {activeRecipeModal.title}
            </h2>

            {/* Ingredients */}
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Ingredients</h4>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {activeRecipeModal.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            {/* Preparation Steps */}
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Preparation Steps</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {activeRecipeModal.instructions.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>{i + 1}.</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveRecipeModal(null)}
              className="btn btn-outline"
              style={{ width: '100%', padding: '12px' }}
            >
              Close Recipe
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .nutrition-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
