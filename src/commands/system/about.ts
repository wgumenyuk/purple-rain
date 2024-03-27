import assert from "node:assert";
import { Colors, EmbedBuilder, inlineCode } from "discord.js";

// Intern
import { Command } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { PurpleRain } from "$structs/purple-rain";

/**
  `about`-Befehl.
  Zeigt Informationen über Purple Rain an.
*/
export const command = new class extends Command {
  /**
    Konstruktor.
  */
  constructor() {
    super({
      name: "about",
      description: "Zeigt Informationen über Purple Rain an.",
      usage: "about",
      examples: [],
      aliases: []
    });
  }

  /**
    Führt den Befehl aus.
  */
  public run(bot: PurpleRain, message: Message<true>) {
    assert(bot.user, "bot user is `null`");

    const description =
      "Purple Rain ist ein maßgefertigter Musikbot für den Gentlemen's Club.";

    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setAuthor({
        iconURL: message.author.displayAvatarURL(),
        name: "☔ Über"
      })
      .setThumbnail(bot.user.displayAvatarURL())
      .setTitle("Purple Rain")
      .setDescription(description)
      .addFields([
        {
          name: "Präfix",
          value: inlineCode(bot.config.prefix)
        }
      ]);
    
    message.channel.send({
      embeds: [
        embed
      ]
    });
  }
};