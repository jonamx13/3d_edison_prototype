import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./style.css";
import CarShow from "./CarsShow";

function App() {
  return(
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow></CarShow>
      </Canvas>
    </Suspense>
  );
}

export default App;