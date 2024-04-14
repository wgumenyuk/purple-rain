import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "fast-glob";

// Intern
import { isEventHandlerFile } from "$structs/event-handler";

// Types
import type { PurpleRain } from "$structs/purple-rain";

/**
  Glob-Pfad zum `events`-Ordner.
*/
const EVENTS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../events/**/*.js"
);

/**
  Lädt alle Event-Handler.
*/
export const loadEvents = async function(bot: PurpleRain) {
  const filePaths = await glob(EVENTS_PATH);

  for(const filePath of filePaths) {
    let file: unknown;

    try {
      file = await import(filePath);  
    } catch(err) {
      bot.log.warn(err, `failed to load event handler: ${filePath}`);
      continue;
    }

    if(!isEventHandlerFile(file)) {
      bot.log.warn(`skipping invalid event handler: ${filePath}`);
      continue;
    }

    const {
      name: event,
      handle
    } = file;

    // Event-Handler hinzufügen.
    bot.on(event, handle.bind(null, bot));
  }
};