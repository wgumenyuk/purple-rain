import { Colors, EmbedBuilder, inlineCode } from "discord.js";
import {
  closest as getClosest,
  distance as getDistance
} from "fastest-levenshtein";

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

  const commands = bot.commands.map((command) => command.name);

  // Levenshtein-Distanz ermitteln.
  const closestCommandName = getClosest(commandName, commands);
  const distance = getDistance(commandName, closestCommandName);

  // Ähnlichsten Befehl hinzufügen, wenn Levenshtein-Distanz <= 2.
  if(distance <= 2) {
    embed.addFields({
      name: "Ähnlichster Befehl",
      value: inlineCode(closestCommandName)
    });
  }

  message.channel.send({
    embeds: [
      embed
    ]
  });
};