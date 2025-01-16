// src/hooks/useAnalytics.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when the route changes
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GOOGLE_MEASUREMENT_ID, {
        page_path: location.pathname,
      });
      
      // Custom tracking for bike route
      if (location.pathname.includes('/our-bikes')) {
        window.gtag('event', 'bike_rent', {
          event_category: 'Bike',
          event_label: 'Bike Rent',
          value: 1,
        });
      }

      // Custom tracking for shop route
      if (location.pathname.includes('/shop')) {
        window.gtag('event', 'shop_visit', {
          event_category: 'Shop',
          event_label: 'Shop Visit',
          value: 1,
        });
      }
    }
  }, [location]);
};

export default useAnalytics;
