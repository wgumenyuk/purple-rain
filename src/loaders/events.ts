import path from "node:path";
import glob from "fast-glob";

// Types
import type Bot from "$structs/bot";

// #region Types
/**
    Event-Handler.
*/
type EventHandler = (...args: any[]) => Promise<void> | void;
// #endregion

/**
    Glob-Pfad zum `events`-Ordner.
*/
const EVENTS_PATH = path
    .join(__dirname, "../events/**/*.js")
    .replaceAll("\\", "/");

/**
    Lädt alle Events aus dem `events`-Ordner.
*/
const loadEvents = async (bot: Bot) => {
    const files = await glob(EVENTS_PATH);

    for(const file of files) {
        const eventName = path.basename(file).replace(".js", "");
        const eventHandler: EventHandler = (await import(file)).default;

        if(typeof eventHandler !== "function") {
            throw new Error(`Event-Loader: Fehlender Handler für "${eventName}"`);
        }

        bot.on(eventName, eventHandler.bind(null, bot));
    }

    bot.logger.debug(`Events geladen (${bot.eventNames().length})`);
};

export default loadEvents;