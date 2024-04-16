import { randomUUID as randomId } from "node:crypto";
import { Colors, EmbedBuilder, inlineCode } from "discord.js";

// Types
import type { EventHandler } from "$structs/event-handler";

/**
  Name des Events.
*/
export const name = "commandError";

/**
  Wird ausgeführt, wenn ein Befehl nicht gefunden wird.
*/
export const handle: EventHandler<"commandError"> = function(
  bot,
  message,
  command,
  err
) {
  const traceId = randomId();

  bot.log.error(
    err,
    "failed to run command",
    {
      command: command.name,
      userId: message.author.id
    }
  );

  const embed = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription("Beim Ausführen des Befehls ist ein Fehler aufgetreten.")
    .addFields([
      {
        name: "Trace-ID",
        value: inlineCode(traceId)
      }
    ]);

  message.channel.send({
    embeds: [
      embed
    ]
  });
};