import path from "path";
import glob from "glob-promise";

// Types
import type Aura from "@structs/aura";

/**
    Pfad zum Events-Ordner.
*/
const EVENTS_PATH = path.resolve(__dirname, "../events/*.js").replaceAll("\\", "/");

/**
    Lädt alle verfügbaren Events.
*/
const loadEvents = async (bot: Aura) => {
    const start = performance.now();

    const files = await glob(EVENTS_PATH);

    for(const file of files) {
        const handler = (await import(file)).default;
        const event = path.basename(file).replace(".js", "");

        bot.on(event, handler.bind(null, bot));
    }

    const end = performance.now();
    const diff = Math.round(end - start);

    bot.logger.info(`Events geladen (${diff}ms)`);
};

export default loadEvents;