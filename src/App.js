import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import './style.css'
import CarShow from "./CarsShow";
import ControlPanel from "./ControlPanel/ControlPanel"; // Adjust the path if necessary

function App() {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    // You can pass the value to the CarShow component or use it directly in this component.
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow turningMove={sliderValue} />
        </Canvas>
      </Suspense>
      <ControlPanel onSliderChange={handleSliderChange} sliderValue={sliderValue} />
    </div>
  );
}

export default App;