import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockMealRecipes } from '../../data/mockNutrition';
import { MealRecipe } from '../../types';
import { Utensils, Plus, Check, Flame, PieChart, Shield, Clock, X } from 'lucide-react';

export const NutritionTab: React.FC = () => {
  const { user, dailyActivity } = useAuth();
  
  const [loggedMeals, setLoggedMeals] = useState([
    { id: '1', slot: 'Breakfast', name: 'Power Berry Overnight Oats', calories: 480, protein: 38, carbs: 56, fat: 10 },
    { id: '2', slot: 'Lunch', name: 'Grilled Lemon Herb Chicken Bowl', calories: 560, protein: 48, carbs: 52, fat: 14 }
  ]);

  const [selectedRecipeModal, setSelectedRecipeModal] = useState<MealRecipe | null>(null);

  const totalCaloriesLogged = loggedMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalProteinLogged = loggedMeals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbsLogged = loggedMeals.reduce((acc, m) => acc + m.carbs, 0);
  const totalFatLogged = loggedMeals.reduce((acc, m) => acc + m.fat, 0);

  const calorieTarget = user?.dailyCalorieTarget || 2250;
  const proteinTarget = 160;
  const carbsTarget = 220;
  const fatTarget = 65;

  const handleAddRecipeToLog = (recipe: MealRecipe) => {
    setLoggedMeals(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        slot: recipe.category === 'Breakfast' ? 'Breakfast' : recipe.category === 'Lunch' ? 'Lunch' : recipe.category === 'Dinner' ? 'Dinner' : 'Snack',
        name: recipe.title,
        calories: recipe.calories,
        protein: recipe.proteinG,
        carbs: recipe.carbsG,
        fat: recipe.fatG
      }
    ]);
    setSelectedRecipeModal(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Macro Target Summary Header */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 24, 34, 0.95) 0%, rgba(12, 16, 23, 0.95) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          border: '1px solid var(--border-medium)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div>
            <span className="badge badge-coral">DAILY MACRO BREAKDOWN</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '6px' }}>Energy & Macronutrient Targets</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Total Daily Budget</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ff6b81' }}>
              {totalCaloriesLogged} / {calorieTarget} <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>kcal</span>
            </div>
          </div>
        </div>

        {/* 3 Macro Progress Bars */}
        <div className="grid-3" style={{ gap: '16px' }}>
          
          {/* Protein */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: 'var(--accent-primary)' }}>PROTEIN</span>
              <span>{totalProteinLogged}g / {proteinTarget}g</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (totalProteinLogged / proteinTarget) * 100)}%`, height: '100%', background: 'var(--accent-primary)' }} />
            </div>
          </div>

          {/* Carbs */}
          <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#22d3ee' }}>CARBOHYDRATES</span>
              <span>{totalCarbsLogged}g / {carbsTarget}g</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (totalCarbsLogged / carbsTarget) * 100)}%`, height: '100%', background: '#22d3ee' }} />
            </div>
          </div>

          {/* Fats */}
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#fbbf24' }}>HEALTHY FATS</span>
              <span>{totalFatLogged}g / {fatTarget}g</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (totalFatLogged / fatTarget) * 100)}%`, height: '100%', background: '#fbbf24' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Logged Meals For Today */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Today's Logged Nutrition ({loggedMeals.length} Entries)</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {loggedMeals.map((meal) => (
            <div
              key={meal.id}
              style={{
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-coral">{meal.slot}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{meal.name}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <span><strong>{meal.calories}</strong> kcal</span>
                <span style={{ color: 'var(--accent-primary)' }}><strong>{meal.protein}g</strong> P</span>
                <span><strong>{meal.carbs}g</strong> C</span>
                <span><strong>{meal.fat}g</strong> F</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Protein Recipe Quick-Add */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>
          Quick-Add Channel High-Protein Recipes
        </h3>

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
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                />
                <div style={{ padding: '14px' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '6px' }}>{recipe.title}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {recipe.calories} kcal • {recipe.proteinG}g Protein
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 14px 14px 14px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedRecipeModal(recipe)}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  Recipe
                </button>
                <button
                  onClick={() => handleAddRecipeToLog(recipe)}
                  className="btn btn-coral btn-sm"
                  style={{ flex: 1 }}
                >
                  <Plus size={14} />
                  <span>Log</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedRecipeModal && (
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
            if (e.target === e.currentTarget) setSelectedRecipeModal(null);
          }}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '600px',
              background: 'var(--bg-card-solid)',
              borderRadius: 'var(--radius-xl)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '30px',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedRecipeModal(null)}
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

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px' }}>
              {selectedRecipeModal.title}
            </h2>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <span className="badge badge-coral">{selectedRecipeModal.calories} kcal</span>
              <span className="badge badge-emerald">{selectedRecipeModal.proteinG}g Protein</span>
            </div>

            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '8px' }}>Ingredients</h4>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
              {selectedRecipeModal.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <button
              onClick={() => handleAddRecipeToLog(selectedRecipeModal)}
              className="btn btn-coral"
              style={{ width: '100%', padding: '12px' }}
            >
              Add to Today's Food Log
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
