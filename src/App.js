import React from 'react';
import './App.css';
import CarCanvas from './Car/CarCanvas'
import Dashboard from './Dashboard/Dashboard'

function App() {
  return (
    <div className="app-container">
      {/* <Dashboard/> */}
      <CarCanvas />
    </div>
  );
}

export default App;
