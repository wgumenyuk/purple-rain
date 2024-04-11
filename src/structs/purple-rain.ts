import { Client, GatewayIntentBits as Intents } from "discord.js";

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
    Konstruktor.
  */
  constructor() {
    super({
      intents: INTENTS
    });
  }
};