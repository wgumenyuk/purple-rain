import { ChannelType, EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `skip`-Befehl.
    Überspringt den aktuellen Song.
*/
class SkipCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "skip",
            group: CommandGroup.MUSIC,
            description: "Überspringt den aktuellen Song.",
            usage: "skip",
            aliases: [
                "s"
            ],
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

        if(!queue.currentSong) {
            const embed = new EmbedBuilder()
                .setColor(Color.RED)
                .setDescription("Es gibt nichts zum Überspringen.");

            message.channel.send({
                embeds: [
                    embed
                ]
            });

            return;
        }

        queue.skip();
        await message.react("✅");
    }
};

/**
    Instanz des Befehls.
*/
export const command = new SkipCommand();