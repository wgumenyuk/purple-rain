import { Colors, EmbedBuilder, inlineCode } from "discord.js";

// Types
import type { EventHandler } from "$structs/event-handler";

/**
  Name des Events.
*/
export const name = "commandNotFound";

/**
  Wird ausgeführt, wenn ein Befehl nicht gefunden wird.
*/
export const handle: EventHandler<"commandNotFound"> = function(
  bot,
  message,
  commandName
) {
  const embed = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`Der Befehl ${inlineCode(commandName)} wurde nicht gefunden.`);

  message.channel.send({
    embeds: [
      embed
    ]
  });
};