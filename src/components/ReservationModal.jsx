import React, { useState, useEffect } from 'react';
import { 
  X, 
  Minus, 
  Plus, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReservationModal = () => {
  const { 
    reservingFoodItem, 
    setReservingFoodItem, 
    handleReserve 
  } = useApp();

  const [portions, setPortions] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPortions(1);
  }, [reservingFoodItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setReservingFoodItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setReservingFoodItem]);

  if (!reservingFoodItem) return null;

  const item = reservingFoodItem;
  const maxAvailable = item.availablePortions;
  const totalCost = item.discountedPrice * portions;
  const totalSaved = (item.originalPrice - item.discountedPrice) * portions;

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      const success = handleReserve(item, portions);
      setSubmitting(false);
      if (success) {
        setReservingFoodItem(null);
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setReservingFoodItem(null)} 
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-mint-100 text-mint-700 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-forest-900 leading-tight">
                Confirm Meal Reservation
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Reserve surplus portions before closing time
              </p>
            </div>
          </div>

          <button
            onClick={() => setReservingFoodItem(null)}
            className="w-8 h-8 rounded-full bg-cream-200/60 hover:bg-cream-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Item Card preview */}
          <div className="flex gap-4 p-3.5 rounded-2xl bg-cream-50 border border-cream-200/80">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-mint-700 uppercase tracking-wider block truncate">
                {item.outletName}
              </span>
              <h4 className="font-bold text-sm text-forest-900 truncate mt-0.5">
                {item.name}
              </h4>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-mint-600" />
                <span className="font-medium text-forest-900">{item.pickupWindow}</span>
              </div>
              <div className="text-xs text-gray-400 truncate mt-0.5">
                {item.location}
              </div>
            </div>
          </div>

          {/* Portion Stepper */}
          <div className="p-4 rounded-2xl border border-cream-200 bg-white shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-forest-900">Number of Portions</div>
              <div className="text-xs text-gray-500">
                {maxAvailable} portions available today
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPortions(p => Math.max(1, p - 1))}
                disabled={portions <= 1}
                className="w-9 h-9 rounded-xl bg-cream-100 hover:bg-cream-200 disabled:opacity-40 flex items-center justify-center text-forest-900 transition-colors"
                aria-label="Decrease portions"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-8 text-center text-lg font-black text-forest-900">
                {portions}
              </span>

              <button
                onClick={() => setPortions(p => Math.min(maxAvailable, p + 1))}
                disabled={portions >= maxAvailable}
                className="w-9 h-9 rounded-xl bg-cream-100 hover:bg-cream-200 disabled:opacity-40 flex items-center justify-center text-forest-900 transition-colors"
                aria-label="Increase portions"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-4 rounded-2xl bg-cream-100/60 border border-cream-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-gray-600">
              <span>Price per portion:</span>
              <span className="font-bold text-forest-900">₹{item.discountedPrice}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Portions:</span>
              <span className="font-bold text-forest-900">{portions}x</span>
            </div>
            <div className="flex items-center justify-between text-emerald-700 font-semibold">
              <span>Estimated Student Savings:</span>
              <span>₹{totalSaved}</span>
            </div>
            <div className="pt-2 border-t border-cream-200 flex items-center justify-between text-sm">
              <span className="font-bold text-forest-900">Total To Pay at Counter:</span>
              <span className="text-lg font-black text-forest-900">₹{totalCost}</span>
            </div>
          </div>

          {/* Environmental Reminder */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-mint-50/70 border border-mint-200/80 text-xs text-mint-900">
            <Sparkles className="w-4 h-4 text-mint-600 shrink-0 mt-0.5" />
            <p>
              By reserving these <strong>{portions} portion(s)</strong>, you prevent approx <strong>{(portions * 0.35).toFixed(1)} kg</strong> of greenhouse emissions and food waste!
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-cream-200 bg-white flex items-center justify-end gap-3">
          <button
            onClick={() => setReservingFoodItem(null)}
            className="px-4 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-cream-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={submitting || maxAvailable <= 0}
            className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs sm:text-sm font-bold shadow-md shadow-forest-900/20 transition-all flex items-center gap-2"
          >
            {submitting ? (
              <span>Confirming...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-mint-400" />
                <span>Confirm Reservation (₹{totalCost})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

