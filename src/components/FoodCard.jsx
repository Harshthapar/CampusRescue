import React from 'react';
import { 
  Heart, 
  Clock, 
  MapPin, 
  Star, 
  Sparkles, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FoodCard = ({ item }) => {
  const { 
    favorites, 
    toggleFavorite, 
    setSelectedFoodDetails, 
    setReservingFoodItem 
  } = useApp();

  const isFav = favorites.includes(item.id);
  const discountPercent = Math.round(
    ((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100
  );
  const isSoldOut = item.availablePortions <= 0;
  const isLowStock = item.availablePortions > 0 && item.availablePortions <= 3;

  return (
    <div
      onClick={() => setSelectedFoodDetails(item)}
      className="group relative bg-white rounded-2xl border border-cream-200/90 shadow-sm hover:shadow-xl hover:border-mint-300 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Media / Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-cream-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-10"
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'text-rose-500 fill-rose-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-warmOrange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
          <span>{discountPercent}% OFF</span>
        </div>

        {/* Veg / Non-Veg & Category Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5">
            {/* Indian Veg Icon standard: green circle inside square */}
            <div className="w-4 h-4 rounded-sm border border-emerald-400 bg-white/90 flex items-center justify-center p-0.5">
              <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
            </div>
            <span className="font-semibold text-white text-[11px] drop-shadow-md">
              {item.category}
            </span>
            {item.isVegan && (
              <span className="bg-teal-900/80 text-teal-300 font-bold text-[10px] px-1.5 py-0.5 rounded border border-teal-500/40">
                Vegan
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold text-amber-300 border border-white/20">
            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Outlet Info */}
          <div className="text-xs font-bold text-mint-700 uppercase tracking-wider mb-1 line-clamp-1">
            {item.outletName}
          </div>

          {/* Item Name */}
          <h3 className="font-bold text-base text-forest-900 group-hover:text-mint-700 transition-colors line-clamp-1">
            {item.name}
          </h3>

          {/* Location & Pickup window */}
          <div className="mt-2 space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-mint-600 shrink-0" />
              <span className="font-medium text-forest-900">Pickup: {item.pickupWindow}</span>
            </div>
          </div>
        </div>

        {/* Pricing, Portions & Action */}
        <div className="mt-4 pt-3 border-t border-cream-200/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-forest-900">
                  ₹{item.discountedPrice}
                </span>
                <span className="text-xs text-gray-400 line-through font-medium">
                  ₹{item.originalPrice}
                </span>
              </div>
              <span className="text-[10px] text-gray-400">per portion</span>
            </div>

            {/* Availability Badge */}
            <div className="text-right">
              {isSoldOut ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                  Sold Out
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-warmOrange-800 bg-warmOrange-100 px-2 py-0.5 rounded-full animate-pulse">
                  Only {item.availablePortions} left!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {item.availablePortions} available
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            disabled={isSoldOut}
            onClick={(e) => {
              e.stopPropagation();
              setReservingFoodItem(item);
            }}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              isSoldOut
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-emerald-50 text-forest-900 hover:bg-forest-900 hover:text-white border border-emerald-300 shadow-sm'
            }`}
          >
            <span>{isSoldOut ? 'Sold Out Today' : 'Reserve Portion'}</span>
            {!isSoldOut && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

