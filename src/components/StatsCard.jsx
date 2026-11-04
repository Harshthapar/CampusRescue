import React from 'react';
import { 
  UtensilsCrossed, 
  Scale, 
  Wallet, 
  Building2, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { IMPACT_METRICS } from '../data/mockData';

export const StatsCard = () => {
  const stats = [
    {
      id: 'meals',
      icon: UtensilsCrossed,
      label: 'Meals Rescued',
      value: IMPACT_METRICS.mealsRescued.toLocaleString(),
      suffix: '',
      trend: '+18% this week',
      trendUp: true,
      bg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-700',
      borderColor: 'border-emerald-200/60',
    },
    {
      id: 'waste',
      icon: Scale,
      label: 'Food Saved',
      value: `${IMPACT_METRICS.foodSavedKg} kg`,
      suffix: '',
      trend: '+24 kg today',
      trendUp: true,
      bg: 'bg-mint-500/10',
      iconColor: 'text-teal-700',
      borderColor: 'border-teal-200/60',
    },
    {
      id: 'money',
      icon: Wallet,
      label: 'Money Saved',
      value: `₹${IMPACT_METRICS.moneySavedInr.toLocaleString()}`,
      suffix: '',
      trend: 'Avg ₹65 / meal',
      trendUp: true,
      bg: 'bg-warmOrange-500/10',
      iconColor: 'text-warmOrange-700',
      borderColor: 'border-orange-200/60',
    },
    {
      id: 'partners',
      icon: Building2,
      label: 'Food Partners',
      value: IMPACT_METRICS.foodPartnersCount,
      suffix: ' Outlets',
      trend: 'Active on campus',
      trendUp: true,
      bg: 'bg-amber-500/10',
      iconColor: 'text-amber-800',
      borderColor: 'border-amber-200/60',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className={`p-5 rounded-2xl bg-white border ${stat.borderColor} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}
              >
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <TrendingUp className="w-3 h-3 text-emerald-800" />
                <span>{stat.trend}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
                {stat.value}
                <span className="text-sm font-semibold text-gray-500">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

