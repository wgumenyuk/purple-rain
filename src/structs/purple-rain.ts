import { Client, GatewayIntentBits as Intents } from "discord.js";

// Intern
import { createLogger } from "$structs/logger";
import { loadConfig } from "$loaders/config";

// Types
import type { Logger } from "pino";
import type { Config } from "$loaders/config";

/**
  Intents für Purple Rain.
*/
const INTENTS: Intents[] = [
  Intents.Guilds,
  Intents.GuildMembers,
  Intents.GuildMessages,
  Intents.GuildVoiceStates,
  Intents.MessageContent
];

/**
  Purple Rain.
*/
export class PurpleRain extends Client {
  /**
    Konfiguration.
  */
  // @ts-expect-error: `config` wird mit `init()` geladen.
  public config: Config = null;

  /**
    Logger.
  */
  public log: Logger;

  /**
    Konstruktor.
  */
  constructor() {
    super({
      intents: INTENTS
    });

    this.log = createLogger({
      msgPrefix: "[bot] "
    });
  }

  /**
    Initialisiert Purple Rain.
  */
  public async init() {
    this.log.info("initializing");

    // Loader ausführen.
    await Promise.allSettled([
      loadConfig(this)
    ]);

    try {
      await this.login(this.config.token);
    } catch(err) {
      this.log.fatal(err, "failed to initialize");
      process.exit(1);
    }
  }
};