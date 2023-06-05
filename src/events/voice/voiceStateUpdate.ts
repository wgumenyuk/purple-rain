import { Events } from "discord.js";

// Types
import type { VoiceState } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = Events.VoiceStateUpdate;

/**
    Wird ausgeführt, wenn ein Voice-Zustand sich aktualisiert.
*/
export const handler = (bot: Bot, oldState: VoiceState, newState: VoiceState) => {
    const guildId = oldState.guild.id;

    if(!bot.vinyl.hasQueue(guildId)) {
        return;
    }

    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    const hasBotMoved =
        !!oldChannel &&
        !!newChannel &&
        oldChannel.id !== newChannel.id &&
        newChannel.members.has(bot.user!.id);

    if(!hasBotMoved) {
        return;
    }

    const queue = bot.vinyl.getQueue(guildId);

    queue.disconnect();
};