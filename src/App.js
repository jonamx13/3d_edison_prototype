import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import './style.css'
import CarShow from "./CarsShow";
import ControlPanel from "./ControlPanel/ControlPanel"; // Adjust the path if necessary

function App() {
  const [turnMoveSlider, setTurnMoveSlider] = useState(0);
  const [headlightsON, setHeadlightsON] = useState(false);
  const [HIGHBeam, setHIGHBeam] = useState(false);

  const handleTurnSliderMove = (value) => {
    setTurnMoveSlider(value);
  };

  const handleHeadlightToggle = () => {
    setHeadlightsON(prevState => !prevState);
  };

  const handleBeamToggle = () => {
    setHIGHBeam(prevState => !prevState);
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
      />
    </div>
  );
}

export default App;