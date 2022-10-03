import { inlineCode, EmbedBuilder } from "discord.js";

// Intern
import config from "@config";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    Handler für das `messageCreate`-Event.
    Wird ausgeführt, sobald Aura eine Nachricht erhält.
*/
const onMessageCreate = async (bot: Aura, message: Message) => {
    if(message.author.bot) return;
    if(!message.guild) return;

    const content = message.content;

    if(!content.startsWith(config.prefix)) return;

    const args = content.split(/ +/g).filter(Boolean);
    const commandName = args.shift()!.slice(1).toLowerCase();

    const command =
        bot.commands.get(commandName) ||
        bot.commands.get(bot.aliases.get(commandName)!);

    if(!command) {
        const embed = new EmbedBuilder()
            .setColor(bot.colors.RED)
            .setDescription(`Unbekannter Befehl ${inlineCode(commandName)}.`);

        message.channel.send({ embeds: [ embed ] });
        return;
    }

    try {
        await command.run(bot, message, args);
    } catch(error) {
        bot.logger.error(error);
        
        const embed = new EmbedBuilder()
            .setColor(bot.colors.RED)
            .setDescription("Ein Fehler ist aufgetreten.");

        message.channel.send({ embeds: [ embed ] });
    }
};

export default onMessageCreate;