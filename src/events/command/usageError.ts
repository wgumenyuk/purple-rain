import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import { Color } from "$structs/bot";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";
import type { Command } from "$structs/command";

/**
    Name des Events.
*/
export const name = "usageError";

/**
    Wird ausgeführt, wenn ein Befehl falsch verwendet wird.
*/
export const handler = (bot: Bot, message: Message<true>, command: Command) => {
    const description =
        `Der Befehl ${inlineCode(command.name)} wurde falsch verwendet.`;
    
    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription(description)
        .addFields({
            name: "Syntax",
            value: inlineCode(command.usage)
        });

    message.channel.send({
        embeds: [
            embed
        ]
    });
};