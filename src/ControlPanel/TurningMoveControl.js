import React from "react";

function TurningMoveControl({onSliderChange, 
    sliderValue, }) {
    return (
        <>
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
        </>        
        
    );
}

const styles = {
    label: {
        margin: '0 10px',
      },
      slider: {
        width: '200px',
      },
      sliderContainer: {
        display: 'flex',
        alignItems: 'center',
      }
}

export default TurningMoveControl;