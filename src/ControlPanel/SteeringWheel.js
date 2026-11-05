import React from 'react';
import './ControlPanel.css';

function SteeringWheel({ value = 0 }) {
  // value goes from -0.5 (full left) to +0.5 (full right)
  const rotation = value * 270; // -135° .. +135°

  return (
    <div className="anim-wrap wheel">
      <svg viewBox="0 0 100 100" width="56" height="56">
        <g
          style={{
            transformOrigin: '50px 50px',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* tick marks around the rim */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * 10 * Math.PI) / 180;
            const x1 = 50 + Math.cos(a) * 46;
            const y1 = 50 + Math.sin(a) * 46;
            const x2 = 50 + Math.cos(a) * (i % 3 === 0 ? 42 : 44);
            const y2 = 50 + Math.sin(a) * (i % 3 === 0 ? 42 : 44);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(140,200,220,0.18)" strokeWidth="0.6" />
            );
          })}

          {/* outer rim */}
          <circle cx="50" cy="50" r="38" fill="none"
                  stroke="rgba(140,200,220,0.55)" strokeWidth="4" />
          <circle cx="50" cy="50" r="34" fill="none"
                  stroke="rgba(111,191,208,0.15)" strokeWidth="1" />

          {/* spokes */}
          <line x1="50" y1="16" x2="50" y2="40" stroke="rgba(140,200,220,0.5)" strokeWidth="3" />
          <line x1="16" y1="50" x2="42" y2="50" stroke="rgba(140,200,220,0.5)" strokeWidth="3" />
          <line x1="58" y1="50" x2="84" y2="50" stroke="rgba(140,200,220,0.5)" strokeWidth="3" />

          {/* hub */}
          <circle cx="50" cy="50" r="12"
                  fill="rgba(111,191,208,0.1)"
                  stroke="rgba(111,191,208,0.7)"
                  strokeWidth="1.2" />

          {/* top marker */}
          <rect x="48" y="12" width="4" height="8" fill="#8ad7e8"
                style={{ filter: 'drop-shadow(0 0 3px #8ad7e8)' }} />
        </g>
      </svg>
    </div>
  );
}

export default SteeringWheel;