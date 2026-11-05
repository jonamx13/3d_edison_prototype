import React from 'react';
import SteeringWheel from './SteeringWheel';
import './ControlPanel.css';

function TurningMoveControl({ onSliderTurningMoveChange, sliderTurningMoveValue }) {
  return (
    <div className="panel-section">
      <div className="panel-section-title">Steering</div>
      <div className="slider-wrap">
        <SteeringWheel value={sliderTurningMoveValue} />
        <input
          type="range"
          min="-0.5"
          max="0.5"
          step="0.01"
          value={sliderTurningMoveValue}
          onChange={(e) => onSliderTurningMoveChange(parseFloat(e.target.value))}
        />
        <span className="slider-value">
          {sliderTurningMoveValue.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default TurningMoveControl;