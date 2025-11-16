import React, { useState } from 'react';

/*
 PSEUDO CODE - CreateRoom Component
 
 PURPOSE: Allow users to create new debate rooms with custom settings
 
 FUNCTIONALITY:
 - Form for entering debate topic and room settings
 - Validate input and create room via WebSocket
 - Handle room creation success/error states
 - Redirect creator to newly created room
 
 INTERACTIONS:
 - WebSocket Service: Send room creation request
 - Form Validation: Ensure topic is valid and settings are appropriate
 - Parent (Lobby): Handle successful room creation
 - Router: Navigate to created room when ready
 
 STATE MANAGEMENT:
 - Form data (topic, time limit, room settings)
 - Loading state during room creation
 - Error messages for failed creation
 - Validation states for form fields
 
 ROOM CREATION FLOW:
 1. User fills out topic and settings
 2. Form validates input (topic not empty, reasonable time limits)
 3. Send creation request via WebSocket
 4. Show loading state while processing
 5. On success: navigate to room, On error: show error message
*/

export default function CreateRoom() {
  const [topic, setTopic] = useState('');
  const [timeLimit, setTimeLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // TODO: Add form validation
  // TODO: Connect to WebSocket service
  // TODO: Handle room creation response
  // TODO: Add more room configuration options

  const handleCreateRoom = async () => {
    // TODO: Validate form inputs
    if (!topic.trim()) {
      setError('Please enter a debate topic');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Send room creation request via WebSocket
      // TODO: Wait for room creation confirmation
      // TODO: Navigate to created room
      console.log('Creating room:', { topic, timeLimit });
    } catch (err) {
      // TODO: Handle creation errors
      setError('Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-room">
      <h3>Create New Debate</h3>
      <div className="create-room-form">
        <input
          type="text"
          placeholder="Enter debate topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isLoading}
        />
        <select 
          value={timeLimit} 
          onChange={(e) => setTimeLimit(e.target.value)}
          disabled={isLoading}
        >
          <option value={3}>3 minutes per round</option>
          <option value={5}>5 minutes per round</option>
          <option value={10}>10 minutes per round</option>
        </select>
        {error && <div className="error-message">{error}</div>}
        <button 
          onClick={handleCreateRoom}
          disabled={isLoading || !topic.trim()}
        >
          {isLoading ? 'Creating...' : 'Create Room'}
        </button>
      </div>
    </div>
  );
}