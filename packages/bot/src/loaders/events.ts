/**
 *     ____                   __        ____        _     
 *    / __ \__  ___________  / /__     / __ \____ _(_)___
 *   / /_/ / / / / ___/ __ \/ / _ \   / /_/ / __ `/ / __ \
 *  / ____/ /_/ / /  / /_/ / /  __/  / _, _/ /_/ / / / / /
 * /_/    \__,_/_/  / .___/_/\___/  /_/ |_|\__,_/_/_/ /_/
 *                 /_/
 * 
 * Purple Rain
 * Artjom & Wlad G. Gumenyuk
 * GPL-3.0
 * 
*/

import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "fast-glob";

// Intern
import { isEventHandler } from "$structs/event-handler";

// Types
import type { Bot } from "$structs/bot";

/**
 * Glob-Pfad zum `/events`-Ordner.
*/
const EVENTS_FOLDER_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../events/**/*.js"
);

/**
 * Lädt alle Event-Handler.
*/
export const loadEvents = async function(this: Bot) {
  this.log.info("loading events");
  
  const filePaths = await glob(EVENTS_FOLDER_PATH);

  for(const filePath of filePaths) {
    try {
      const file = await import(filePath);

      if(!isEventHandler(file)) {
        this.log.warn(`skipping invalid event handler "${filePath}"`);
        continue;
      }
  
      const { name, handle } = file;
  
      // Event-Handler hinzufügen.
      this.on(name, handle.bind(this));
    } catch(err) {
      this.log.error(err, `failed to load event handler "${filePath}"`);
    }
  }
};