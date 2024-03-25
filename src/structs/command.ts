import { Colors, EmbedBuilder } from "discord.js";

// Types
import { logger } from "$structs/logger";

// Types
import type { Message } from "discord.js";
import type { Logger } from "pino";
import type { PurpleRain } from "$structs/purple-rain";

/**
 * Datei, die einen Befehl exportiert.
*/
type CommandFile = {
  /**
   * Exportierter Befehl.
  */
  command: Command;
};

/**
 * Befehls-Meta.
*/
export type CommandMeta = {
  /**
   * Name.
  */
  name: string;

  /**
   * Beschreibung.
  */
  description: string;

  /**
   * Syntax.
  */
  usage: string;

  /**
   * Beispiele zur Verwendung.
  */
  examples: string[];

  /**
   * Liste von Aliassen.
  */
  aliases: string[];

  /**
   * Ob der Befehl nur vom Besitzer ausgeführt werden kann.
   * @default false
  */
  isOwnerOnly?: boolean;
};

/**
 * Abstrakter Befehl.
*/
export abstract class Command {
  /**
   * Logger für den Befehl.
  */
  public log: Logger;

  /**
   * Name.
  */
  public name: string;

  /**
   * Beschreibung.
  */
  public description: string;

  /**
   * Syntax.
  */
  public usage: string;

  /**
   * Beispiele zur Verwendung.
  */
  public examples: string[];

  /**
   * Liste von Aliassen.
  */
  public aliases: string[];

  /**
   * Ob der Befehl nur vom Besitzer ausgeführt werden kann.
  */
  public isOwnerOnly: boolean;

  /**
   * Konstruktor.
  */
  constructor(meta: CommandMeta) {
    this.name = meta.name.toLowerCase();
    this.description = meta.description;
    this.usage = meta.usage;
    this.examples = meta.examples;
    this.aliases = meta.aliases;
    this.isOwnerOnly = meta.isOwnerOnly || false;

    this.log = logger(
      {
        msgPrefix: "[command] "
      },
      {
        command: this.name
      }
    );
  }

  /**
   * Überprüft, ob der Befehl ausgeführt werden kann.
  */
  public check(bot: PurpleRain, message: Message<true>, args: string[]) {
    // Check für Owner-only Befehle.
    if(this.isOwnerOnly && message.author.id !== bot.config.ownerId) {
      this.log.warn(`${message.author.id} tried running an owner-only command`);

      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription("Dieser Befehl kann nur vom Besitzer ausgeführt werden.");

      message.channel.send({
        embeds: [
          embed
        ]
      });
      
      return false;
    }

    return true;
  }

  /**
   * Führt den Befehl aus.
  */
  public abstract run(
    bot: PurpleRain,
    message: Message<true>,
    args: string[]
  ): Promise<void> | void;
};

/**
 * Überprüft, ob ein Objekt eine Datei ist, die einen Befehl exportiert.
*/
export const isCommand = function(object: unknown): object is CommandFile {
  return (
    !!object &&
    typeof object === "object" &&
    "command" in object &&
    object.command instanceof Command
  );
};