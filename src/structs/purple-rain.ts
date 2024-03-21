import { Client, GatewayIntentBits } from "discord.js";

// Intern
import { logger } from "$structs/logger";
import { loadConfig } from "$loaders/config";
import { loadEvents } from "$loaders/events";

// Types
import type { Logger } from "pino";
import type { Config } from "$loaders/config";

/**
 * Intents für Purple Rain.
*/
const INTENTS: GatewayIntentBits[] = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent
];

/**
 * Purple Rain.
*/
export class PurpleRain extends Client {
  /**
   * Konfiguration.
  */
  // @ts-expect-error: `config` wird mit `loadConfig()` geladen.
  public config: Config = null;

  /**
   * Logger.
  */
  public log: Logger;

  /**
   * Konstruktor.
  */
  constructor() {
    super({
      intents: INTENTS
    });

    this.log = logger({
      msgPrefix: "[bot] "
    });
  }

  /**
   * Initialisiert Purple Rain.
  */
  public async init() {
    this.log.info("initializing");

    // Loader ausführen.
    await Promise.all([
      loadConfig.call(this),
      loadEvents.call(this)
    ]);

    this.log.info("connecting to Discord");

    try {
      await this.login(this.config.token);
    } catch(err) {
      this.log.fatal(err, "failed to connect to Discord");
      process.exit(1);
    }
  }
};