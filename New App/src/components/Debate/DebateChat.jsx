import React, { useState, useEffect } from 'react';

/*
 PSEUDO CODE - DebateChat Component
 
 PURPOSE: Handle real-time messaging and turn-based debate flow
 
 FUNCTIONALITY:
 - Display chronological debate messages from all participants
 - Enforce turn-based speaking with message validation
 - Send/receive messages via WebSocket connection
 - Show typing indicators and message status
 - Handle message formatting and display
 
 INTERACTIONS:
 - WebSocket Service: Send/receive real-time messages
 - DebateTimer: Coordinate with timing for turn management
 - AI Moderator: Send messages for AI analysis
 - Debate Rules: Enforce speaking turns and message limits
 
 STATE MANAGEMENT:
 - Messages array (chronological chat history)
 - Current message input state
 - Turn management (whose turn to speak)
 - Connection status and error states
 - Typing indicators from other participants
 
 TURN-BASED FLOW:
 1. User can only send messages during their allocated turn
 2. Message sent via WebSocket to all participants
 3. Turn automatically switches to opponent after message
 4. Timer coordinates with turn management
 5. AI moderator can interject with analysis/suggestions
*/

export default function DebateChat({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  
  // TODO: Connect to room-specific WebSocket channel
  // TODO: Handle incoming messages from WebSocket
  // TODO: Implement typing indicators
  // TODO: Add message character limits and validation
  // TODO: Handle connection errors and reconnection
  
  useEffect(() => {
    // TODO: Join room WebSocket channel
    // TODO: Listen for incoming messages
    // TODO: Listen for turn change events
    // TODO: Handle typing events from other users
    
    return () => {
      // TODO: Cleanup WebSocket listeners
    };
  }, [roomId]);

  const sendMessage = () => {
    if (currentMessage.trim() && isMyTurn) {
      const newMessage = {
        id: Date.now(),
        text: currentMessage,
        sender: 'user', // TODO: Use actual user ID
        timestamp: new Date().toLocaleTimeString(),
        roomId
      };
      
      // TODO: Send message via WebSocket
      // TODO: Add to local message state optimistically
      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');
      
      // TODO: Turn management should be handled by server/timer
      setIsMyTurn(false);
    }
  };
  
  const handleTyping = (text) => {
    setCurrentMessage(text);
    // TODO: Send typing indicator to other participants
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="debate-chat">
      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
            <div className="message-time">{message.timestamp}</div>
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            Opponent is typing...
          </div>
        )}
      </div>
      
      <div className="chat-input">
        <textarea
          value={currentMessage}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isMyTurn ? "Make your argument..." : "Wait for your turn..."}
          disabled={!isMyTurn || connectionStatus !== 'connected'}
          maxLength={500} // TODO: Make configurable
        />
        <div className="input-actions">
          <span className="char-count">{currentMessage.length}/500</span>
          <button 
            onClick={sendMessage} 
            disabled={!isMyTurn || !currentMessage.trim() || connectionStatus !== 'connected'}
          >
            Send Argument
          </button>
        </div>
      </div>
    </div>
  );
}