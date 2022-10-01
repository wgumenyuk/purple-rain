/**
    Fügt eine Null zum Anfang hinzu, wenn das Segment kleiner als zehn ist.
*/
const pad = (segment: number) => {
    return (segment < 10) ? "0" + segment : `${segment}`;
};

/**
    Wandelt Millisekunden in einen lesbaren Zeitstempel um.
*/
const msToTimestamp = (ms: number) => {
    let seconds = ms / 1000;

    // Stunden extrahieren
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;

    // Minuten extrahieren
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let timestamp = `${pad(minutes)}:${pad(seconds)}`;

    if(hours > 0) {
        timestamp = `${pad(hours)}:${timestamp}`;
    }

    return timestamp;
};

export {
    msToTimestamp
};