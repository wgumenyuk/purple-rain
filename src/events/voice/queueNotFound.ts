import { EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = "queueNotFound";

/**
    Wird ausgeführt, wenn eine Musik-Queue nicht
    gefunden wird.
*/
export const handler = (bot: Bot, message: Message<true>) => {
    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription("Es gibt keine aktive Musik-Queue.");

    message.channel.send({
        embeds: [
            embed
        ]
    });
};