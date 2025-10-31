import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';
import './Navigation.css';

const Navigation = ({ onLogout }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar glass-card">
      <div className="nav-brand">
        <h2>EduProgress</h2>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/github-tracker" 
          className={location.pathname === '/github-tracker' ? 'nav-link active' : 'nav-link'}
        >
          💻 GitHub Tracker
        </Link>
        <Link 
          to="/announcements" 
          className={location.pathname === '/announcements' ? 'nav-link active' : 'nav-link'}
        >
          📢 Announcements
        </Link>
        <Link 
          to="/placement" 
          className={location.pathname === '/placement' ? 'nav-link active' : 'nav-link'}
        >
          💼 Placement
        </Link>
      </div>
      
      <div className="nav-actions">
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;