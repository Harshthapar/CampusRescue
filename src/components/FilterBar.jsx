import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  ArrowUpDown, 
  Check, 
  X,
  SlidersHorizontal 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FilterBar = ({ activeCount }) => {
  const { filters, setFilters, resetFilters } = useApp();

  const handleToggle = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const hasActiveFilters = 
    filters.vegetarianOnly || 
    filters.veganOnly || 
    filters.availableNowOnly || 
    filters.maxPrice < 200 || 
    filters.sortBy !== 'featured';

  return (
    <div className="bg-white p-4 rounded-2xl border border-cream-200/90 shadow-sm mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-forest-900">Filter & Sort Surplus</h3>
            <span className="text-xs text-gray-500 font-medium">
              Showing {activeCount} surplus items
            </span>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-cream-200/70">
        {/* Vegetarian Only */}
        <button
          onClick={() => handleToggle('vegetarianOnly')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
            filters.vegetarianOnly
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
              : 'bg-white border-cream-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Vegetarian Only</span>
          </div>
          {filters.vegetarianOnly && <Check className="w-3.5 h-3.5 text-emerald-600" />}
        </button>

        {/* Vegan Only */}
        <button
          onClick={() => handleToggle('veganOnly')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
            filters.veganOnly
              ? 'bg-teal-50 border-teal-300 text-teal-900 shadow-sm'
              : 'bg-white border-cream-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <span>Vegan Only</span>
          </div>
          {filters.veganOnly && <Check className="w-3.5 h-3.5 text-teal-600" />}
        </button>

        {/* Available Now (in stock) */}
        <button
          onClick={() => handleToggle('availableNowOnly')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
            filters.availableNowOnly
              ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
              : 'bg-white border-cream-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-warmOrange-500"></span>
            <span>In Stock Only</span>
          </div>
          {filters.availableNowOnly && <Check className="w-3.5 h-3.5 text-warmOrange-600" />}
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-cream-200 text-forest-900 focus:outline-none focus:ring-2 focus:ring-mint-500/50 cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Lowest Price (₹)</option>
            <option value="discount-desc">Highest Discount (%)</option>
            <option value="portions-desc">Most Portions Left</option>
          </select>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <span className="text-gray-500 font-medium">
          Max Price: <strong className="text-forest-900">₹{filters.maxPrice}</strong>
        </span>
        <div className="w-full sm:w-64 flex items-center gap-3">
          <span className="text-[11px] text-gray-400">₹30</span>
          <input
            type="range"
            min="30"
            max="200"
            step="10"
            value={filters.maxPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-mint-600 cursor-pointer"
          />
          <span className="text-[11px] text-gray-400">₹200</span>
        </div>
      </div>
    </div>
  );
};

