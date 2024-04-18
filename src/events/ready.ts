import { Events } from "discord.js";

// Types
import type { EventHandler } from "$structs/event-handler";

/**
  Name des Events.
*/
export const name = Events.ClientReady;

/**
  Wird ausgeführt, sobald Purple Rain mit Discord verbunden ist.
*/
export const handle: EventHandler<Events.ClientReady> = function(bot) {
  bot.log.info("connected to Discord");
};