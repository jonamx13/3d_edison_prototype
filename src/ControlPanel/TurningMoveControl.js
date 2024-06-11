import React from "react";

function TurningMoveControl({
  onSliderChange, sliderValue
}) {
  return (
    <div style={styles.sliderContainer}>
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
  label: {
    margin: '0 10px',
  },
  slider: {
    flex: '1 1 200px',
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
  },
};

export default TurningMoveControl;
