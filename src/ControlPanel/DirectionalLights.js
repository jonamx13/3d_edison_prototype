import React from "react";

function DirectionalLights({
    onTurnLeftToggle,
    turnLeft,

    blinkerActiveToggle,
    blinker,

    onTurnRightToggle,
    turnRight
}) {

// TODO: Behaviours for blinking when blinker is on and just turn on when selecting a direction
    if(blinker) {
        turnLeft = true;
        turnRight = true;
    } else {

    }
    
    return(
        <div style={styles.buttonContainer}>
        <button onClick={onTurnLeftToggle} style={styles.button}>
          {turnLeft ? 'LEFT_ON' : 'LEFT_OFF'}
        </button>

        <button onClick={blinkerActiveToggle} style={styles.button}>
            {blinker ? 'blinker ON' : 'blinker OFF'}
        </button>

        <button onClick={onTurnRightToggle} style={styles.button}>
          {turnRight ? 'RIGHT_ON' : 'RIGHT_OFF'}
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