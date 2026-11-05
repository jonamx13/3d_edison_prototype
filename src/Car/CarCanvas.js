import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import './style.css';
import CarShow from "./CarsShow";
import ControlPanel from "../ControlPanel/ControlPanel";
import ExternalEvents from '../ExternalEvents/ExternalEvents';
import DigitalUI from "./DigitalUI";

function App() {
  const [acceleration, setAcceleration] = useState(0);
  const [manualWeather, setManualWeather] = useState(-5); // -10 = Day, +10 = Night
  const [manualClimate, setManualClimate] = useState(0);  // 0 = Clear, 10 = Storm
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

  const handleAcceleration     = (v) => setAcceleration(v);
  const handleManualWeather    = (v) => setManualWeather(v);
  const handleManualClimate    = (v) => setManualClimate(v);
  const handleTurnSliderMove   = (v) => setTurnMoveSlider(v);
  const handleHeadlightToggle  = ()  => setHeadlightsON(p => !p);
  const handleBeamToggle       = ()  => setHIGHBeam(p => !p);
  const handleTurnLeftToggle   = ()  => setTurnLEFT(p => !p);
  const handleBlinkerToggle    = ()  => setBlinkerACTIVE(p => !p);
  const handleTurnRightToggle  = ()  => setTurnRIGHT(p => !p);

  useEffect(() => {
    if (BLINK) {
      if (TurnLEFT) setTurnLEFT(false);
      if (TurnRIGHT) setTurnRIGHT(false);
    }
  }, [BLINK]);

  useEffect(() => { if (TurnLEFT  && TurnRIGHT) setTurnRIGHT(false); }, [TurnLEFT]);
  useEffect(() => { if (TurnRIGHT && TurnLEFT)  setTurnLEFT(false);  }, [TurnRIGHT]);

  useEffect(() => {
    switch (true) {
      case BLINK:     setDirectionalLightsManager('blinker'); break;
      case TurnLEFT:  setDirectionalLightsManager('left');    break;
      case TurnRIGHT: setDirectionalLightsManager('right');   break;
      default:        setDirectionalLightsManager('');
    }
  }, [BLINK, TurnLEFT, TurnRIGHT]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Suspense fallback={null}>
        <Canvas shadows environment='/public/textures/terrain-normal.jpg'>
          <CarShow
            Speed={acceleration}
            turningMove={turnMoveSlider}
            isheadLightsON={headlightsON}
            isheadlightBeamHIGH={HIGHBeam}
            directionalLights={directionalLightsManager}
            openedDoors={openDoors}
            dayNight={manualWeather}
            climate={manualClimate}
          />
        </Canvas>
      </Suspense>

      <DigitalUI>
        <div className="panels-layer">

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

            openDoors={openDoors}
            setOpenDoors={setOpenDoors}
          />

          <ExternalEvents
            onSliderChangingWeather={handleManualWeather}
            sliderWeatherValue={manualWeather}
            onSliderChangingClimate={handleManualClimate}
            sliderClimateValue={manualClimate}
          />
        </div>
      </DigitalUI>
    </div>
  );
}

export default App;