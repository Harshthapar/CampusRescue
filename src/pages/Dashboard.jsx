import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Store, 
  CalendarCheck, 
  Heart, 
  TrendingUp,
  Leaf 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroSection } from '../components/HeroSection';
import { StatsCard } from '../components/StatsCard';
import { CategorySection } from '../components/CategoryCard';
import { FoodCard } from '../components/FoodCard';

export const Dashboard = () => {
  const { 
    foodItems, 
    foodPartners, 
    reservations, 
    setActiveTab, 
    setSelectedPartner 
  } = useApp();

  // Highlighted urgent surplus (high discount or limited portions)
  const urgentSurplus = foodItems
    .filter(i => i.availablePortions > 0)
    .slice(0, 4);

  const activeReservations = reservations.filter(
    r => r.status === 'Reserved' || r.status === 'Ready for Pickup'
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <HeroSection />

      {/* 4 Impact Dashboard Metric Cards */}
      <StatsCard />

      {/* Active Reservation Alert if any */}
      {activeReservations.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-mint-50 to-cream-100 border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Active Pickup Scheduled
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  {activeReservations[0].id}
                </span>
              </div>
              <p className="text-sm font-bold text-forest-900 mt-0.5">
                {activeReservations[0].foodName} ({activeReservations[0].portions}x portion)
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Collect at {activeReservations[0].outletName} • Window: {activeReservations[0].pickupTime}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('reservations')}
            className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto shrink-0"
          >
            Manage Reservation
          </button>
        </div>
      )}

      {/* Category Filter Cards */}
      <CategorySection />

      {/* Featured Surplus Deals Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-warmOrange-500 fill-warmOrange-500" />
              <h2 className="text-lg sm:text-xl font-bold text-forest-900 tracking-tight">
                Closing-Time Surplus Drops
              </h2>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Fresh surplus ready for immediate pickup before campus outlets close
            </p>
          </div>

          <button
            onClick={() => setActiveTab('discover')}
            className="flex items-center gap-1.5 text-xs font-bold text-mint-700 hover:text-mint-800 transition-colors"
          >
            <span>See All ({foodItems.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {urgentSurplus.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Top Campus Partners Carousel/Grid Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-mint-600" />
              <h2 className="text-lg sm:text-xl font-bold text-forest-900 tracking-tight">
                Featured Campus Food Partners
              </h2>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Supporting student food rescue across central mess, cafes, and bakery
            </p>
          </div>

          <button
            onClick={() => setActiveTab('partners')}
            className="flex items-center gap-1.5 text-xs font-bold text-mint-700 hover:text-mint-800 transition-colors"
          >
            <span>View All Partners</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {foodPartners.slice(0, 3).map((partner) => {
            const partnerItemsCount = foodItems.filter(
              f => f.outletName === partner.name && f.availablePortions > 0
            ).length;

            return (
              <div
                key={partner.id}
                onClick={() => {
                  setSelectedPartner(partner.name);
                  setActiveTab('discover');
                }}
                className="group p-4 rounded-2xl bg-white border border-cream-200/90 shadow-sm hover:shadow-md hover:border-mint-300 transition-all cursor-pointer flex gap-4 items-center"
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-forest-900 truncate">
                      {partner.name}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {partner.location}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {partnerItemsCount} surplus available
                    </span>
                    <span className="text-[11px] text-gray-400 font-semibold">
                      ★ {partner.rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
