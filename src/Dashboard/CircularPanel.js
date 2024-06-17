import React from 'react';
import './CircularPanel.css';

const CircularPanel = ({ className, children }) => {
   return <div className={`circle ${className}`}>{children}</div>;
};

export default CircularPanel;
