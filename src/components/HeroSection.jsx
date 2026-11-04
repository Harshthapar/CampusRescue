import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  Coins 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-900 via-forest-800 to-emerald-950 text-white shadow-xl shadow-forest-900/10 mb-8 p-6 sm:p-8 lg:p-10 border border-forest-800/60">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-mint-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-warmOrange-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 space-y-5">
          {/* Impact Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-mint-400 text-xs sm:text-sm font-semibold">
            <Leaf className="w-4 h-4 text-mint-400 animate-pulse" />
            <span>Together, we're reducing campus food waste.</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Good food deserves a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-400 via-emerald-300 to-warmOrange-400">
              second chance.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-cream-200/90 max-w-xl leading-relaxed">
            Discover surplus meals from campus canteens and cafes at up to 70% off. Save your wallet while building a zero-food-waste campus.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('discover')}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-mint-500 to-emerald-600 hover:from-mint-400 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-mint-500/25 hover:shadow-mint-500/40 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Surplus Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>View My Reservations</span>
            </button>
          </div>

          {/* Quick value props */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-cream-200/70">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-mint-400" />
              <span>100% Quality Checked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-mint-400" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-warmOrange-400" />
              <span>Affordable Portions</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Illustration & Live Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm">
            {/* Main Hero Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-4 sm:p-5 text-white">
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 group">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Healthy Fresh Surplus Meal"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-forest-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-mint-400 border border-mint-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-warmOrange-400" />
                  <span>Fresh Batch Today</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-warmOrange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md">
                  60% OFF
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-mint-300 font-semibold tracking-wide uppercase">
                    Central Campus Canteen
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-mint-300 px-2 py-0.5 rounded-full border border-mint-500/30 font-medium">
                    Pickup: 5:30 PM
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Nutritious Super Salad & Meal
                </h3>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-white">₹49</span>
                    <span className="text-xs text-gray-300 line-through">₹120</span>
                  </div>
                  <span className="text-xs text-warmOrange-300 font-semibold">
                    Only 4 portions left!
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white text-forest-900 px-4 py-2.5 rounded-2xl shadow-xl border border-cream-200 flex items-center gap-3 animate-float">
              <div className="w-8 h-8 rounded-xl bg-mint-100 flex items-center justify-center text-mint-600 font-bold">
                🌱
              </div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Daily Campus Saving</p>
                <p className="text-xs font-bold text-forest-900">120+ Meals Rescued</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

