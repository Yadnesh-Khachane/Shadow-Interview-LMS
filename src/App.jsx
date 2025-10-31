import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GitHubTracker from './components/GitHubTracker';
import EducationalGames from './components/EducationalGames';
import Notes from "./components/notes";
import JobSelector from './components/JobSelector';
import Calculators from './components/Calculators';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Announcements from './components/Announcements';
import Placement from './components/Placement';
import Attendance from './components/Attendance';
import Library from './components/Library'; 
import Chatbot from './chatbot/ChatbotComponent';
import CompiCode from './components/CompiCode';

// Create Theme Context
export const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Router>
          {isLoggedIn && (
            <>
              <Navigation onLogout={handleLogout} />
              <Sidebar 
                isOpen={isSidebarOpen} 
                onToggle={toggleSidebar}
                onClose={() => setIsSidebarOpen(false)}
              />
              <Chatbot />
            </>
          )}
          <Routes>
            <Route 
              path="/login" 
              element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />
            <Route
            path="/library"
            element={isLoggedIn ? <Library /> : <Navigate to="/login" />}
            />
            <Route 
              path="/compiCode"
              element={isLoggedIn ? <CompiCode /> : <Navigate to="/login" />}
            />
            <Route 
              path="/attendance" 
              element={isLoggedIn ? <Attendance /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/placement" 
              element={isLoggedIn ? <Placement /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/announcements" 
              element={isLoggedIn ? <Announcements /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/github-tracker" 
              element={isLoggedIn ? <GitHubTracker user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/educational-games" 
              element={isLoggedIn ? <EducationalGames /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/calculators" 
              element={isLoggedIn ? <Calculators /> : <Navigate to="/login" />} 
            />
            <Route
              path="/notes"
              element={isLoggedIn ? <Notes /> : <Navigate to="/login" />}
            />
           <Route
             path="/job-selector"
             element={isLoggedIn ? <JobSelector /> : <Navigate to="/login" />}
            />

            <Route 
              path="/" 
              element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;