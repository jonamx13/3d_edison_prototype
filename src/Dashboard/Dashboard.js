import React from 'react';
import './Dashboard.css';
import CircularPanel from './CenterPanel';
import CenterPanel from './CenterPanel';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <CircularPanel>
        {/* Left Circle Content */}
        <div>Left Circle Content</div>
      </CircularPanel>
      <CenterPanel>
        {/* Center Content */}
        <div>
          {/* Add your center content here, such as gear shift, battery status, etc. */}
          <div>1 2 3 4 5 R</div>
          <div>N</div>
          <div>75%</div>
          <div>04 Hours 30 Mins Remaining</div>
        </div>
      </CenterPanel>
      <CircularPanel>
        {/* Right Circle Content */}
        <div>Right Circle Content</div>
      </CircularPanel>
    </div>
  );
};

export default Dashboard;
