import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Utensils, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FoodDetailsModal = () => {
  const { 
    selectedFoodDetails, 
    setSelectedFoodDetails, 
    favorites, 
    toggleFavorite, 
    setReservingFoodItem 
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedFoodDetails(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedFoodDetails]);

  if (!selectedFoodDetails) return null;

  const item = selectedFoodDetails;
  const isFav = favorites.includes(item.id);
  const discountPercent = Math.round(
    ((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100
  );
  const isSoldOut = item.availablePortions <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setSelectedFoodDetails(null)} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header / Image Banner */}
        <div className="relative h-64 sm:h-72 w-full bg-cream-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => setSelectedFoodDetails(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-forest-900 shadow-md transition-all hover:scale-105"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Discount Pill */}
          <div className="absolute top-4 left-4 bg-warmOrange-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md">
            Save {discountPercent}% Today
          </div>

          {/* Banner Details Overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-mint-400 uppercase tracking-wider">
                {item.outletName}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-cream-200">{item.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Price & Portions Highlight */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-cream-100/70 border border-cream-200">
            <div>
              <div className="text-xs text-gray-500 font-semibold">Special Surplus Price</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-forest-900">
                  ₹{item.discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through font-semibold">
                  ₹{item.originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  You save ₹{item.originalPrice - item.discountedPrice}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 font-semibold">Portions Remaining</div>
              <div className={`text-base font-bold mt-0.5 ${isSoldOut ? 'text-red-600' : 'text-forest-900'}`}>
                {isSoldOut ? 'Out of stock' : `${item.availablePortions} available`}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Item Details
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-cream-200">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-forest-900">Pickup Window</div>
                <div className="text-xs text-gray-600 mt-0.5 font-medium">{item.pickupWindow}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-cream-200">
              <div className="w-9 h-9 rounded-lg bg-mint-50 text-mint-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-forest-900">Pickup Location</div>
                <div className="text-xs text-gray-600 mt-0.5 font-medium">{item.location}</div>
              </div>
            </div>
          </div>

          {/* Dietary Information */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
              <Utensils className="w-4 h-4 text-amber-700" />
              <span>Dietary & Allergen Notes</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              {item.dietaryInfo}
            </p>
          </div>

          {/* Conditions */}
          <div className="p-4 rounded-xl bg-cream-50 border border-cream-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-forest-900 mb-1">
              <ShieldCheck className="w-4 h-4 text-mint-600" />
              <span>Campus Sustainability Pledge</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {item.conditions} Please present your digital reservation token at pickup. Cancel at least 30 minutes in advance if you cannot make it so other students can rescue it.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-cream-200/80 bg-white flex items-center justify-between gap-3">
          <button
            onClick={() => toggleFavorite(item.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
              isFav 
                ? 'bg-rose-50 border-rose-300 text-rose-600' 
                : 'bg-white border-cream-200 text-gray-700 hover:border-gray-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
            <span>{isFav ? 'Favorited' : 'Add to Favorites'}</span>
          </button>

          <button
            disabled={isSoldOut}
            onClick={() => {
              setSelectedFoodDetails(null);
              setReservingFoodItem(item);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
              isSoldOut
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                : 'bg-forest-900 hover:bg-forest-950 text-white shadow-forest-900/20 hover:scale-[1.01]'
            }`}
          >
            <span>{isSoldOut ? 'Sold Out' : 'Reserve Food Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

