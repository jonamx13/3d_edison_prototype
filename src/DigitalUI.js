import React from 'react';

function DigitalUI({ children }) {
  return (
    <div style={styles.digitalUI}>
      {children}
    </div>
  );
}

const styles = {
  digitalUI: {
    display: 'flex',
    flexDirection: 'column', // Change this to row if you want them side by side
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
};

export default DigitalUI;