import { ChannelType, EmbedBuilder } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `queue`-Befehl.
    Zeigt Informationen über die Queue an.
*/
class QueueCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "queue",
            group: CommandGroup.MUSIC,
            description: "Zeigt Informationen über die Queue an.",
            usage: "queue",
            aliases: [
                "q"
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

        const songs = queue.songs
            .slice(0, 10)
            .map((song, i) => {
                const position = "`" + (i + 1) + "`";
                return `[${position}] ${song.name})`;
            })
            .join("\n");

        const duration = new Date(queue.duration)
            .toISOString()
            .slice(11, -5);

        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setAuthor({
                name: "🎵 Queue",
                iconURL: message.author.displayAvatarURL()
            })
            .setFooter({
                text: `Insgesamt ${queue.size} Songs (${duration})`
            });

        if(queue.songs.length > 0) {
            const description =
                "**Zeige die ersten 10 Songs in der Queue an.**\n\n" +
                songs;

            embed.setDescription(description);
        } else {
            embed.setDescription("Die Queue ist leer.");
        }

        message.channel.send({
            embeds: [
                embed
            ]
        });
    }
};

/**
    Instanz des Befehls.
*/
export const command = new QueueCommand();