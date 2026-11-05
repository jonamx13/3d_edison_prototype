import React from 'react';
import './ControlPanel.css';

function HeadlightControl({ onHeadlightToggle, isON, onBeamToggle, isHIGHBeam }) {
  return (
    <div className="panel-section">
      <div className="panel-section-title">Headlights</div>
      <div className="panel-row">
        <button
          onClick={onHeadlightToggle}
          className={`panel-btn ${isON ? 'active' : ''}`}
        >
          {isON ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={onBeamToggle}
          disabled={!isON}
          className={`panel-btn ${isHIGHBeam ? 'active warn' : ''}`}
        >
          {isHIGHBeam ? 'BEAM · HIGH' : 'BEAM · LOW'}
        </button>
      </div>
    </div>
  );
}

export default HeadlightControl;