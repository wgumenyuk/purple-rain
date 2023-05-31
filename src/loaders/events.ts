import path from "node:path";
import glob from "fast-glob";

// Types
import type { Bot } from "$structs/bot";

// #region Types
/**
    Datei, die einen Event-Handler exportiert.
*/
type EventHandlerFile = {
    /**
        Name des Events.
    */
    name: string;

    /**
        Handler-Funktion.
    */
    handler: (...args: any[]) => void;
};
// #endregion

/**
    Glob-Pfad zum `/events`-Ordner.
*/
const EVENTS_PATH = path
    .resolve(__dirname, "../events/**/*.js")
    .replaceAll("\\", "/");

/**
    Überprüft, ob die Exporte einer Datei ein gültiger
    Event-Handler sind.
*/
const _isEventHandler = (name: unknown, handler: unknown) => {
    return (
        !!name &&
        !!handler &&
        typeof name === "string" &&
        typeof handler === "function"
    );
};

/**
    Lädt alle Event-Handler.
*/
export const loadEvents = async (bot: Bot) => {
    const files = await glob(EVENTS_PATH);

    for(const file of files) {
        const { name, handler } = await import(file) as EventHandlerFile;

        // Exporte der Datei überprüfen
        if(!_isEventHandler(name, handler)) {
            const basename = path.basename(file);
            throw new Error(`events: Ungültiger Event-Handler in ${basename}`);
        }

        // Auf doppelte Event-Namen überprüfen
        if(bot.eventNames().includes(name)) {
            const basename = path.basename(file);
            throw new Error(`events: Doppelter Event-Name in ${basename}`);
        }

        // Event-Handler hinzufügen
        bot.on(name, handler.bind(null, bot));
    }
};