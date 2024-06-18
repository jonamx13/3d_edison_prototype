import React from 'react';
import './CentralPanel.css';

const CenterPanel = ({ children }) => {
  return (
    <div className="center-panel">
      {children}
    </div>
  );
};

export default CenterPanel;
