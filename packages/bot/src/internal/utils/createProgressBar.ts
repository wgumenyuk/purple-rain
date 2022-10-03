/**
    Länge der Progress-Bar.
*/
const PROGRESS_BAR_LENGTH = 17;

/**
    Erstellt eine Progress-Bar für den aktuellen Song.
*/
const createProgressBar = (duration: number, playback: number) => {
    const position = Math.round((playback * PROGRESS_BAR_LENGTH) / duration) - 1;
    
    const progressBar = ("—").repeat(PROGRESS_BAR_LENGTH).split("");
    
    progressBar.splice(position, 1, "🟣");

    return `[${progressBar.join("")}]`;
};

export {
    createProgressBar
};