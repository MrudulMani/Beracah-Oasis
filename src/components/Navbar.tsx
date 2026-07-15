import React, { useState } from 'react';
import { Activity, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'awareness', label: 'Awareness' },
    { id: 'branches', label: 'Branches' },
    { id: 'booking-contact', label: 'Booking & Contact' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        
        {/* Logo */}
        <div 
          className="navbar-brand"
          onClick={() => handleTabClick('home')}
        >
          <div className="navbar-logo">
            <Activity className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="navbar-title-wrapper">
            <span className="navbar-title">
              BERACAH <span>Oasis</span>
            </span>
            <span className="navbar-subtitle">Physiotherapy</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="navbar-links">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`navbar-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
                {isActive && <span className="active-indicator" />}
              </button>
            );
          })}
        </div>

        {/* Book Appointment Shortcut (Desktop) */}
        <div className="navbar-actions">
          <button
            onClick={() => handleTabClick('booking-contact')}
            className="navbar-book-btn"
          >
            <Calendar className="w-4 h-4 text-pink-400" />
            Book Slot
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navbar-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Nav Menu Drawer */}
      {isOpen && (
        <div className="navbar-mobile-drawer">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`navbar-mobile-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </button>
            );
          })}
          
          <button
            onClick={() => handleTabClick('booking-contact')}
            className="navbar-mobile-book-btn"
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
