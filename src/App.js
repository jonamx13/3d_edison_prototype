import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import './style.css'
import CarShow from "./CarsShow";
import ControlPanel from "./ControlPanel/ControlPanel"; // Adjust the path if necessary

function App() {
  const [turnMoveSlider, setTurnMoveSlider] = useState(0);
  const [headlightsON, setHeadlightsON] = useState(false);
  const [HIGHBeam, setHIGHBeam] = useState(false);
  const [TurnLEFT, setTurnLEFT] = useState(false);
  const [BLINK, setBlinkerACTIVE] = useState(false);
  const [TurnRIGHT, setTurnRIGHT] = useState(false);

  // Front wheels movement for turning right or left
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
          turningMove={turnMoveSlider}
          isheadLightsON={headlightsON}
          isheadlightBeamHIGH={HIGHBeam}
          />
        </Canvas>
      </Suspense>
      <ControlPanel 
      onSliderChange={handleTurnSliderMove}
      sliderValue={turnMoveSlider}

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