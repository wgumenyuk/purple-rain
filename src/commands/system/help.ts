import { Command } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { PurpleRain } from "$structs/purple-rain";

/**
  `help`-Befehl.
  Zeigt allgemeine und spezifische Hilfe zu Befehlen an.
*/
export const command = new class extends Command {
  /**
    Konstruktor.
  */
  constructor() {
    super({
      name: "help",
      aliases: [
        "h"
      ],
      description: "Zeigt allgemeine und spezifische Hilfe zu Befehlen an.",
      usage: "help [Befehl]",
      examples: [
        "help",
        "help playskip"
      ]
    });
  }

  /**
    Gibt eine Embed mit allgemeiner Hilfe zum Bot zurück.
  */
  private generalHelp(bot: PurpleRain, message: Message<true>) {
    // TODO
  }

  /**
    Gibt eine Embed mit spezifischer Hilfe zu einem Befehl zurück.
  */
  private commandHelp(
    bot: PurpleRain,
    message: Message<true>,
    args: string[]
  ) {
    // TODO
  }

  /**
    Führt den Befehl aus.
  */
  public run(bot: PurpleRain, message: Message<true>, args: string[]) {
    // Allgemeine Hilfe zu Purple Rain anzeigen.
    if(args.length === 0) {
      this.generalHelp(bot, message);
      return;
    }

    // Spezifische Hilfe zu einem Befehl anzeigen.
    this.commandHelp(bot, message, args);
  }
};