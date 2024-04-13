import { ChannelType, Events } from "discord.js";

// Types
import type { EventHandler } from "$structs/event-handler";

/**
  Name des Events.
*/
export const name = Events.MessageCreate;

/**
  Wird ausgeführt, sobald eine neue Nachricht ankommt.
*/
export const handle: EventHandler<Events.MessageCreate> = async function(
  bot,
  message
) {
  if(message.author.bot) {
    return;
  }

  if(!message.inGuild() || message.channel.type !== ChannelType.GuildText) {
    return;
  }

  const { content } = message;
  
  if(!content.startsWith(bot.config.prefix)) {
    return;
  }

  const args = content.split(/\s+/);

  if(args.length === 0) {
    return;
  }

  const commandName = args
    .shift()!
    .slice(bot.config.prefix.length);

  if(!commandName) {
    return;
  }

  const command =
    bot.commands.get(commandName) ||
    // @ts-expect-error: `undefined` ist hier kein Problem.
    bot.commands.get(bot.aliases.get(commandName));

  if(!command) {
    bot.emit("commandNotFound", message, commandName);
    return;
  }

  try {
    const isCheckOk = command.check(bot, message, args);

    if(!isCheckOk) {
      return;
    }

    await command.run(bot, message, args);
  } catch(err) {
    if(err instanceof Error) {
      bot.emit("commandError", message, command, err);
    }
  }
};