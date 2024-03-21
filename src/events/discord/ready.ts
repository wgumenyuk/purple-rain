import { Events } from "discord.js";

// Types
import type { Handle } from "$structs/event-handler";

/**
 * Name des Events.
*/
export const name = Events.ClientReady;

/**
 * Wird ausgeführt, wenn Purple Rain eine Verbindung zu Discord aufgebaut hat.
*/
export const handle: Handle = function() {
  this.log.info("connected to Discord");
};