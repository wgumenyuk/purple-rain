import { Events } from "discord.js";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = Events.MessageCreate;

/**
    Wird ausgeführt, sobald eine neue Nachricht ankommt.
*/
export const handler = async (bot: Bot, message: Message) => {
    if(message.author.bot || !message.inGuild()) {
        return;
    }

    const prefix = bot.config.prefix;
    const content = message.content;

    if(!content.startsWith(prefix) || content.length < 2) {
        return;
    }

    const args = content.split(/\s+/g);

    const commandName = args
        .shift()!
        .slice(prefix.length)
        .toLowerCase();

    const command =
        bot.commands.get(commandName) ||
        bot.commands.get(bot.aliases.get(commandName)!);

    if(!command) {
        bot.emit("commandNotFound", message, commandName);
        return;
    }

    try {
        await command.run(bot, message, args);
    } catch(error: any) {
        bot.emit("commandError", message, command, error);
    }
};