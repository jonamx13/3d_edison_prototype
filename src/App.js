import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import './style.css'
import CarShow from "./CarsShow";
import ControlPanel from "./ControlPanel/ControlPanel";
import ExternalEvents from './ExternalEvents/ExternalEvents'

function App() {
  const [acceleration, setAcceleration] = useState(0);
  const [turnMoveSlider, setTurnMoveSlider] = useState(0);
  const [headlightsON, setHeadlightsON] = useState(false);
  const [HIGHBeam, setHIGHBeam] = useState(false);
  const [TurnLEFT, setTurnLEFT] = useState(false);
  const [BLINK, setBlinkerACTIVE] = useState(false);
  const [TurnRIGHT, setTurnRIGHT] = useState(false);
  const [directionalLightsManager, setDirectionalLightsManager] = useState('');
  const [openDoors, setOpenDoors] = useState({
    Front_Left: false,
    Front_Right: false,
    Back_Left: false,
    Back_Right: false,
  });

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

  // Effect to handle BLINK logic
  useEffect(() => {
    if (BLINK) {
      if (TurnLEFT) setTurnLEFT(false);
      if (TurnRIGHT) setTurnRIGHT(false);
    }
  }, [BLINK]);

  // Effect to handle TurnLEFT logic
  useEffect(() => {
    if (TurnLEFT && TurnRIGHT) {
      setTurnRIGHT(false);
    }
  }, [TurnLEFT]);

  // Effect to handle TurnRIGHT logic
  useEffect(() => {
    if (TurnRIGHT && TurnLEFT) {
      setTurnLEFT(false);
    }
  }, [TurnRIGHT]);

  // Effect to handle directionalLightsManager state
  useEffect(() => {
    switch (true) {
      case BLINK:
        setDirectionalLightsManager('blinker');
        break;
      case TurnLEFT:
        setDirectionalLightsManager('left');
        break;
      case TurnRIGHT:
        setDirectionalLightsManager('right');
        break;
      default:
        setDirectionalLightsManager('');
    }
  }, [BLINK, TurnLEFT, TurnRIGHT]);


  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow
          Speed={acceleration} // Add use state
          turningMove={turnMoveSlider}
          isheadLightsON={headlightsON}
          isheadlightBeamHIGH={HIGHBeam}
          directionalLights={directionalLightsManager}
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

      directionalLights={directionalLightsManager}
      onTurnLeftToggle={handleTurnLeftToggle}
      blinkerActiveToggle={handleBlinkerToggle}
      onTurnRightToggle={handleTurnRightToggle}
      />

      <ExternalEvents
        // weather={} //TODO: Integrate HDRI's and a weather API (Also a manual control to simulate the climate change)
        openDoors={openDoors}
        setOpenDoors={setOpenDoors}
      />
    </div>
  );
}

export default App;