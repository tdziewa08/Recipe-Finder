import React from 'react';

export default function Achievements() {
  const achievements = [
    { id: 1, name: 'First Debate', description: 'Complete your first debate', earned: true },
    { id: 2, name: 'Winning Streak', description: 'Win 5 debates in a row', earned: true },
    { id: 3, name: 'AI Challenger', description: 'Defeat the AI 10 times', earned: false },
    { id: 4, name: 'Master Debater', description: 'Win 50 debates', earned: false },
    { id: 5, name: 'Logic Master', description: 'Score 9+ in 5 consecutive debates', earned: false }
  ];

  return (
    <div className="achievements">
      <h3>Achievements</h3>
      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div key={achievement.id} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
            <div className="achievement-icon">
              {achievement.earned ? '🏆' : '🔒'}
            </div>
            <div className="achievement-info">
              <h4>{achievement.name}</h4>
              <p>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}