import { EmbedBuilder } from "discord.js";

// Intern
import Color from "$internal/colors";

// Types
import type { Message } from "discord.js";
import type Bot from "$structs/bot";

/**
    Handler für `messageCreate`.
    Wird ausgeführt, sobald eine neue Nachricht ankommt.
*/
const onMessageCreate = async (bot: Bot, message: Message) => {
    if(message.author.bot || !message.inGuild()) {
        return;
    }

    const { prefix } = bot.config;
    const content = message.content;

    if(!content.startsWith(prefix)) {
        return;
    }

    const args = content.split(/\s+/g);
    
    if(args.length === 0) {
        return;
    }

    const commandName = args.shift()!.slice(prefix.length).toLowerCase();

    const command =
        bot.commands.get(commandName) ||
        bot.commands.get(bot.aliases.get(commandName)!);

    if(!command) {
        bot.emit("commandNotFound", message, commandName);
        return;
    }

    if(command.args.filter((arg) => arg.required).length > args.length) {
        bot.emit("syntaxError", message, command);
        return;
    }

    try {
        await command.run(bot, message, args);
    } catch(error) {
        bot.logger.error(`Command: Fehler beim Ausführen von "${commandName}"`);
        bot.logger.error(error);

        const embed = new EmbedBuilder()
            .setColor(Color.RED)
            .setDescription("Ein Fehler ist beim Ausführen des Befehls aufgetreten.");

        message.channel.send({ embeds: [ embed ] });
    }
};

export default onMessageCreate;