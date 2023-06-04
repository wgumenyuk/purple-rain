import { EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = "voiceChannelNotFound";

/**
    Wird ausgeführt, wenn ein Nutzer probiert, einen Musik-Befehl
    ohne Voice-Channel auszuführen.
*/
export const handler = (bot: Bot, message: Message<true>) => {
    const description =
        "Du musst in einem Voice-Channel sein, um diesen Befehl " +
        "nutzen zu können.";

    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription(description);

    message.channel.send({
        embeds: [
            embed
        ]
    }); 
};