import React from 'react';
import { Link } from 'react-router-dom';

/*
 PSEUDO CODE - Navigation Component
 
 PURPOSE: Persistent navigation bar for entire application
 
 FUNCTIONALITY:
 - Provide consistent navigation across all pages
 - Show current active page/route
 - Handle user authentication status display
 - Responsive design for mobile and desktop
 
 INTERACTIONS:
 - React Router: Uses Link components for client-side routing
 - User Context: Shows login/logout based on auth status
 - Current Route: Highlights active navigation item
 
 STATE MANAGEMENT:
 - Track current route for active styling
 - User authentication state for conditional rendering
 - Mobile menu toggle state
 
 USER FLOW:
 1. Always visible at top of application
 2. User clicks navigation links to move between pages
 3. Shows different options based on login status
 4. Collapses to hamburger menu on mobile devices
*/

export default function Navigation() {
  // TODO: Add user authentication state
  // TODO: Implement active route highlighting
  // TODO: Add mobile responsive menu toggle
  // TODO: Add user avatar/dropdown when logged in
  // TODO: Add logout functionality
  
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          DebateMe
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/lobby">Lobby</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
}