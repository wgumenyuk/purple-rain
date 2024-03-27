import { Client, Collection, GatewayIntentBits } from "discord.js";

// Intern
import { logger } from "$structs/logger";
import { loadConfig } from "$loaders/config";
import { loadEvents } from "$loaders/events";
import { loadCommands } from "$loaders/commands";

// Types
import type { Logger } from "pino";
import type { Config } from "$loaders/config";
import type { Command } from "$structs/command";

/**
  Intents für Purple Rain.
*/
const INTENTS: GatewayIntentBits[] = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent
];

/**
  Purple Rain.
*/
export class PurpleRain extends Client {
  /**
    Konfiguration.
  */
  // @ts-expect-error: `config` wird mit `loadConfig()` geladen.
  public config: Config = null;

  /**
    Logger.
  */
  public log: Logger;

  /**
    Kollektion von Befehlen.
  */
  public commands: Collection<string, Command>;

  /**
    Kollektion von Aliassen.
  */
  public aliases: Collection<string, string>;

  /**
    Konstruktor.
  */
  constructor() {
    super({
      intents: INTENTS
    });

    this.log = logger({
      msgPrefix: "[bot] "
    });

    this.commands = new Collection();
    this.aliases = new Collection();
  }

  /**
    Initialisiert Purple Rain.
  */
  public async init() {
    this.log.info("initializing");

    // Loader ausführen.
    await Promise.all([
      loadConfig.call(this),
      loadEvents.call(this),
      loadCommands.call(this)
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