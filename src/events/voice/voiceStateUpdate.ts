import { Events } from "discord.js";

// Types
import type { VoiceBasedChannel, VoiceState } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = Events.VoiceStateUpdate;

/**
    Überprüft, ob der Bot sich alleine in einem Voice-Channel
    befindet.
*/
const _isBotAlone = (botId: string, channel: VoiceBasedChannel | null) => {
    return (
        !!channel &&
        channel.members.has(botId) &&
        channel.members.size === 1
    );
};

/**
    Wird ausgeführt, wenn ein Voice-Zustand sich aktualisiert.
*/
export const handler = (
    bot: Bot,
    oldState: VoiceState,
    newState: VoiceState
) => {
    const botId = bot.user!.id;
    const guildId = oldState.guild.id;

    if(!bot.vinyl.hasQueue(guildId)) {
        return;
    }

    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    const isBotInChannel =
        oldChannel?.members.has(botId) ||
        newChannel?.members.has(botId);

    if(!isBotInChannel) {
        return;
    }

    const isBotAlone =
        _isBotAlone(botId, oldChannel) ||
        _isBotAlone(botId, newChannel);

    if(!isBotAlone) {
        return;
    }

    bot.vinyl.removeQueue(guildId);
};