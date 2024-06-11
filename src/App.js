import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import './style.css'
import CarShow from "./CarsShow";
import ControlPanel from "./ControlPanel/ControlPanel"; // Adjust the path if necessary

function App() {
  const [acceleration, setAcceleration] = useState(0);
  const [turnMoveSlider, setTurnMoveSlider] = useState(0);
  const [headlightsON, setHeadlightsON] = useState(false);
  const [HIGHBeam, setHIGHBeam] = useState(false);
  const [TurnLEFT, setTurnLEFT] = useState(false);
  const [BLINK, setBlinkerACTIVE] = useState(false);
  const [TurnRIGHT, setTurnRIGHT] = useState(false);

  // Speed slider
  const handleAcceleration = (value) => {
    setAcceleration(value);
  }

  // Front wheels movement slider for turning right or left
  const handleTurnSliderMove = (value) => {
    setTurnMoveSlider(value);
  };

  // Headlights state for being on/off and being high/low beam
  const handleHeadlightToggle = () => {
    setHeadlightsON(prevState => !prevState);
  };

  const handleBeamToggle = () => {
    setHIGHBeam(prevState => !prevState);
  };

  const handleTurnLeftToggle = () => {
    setTurnLEFT(prevState => !prevState);
  };

  // Directional lights Blinking state and turning left/right states
  const handleBlinkerToggle = () => {
    setBlinkerACTIVE(prevState => !prevState);
  };

  const handleTurnRightToggle = () => {
    setTurnRIGHT(prevState => !prevState);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow
          Speed={acceleration} // Add use state
          turningMove={turnMoveSlider}
          isheadLightsON={headlightsON}
          isheadlightBeamHIGH={HIGHBeam}
          directionalLights={'blinker'}
          />
        </Canvas>
      </Suspense>
      <ControlPanel 
      onSliderChangeSpeed={handleAcceleration}
      sliderSpeedValue={acceleration}

      onSliderTurnMoveChange={handleTurnSliderMove}
      sliderTurnMoveValue={turnMoveSlider}

      onHeadlightToggle={handleHeadlightToggle}
      isHeadlightON={headlightsON}

      onBeamToggle={handleBeamToggle}
      isBeamHIGH={HIGHBeam}

      onTurnLeftToggle={handleTurnLeftToggle}
      isturnLeftActive={TurnLEFT}

      blinkerActiveToggle={handleBlinkerToggle}
      isBlinkerActive={BLINK}

      onTurnRightToggle={handleTurnRightToggle}
      isTurnRightActive={TurnRIGHT}
      />
    </div>
  );
}

export default App;