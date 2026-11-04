import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  MapPin, 
  Menu, 
  X, 
  Check, 
  Sparkles, 
  ChevronDown 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = ({ onToggleSidebar }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    notifications, 
    setNotifications, 
    setActiveTab 
  } = useApp();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('TIET Campus');
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
        setCampusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-cream-50/90 backdrop-blur-md border-b border-cream-200/80 px-4 sm:px-6 lg:px-8 py-4 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Greetings */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-1 rounded-xl text-forest-900 hover:bg-cream-200/70 lg:hidden transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-forest-900 tracking-tight flex items-center gap-2">
              Good afternoon, Harsh!
              <span className="inline-block animate-bounce text-lg">🌿</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Discover fresh surplus food around your campus.
            </p>
          </div>
        </div>

        {/* Center/Right: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-4" ref={dropdownRef}>
          {/* Search bar (desktop/tablet) */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search food, outlet, or category..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setActiveTab('discover');
              }}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500/50 focus:border-mint-500 transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Campus Location Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setCampusDropdownOpen(!campusDropdownOpen);
                setNotifDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white border border-cream-200 shadow-sm text-forest-900 hover:border-mint-500 transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline font-bold">{selectedCampus}</span>
              <span className="sm:hidden font-bold">TIET</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {campusDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-cream-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Select Campus
                </div>
                {['TIET Campus', 'TIET North Block', 'Hostel Zone', 'Sports Complex'].map((campus) => (
                  <button
                    key={campus}
                    onClick={() => {
                      setSelectedCampus(campus);
                      setCampusDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg flex items-center justify-between font-medium transition-colors ${
                      selectedCampus === campus 
                        ? 'bg-emerald-50 text-emerald-800 font-bold' 
                        : 'text-gray-700 hover:bg-cream-100'
                    }`}
                  >
                    <span>{campus}</span>
                    {selectedCampus === campus && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications button & dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setCampusDropdownOpen(false);
              }}
              className="relative p-2.5 rounded-xl bg-white border border-cream-200 shadow-sm text-forest-900 hover:border-mint-500 hover:bg-cream-50 transition-all"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-warmOrange-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-cream-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-4 border-b border-cream-200/80 flex items-center justify-between bg-cream-50/50">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-forest-900">Campus Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-mint-600 font-semibold hover:text-mint-700"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-cream-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-xs">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3.5 transition-colors ${
                          n.read ? 'bg-white' : 'bg-emerald-50/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-bold text-forest-900">{n.title}</h5>
                          <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile avatar shortcut */}
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Harsh Sharma"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-mint-500 shadow-sm cursor-pointer hover:opacity-90"
              onClick={() => setActiveTab('reservations')}
              title="Harsh Sharma (Student)"
            />
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="mt-3 block md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search surplus meals, outlets, snacks..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setActiveTab('discover');
            }}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500/50"
          />
        </div>
      </div>
    </header>
  );
};

