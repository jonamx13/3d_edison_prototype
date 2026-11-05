import React from 'react';
import './ControlPanel.css';

function Pedal({ value = 0, max = 10 }) {
  const t = Math.min(1, Math.max(0, value / max));
  // Release → pressed: -12° → +22°
  const angle = -12 + t * 34;

  return (
    <div className="anim-wrap">
      <svg viewBox="0 0 46 62" width="46" height="62">
        {/* pivot base */}
        <rect x="14" y="56" width="18" height="4" fill="#2a3640" />
        <rect x="20" y="52" width="6" height="4" fill="#3a4a55" />

        {/* pedal plate rotates around bottom pivot */}
        <g style={{ transformOrigin: '23px 54px', transform: `rotate(${angle}deg)`, transition: 'transform 0.08s linear' }}>
          <rect x="15" y="14" width="16" height="42" rx="1.5"
                fill="rgba(111,191,208,0.08)"
                stroke="rgba(111,191,208,0.5)"
                strokeWidth="1" />
          {/* grip lines */}
          {[22, 30, 38, 46].map(y => (
            <line key={y} x1="18" y1={y} x2="28" y2={y}
                  stroke="rgba(111,191,208,0.4)" strokeWidth="0.8" />
          ))}
          {/* indicator bar - fills with throttle */}
          <rect x="21" y={52 - 32 * t} width="4" height={32 * t}
                fill="#8ad7e8"
                style={{ filter: 'drop-shadow(0 0 3px #8ad7e8)' }} />
        </g>
      </svg>
    </div>
  );
}

export default Pedal;