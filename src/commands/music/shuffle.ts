import { ChannelType, EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `shuffle`-Befehl.
    Mischt die Queue durch.
*/
class ShuffleCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "shuffle",
            group: CommandGroup.MUSIC,
            description: "Mischt die Queue durch.",
            usage: "shuffle",
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

        if(queue.size < 2) {
            const description =
                "Die Queue muss dafür mindestens 2 Songs enthalten.";

            const embed = new EmbedBuilder()
                .setColor(Color.RED)
                .setDescription(description);

            message.channel.send({
                embeds: [
                    embed
                ]
            });

            return;
        }

        queue.shuffle();
        await message.react("✅");
    }
};

/**
    Instanz des Befehls.
*/
export const command = new ShuffleCommand();