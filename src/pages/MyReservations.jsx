import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ShoppingBag, 
  Utensils, 
  ArrowRight,
  ShieldAlert,
  Leaf
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyReservations = () => {
  const { 
    reservations, 
    handleCancelReservation, 
    handleMarkCollected, 
    setActiveTab 
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState('all');

  const filteredReservations = reservations.filter((res) => {
    if (activeTabFilter === 'active') {
      return res.status === 'Reserved' || res.status === 'Ready for Pickup';
    }
    if (activeTabFilter === 'collected') {
      return res.status === 'Collected';
    }
    if (activeTabFilter === 'cancelled') {
      return res.status === 'Cancelled';
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ready for Pickup':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-mint-100 text-mint-900 border border-mint-300">
            <span className="w-2 h-2 rounded-full bg-mint-600 animate-ping"></span>
            Ready for Pickup
          </span>
        );
      case 'Reserved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Reserved
          </span>
        );
      case 'Collected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
            Collected
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-300">
            <XCircle className="w-3.5 h-3.5 text-gray-500" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
            My Meal Reservations
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Track pickup windows, collect tokens, and manage active reservations
          </p>
        </div>

        <button
          onClick={() => setActiveTab('discover')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs hover:bg-forest-950 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span>Find More Food</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-cream-200 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: `All (${reservations.length})` },
          { id: 'active', label: `Active Pickups (${reservations.filter(r => r.status === 'Reserved' || r.status === 'Ready for Pickup').length})` },
          { id: 'collected', label: `Collected (${reservations.filter(r => r.status === 'Collected').length})` },
          { id: 'cancelled', label: `Cancelled (${reservations.filter(r => r.status === 'Cancelled').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTabFilter === tab.id
                ? 'bg-forest-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-forest-900 hover:bg-cream-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reservation Cards List */}
      {filteredReservations.length === 0 ? (
        <div className="py-16 px-4 text-center rounded-3xl bg-white border border-cream-200 shadow-sm max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cream-100 text-gray-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-forest-900">
              No Reservations Found
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              You don't have any reservations in this section right now. Explore surplus dishes around campus!
            </p>
          </div>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-5 py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs hover:bg-forest-950 transition-colors"
          >
            Explore Available Food
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((res) => {
            const isActionable = res.status === 'Reserved' || res.status === 'Ready for Pickup';

            return (
              <div
                key={res.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-cream-200 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Food Item & Meta */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-mint-700 bg-mint-50 px-2.5 py-0.5 rounded-md border border-mint-200">
                      {res.id}
                    </span>
                    {getStatusBadge(res.status)}
                    <span className="text-xs text-gray-400 font-medium">
                      Booked: {res.createdAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-forest-900 leading-snug">
                    {res.foodName}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-400">Outlet:</span>
                      <span className="font-bold text-forest-900">{res.outletName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-mint-600" />
                      <span>Pickup: <strong className="text-forest-900">{res.pickupTime}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{res.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-400">Portions:</span>
                      <span className="font-bold text-forest-900">{res.portions} portion(s)</span>
                    </div>
                  </div>
                </div>

                {/* Right: Pricing & Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-cream-200">
                  <div className="text-left lg:text-right">
                    <div className="text-xs text-gray-400 font-medium">Amount to Pay</div>
                    <div className="text-2xl font-black text-forest-900 leading-none mt-1">
                      ₹{res.totalCost}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      ₹{res.pricePerPortion} / portion
                    </div>
                  </div>

                  {isActionable && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCancelReservation(res.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => handleMarkCollected(res.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-forest-900 hover:bg-forest-950 shadow-sm transition-all"
                      >
                        Mark as Collected
                      </button>
                    </div>
                  )}

                  {res.status === 'Collected' && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Rescued & Enjoyed!</span>
                    </div>
                  )}

                  {res.status === 'Cancelled' && (
                    <div className="text-xs font-semibold text-gray-400 italic">
                      Portions returned to campus menu
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

