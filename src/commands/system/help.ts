import assert from "node:assert";
import { Colors, EmbedBuilder, inlineCode } from "discord.js";

// Intern
import { Command } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { PurpleRain } from "$structs/purple-rain";

/**
 * `help`-Befehl.
 * Zeigt Hilfe zu Purple Rain und seinen Befehlen an.
*/
export const command = new class extends Command {
  /**
   * Konstruktor.
  */
  constructor() {
    super({
      name: "help",
      description: "Zeigt Hilfe zu Purple Rain und seinen Befehlen an.",
      usage: "help [Befehl]",
      examples: [
        "help",
        "help playskip"
      ],
      aliases: [
        "h"
      ]
    });
  }

  /**
   * Führt den Befehl aus.
  */
  public run(bot: PurpleRain, message: Message<true>, args: string[]) {
    assert(bot.user, "bot user is `null`");

    if(args.length < 1) {
      // TODO: Allgemeine Hilfe anzeigen.
      return;
    }

    const commandName = args[0].toLowerCase();

    const command =
      bot.commands.get(commandName) ||
      // @ts-expect-error: `undefined` ist hier kein Problem.
      bot.commands.get(bot.aliases.get(commandName));

    if(!command) {
      const description =
        `Der Befehl ${inlineCode(commandName)} wurde nicht gefunden. ` +
        "Nutze `help`, um allgemeine Hilfe anzuzeigen.";

      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(description);

      message.channel.send({
        embeds: [
          embed
        ]
      });

      return;
    }

    if(command.isOwnerOnly && message.author.id !== bot.config.ownerId) {
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setAuthor({
        iconURL: message.author.displayAvatarURL(),
        name: "☔ Hilfe"
      })
      .setThumbnail(bot.user.displayAvatarURL())
      .setTitle(inlineCode(command.name))
      .setDescription(command.description)
      .addFields([
        {
          name: "Syntax",
          value: inlineCode(command.usage),
          inline: true
        }
      ]);

    // Aliasse hinzufügen.
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

    // Beispiele hinzufügen.
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
};