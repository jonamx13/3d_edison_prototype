import React from 'react';
import '../ControlPanel/ControlPanel.css';

function ExternalEvents({
  onSliderChangingWeather,
  sliderWeatherValue,
  onSliderChangingClimate,
  sliderClimateValue,
}) {
  return (
    <div className="panel_int panel-right">
      <div className="panel-header">
        <h2>Atmosphere</h2>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">Time of Day</div>
        <div className="slider-wrap">
          <span className="panel-label">DAY</span>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.01"
            value={sliderWeatherValue}
            onChange={(e) => onSliderChangingWeather(parseFloat(e.target.value))}
          />
          <span className="panel-label">NIGHT</span>
          <span className="slider-value">{sliderWeatherValue.toFixed(1)}</span>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">Climate</div>
        <div className="slider-wrap">
          <span className="panel-label">CLR</span>
          <input
            type="range"
            min="0"
            max="10"
            step="0.01"
            value={sliderClimateValue}
            onChange={(e) => onSliderChangingClimate(parseFloat(e.target.value))}
          />
          <span className="panel-label">STM</span>
          <span className="slider-value">{sliderClimateValue.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default ExternalEvents;