import React from 'react';
import './Dashboard.css';
import CircularPanel from './CircularPanel';
import CenterPanel from './CenterPanel';
import CarCanvas from '../Car/CarCanvas';
import SignalsPanel from './SignalsBoard/SignalsPanel';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <CircularPanel className="left-circle">
        {/* Left Circle Content */}
        <CarCanvas/>
      </CircularPanel>
      <CenterPanel>
        {/* Center Content */}
        <SignalsPanel className='signals-panel'/>
        {/* <div className="center-content">
          <div className="gear-indicator">1 2 3 4 5 R</div>
          <div className="center-indicator">N</div>
          <div className="battery-status">75%</div>
          <div className="remaining-time">04 Hours 30 Mins Remaining</div>
        </div> */}
      </CenterPanel>
      <CircularPanel className="right-circle">
        {/* Right Circle Content */}
        <div className="circle-content">Right Circle Content</div>
      </CircularPanel>
    </div>
  );
};

export default Dashboard;
