import type { PurpleRain } from "$structs/purple-rain";

/**
  Handle-Funktion.
*/
export type EventHandler = (this: PurpleRain, ...args: any) => Promise<void> | void;

/**
  Datei, die einen Event-Handler exportiert.
*/
type EventHandlerFile = {
  /**
   * Name des Events.
  */
  name: string;

  /**
   * Handle-Funktion.
  */
  handle: EventHandler;
};

/**
  Überprüft, ob ein Objekt eine Datei ist, die einen Event-Handler exportiert.
*/
export const isEventHandler = function(object: unknown): object is EventHandlerFile {
  return (
    !!object &&
    typeof object === "object" &&
    "name" in object &&
    "handle" in object &&
    typeof object.name === "string" &&
    typeof object.handle === "function"
  );
};