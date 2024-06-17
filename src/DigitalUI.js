import React from 'react';
import '../src/DigitalUI.css';

function DigitalUI({ children }) {
  return (
    <div className='panel_background'>
      {children}
    </div>
  );
}

export default DigitalUI;
