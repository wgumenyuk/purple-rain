import { EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { logger } from "$internal/logger";

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
    logger.error(error, `${command.name}, ${message.author.tag}`);

    const description =
        "Ein Fehler ist beim Ausführen des Befehls aufgetreten.";
    
    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription(description);

    message.channel.send({
        embeds: [
            embed
        ]
    });
};