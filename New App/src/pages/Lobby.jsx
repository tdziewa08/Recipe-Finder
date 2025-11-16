import React from 'react';
import RoomList from '../components/Lobby/RoomList';
import CreateRoom from '../components/Lobby/CreateRoom';
import TopicSuggestions from '../components/Topics/TopicSuggestions';

/*
 PSEUDO CODE - Lobby Page
 
 PURPOSE: Central hub for finding, creating, and joining debate rooms
 
 FUNCTIONALITY:
 - Display all active debate rooms with real-time updates
 - Allow users to create new debate rooms
 - Provide AI-generated topic suggestions
 - Handle room joining and matchmaking
 
 INTERACTIONS:
 - RoomList: Receives WebSocket updates for room status changes
 - CreateRoom: Sends new room data to server via WebSocket
 - TopicSuggestions: Integrates with AI service for topic generation
 - WebSocket: Real-time updates for room creation/deletion/status
 
 USER FLOW:
 1. User navigates to lobby from home or navigation
 2. Views available rooms or creates new room
 3. Can get AI topic suggestions for inspiration
 4. Joins existing room or waits for opponent in created room
 5. Redirected to DebateRoom when match is made
 
 STATE MANAGEMENT:
 - List of active rooms (updated via WebSocket)
 - User's room creation/joining status
 - AI-generated topic suggestions
 - Loading states for room operations
*/

export default function Lobby() {
  // TODO: Connect to WebSocket for real-time room updates
  // TODO: Handle room joining logic
  // TODO: Manage loading states for room operations
  // TODO: Add user matchmaking preferences
  
  return (
    <div className="lobby">
      <h1>Debate Lobby</h1>
      <div className="lobby-content">
        <div className="lobby-left">
          <CreateRoom />
          <TopicSuggestions />
        </div>
        <div className="lobby-right">
          <RoomList />
        </div>
      </div>
    </div>
  );
}