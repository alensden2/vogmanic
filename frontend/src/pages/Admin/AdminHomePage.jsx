import React, { useState } from 'react';
import AdminBar from '../../components/adminbar';

export default function AdminHomePage() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
      };
    
  return (
    <div>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
    </div>
  );
}