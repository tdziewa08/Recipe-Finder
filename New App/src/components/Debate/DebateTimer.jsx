import React, { useState, useEffect } from 'react';

/*
 PSEUDO CODE - DebateTimer Component
 
 PURPOSE: Manage debate timing, rounds, and turn enforcement
 
 FUNCTIONALITY:
 - Track time remaining in current round/turn
 - Automatically switch turns when time expires
 - Coordinate with chat component for turn management
 - Handle different timing modes (per turn, per round, total debate)
 - Provide visual countdown and warnings
 
 INTERACTIONS:
 - DebateChat: Coordinate turn management and message sending
 - WebSocket: Sync timer state across all participants
 - DebateStatus: Update round information
 - Audio/Visual Alerts: Warn users of time running out
 
 STATE MANAGEMENT:
 - Current time remaining
 - Timer active/paused state
 - Current round and turn information
 - Timer mode (per-turn vs per-round)
 - Auto-advance settings
 
 TIMER FLOW:
 1. Timer starts when debate begins
 2. Counts down from configured time limit
 3. Warns user when time is running low (30 sec, 10 sec)
 4. Auto-advances to next turn/round when time expires
 5. Syncs timer state across all participants via WebSocket
*/

export default function DebateTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds] = useState(3);
  const [warningShown, setWarningShown] = useState(false);
  
  // TODO: Connect to WebSocket for timer synchronization
  // TODO: Add audio/visual warnings for time running out
  // TODO: Implement auto-turn advancement
  // TODO: Add different timer modes (per-turn, per-round)
  // TODO: Handle timer pause/resume across participants

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          const newTime = timeLeft - 1;
          
          // TODO: Show warnings at 30 and 10 seconds
          if (newTime === 30 && !warningShown) {
            // TODO: Show warning notification
            setWarningShown(true);
          }
          
          // TODO: Auto-advance turn when time expires
          if (newTime === 0) {
            handleTimeExpired();
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, warningShown]);
  
  const handleTimeExpired = () => {
    // TODO: Notify other components that time expired
    // TODO: Auto-advance to next turn via WebSocket
    // TODO: Reset timer for next turn/round
    setIsActive(false);
    setWarningShown(false);
  };
  
  const startTimer = () => {
    // TODO: Sync timer start across all participants
    setIsActive(true);
  };
  
  const pauseTimer = () => {
    // TODO: Sync timer pause across all participants
    setIsActive(false);
  };
  
  const resetTimer = () => {
    // TODO: Reset to configured time limit
    // TODO: Sync reset across all participants
    setTimeLeft(300);
    setIsActive(false);
    setWarningShown(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="debate-timer">
      <div className="timer-display">
        <span className={`time ${timeLeft <= 30 ? 'warning' : ''}`}>
          {formatTime(timeLeft)}
        </span>
        <span className="label">Time Remaining</span>
        <span className="round-info">
          Round {currentRound} of {totalRounds}
        </span>
      </div>
      <div className="timer-controls">
        <button onClick={() => isActive ? pauseTimer() : startTimer()}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}