import React from 'react';
import HeadlightControl from './HeadlightControl';
import TurningMoveControl from './TurningMoveControl';
import DirectionalLights from './DirectionalLights';
import Acceleration from './Acceleration';
import CarTopView from './CarTopView';
import './ControlPanel.css';

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
  onTurnRightToggle,

  openDoors,
  setOpenDoors,   // <-- new: needed for the door buttons
}) {
  const toggleDoor = (door) =>
    setOpenDoors((prev) => ({ ...prev, [door]: !prev[door] }));

  const doors = [
    { key: 'Front_Left',  label: 'FL' },
    { key: 'Front_Right', label: 'FR' },
    { key: 'Back_Left',   label: 'BL' },
    { key: 'Back_Right',  label: 'BR' },
  ];

  return (
    <div className="panel_int">
      <div className="panel-header">
        <h2>Vehicle Control</h2>
      </div>

      <CarTopView
        isHeadlightON={isHeadlightON}
        isBeamHIGH={isBeamHIGH}
        directionalLightsManager={directionalLights}
        openDoors={openDoors}
      />

      <Acceleration
        onSliderChangingSpeed={onSliderChangeSpeed}
        sliderSpeedAccValue={sliderSpeedValue}
      />

      <TurningMoveControl
        onSliderTurningMoveChange={onSliderTurnMoveChange}
        sliderTurningMoveValue={sliderTurnMoveValue}
      />

      <HeadlightControl
        onHeadlightToggle={onHeadlightToggle}
        isON={isHeadlightON}
        onBeamToggle={onBeamToggle}
        isHIGHBeam={isBeamHIGH}
      />

      <DirectionalLights
        directionalLightsManager={directionalLights}
        onTurnLeftToggle={onTurnLeftToggle}
        blinkerActiveToggle={blinkerActiveToggle}
        onTurnRightToggle={onTurnRightToggle}
      />

      <div className="panel-section">
        <div className="panel-section-title">Doors</div>
        <div className="door-grid">
          {doors.map((d) => (
            <button
              key={d.key}
              onClick={() => toggleDoor(d.key)}
              className={`door-btn ${openDoors[d.key] ? 'open' : ''}`}
            >
              <span>{d.label}</span>
              <span className="door-state">
                {openDoors[d.key] ? 'OPEN' : 'SHUT'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;