import React from 'react';
import './ControlPanel.css';

function CarTopView({
  isHeadlightON,
  isBeamHIGH,
  directionalLightsManager,
  openDoors,
}) {
  const leftBlink  = directionalLightsManager === 'left'  || directionalLightsManager === 'blinker';
  const rightBlink = directionalLightsManager === 'right' || directionalLightsManager === 'blinker';

  // Helper to render a door line
  const doorLine = (x1, y1, y2, open) => (
    <line
      x1={x1} y1={y1} x2={x1} y2={y2}
      stroke={open ? '#ff6464' : 'rgba(255,255,255,0.28)'}
      strokeWidth={open ? 3.5 : 1.5}
      strokeLinecap="round"
    />
  );

  return (
    <div className="panel-section">
      <div className="panel-section-title">Vehicle Status</div>
      <div className="car-topview">
        <svg viewBox="0 0 100 160" width="120" height="180">
          {/* Body */}
          <rect x="15" y="10" width="70" height="140" rx="18" ry="18"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5" />

          {/* Windshield */}
          <path d="M 22 45 Q 50 38 78 45 L 75 62 Q 50 55 25 62 Z"
                fill="rgba(100,180,255,0.15)"
                stroke="rgba(100,180,255,0.45)" strokeWidth="1" />
          {/* Rear window */}
          <path d="M 25 128 Q 50 122 75 128 L 78 145 Q 50 139 22 145 Z"
                fill="rgba(100,180,255,0.15)"
                stroke="rgba(100,180,255,0.45)" strokeWidth="1" />

          {/* Wheels */}
          <rect x="6"  y="28"  width="11" height="22" rx="3" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
          <rect x="83" y="28"  width="11" height="22" rx="3" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
          <rect x="6"  y="110" width="11" height="22" rx="3" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
          <rect x="83" y="110" width="11" height="22" rx="3" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>

          {/* Door state lines */}
          {doorLine(25, 65,  95,  openDoors.Front_Left)}
          {doorLine(75, 65,  95,  openDoors.Front_Right)}
          {doorLine(25, 100, 128, openDoors.Back_Left)}
          {doorLine(75, 100, 128, openDoors.Back_Right)}

          {/* Headlights */}
          <ellipse cx="30" cy="14" rx="6" ry="3"
                   fill={isHeadlightON ? (isBeamHIGH ? '#ffff80' : '#ffe080') : '#2a2a2a'}
                   style={isHeadlightON
                     ? { filter: `drop-shadow(0 0 6px ${isBeamHIGH ? '#ffff00' : '#ffcc00'})` }
                     : {}} />
          <ellipse cx="70" cy="14" rx="6" ry="3"
                   fill={isHeadlightON ? (isBeamHIGH ? '#ffff80' : '#ffe080') : '#2a2a2a'}
                   style={isHeadlightON
                     ? { filter: `drop-shadow(0 0 6px ${isBeamHIGH ? '#ffff00' : '#ffcc00'})` }
                     : {}} />

          {/* Rear blinkers */}
          <ellipse cx="24" cy="148" rx="4.5" ry="3"
                   fill={leftBlink ? '#ffa500' : '#2a2a2a'}
                   className={leftBlink ? 'blink' : ''}
                   style={leftBlink ? { filter: 'drop-shadow(0 0 7px #ffa500)' } : {}} />
          <ellipse cx="76" cy="148" rx="4.5" ry="3"
                   fill={rightBlink ? '#ffa500' : '#2a2a2a'}
                   className={rightBlink ? 'blink' : ''}
                   style={rightBlink ? { filter: 'drop-shadow(0 0 7px #ffa500)' } : {}} />
        </svg>
      </div>
    </div>
  );
}

export default CarTopView;