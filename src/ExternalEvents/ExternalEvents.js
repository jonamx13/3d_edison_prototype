import React from 'react';

function ExternalEvents({ weather, openDoors, setOpenDoors }) {

  const handleDoorToggle = (door) => {
    setOpenDoors((prevState) => ({
      ...prevState,
      [door]: !prevState[door],
    }));
  };

  return (
    <div style={styles.controlPanel}>
      <div style={styles.buttonGrid}>
        <button 
          onClick={() => handleDoorToggle('Front_Left')}
          style={styles.button}
        >
          {openDoors.Front_Left ? 'Front_Left_Door_OPEN' : 'Front_Left_Door_CLOSED'}
        </button>

        <button 
          onClick={() => handleDoorToggle('Front_Right')}
          style={styles.button}
        >
          {openDoors.Front_Right ? 'Front_Right_Door_OPEN' : 'Front_Right_Door_CLOSED'}
        </button>

        <button 
          onClick={() => handleDoorToggle('Back_Left')}
          style={styles.button}
        >
          {openDoors.Back_Left ? 'Back_Left_Door_OPEN' : 'Back_Left_Door_CLOSED'}
        </button>

        <button 
          onClick={() => handleDoorToggle('Back_Right')}
          style={styles.button}
        >
          {openDoors.Back_Right ? 'Back_Right_Door_OPEN' : 'Back_Right_Door_CLOSED'}
        </button>
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
  button: {
    padding: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

export default ExternalEvents;