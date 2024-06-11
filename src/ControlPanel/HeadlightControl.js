import React from "react";

function HeadlightControl({
    onHeadlightToggle,
    isON,

    onBeamToggle,
    isHIGHBeam
}) {
    
    return(
        <div style={styles.buttonContainer}>
        <button onClick={onHeadlightToggle} style={styles.button}>
          {isON ? 'ON' : 'OFF'}
        </button>
        <button onClick={onBeamToggle} style={styles.button}>
          {isHIGHBeam ? 'High' : 'Low'}
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

export default HeadlightControl;