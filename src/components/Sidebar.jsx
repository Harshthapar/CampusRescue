import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  CalendarCheck, 
  Store, 
  LineChart, 
  Leaf, 
  Heart,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, reservations, favorites } = useApp();

  const activeReservationsCount = reservations.filter(
    r => r.status === 'Reserved' || r.status === 'Ready for Pickup'
  ).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'discover',
      label: 'Discover Food',
      icon: Compass,
    },
    {
      id: 'reservations',
      label: 'My Reservations',
      icon: CalendarCheck,
      badge: activeReservationsCount > 0 ? activeReservationsCount : null
    },
    {
      id: 'partners',
      label: 'Food Partners',
      icon: Store,
    },
    {
      id: 'impact',
      label: 'Impact Dashboard',
      icon: LineChart,
    },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-forest-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-white/90 backdrop-blur-md border-r border-cream-200 z-50 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div>
          <div className="p-6 border-b border-cream-200/60">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-mint-500 to-forest-800 flex items-center justify-center text-white shadow-md shadow-mint-500/20">
                <Leaf className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-tight text-forest-900 leading-tight">
                  Campus<span className="text-mint-600">Rescue</span>
                </h1>
                <p className="text-xs font-semibold text-emerald-700/80 tracking-wide uppercase">
                  Eat Smart. Waste Less.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-600">
              Platform Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-forest-900 font-semibold shadow-sm border border-emerald-200/60'
                      : 'text-gray-700 hover:text-forest-900 hover:bg-cream-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-mint-600' : 'text-gray-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-warmOrange-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Favorites Shortcut */}
            <div className="pt-4 mt-3 border-t border-cream-200/60">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                Saved Items
              </div>
              <button
                onClick={() => handleNavClick('discover')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm text-gray-700 hover:bg-cream-100/80 hover:text-forest-900 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Favorite Surplus</span>
                </div>
                <span className="text-xs bg-cream-200/70 text-gray-600 font-semibold px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-cream-200/80 bg-cream-50/50">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-cream-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Harsh Sharma"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-mint-400"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-forest-900 leading-tight">Harsh Sharma</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-mint-600" />
                  <span className="text-xs text-gray-500 font-medium">Student • TIET</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

