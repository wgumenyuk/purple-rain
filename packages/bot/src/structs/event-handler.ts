/**
 *     ____                   __        ____        _     
 *    / __ \__  ___________  / /__     / __ \____ _(_)___
 *   / /_/ / / / / ___/ __ \/ / _ \   / /_/ / __ `/ / __ \
 *  / ____/ /_/ / /  / /_/ / /  __/  / _, _/ /_/ / / / / /
 * /_/    \__,_/_/  / .___/_/\___/  /_/ |_|\__,_/_/_/ /_/
 *                 /_/
 * 
 * Purple Rain
 * Artjom & Wlad G. Gumenyuk
 * GPL-3.0
 * 
*/

import type { ClientEvents } from "discord.js";
import type { Bot } from "$structs/bot";

/**
 * Funktion, die das Event verarbeitet.
*/
export type Handle = (this: Bot, ...args: any) => Promise<void> | void;

/**
 * Event-Handler.
*/
export type EventHandler = {
  /**
   * Name des Events.
  */
  name: keyof ClientEvents;

  /**
   * Funktion, die das Event verarbeitet.
  */
  handle: Handle;
};

/**
 * Überprüft, ob ein Objekt ein Event-Handler ist.
*/
export const isEventHandler = function(object: unknown): object is EventHandler {
  return (
    !!object &&
    typeof object === "object" &&
    "name" in object &&
    "handle" in object &&
    typeof object.name === "string" &&
    typeof object.handle === "function"
  );
};