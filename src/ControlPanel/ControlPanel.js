import React from 'react';
import HeadlightControl from './HeadlightControl';
import TurningMoveControl from './TurningMoveControl';
import DirectionalLights from './DirectionalLights';

function ControlPanel({ 
  onSliderChange, 
  sliderValue,

  onHeadlightToggle,
  isHeadlightON,

  onBeamToggle,
  isBeamHIGH,

  onTurnLeftToggle,
  isturnLeftActive,

  blinkerActiveToggle,
  isBlinkerActive,

  onTurnRightToggle,
  isTurnRightActive
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

        <DirectionalLights
        onTurnLeftToggle={onTurnLeftToggle}
        turnLeft={isturnLeftActive}

        blinkerActiveToggle={blinkerActiveToggle}
        blinker={isBlinkerActive}

        onTurnRightToggle={onTurnRightToggle}
        turnRight={isTurnRightActive}

        />
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