import React from 'react';
import { 
  Leaf, 
  Scale, 
  Wallet, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Sparkles,
  TreeDeciduous,
  Droplets,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { IMPACT_METRICS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const ImpactDashboard = () => {
  const { reservations } = useApp();

  const completedCount = reservations.filter(r => r.status === 'Collected').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Leaf className="w-3.5 h-3.5" />
            <span>Campus Sustainability Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
            Your Campus Impact
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Transparent metrics tracking food surplus diverted from TIET campus landfills
          </p>
        </div>

        {/* Motivational Quote Banner */}
        <div className="p-3.5 rounded-2xl bg-white border border-cream-200 shadow-sm max-w-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-mint-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-forest-900 leading-snug">
            "Every rescued meal is a step toward a greener campus."
          </p>
        </div>
      </div>

      {/* 4 Impact Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Meals Rescued
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-forest-900 mt-2">
            {IMPACT_METRICS.mealsRescued.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-800 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% from last month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-teal-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Food Waste Prevented
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-forest-900 mt-2">
            {IMPACT_METRICS.foodSavedKg} kg
          </div>
          <div className="text-xs text-teal-800 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Equivalent to 850 kg CO₂</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-orange-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Student Money Saved
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-warmOrange-800 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-forest-900 mt-2">
            ₹{IMPACT_METRICS.moneySavedInr.toLocaleString()}
          </div>
          <div className="text-xs text-warmOrange-800 font-bold mt-1">
            Affordable dining for all students
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Completed Pickups
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-forest-900 mt-2">
            {completedCount}
          </div>
          <div className="text-xs text-amber-800 font-bold mt-1">
            Your personal campus rescues
          </div>
        </div>
      </div>

      {/* Main Charts Section using Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-cream-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-forest-900">
                Surplus Food Rescue Trend (Monthly)
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Growth in meals saved across campus cafeterias
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <span className="w-3 h-3 rounded-full bg-mint-500"></span> Meals Rescued
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={IMPACT_METRICS.monthlyTrend}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3EDE2" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#E2E8F0' }} 
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#E2E8F0' }} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11291D',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#34D399' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="meals" 
                  stroke="#10B981" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorMeals)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-cream-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-forest-900">
              Surplus By Food Category
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Distribution of rescued surplus (%)
            </p>
          </div>

          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={IMPACT_METRICS.categoryBreakdown} layout="vertical">
                <XAxis type="number" hide domain={[0, 50]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={11} 
                  width={110}
                  stroke="#475569"
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: '#11291D',
                    borderRadius: '10px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {IMPACT_METRICS.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-cream-200 text-xs text-gray-500">
            Meals form 45% of total surplus recovered before kitchen night closing.
          </div>
        </div>
      </div>

      {/* Real-World Equivalence Badges */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-forest-900 to-forest-950 text-white shadow-xl">
        <div className="max-w-xl mb-6">
          <h3 className="text-lg sm:text-xl font-bold">
            Real Environmental Savings on TIET Campus
          </h3>
          <p className="text-xs text-cream-200 mt-1">
            Calculated using standard Food and Agriculture Organization (FAO) food footprint coefficients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mint-400 text-forest-950 flex items-center justify-center shrink-0 font-bold">
              <TreeDeciduous className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold">42 Trees</div>
              <div className="text-xs text-cream-200/80">CO₂ offset equivalent</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-400 text-forest-950 flex items-center justify-center shrink-0 font-bold">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold">18,500 L</div>
              <div className="text-xs text-cream-200/80">Water footprint saved</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warmOrange-400 text-forest-950 flex items-center justify-center shrink-0 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold">450 kWh</div>
              <div className="text-xs text-cream-200/80">Energy conserved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

