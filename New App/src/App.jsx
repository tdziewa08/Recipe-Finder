import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DebateRoom from './pages/DebateRoom';
import Lobby from './pages/Lobby';
import Profile from './pages/Profile';
import Navigation from './components/Navigation/Navigation';

/*
 PSEUDO CODE - App Component (Main Application Shell)
 
 PURPOSE: Root component that provides routing and global layout
 
 FUNCTIONALITY:
 - Set up React Router for navigation between pages
 - Provide consistent navigation bar across all pages
 - Define route structure for entire application
 - Handle global state management (user auth, WebSocket connection)
 
 INTERACTIONS:
 - Navigation: Passes current route info, handles navigation
 - All Pages: Provides routing context and layout wrapper
 - WebSocket Service: Establishes connection on app load
 - User Context: Manages global user state
 
 STATE MANAGEMENT:
 - Global user authentication state
 - WebSocket connection status
 - Theme/UI preferences
 
 FUTURE ENHANCEMENTS:
 - Add protected route wrapper for authenticated pages
 - Add global loading states
 - Add error boundary for error handling
 - Add notification system context
*/

export default function App() {
  // TODO: Add global state management (Context API or Redux)
  // TODO: Initialize WebSocket connection
  // TODO: Handle user authentication state
  // TODO: Add error boundary wrapper
  
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/debate/:roomId" element={<DebateRoom />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}