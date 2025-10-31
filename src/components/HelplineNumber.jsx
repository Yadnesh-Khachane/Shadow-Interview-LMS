import React, { useState } from 'react';
import './HelplineNumber.css';

const HelplineNumber = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const helplineNumbers = [
    { name: 'Academic Support', number: '1800-123-4567', hours: '9 AM - 6 PM', icon: '📚' },
    { name: 'Technical Support', number: '1800-234-5678', hours: '24/7', icon: '💻' },
    { name: 'Counseling', number: '1800-345-6789', hours: '10 AM - 8 PM', icon: '🧠' },
    { name: 'Emergency', number: '1800-911-HELP', hours: '24/7', icon: '🚨' },
    { name: 'Administration', number: '1800-456-7890', hours: '9 AM - 5 PM', icon: '🏛️' }
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="helpline-compact-container">
      <div className="helpline-compact-header" onClick={toggleExpand}>
        <div className="helpline-compact-title">
          <span className="helpline-compact-icon">📞</span>
          <span>Quick Help</span>
        </div>
        <span className={`helpline-compact-arrow ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </div>
      
      {isExpanded && (
        <div className="helpline-compact-content">
          <div className="helpline-compact-list">
            {helplineNumbers.map((service, index) => (
              <div key={index} className="helpline-compact-item">
                <div className="service-compact-icon">{service.icon}</div>
                <div className="service-compact-info">
                  <span className="service-compact-name">{service.name}</span>
                  <span className="service-compact-hours">{service.hours}</span>
                </div>
                <a href={`tel:${service.number}`} className="helpline-compact-number">
                  {service.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HelplineNumber;