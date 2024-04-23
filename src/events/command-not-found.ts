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
  let description = `Der Befehl ${inlineCode(commandName)} wurde nicht gefunden.`;
  
  const embed = new EmbedBuilder()
    .setColor(Colors.Red);

  const commands = bot.commands.map((command) => command.name);

  // Levenshtein-Distanz ermitteln.
  const closestCommandName = getClosest(commandName, commands);
  const distance = getDistance(commandName, closestCommandName);

  // Ähnlichsten Befehl hinzufügen, wenn Levenshtein-Distanz <= 2.
  if(distance <= 2) {
    description += ` Meintest du ${inlineCode(closestCommandName)}?`;
  }

  embed.setDescription(description);

  message.channel.send({
    embeds: [
      embed
    ]
  });
};