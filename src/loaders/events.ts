import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "fast-glob";

// Intern
import { isEventHandler } from "$structs/event-handler";

// Types
import type { PurpleRain } from "$structs/purple-rain";

/**
  Glob-Pfad zum `/events`-Ordner.
*/
const EVENTS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../events/**/*.js"
);

/**
  Lädt alle Events.
*/
export const loadEvents = async function(this: PurpleRain) {
  this.log.info("loading events");

  const filePaths = await glob(EVENTS_PATH);

  for(const filePath of filePaths) {
    try {
      const file = await import(filePath);

      if(!isEventHandler(file)) {
        this.log.warn(`skipping invalid event handler: ${filePath}`);
        continue;
      }

      const { name, handle } = file;

      if(this.eventNames().includes(name)) {
        this.log.warn(`event handler for "${name}" is already added: ${filePath}`);
        continue;
      }

      // Event-Handler hinzufügen.
      this.on(name, handle.bind(this));
    } catch(err) {
      this.log.warn(err, `failed to load event handler: ${filePath}`);
    }
  }

  this.log.info(`loaded ${this.eventNames().length - 1} events`);
};