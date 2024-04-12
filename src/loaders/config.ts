import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import { z } from "zod";
import yaml from "yaml";

// Types
import type { PurpleRain } from "$structs/purple-rain";

/**
  Pfad zur Konfigurationsdatei.
*/
const CONFIG_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../purple-rain.yaml"
);

/**
  Schema für die Konfigurationsdatei.
*/
const configSchema = z.object({
  /**
    Prefix, auf den Purple Rain reagiert.
  */
  prefix: z
    .string()
    .length(1),

  /**
    Discord-Token.
  */
  token: z
    .string()
    .length(59),

  /**
    Besitzer-ID.
  */
  ownerId: z
    .string()
    .length(18)
});

/**
  Konfiguration.
*/
export type Config = z.infer<typeof configSchema>;

/**
  Lädt die Konfiguration.
*/
export const loadConfig = async function(bot: PurpleRain) {
  try {
    const file = await fs.readFile(CONFIG_PATH, "utf-8");
    bot.config = await configSchema.parseAsync(yaml.parse(file));
  } catch(err) {
    bot.log.fatal(err, "failed to load config");
    process.exit(1);
  }
};