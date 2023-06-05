import { ChannelType, EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `unpause`-Befehl.
    Setzt die aktuelle Wiedergabe fort.
*/
class UnpauseCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "unpause",
            group: CommandGroup.MUSIC,
            description: "Setzt die aktuelle Wiedergabe fort.",
            usage: "unpause",
            aliases: [
                "resume"
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

        if(!queue.isPaused) {
            const embed = new EmbedBuilder()
                .setColor(Color.RED)
                .setDescription("Gerade ist nichts pausiert.");

            message.channel.send({
                embeds: [
                    embed
                ]
            });

            return;
        }

        queue.unpause();
        await message.react("✅");
    }
};

/**
    Instanz des Befehls.
*/
export const command = new UnpauseCommand();