import React from 'react';
import './DigitalUI.css';

function DigitalUI({ children }) {
  return (
    <div className='panel_background'>
      {children}
    </div>
  );
}

export default DigitalUI;
