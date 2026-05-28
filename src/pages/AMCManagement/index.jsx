import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminAMCManagement from './AdminAMCManagement';
import AMCManagement from './AMCManagement';

export default function AMCRouter() {
  const { user } = useAuthStore();

  useEffect(() => {
    const originalLink = document.querySelector("link[rel~='icon']");
    
    // Remove original link to force browser update
    if (originalLink) {
      originalLink.remove();
    }

    // Create a new link with the dollar icon
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.type = 'image/svg+xml';
    // Using a green circular dollar sign SVG for high visibility in a browser tab
    newLink.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2310B981"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="65" font-family="Arial" font-weight="bold" fill="white">$</text></svg>';
    document.head.appendChild(newLink);

    return () => {
      // Clean up new link and restore original
      newLink.remove();
      if (originalLink) {
        document.head.appendChild(originalLink);
      }
    };
  }, []);

  if (user?.role === 'ADMIN') {
    return <AdminAMCManagement />;
  }

  return <AMCManagement />;
}
