import type { PurpleRain } from "$structs/purple-rain";

/**
 * Handle-Funktion.
*/
export type Handle = (this: PurpleRain, ...args: any) => Promise<void> | void;

/**
 * Event-Handler.
*/
export type EventHandler = {
  /**
   * Name des Events.
  */
  name: string;

  /**
   * Handle-Funktion.
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