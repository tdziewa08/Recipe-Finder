import React, { useState, useEffect } from 'react';

/*
 PSEUDO CODE - DebateStatus Component
 
 PURPOSE: Display current debate state, participants, and progress
 
 FUNCTIONALITY:
 - Show debate topic and participant information
 - Display current round and speaking turn
 - Update status in real-time via WebSocket
 - Show debate progress and remaining structure
 - Handle position assignments (PRO vs CON)
 
 INTERACTIONS:
 - WebSocket: Receive real-time status updates
 - DebateTimer: Coordinate with timing information
 - DebateChat: Show whose turn it is to speak
 - Room Data: Fetch initial room/debate information
 
 STATE MANAGEMENT:
 - Debate room information (topic, participants, settings)
 - Current round and turn tracking
 - Participant positions and roles
 - Real-time status updates
 
 STATUS UPDATES:
 - Round progression
 - Speaker turn changes
 - Participant join/leave events
 - Debate phase changes (opening, rebuttal, closing)
*/

export default function DebateStatus({ roomId }) {
  const [debateInfo, setDebateInfo] = useState({
    topic: 'Should remote work be mandatory for all tech companies?',
    participants: ['Alice Johnson', 'Bob Smith'],
    currentRound: 1,
    totalRounds: 3,
    currentSpeaker: 'Alice Johnson',
    phase: 'opening' // opening, rebuttal, closing
  });
  const [loading, setLoading] = useState(true);
  
  // TODO: Fetch room data on component mount
  // TODO: Connect to WebSocket for real-time updates
  // TODO: Handle participant position assignment
  // TODO: Add debate phase management
  
  useEffect(() => {
    // TODO: Fetch initial room/debate data
    const fetchRoomData = async () => {
      try {
        // TODO: API call to get room information
        // TODO: Set initial debate state
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch room data:', error);
        setLoading(false);
      }
    };
    
    fetchRoomData();
    
    // TODO: Setup WebSocket listeners for status updates
    // TODO: Listen for round changes, turn changes, etc.
    
    return () => {
      // TODO: Cleanup WebSocket listeners
    };
  }, [roomId]);
  
  const getPhaseLabel = (phase) => {
    const phases = {
      opening: 'Opening Arguments',
      rebuttal: 'Rebuttals',
      closing: 'Closing Arguments'
    };
    return phases[phase] || phase;
  };
  
  if (loading) {
    return <div className="debate-status loading">Loading debate information...</div>;
  }

  return (
    <div className="debate-status">
      <div className="topic">
        <h2>{debateInfo.topic}</h2>
        <span className="phase">{getPhaseLabel(debateInfo.phase)}</span>
      </div>
      
      <div className="participants">
        <div className={`participant pro ${debateInfo.currentSpeaker === debateInfo.participants[0] ? 'active' : ''}`}>
          <span className="position">PRO</span>
          <span className="name">{debateInfo.participants[0]}</span>
        </div>
        <div className="vs">VS</div>
        <div className={`participant con ${debateInfo.currentSpeaker === debateInfo.participants[1] ? 'active' : ''}`}>
          <span className="position">CON</span>
          <span className="name">{debateInfo.participants[1]}</span>
        </div>
      </div>
      
      <div className="round-info">
        <span>Round {debateInfo.currentRound} of {debateInfo.totalRounds}</span>
        <span className="current-speaker">Current: {debateInfo.currentSpeaker}</span>
      </div>
    </div>
  );
}