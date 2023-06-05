import { ChannelType, EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `pause`-Befehl.
    Pausiert die aktuelle Wiedergabe.
*/
class PauseCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "pause",
            group: CommandGroup.MUSIC,
            description: "Pausiert die aktuelle Wiedergabe.",
            usage: "pause",
            aliases: [],
            examples: []
        });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Bot, message: Message<true>) {
        const member = message.member;
        const voiceChannel = member?.voice?.channel;

        if(!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
            bot.emit("voiceChannelNotFound", message);
            return;
        }

        if(!bot.vinyl.hasQueue(message.guildId)) {
            bot.emit("queueNotFound", message);
            return;
        }

        const queue = bot.vinyl.getQueue(message.guildId);

        if(voiceChannel.id !== queue.channelId) {
            bot.emit("voiceChannelMismatch", message);
            return;
        }

        if(!queue.isPlaying || !queue.currentSong) {
            const embed = new EmbedBuilder()
                .setColor(Color.RED)
                .setDescription("Es wird gerade nichts abgespielt.");

            message.channel.send({
                embeds: [
                    embed
                ]
            });

            return;
        }

        if(queue.currentSong.isLive) {
            const embed = new EmbedBuilder()
                .setColor(Color.RED)
                .setDescription("Livestreams können nicht pausiert werden.");

            message.channel.send({
                embeds: [
                    embed
                ]
            });

            return;
        }

        queue.pause();
        await message.react("✅");
    }
};

/**
    Instanz des Befehls.
*/
export const command = new PauseCommand();