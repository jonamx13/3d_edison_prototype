import React from 'react';

function OpenDoorsUI({ openDoors }) {
  return (
    <div style={styles.controlPanel}>
      <div style={styles.buttonGrid}>
        <input 
          type="text"
          value={openDoors.Front_Left ? 'Front_Left_Door_OPEN' : 'Front_Left_Door_CLOSED'}
          style={styles.input}
          readOnly
        />

        <input 
          type="text"
          value={openDoors.Front_Right ? 'Front_Right_Door_OPEN' : 'Front_Right_Door_CLOSED'}
          style={styles.input}
          readOnly
        />

        <input 
          type="text"
          value={openDoors.Back_Left ? 'Back_Left_Door_OPEN' : 'Back_Left_Door_CLOSED'}
          style={styles.input}
          readOnly
        />

        <input 
          type="text"
          value={openDoors.Back_Right ? 'Back_Right_Door_OPEN' : 'Back_Right_Door_CLOSED'}
          style={styles.input}
          readOnly
        />
      </div>
    </div>
  );
}

const styles = {
  controlPanel: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  input: {
    padding: '10px',
    cursor: 'default',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
};

export default OpenDoorsUI;