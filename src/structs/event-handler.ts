import type { Awaitable, ClientEvents } from "discord.js";
import type { PurpleRain } from "$structs/purple-rain";

/**
  Event-Handler.
*/
export type EventHandler<T extends keyof ClientEvents> = (
  bot: PurpleRain,
  ...args: ClientEvents[T]
) => Awaitable<void>;

/**
  Datei, die einen Event-Handler exportiert.
*/
type EventHandlerFile = {
  /**
    Name des Events.
  */
  name: string;

  /**
    Event-Handler.
  */
  handle: EventHandler<any>;
};

/**
  Überprüft, ob ein Objekt eine Datei ist, die einen Event-Handler exportiert.
*/
export const isEventHandlerFile = function(
  object: unknown
): object is EventHandlerFile {
  return (
    !!object &&
    typeof object === "object" &&
    "name" in object &&
    "handle" in object &&
    typeof object.name === "string" &&
    typeof object.handle === "function"
  );
};