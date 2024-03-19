import { Client, GatewayIntentBits } from "discord.js";

// Intern
import { logger } from "$structs/logger";

// Types
import type { Logger } from "pino";

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
};