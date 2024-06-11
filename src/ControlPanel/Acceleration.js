import React from "react";

function Acceleration({
  onSliderChangingSpeed,
  sliderSpeedAccValue
}) {
  return (
    <div style={styles.sliderContainer}>
      <span style={styles.label}>Acceleration</span>
      <input
        type="range"
        min="0"
        max="10"
        step="0.01"
        value={sliderSpeedAccValue}
        onChange={(e) => onSliderChangingSpeed(parseFloat(e.target.value))}
        style={styles.slider}
      />
    </div>
  );
}

const styles = {
  label: {
    margin: '0 10px',
  },
  slider: {
    flex: '1 1 30px',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1',
  },
};

export default Acceleration;
