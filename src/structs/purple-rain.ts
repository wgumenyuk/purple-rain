import { Client, GatewayIntentBits as Intents } from "discord.js";

// Intern
import { createLogger } from "$structs/logger";

// Types
import type { Logger } from "pino";

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
};