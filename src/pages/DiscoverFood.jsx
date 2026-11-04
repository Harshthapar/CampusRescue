import React, { useMemo } from 'react';
import { 
  Search, 
  X, 
  RotateCcw, 
  PackageX, 
  Filter, 
  Sparkles,
  Store
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategorySection } from '../components/CategoryCard';
import { FilterBar } from '../components/FilterBar';
import { FoodCard } from '../components/FoodCard';

export const DiscoverFood = () => {
  const { 
    foodItems, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    selectedPartner, 
    setSelectedPartner, 
    filters, 
    resetFilters 
  } = useApp();

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      // Search field matches
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesOutlet = item.outletName.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        if (!matchesName && !matchesOutlet && !matchesCategory && !matchesLocation) {
          return false;
        }
      }

      // Selected Partner filter
      if (selectedPartner && item.outletName !== selectedPartner) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Vegetarian') {
          if (!item.isVeg) return false;
        } else if (selectedCategory === 'Vegan') {
          if (!item.isVegan) return false;
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      // Dietary filters
      if (filters.vegetarianOnly && !item.isVeg) return false;
      if (filters.veganOnly && !item.isVegan) return false;

      // Available now filter
      if (filters.availableNowOnly && item.availablePortions <= 0) return false;

      // Price filter
      if (item.discountedPrice > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return a.discountedPrice - b.discountedPrice;
      }
      if (filters.sortBy === 'discount-desc') {
        const discA = (a.originalPrice - a.discountedPrice) / a.originalPrice;
        const discB = (b.originalPrice - b.discountedPrice) / b.originalPrice;
        return discB - discA;
      }
      if (filters.sortBy === 'portions-desc') {
        return b.availablePortions - a.availablePortions;
      }
      // default: featured (available items first)
      return b.availablePortions - a.availablePortions;
    });
  }, [foodItems, searchQuery, selectedCategory, selectedPartner, filters]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Partner Selected Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
            Discover Campus Surplus Food
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Real-time surplus listings from campus kitchens with pickup timings
          </p>
        </div>

        {selectedPartner && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-mint-50 border border-mint-200 text-xs text-mint-900 font-bold self-start sm:self-auto">
            <Store className="w-3.5 h-3.5 text-mint-700" />
            <span>Outlet: {selectedPartner}</span>
            <button
              onClick={() => setSelectedPartner(null)}
              className="text-gray-400 hover:text-gray-700 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Slider */}
      <CategorySection />

      {/* Filter and Sorting Control Bar */}
      <FilterBar activeCount={filteredItems.length} />

      {/* Food Listings Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="py-16 px-4 text-center rounded-3xl bg-white border border-cream-200 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <PackageX className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-forest-900">
              No Surplus Food Found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              We couldn't find any surplus food matching your active filters or search terms. Try clearing filters or searching for something else!
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs hover:bg-forest-950 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
