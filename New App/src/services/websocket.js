/*
 PSEUDO CODE - WebSocket Service
 
 PURPOSE: Manage real-time WebSocket connections for the entire application
 
 FUNCTIONALITY:
 - Establish and maintain WebSocket connection to server
 - Handle automatic reconnection on connection loss
 - Provide event-based messaging system for components
 - Manage different message types and routing
 - Handle connection states and error scenarios
 
 INTERACTIONS:
 - All Components: Provide real-time messaging capabilities
 - Server: Bidirectional communication for live features
 - Error Handling: Manage connection failures and retries
 - Authentication: Include user tokens in connection
 
 MESSAGE TYPES:
 - room_created, room_updated, room_deleted (Lobby)
 - user_joined, user_left (Room management)
 - message_sent, message_received (Chat)
 - turn_changed, timer_updated (Debate flow)
 - vote_cast, reaction_sent (Audience)
 - ai_analysis, ai_suggestion (AI features)
 
 CONNECTION MANAGEMENT:
 - Automatic reconnection with exponential backoff
 - Connection state tracking (connecting, connected, disconnected)
 - Queue messages when disconnected for replay on reconnect
 - Handle authentication and user session management
*/

// WebSocket connection management
class WebSocketManager {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.connectionState = 'disconnected'; // connecting, connected, disconnected
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.messageQueue = [];
    this.userToken = null;
  }

  connect(url, token = null) {
    this.userToken = token;
    this.connectionState = 'connecting';
    
    // TODO: Add authentication token to connection
    const wsUrl = token ? `${url}?token=${token}` : url;
    this.socket = new WebSocket(wsUrl);
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.connectionState = 'connected';
      this.reconnectAttempts = 0;
      
      // TODO: Send queued messages
      this.flushMessageQueue();
      
      // TODO: Notify listeners of connection state change
      this.emit('connection_state_changed', { state: 'connected' });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      this.connectionState = 'disconnected';
      
      // TODO: Notify listeners of disconnection
      this.emit('connection_state_changed', { state: 'disconnected' });
      
      // TODO: Attempt reconnection if not intentional close
      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.attemptReconnect();
      }
    };
    
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('connection_error', { error });
    };
  }
  
  attemptReconnect() {
    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
    
    console.log(`Attempting reconnect ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
    
    setTimeout(() => {
      if (this.connectionState === 'disconnected') {
        this.connect(this.socket?.url, this.userToken);
      }
    }, delay);
  }
  
  flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.sendImmediate(message.type, message.data);
    }
  }

  handleMessage(data) {
    // TODO: Add message validation
    // TODO: Handle authentication challenges
    // TODO: Route messages to appropriate listeners
    
    const listeners = this.listeners.get(data.type) || [];
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in WebSocket message handler:', error);
      }
    });
  }

  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  off(eventType, callback) {
    const listeners = this.listeners.get(eventType) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }
  
  emit(eventType, data) {
    const listeners = this.listeners.get(eventType) || [];
    listeners.forEach(callback => callback(data));
  }

  send(type, data) {
    const message = { type, ...data, timestamp: Date.now() };
    
    if (this.connectionState === 'connected') {
      this.sendImmediate(type, data);
    } else {
      // TODO: Queue message for later delivery
      this.messageQueue.push(message);
      console.log('Message queued (not connected):', type);
    }
  }
  
  sendImmediate(type, data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = { type, ...data, timestamp: Date.now() };
      this.socket.send(JSON.stringify(message));
    }
  }
  
  // TODO: Add methods for specific use cases
  joinRoom(roomId) {
    this.send('join_room', { roomId });
  }
  
  leaveRoom(roomId) {
    this.send('leave_room', { roomId });
  }
  
  sendChatMessage(roomId, message) {
    this.send('chat_message', { roomId, message });
  }
  
  getConnectionState() {
    return this.connectionState;
  }

  disconnect() {
    if (this.socket) {
      this.connectionState = 'disconnected';
      this.socket.close(1000, 'Client disconnect');
    }
  }
}

export default new WebSocketManager();