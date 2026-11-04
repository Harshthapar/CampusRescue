import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FoodDetailsModal } from './components/FoodDetailsModal';
import { ReservationModal } from './components/ReservationModal';
import { ToastContainer } from './components/Toast';

// Pages
import { Dashboard } from './pages/Dashboard';
import { DiscoverFood } from './pages/DiscoverFood';
import { MyReservations } from './pages/MyReservations';
import { FoodPartners } from './pages/FoodPartners';
import { ImpactDashboard } from './pages/ImpactDashboard';

export const AppContent = () => {
  const { activeTab, toasts, removeToast } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'discover':
        return <DiscoverFood />;
      case 'reservations':
        return <MyReservations />;
      case 'partners':
        return <FoodPartners />;
      case 'impact':
        return <ImpactDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col font-sans text-forest-900">
      {/* Sidebar Navigation */}
      <Sidebar 
        mobileOpen={mobileSidebarOpen} 
        setMobileOpen={setMobileSidebarOpen} 
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="lg:pl-72 flex flex-col flex-1 min-h-screen">
        {/* Sticky Top Header */}
        <Header onToggleSidebar={() => setMobileSidebarOpen(prev => !prev)} />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>

        {/* Footer */}
        <footer className="border-t border-cream-200/80 bg-white/50 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
          <p className="font-semibold text-gray-500">
            CampusRescue — Smart Campus Food Waste Reduction Platform
          </p>
          <p className="mt-1">
            Built for TIET Campus • Supporting United Nations SDG 12: Responsible Consumption and Production
          </p>
        </footer>
      </div>

      {/* Global Modals */}
      <FoodDetailsModal />
      <ReservationModal />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

