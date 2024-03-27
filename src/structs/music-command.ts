import assert from "node:assert";
import { ChannelType, Colors, EmbedBuilder } from "discord.js";

// Intern
import { Command } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { CommandMeta } from "$structs/command";
import type { PurpleRain } from "$structs/purple-rain";

/**
 * Abstrakter Musikbefehl.
*/
export abstract class MusicCommand extends Command {
  /**
   * Konstruktor.
  */
  constructor(meta: CommandMeta) {
    super(meta);
  }

  /**
   * Überprüft, ob der Befehl ausgeführt werden kann.
  */
  public check(bot: PurpleRain, message: Message<true>, args: string[]) {
    assert(bot.user, "bot user is `null`");
    assert(message.member, "message member is `null`");

    const voiceChannel = message.member.voice.channel;

    // Check nach vorhandenem Voicechannel.
    if(!voiceChannel) {
      const description =
        "Du musst in einem Voicechannel sein, um " +
        "diesen Befehl verwenden zu können.";
      
      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(description);

      message.channel.send({
        embeds: [
          embed
        ]
      });

      return false;
    }

    // Check, ob der Voice-Channel vom Typ `GuildVoice` ist.
    if(voiceChannel.type !== ChannelType.GuildVoice) {
      const description =
        "Das Beitreten in diesen Voice-Channel ist momentan nicht möglich. " +
        "Handelt es sich um einen gewöhnlichen Voice-Channel?";

      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(description);

      message.channel.send({
        embeds: [
          embed
        ]
      });

      return false;
    }

    // Check, ob man dem Voicechannel beitreten kann.
    if(!voiceChannel.joinable) {
      const description =
        "Das Beitreten in diesen Voicechanel ist " +
        "momentan nicht möglich. Stimmen die Berechtigungen?";
      
      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(description);

      message.channel.send({
        embeds: [
          embed
        ]
      });

      return false;
    }

    if(
      this.name !== "join" &&
      this.name !== "play" &&
      !bot.queues.has(message.guild.id)
    ) {
      const description =
        "Es ist gerade keine Musikqueue vorhanden. Verwende `join` " +
        "oder `play`, um Purple Rain in den Voicechannel zu holen.";
      
      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(description);

      message.channel.send({
        embeds: [
          embed
        ]
      });

      return false;
    }

    // Check, ob der Nutzer im selben Voicechannel ist wie Purple Rain.
    if(!voiceChannel.members.has(bot.user.id)) {
      const description =
        "Du musst im selben Voicechannel wie " +
        "Purple Rain sein, um diesen Befehl verwenden zu können.";
      
      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(description);

      message.channel.send({
        embeds: [
          embed
        ]
      });

      return false;
    }

    return super.check(bot, message, args);
  }
};