import { randomUUID as randomId } from "node:crypto";
import { Events, EmbedBuilder, Colors, inlineCode } from "discord.js";

// Types
import type { Message } from "discord.js";
import type { EventHandler } from "$structs/event-handler";

/**
  Name des Events.
*/
export const name = Events.MessageCreate;

/**
  Wird ausgeführt, wenn Purple Rain eine Nachricht erhält.
*/
export const handle: EventHandler = async function(message: Message) {
  if(!message.inGuild() || message.author.bot) {
    return;
  }

  const { content } = message;

  if(!content.startsWith(this.config.prefix)) {
    return;
  }

  const args = content.split(/\s+/g);

  if(args.length < 1) {
    return;
  }

  const commandName = args
    .shift()!
    .slice(this.config.prefix.length)
    .toLowerCase();

  if(!commandName) {
    return;
  }

  const command =
    this.commands.get(commandName) ||
    // @ts-expect-error: `undefined` ist hier kein Problem.
    this.commands.get(this.aliases.get(commandName));

  if(!command) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`Der Befehl ${inlineCode(commandName)} wurde nicht gefunden.`);

    message.channel.send({
      embeds: [
        embed
      ]
    });

    return;
  }

  const isCheckOk = command.check(this, message, args);

  // Fehlernachrichten werden automatisch von `check()` verschickt.
  if(!isCheckOk) {
    return;
  }

  try {
    await command.run(this, message, args);
  } catch(err) {
    const traceId = randomId();

    command.log.error(
      {
        traceId,
        err
      },
      "failed to run command"
    );

    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription("Ein Fehler ist beim Ausführen des Befehls aufgetreten.")
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
  }
};