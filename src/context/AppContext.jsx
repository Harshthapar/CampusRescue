import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_FOOD_ITEMS, 
  FOOD_PARTNERS, 
  INITIAL_RESERVATIONS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation active tab: 'dashboard' | 'discover' | 'reservations' | 'partners' | 'impact'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Search query & active filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [filters, setFilters] = useState({
    vegetarianOnly: false,
    veganOnly: false,
    maxPrice: 200,
    availableNowOnly: false,
    sortBy: 'featured', // 'featured' | 'price-asc' | 'discount-desc' | 'portions-desc'
  });

  // Food items with localStorage persistence
  const [foodItems, setFoodItems] = useState(() => {
    try {
      const saved = localStorage.getItem('campusrescue_food_items');
      return saved ? JSON.parse(saved) : INITIAL_FOOD_ITEMS;
    } catch {
      return INITIAL_FOOD_ITEMS;
    }
  });

  // Reservations with localStorage persistence
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem('campusrescue_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  // Favorites with localStorage persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('campusrescue_favorites');
      return saved ? JSON.parse(saved) : ['food-1', 'food-4'];
    } catch {
      return ['food-1', 'food-4'];
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('campusrescue_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Modals state
  const [selectedFoodDetails, setSelectedFoodDetails] = useState(null);
  const [reservingFoodItem, setReservingFoodItem] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('campusrescue_food_items', JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem('campusrescue_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('campusrescue_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('campusrescue_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle Favorite
  const toggleFavorite = (foodId) => {
    setFavorites(prev => {
      const exists = prev.includes(foodId);
      const updated = exists ? prev.filter(id => id !== foodId) : [...prev, foodId];
      addToast(
        exists ? 'Removed from favorites' : 'Added to your favorites!',
        exists ? 'info' : 'success'
      );
      return updated;
    });
  };

  // Reserve Food Item
  const handleReserve = (foodItem, portionsCount) => {
    if (!foodItem || foodItem.availablePortions < portionsCount) {
      addToast('Not enough portions available!', 'error');
      return false;
    }

    const reservationId = 'RES-' + Math.floor(1000 + Math.random() * 9000);
    const newReservation = {
      id: reservationId,
      foodId: foodItem.id,
      foodName: foodItem.name,
      outletName: foodItem.outletName,
      portions: portionsCount,
      pricePerPortion: foodItem.discountedPrice,
      totalCost: foodItem.discountedPrice * portionsCount,
      pickupTime: foodItem.pickupWindow,
      status: 'Reserved',
      createdAt: 'Just now',
      location: foodItem.location,
      isVeg: foodItem.isVeg
    };

    // Deduct portions
    setFoodItems(prev => prev.map(item => {
      if (item.id === foodItem.id) {
        return {
          ...item,
          availablePortions: Math.max(0, item.availablePortions - portionsCount)
        };
      }
      return item;
    }));

    // Add reservation
    setReservations(prev => [newReservation, ...prev]);

    // Add in-app notification
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: 'Reservation Confirmed',
      message: `Portions for ${foodItem.name} (${reservationId}) reserved successfully.`,
      time: 'Just now',
      read: false,
      type: 'success'
    };
    setNotifications(prev => [newNotif, ...prev]);

    addToast(`Reservation ${reservationId} confirmed! Check 'My Reservations'`, 'success');
    return true;
  };

  // Cancel Reservation
  const handleCancelReservation = (reservationId) => {
    const targetRes = reservations.find(r => r.id === reservationId);
    if (!targetRes) return;

    if (targetRes.status === 'Cancelled' || targetRes.status === 'Collected') {
      return;
    }

    // Restore portions
    setFoodItems(prev => prev.map(item => {
      if (item.id === targetRes.foodId) {
        return {
          ...item,
          availablePortions: item.availablePortions + targetRes.portions
        };
      }
      return item;
    }));

    // Update reservation status
    setReservations(prev => prev.map(r => {
      if (r.id === reservationId) {
        return { ...r, status: 'Cancelled' };
      }
      return r;
    }));

    // Add in-app notification
    setNotifications(prev => [{
      id: 'notif-' + Date.now(),
      title: 'Reservation Cancelled',
      message: `Reservation ${reservationId} for ${targetRes.foodName} has been cancelled.`,
      time: 'Just now',
      read: false,
      type: 'warning'
    }, ...prev]);

    addToast(`Reservation ${reservationId} has been cancelled and portions restored.`, 'info');
  };

  // Mark as Collected
  const handleMarkCollected = (reservationId) => {
    const targetRes = reservations.find(r => r.id === reservationId);
    if (!targetRes || targetRes.status !== 'Reserved' && targetRes.status !== 'Ready for Pickup') return;

    setReservations(prev => prev.map(r => {
      if (r.id === reservationId) {
        return { ...r, status: 'Collected' };
      }
      return r;
    }));

    setNotifications(prev => [{
      id: 'notif-' + Date.now(),
      title: 'Meal Collected 🎉',
      message: `Enjoy your ${targetRes.foodName}! Thank you for reducing campus food waste.`,
      time: 'Just now',
      read: false,
      type: 'milestone'
    }, ...prev]);

    addToast('Meal marked as collected! Thanks for saving food! 🌱', 'success');
  };

  // Clear filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPartner(null);
    setFilters({
      vegetarianOnly: false,
      veganOnly: false,
      maxPrice: 200,
      availableNowOnly: false,
      sortBy: 'featured',
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedPartner,
        setSelectedPartner,
        filters,
        setFilters,
        resetFilters,
        foodItems,
        foodPartners: FOOD_PARTNERS,
        reservations,
        favorites,
        toggleFavorite,
        notifications,
        setNotifications,
        toasts,
        addToast,
        removeToast,
        selectedFoodDetails,
        setSelectedFoodDetails,
        reservingFoodItem,
        setReservingFoodItem,
        handleReserve,
        handleCancelReservation,
        handleMarkCollected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

