import React from 'react';
import Pedal from './Pedal';
import './ControlPanel.css';

function Acceleration({ onSliderChangingSpeed, sliderSpeedAccValue }) {
  return (
    <div className="panel-section">
      <div className="panel-section-title">Throttle</div>
      <div className="slider-wrap">
        <Pedal value={sliderSpeedAccValue} max={10} />
        <input
          type="range"
          min="0"
          max="10"
          step="0.01"
          value={sliderSpeedAccValue}
          onChange={(e) => onSliderChangingSpeed(parseFloat(e.target.value))}
        />
        <span className="slider-value">
          {sliderSpeedAccValue.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Acceleration;