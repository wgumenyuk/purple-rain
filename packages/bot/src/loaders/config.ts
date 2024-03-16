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
import fs from "node:fs/promises";

// Types
import type { Bot } from "$structs/bot";

/**
 * Konfiguration.
*/
export type Config = {
  /**
   * Präfix, auf den Purple Rain reagiert.
  */
  prefix: string;

  /**
   * Discord-Token.
  */
  token: string;

  /**
   * Discord-ID des Besitzers.
  */
  ownerId: string;

  /**
   * Verbindungsdaten für Redis.
  */
  redis: {
    /**
     * Host.
    */
    host: string;

    /**
     * Port.
    */
    port?: number;

    /**
     * Passwort.
    */
    password: string;
  };
};

/**
 * Pfad zur Konfigurationsdatei.
*/
const CONFIG_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  `../../config.${process.env.NODE_ENV || "development"}.json`
);

/**
 * Lädt die Konfigurationsdatei.
*/
export const loadConfig = async function(this: Bot) {
  this.log.info("loading config");

  try {
    const file = await fs.readFile(CONFIG_PATH, "utf-8");
    this.config = JSON.parse(file);
  } catch(err) {
    this.log.fatal(err, "failed to load config");
    process.exit(1);
  }
};