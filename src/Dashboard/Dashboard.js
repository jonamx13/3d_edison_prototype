import React from 'react';
import './Dashboard.css';
import CircularPanel from './CircularPanel';
import CenterPanel from './CentralPanel';
import CarCanvas from '../Car/CarCanvas';
import SignalsPanel from './SignalsBoard/SignalsPanel';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <CircularPanel className="circle left-circle">
          <CarCanvas/>
        </CircularPanel>
        <CenterPanel>
          <SignalsPanel className='signals-panel'/>
        </CenterPanel>
        <CircularPanel className="circle right-circle">
          <div className="circle-content">Right Circle Content</div>
        </CircularPanel>
      </div>
    </div>
  );
};

export default Dashboard;
