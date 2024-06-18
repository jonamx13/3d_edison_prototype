import React from 'react';
import './Dashboard.css';
import CircularPanel from './CircularPanel';
import CentralPanel from './CentralPanel'; // Adjusted import name
import CarCanvas from '../Car/CarCanvas';
import SignalsPanel from './SignalsBoard/SignalsPanel'; // Adjusted import path

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
      <CentralPanel>
          <div className="central-content">
            <SignalsPanel className='signals-panel' />
            {/* Other content within CentralPanel */}
          </div>
        </CentralPanel>

        <CircularPanel className="circle left-circle">
          <CarCanvas />
        </CircularPanel>
        
        <CircularPanel className="circle right-circle">
          <div className="circle-content">Right Circle Content</div>
        </CircularPanel>
        
      </div>
    </div>
  );
};

export default Dashboard;
