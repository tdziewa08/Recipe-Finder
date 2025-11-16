import React from 'react';

/*
 PSEUDO CODE - Features Component
 
 PURPOSE: Showcase key platform features to convince users of value
 
 FUNCTIONALITY:
 - Display grid of platform features with descriptions
 - Highlight unique selling points and differentiators
 - Build confidence in platform capabilities
 - Support conversion from visitor to user
 
 INTERACTIONS:
 - Pure presentation component (no complex interactions)
 - Potential click-through to detailed feature pages
 - Animation/hover effects for engagement
 
 STATE MANAGEMENT:
 - Static feature data (could be dynamic from CMS)
 - Animation states for visual appeal
 
 FEATURE CATEGORIES:
 1. AI Moderation: Automated fairness and quality control
 2. Real-time Matching: Intelligent opponent pairing
 3. Topic Generation: AI-powered debate subjects
 4. Skill Tracking: Progress monitoring and analytics
*/

export default function Features() {
  // TODO: Consider loading features from API/CMS
  // TODO: Add hover animations and visual effects
  // TODO: Link to detailed feature documentation
  // TODO: Add feature demonstration videos/GIFs
  
  const features = [
    { 
      title: 'AI Moderation', 
      description: 'Smart AI keeps debates fair and productive',
      icon: '🤖' // TODO: Replace with proper icons
    },
    { 
      title: 'Real-time Matching', 
      description: 'Find opponents with similar skill levels',
      icon: '⚡'
    },
    { 
      title: 'Topic Generation', 
      description: 'AI suggests interesting debate topics',
      icon: '💡'
    },
    { 
      title: 'Skill Tracking', 
      description: 'Monitor your improvement over time',
      icon: '📈'
    }
  ];

  return (
    <div className="features">
      <h2>Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}