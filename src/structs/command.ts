import type { Awaitable, Message } from "discord.js";
import type { PurpleRain } from "$structs/purple-rain";

/**
  Datei, die einen Befehl exportiert.
*/
type CommandFile = {
  /**
    Exportierter Befehl.
  */
  command: Command;
};

/**
  Meta eines Befehls.
*/
type CommandMeta = {
  [ K in keyof Command as Exclude<K, "run" | "check"> ]: Command[K];
};

/**
  Abstrakter Befehl.
*/
export abstract class Command {
  /**
    Name.
  */
  public name: string;

  /**
    Liste von Aliassen.
  */
  public aliases: string[];

  /**
    Beschreibung.
  */
  public description: string;

  /**
    Syntax des Befehls.
  */
  public usage: string;

  /**
    Liste von Beispielen zur Verwendung.
  */
  public examples: string[];

  /**
    Konstruktor.
  */
  constructor(meta: CommandMeta) {
    this.name = meta.name.toLowerCase();
    this.aliases = meta.aliases.map((alias) => alias.toLowerCase());
    this.description = meta.description;
    this.usage = meta.usage;
    this.examples = meta.examples;
  }

  /**
    Führt den Befehl aus.
  */
  public abstract run(
    bot: PurpleRain,
    message: Message<true>,
    args: string[]
  ): Awaitable<void>;
};

/**
  Überprüft, ob ein Objekt eine Datei ist, die einen Befehl exportiert.
*/
export const isCommandFile = function(object: unknown): object is CommandFile {
  return (
    !!object &&
    typeof object === "object" &&
    "command" in object &&
    object.command instanceof Command
  );
};