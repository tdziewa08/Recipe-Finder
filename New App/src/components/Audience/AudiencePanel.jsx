import React, { useState, useEffect } from 'react';

/*
 PSEUDO CODE - AudiencePanel Component
 
 PURPOSE: Manage spectator interactions, voting, and real-time reactions
 
 FUNCTIONALITY:
 - Display list of current audience members watching the debate
 - Allow audience voting on debate winner (PRO vs CON)
 - Handle real-time emoji reactions and live feedback
 - Show vote tallies and audience engagement metrics
 - Manage audience join/leave events
 
 INTERACTIONS:
 - WebSocket: Real-time audience updates and reactions
 - Voting System: Collect and display audience votes
 - Reaction System: Broadcast emoji reactions to all viewers
 - Moderation: Handle inappropriate reactions or spam
 
 STATE MANAGEMENT:
 - Current audience member list
 - Vote tallies (PRO vs CON)
 - Live reaction stream
 - User's own vote status
 - Connection status for audience features
 
 REAL-TIME FEATURES:
 - Audience member join/leave notifications
 - Live voting updates
 - Reaction animations and effects
 - Spam prevention for reactions
 - Vote change tracking
*/

export default function AudiencePanel({ roomId }) {
  const [audience, setAudience] = useState([
    { id: 1, name: 'Viewer1', vote: null },
    { id: 2, name: 'Viewer2', vote: 'pro' },
    { id: 3, name: 'Viewer3', vote: 'con' }
  ]);
  const [reactions, setReactions] = useState([]);
  const [userVote, setUserVote] = useState(null);
  const [reactionCooldown, setReactionCooldown] = useState(false);
  
  // TODO: Connect to WebSocket for real-time audience updates
  // TODO: Implement vote submission and real-time updates
  // TODO: Add reaction spam prevention
  // TODO: Handle audience member authentication
  
  useEffect(() => {
    // TODO: Join audience WebSocket channel
    // TODO: Listen for audience member updates
    // TODO: Listen for vote updates
    // TODO: Listen for incoming reactions
    
    return () => {
      // TODO: Leave audience channel
      // TODO: Cleanup WebSocket listeners
    };
  }, [roomId]);
  
  const submitVote = (voteType) => {
    if (userVote === voteType) {
      // Toggle vote off
      setUserVote(null);
      // TODO: Send vote removal via WebSocket
    } else {
      // Submit new vote
      setUserVote(voteType);
      // TODO: Send vote via WebSocket
    }
  };

  const addReaction = (emoji) => {
    if (reactionCooldown) return;
    
    const newReaction = {
      id: Date.now(),
      emoji,
      timestamp: Date.now(),
      userId: 'current-user' // TODO: Get actual user ID
    };
    
    // Add to local state immediately
    setReactions(prev => [...prev, newReaction]);
    
    // TODO: Send reaction via WebSocket
    // TODO: Implement reaction cooldown (prevent spam)
    setReactionCooldown(true);
    setTimeout(() => setReactionCooldown(false), 1000);
  };
  
  // Clean up old reactions (keep only recent ones)
  useEffect(() => {
    const cleanup = setInterval(() => {
      const fiveSecondsAgo = Date.now() - 5000;
      setReactions(prev => prev.filter(r => r.timestamp > fiveSecondsAgo));
    }, 1000);
    
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="audience-panel">
      <h3>Audience ({audience.length})</h3>
      
      <div className="audience-votes">
        <h4>Vote for Winner</h4>
        <div className="vote-buttons">
          <button 
            className={`vote-btn pro ${userVote === 'pro' ? 'active' : ''}`}
            onClick={() => submitVote('pro')}
          >
            PRO ({audience.filter(a => a.vote === 'pro').length})
          </button>
          <button 
            className={`vote-btn con ${userVote === 'con' ? 'active' : ''}`}
            onClick={() => submitVote('con')}
          >
            CON ({audience.filter(a => a.vote === 'con').length})
          </button>
        </div>
      </div>
      
      <div className="reactions">
        <h4>Live Reactions</h4>
        <div className="reaction-buttons">
          {['👏', '🤔', '🔥', '💯', '😴', '❤️'].map(emoji => (
            <button 
              key={emoji} 
              onClick={() => addReaction(emoji)}
              disabled={reactionCooldown}
              className={reactionCooldown ? 'cooldown' : ''}
            >
              {emoji}
            </button>
          ))}
        </div>
        
        <div className="live-reactions">
          {reactions.slice(-8).map(reaction => (
            <span 
              key={reaction.id} 
              className="reaction animate"
              style={{
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              {reaction.emoji}
            </span>
          ))}
        </div>
      </div>
      
      <div className="audience-list">
        <h4>Viewers</h4>
        {audience.map(viewer => (
          <div key={viewer.id} className="audience-member">
            <span className="viewer-name">{viewer.name}</span>
            {viewer.vote && (
              <span className={`vote-indicator ${viewer.vote}`}>●</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}