import React, { useState } from 'react';

/*
 PSEUDO CODE - RoomList Component
 
 PURPOSE: Display available debate rooms and handle room joining
 
 FUNCTIONALITY:
 - Show real-time list of active debate rooms
 - Display room details (topic, participants, status)
 - Handle room joining and validation
 - Update list via WebSocket events
 
 INTERACTIONS:
 - WebSocket Service: Receives real-time room updates
 - Join Button: Validates and joins user to selected room
 - Parent (Lobby): Receives join events and handles navigation
 - Router: Navigates to debate room upon successful join
 
 STATE MANAGEMENT:
 - Rooms array (updated via WebSocket)
 - Loading states for join operations
 - Error handling for full/invalid rooms
 - Filter and sort preferences
 
 REAL-TIME EVENTS:
 - room_created: Add new room to list
 - room_updated: Update existing room status
 - room_deleted: Remove room from list
 - user_joined: Update participant count
*/

export default function RoomList() {
  // TODO: Connect to WebSocket for real-time updates
  // TODO: Add loading and error states
  // TODO: Implement room filtering and sorting
  // TODO: Handle room joining with validation
  
  const [rooms] = useState([
    { id: 1, topic: 'Climate Change Solutions', participants: 2, maxParticipants: 2, status: 'active' },
    { id: 2, topic: 'Remote Work Benefits', participants: 1, maxParticipants: 2, status: 'waiting' },
    { id: 3, topic: 'Social Media Impact', participants: 2, maxParticipants: 2, status: 'active' }
  ]);
  
  const handleJoinRoom = (roomId) => {
    // TODO: Validate room availability
    // TODO: Check user permissions
    // TODO: Send join request via WebSocket
    // TODO: Handle join response and navigate to room
    // TODO: Show loading state during join process
  };

  return (
    <div className="room-list">
      <h3>Active Debates</h3>
      <div className="rooms">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <h4>{room.topic}</h4>
            <p>Participants: {room.participants}/{room.maxParticipants}</p>
            <span className={`status ${room.status}`}>{room.status}</span>
            <button 
              onClick={() => handleJoinRoom(room.id)}
              disabled={room.participants >= room.maxParticipants}
            >
              {room.participants >= room.maxParticipants ? 'Full' : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}