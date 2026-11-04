import React from 'react';
import { 
  Sparkles, 
  Utensils, 
  Cookie, 
  Croissant, 
  CupSoda, 
  Apple, 
  Salad, 
  LeafyGreen 
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

const ICON_MAP = {
  Sparkles,
  Utensils,
  Cookie,
  Croissant,
  CupSoda,
  Apple,
  Salad,
  LeafyGreen,
};

export const CategorySection = () => {
  const { selectedCategory, setSelectedCategory, setActiveTab } = useApp();

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-forest-900 tracking-tight">
            Browse by Category
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Filter surplus meals by food preference and meal time
          </p>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-bold text-mint-600 hover:text-mint-700 bg-mint-50 px-3 py-1 rounded-full border border-mint-200 transition-colors"
          >
            Reset Category
          </button>
        )}
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-forest-900 text-white border-forest-900 shadow-md shadow-forest-900/20 transform -translate-y-0.5'
                  : 'bg-white text-gray-700 border-cream-200 hover:border-mint-400 hover:bg-cream-100/70'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-mint-500 text-white' : cat.color
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

