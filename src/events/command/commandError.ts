import { EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";
import type { Command } from "$structs/command";

/**
    Name des Events.
*/
export const name = "commandError";

/**
    Wird ausgeführt, wenn beim Ausführen eines Befehls ein
    Fehler auftritt.
*/
export const handler = (
    bot: Bot,
    message: Message<true>,
    command: Command,
    error: Error
) => {
    error.message += ` (${command.name}, ${message.author.tag})`;
    bot.logger.error(error);

    const description = "Ein Fehler ist beim Ausführen des Befehls aufgetreten.";
    
    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription(description);

    message.channel.send({
        embeds: [
            embed
        ]
    });
};