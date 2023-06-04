import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import { Color } from "$structs/bot";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = "commandNotFound";

/**
    Wird ausgeführt, wenn ein Befehl nicht gefunden wird.
*/
export const handler = (bot: Bot, message: Message<true>, commandName: string) => {
    const description =
        `Der Befehl ${inlineCode(commandName)} wurde nicht gefunden.`;
    
    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription(description);

    message.channel.send({
        embeds: [
            embed
        ]
    });
};