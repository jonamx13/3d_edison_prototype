import React from "react";

function DirectionalLights({
    directionalLightsManager,
    onTurnLeftToggle,
    blinkerActiveToggle,
    onTurnRightToggle
}) {

  const getButtonLabels = () => {
    switch (directionalLightsManager) {
      case 'blinker':
        return {
          left: 'L_Blink',
          blinker: 'Blinker ON',
          right: 'R_Blink',
        };
      case 'left':
        return {
          left: 'LEFT_ON',
          blinker: 'Blinker OFF',
          right: 'RIGHT_OFF',
        };
      case 'right':
        return {
          left: 'LEFT_OFF',
          blinker: 'Blinker OFF',
          right: 'RIGHT_ON',
        };
      default:
        return {
          left: 'LEFT_OFF',
          blinker: 'Blinker OFF',
          right: 'RIGHT_OFF',
        };
    }
  };

  const { left, blinker, right } = getButtonLabels();
  
    
    return(
        <div style={styles.buttonContainer}>
        <button onClick={onTurnLeftToggle} style={styles.button}>
          {left}
        </button>

        <button onClick={blinkerActiveToggle} style={styles.button}>
            {blinker}
        </button>

        <button onClick={onTurnRightToggle} style={styles.button}>
          {right}
        </button>
      </div>
    )
}

const styles = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
      },
      button: {
        margin: '0 10px',
        padding: '5px 10px',
        cursor: 'pointer',
      },
}

export default DirectionalLights;