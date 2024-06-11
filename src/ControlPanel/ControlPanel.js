import React from 'react';
import HeadlightControl from './HeadlightControl';
import TurningMoveControl from './TurningMoveControl';
import DirectionalLights from './DirectionalLights';
import Acceleration from './Acceleration';

function ControlPanel({ 
  onSliderChangeSpeed,
  sliderSpeedValue,

  onSliderTurnMoveChange, 
  sliderTurnMoveValue,

  onHeadlightToggle,
  isHeadlightON,

  onBeamToggle,
  isBeamHIGH,

  directionalLights,
  onTurnLeftToggle,
  blinkerActiveToggle,
  onTurnRightToggle
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
        onSliderTurningMoveChange={onSliderTurnMoveChange}
        sliderTurningMoveValue={sliderTurnMoveValue}
        />

        <DirectionalLights
        directionalLightsManager={directionalLights}
        onTurnLeftToggle={onTurnLeftToggle}
        blinkerActiveToggle={blinkerActiveToggle}
        onTurnRightToggle={onTurnRightToggle}
        />

        <Acceleration
        onSliderChangingSpeed={onSliderChangeSpeed}
        sliderSpeedAccValue={sliderSpeedValue}
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