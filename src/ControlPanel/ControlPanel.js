import React from 'react';
import HeadlightControl from './HeadlightControl';
import TurningMoveControl from './TurningMoveControl';

function ControlPanel({ 
  onSliderChange, 
  sliderValue,

  onHeadlightToggle,
  isHeadlightON,

  onBeamToggle,
  isBeamHIGH
}) {
  return (
    <div style={styles.controlPanel}>
        <HeadlightControl
        onHeadlightToggle={onHeadlightToggle}
        isON={isHeadlightON}

        onBeamToggle={onBeamToggle}
        isHIGHBeam={isBeamHIGH}
        />

        <TurningMoveControl
        onSliderChange={onSliderChange}
        sliderValue={sliderValue}/>
    </div>
  );
}

const styles = {
    controlPanel: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    }
  };
export default ControlPanel;