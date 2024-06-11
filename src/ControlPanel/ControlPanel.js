import React from 'react';

function ControlPanel({ onSliderChange, sliderValue }) {
  return (
    <div style={styles.controlPanel}>
      <span style={styles.label}>Left</span>
      <input
        type="range"
        min="-0.5"
        max="0.5"
        step="0.01"
        value={sliderValue}
        onChange={(e) => onSliderChange(parseFloat(e.target.value))}
        style={styles.slider}
      />
      <span style={styles.label}>Right</span>
    </div>
  );
}

const styles = {
  controlPanel: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  label: {
    margin: '0 10px',
  },
  slider: {
    width: '200px',
  },
};

export default ControlPanel;