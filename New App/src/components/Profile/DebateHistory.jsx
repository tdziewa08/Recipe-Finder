import React from 'react';

export default function DebateHistory() {
  const history = [
    { id: 1, topic: 'Climate Change Solutions', opponent: 'AI Bot', result: 'Win', score: 8.2, date: '2025-11-15' },
    { id: 2, topic: 'Remote Work Benefits', opponent: 'Sarah K.', result: 'Loss', score: 6.5, date: '2025-11-14' },
    { id: 3, topic: 'Social Media Regulation', opponent: 'Mike R.', result: 'Win', score: 7.8, date: '2025-11-13' }
  ];

  return (
    <div className="debate-history">
      <h3>Recent Debates</h3>
      <div className="history-list">
        {history.map(debate => (
          <div key={debate.id} className="debate-item">
            <div className="debate-topic">{debate.topic}</div>
            <div className="debate-details">
              <span className="opponent">vs {debate.opponent}</span>
              <span className={`result ${debate.result.toLowerCase()}`}>{debate.result}</span>
              <span className="score">Score: {debate.score}</span>
              <span className="date">{debate.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}