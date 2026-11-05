import React from 'react';
import './ControlPanel.css';

function DirectionalLights({
  directionalLightsManager,
  onTurnLeftToggle,
  blinkerActiveToggle,
  onTurnRightToggle,
}) {
  const leftOn    = directionalLightsManager === 'left'  || directionalLightsManager === 'blinker';
  const rightOn   = directionalLightsManager === 'right' || directionalLightsManager === 'blinker';
  const hazardOn  = directionalLightsManager === 'blinker';

  return (
    <div className="panel-section">
      <div className="panel-section-title">Turn Signals</div>
      <div className="panel-row">
        <button
          onClick={onTurnLeftToggle}
          className={`panel-btn ${leftOn ? 'warn active' : ''}`}
        >
          ◀ LEFT
        </button>
        <button
          onClick={blinkerActiveToggle}
          className={`panel-btn ${hazardOn ? 'warn active' : ''}`}
        >
          ⚠ HAZARD
        </button>
        <button
          onClick={onTurnRightToggle}
          className={`panel-btn ${rightOn ? 'warn active' : ''}`}
        >
          RIGHT ▶
        </button>
      </div>
    </div>
  );
}

export default DirectionalLights;
