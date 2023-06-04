import { EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = "voiceChannelMismatch";

/**
    Wird ausgeführt, wenn ein Nutzer einen Musik-Befehl in
    einem anderen Voice-Channel ausführt.
*/
export const handler = (bot: Bot, message: Message<true>) => {
    const description =
        "Du musst im selben Voice-Channel sein wie **Purple Rain**, " +
        "um diesen Befehl nutzen zu können.";
    
    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription(description);

    message.channel.send({
        embeds: [
            embed
        ]
    });
};