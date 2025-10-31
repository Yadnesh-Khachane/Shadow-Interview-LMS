import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/educational-games',
      name: 'Learning Games',
      icon: '🎮',
      description: 'Educational games and quizzes'
    },
    {
      path: '/calculators',
      name: 'Calculators',
      icon: '🧮',
      description: 'Academic calculators and tools'
    },
    {
      path: '/attendance',
      name: 'Attendance',
      icon: '📊',
      description: 'Manage attendance and leaves'
    },
    {
      path: '/notes',
      name: 'Notes',
      icon: '📝',
      description: 'Create and share your personal notes'
    },
    {
      path: '/library',
      name: 'Library',
      icon: '📚',
      description: 'All in 1 Resource Center'
    },
    {
      path: '/CompiCode',
      name: 'CompiCode',
      icon: '💻',
      description: 'Learn coding with interactive lessons'
    },
    {
      path: '/job-selector',
      name: 'Career Finder',
      icon: '💼',
      description: 'Discover jobs based on your interests and skills'
}
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
      >
        <span className="toggle-arrow">
          {isOpen ? '➡️' : '⬅️'}
        </span>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Quick Access</h3>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h4>Tools & Utilities</h4>
            <div className="sidebar-menu">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  onClick={onClose}
                >
                  <div className="sidebar-icon">{item.icon}</div>
                  <div className="sidebar-text">
                    <div className="sidebar-name">{item.name}</div>
                    <div className="sidebar-description">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="sidebar-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div className="feature-text">
                <strong>Quick Tools</strong>
                <span>Fast access to utilities</span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div className="feature-text">
                <strong>Academic Resources</strong>
                <span>Games, calculators & attendance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;