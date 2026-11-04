import React from 'react';
import { 
  Store, 
  MapPin, 
  Star, 
  Clock, 
  ArrowRight, 
  Utensils, 
  Leaf,
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FoodPartners = () => {
  const { foodPartners, foodItems, setSelectedPartner, setActiveTab } = useApp();

  const handlePartnerClick = (partnerName) => {
    setSelectedPartner(partnerName);
    setActiveTab('discover');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
          Campus Food Partners
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          Participating campus canteens, mess dining halls, and student cafes reducing waste
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodPartners.map((partner) => {
          // Calculate available items for this partner
          const activeItems = foodItems.filter(
            f => f.outletName === partner.name && f.availablePortions > 0
          );
          const totalPortions = activeItems.reduce((acc, curr) => acc + curr.availablePortions, 0);

          return (
            <div
              key={partner.id}
              onClick={() => handlePartnerClick(partner.name)}
              className="group bg-white rounded-2xl border border-cream-200/90 shadow-sm hover:shadow-xl hover:border-mint-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-cream-100">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-forest-900 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{partner.rating}</span>
                    <span className="text-[10px] text-gray-400 font-normal">({partner.reviewsCount})</span>
                  </div>

                  {/* Rescue Stat Badge */}
                  <div className="absolute bottom-3 left-3 bg-forest-900/90 text-mint-400 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5 border border-mint-500/20">
                    <Leaf className="w-3.5 h-3.5 text-mint-400" />
                    <span>{partner.rescueCount}+ Meals Rescued</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-forest-900 group-hover:text-mint-700 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>

                  {/* Meta Details */}
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{partner.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-mint-600 shrink-0" />
                      <span>Operating hours: {partner.timing}</span>
                    </div>
                  </div>

                  {/* Categories Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {partner.categories.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] font-medium bg-cream-100 text-forest-900 px-2 py-0.5 rounded-md border border-cream-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 border-t border-cream-200/80 bg-cream-50/50 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 block">Surplus Portions</span>
                  <span className="text-xs font-bold text-forest-900">
                    {totalPortions > 0 ? (
                      <span className="text-emerald-800 font-extrabold">
                        {totalPortions} portions left
                      </span>
                    ) : (
                      <span className="text-gray-400">Restocking soon</span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-mint-700 group-hover:text-mint-800 transition-colors">
                  <span>View Surplus</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

