import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import yaml from "yaml";

// Types
import type{ PurpleRain } from "$structs/purple-rain";

/**
 * Konfiguration.
*/
export type Config = {
  /**
   * Discord-Token.
  */
  token: string;

  /**
   * Discord-ID des Besitzers.
  */
  ownerId: string;

  /**
   * Präfix, auf den Purple Rain reagiert.
  */
  prefix: string;
};

/**
 * Pfad zur `config.yaml`.
*/
const CONFIG_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../config.yaml"
);

/**
 * Lädt die Konfiguration.
*/
export async function loadConfig(this: PurpleRain) {
  this.log.info("loading config");

  try {
    const file = await fs.readFile(CONFIG_PATH, "utf-8");
    this.config = yaml.parse(file);
  } catch(err) {
    this.log.fatal(err, "failed to load config");
    process.exit(1);
  }

  this.log.info("config loaded");
};