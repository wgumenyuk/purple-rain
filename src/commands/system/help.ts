import { Colors, EmbedBuilder, inlineCode } from "discord.js";

// Intern
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
    const botUser = bot.user!;

    const description =
      "Purple Rain ist ein maßgefertigter Musikbot für den " +
      "Gentlemen's Club.\n" +
      // TODO: Evtl. keine Markdown-Unterstützung.
      "> Verwende `help [Befehl]`, um genauere Informationen über einen " +
      "Befehl zu erhalten.";

    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setThumbnail(botUser.displayAvatarURL())
      .setDescription(description)
      .addFields([
        {
          name: "Prefix",
          value: inlineCode(bot.config.prefix),
          inline: true  
        },
        {
          name: "Befehle",
          value: `${bot.commands.size}`,
          inline: true
        }
      ]);

    message.channel.send({
      embeds: [
        embed
      ]
    });
  }

  /**
    Gibt eine Embed mit spezifischer Hilfe zu einem Befehl zurück.
  */
  private commandHelp(
    bot: PurpleRain,
    message: Message<true>,
    args: string[]
  ) {
    const commandName = args
      .shift()!
      .toLowerCase();

    const command =
      bot.commands.get(commandName) ||
      // @ts-expect-error: `undefined` ist hier kein Problem.
      bot.commands.get(bot.aliases.get(commandName));

    if(!command) {
      bot.emit("commandNotFound", message, commandName);
      return;
    }

    const botUser = bot.user!;
    const member = message.member!;

    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setAuthor({
        iconURL: member.displayAvatarURL(),
        name: "Hilfe"
      })
      .setThumbnail(botUser.displayAvatarURL())
      .setTitle(`Hilfe zu ${inlineCode(command.name)}`)
      .setDescription(command.description);

    // Aliasse hinzufügen, falls vorhanden.
    if(command.aliases.length > 0) {
      const aliases = command.aliases
        .map(inlineCode)
        .join(", ");

      embed.addFields({
        name: (command.aliases.length === 1) ? "Alias" : "Aliasse",
        value: aliases,
        inline: true
      });
    }

    // Beispiele hinzufügen, falls vorhanden.
    if(command.examples.length > 0) {
      const examples = command.examples
        .map((example) => `- ${inlineCode(example)}`)
        .join("\n");

      embed.addFields({
        name: (command.examples.length === 1) ? "Beispiel" : "Beispiele",
        value: examples
      });
    }

    message.channel.send({
      embeds: [
        embed
      ]
    });
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