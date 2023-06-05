import { ChannelType, EmbedBuilder, inlineCode } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Song } from "@uelgum/vinyl";
import type { Bot } from "$structs/bot";

/**
    Länge der Fortschrittsanzeige.
*/
const PROGRESS_BAR_MAX_LENGTH = 30;

/**
    `nowplaying`-Befehl.
    Zeigt den aktuellen Song an.
*/
class NowPlayingCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "nowplaying",
            group: CommandGroup.MUSIC,
            description: "Zeigt den aktuellen Song an.",
            usage: "nowplaying",
            aliases: [
                "np"
            ],
            examples: []
        });
    }

    /**
        Erstellt eine Fortschrittsanzeige für die Wiedergabedauer.
    */
    private _createProgressBar(song: Song, playbackDuration: number) {
        const cursorIndex = Math.round(
            (playbackDuration * PROGRESS_BAR_MAX_LENGTH) / song.duration
        );

        const playbackTimestamp = new Date(playbackDuration * 1000)
            .toISOString()
            .slice(11, -5);

        const bar = new Array(PROGRESS_BAR_MAX_LENGTH).fill("=");

        bar.splice(cursorIndex, 1, "🟣");

        return (
            `[${inlineCode(bar.join(""))}] ` +
            `(${playbackTimestamp} / ${song.timestamp})`
        );
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
                .setDescription("Gerade wird nichts abgespielt.");

            message.channel.send({
                embeds: [
                    embed
                ]
            });

            return;
        }

        const song = queue.currentSong;

        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setThumbnail(song.thumbnailUrl)
            .setAuthor({
                name: "🎵 Spielt gerade",
                iconURL: song.requester.displayAvatarURL()
            })
            .setURL(song.url)
            .setTitle(song.name)
            .addFields([
                {
                    name: "Uploader",
                    value: song.uploader,
                    inline: true
                },
                {
                    name: "Dauer",
                    value: song.timestamp,
                    inline: true
                },
                {
                    name: "Hinzugefügt von",
                    value: `<@${song.requester.id}>`
                }
            ]);

        if(!song.isLive) {
            const progressBar = this._createProgressBar(
                song,
                queue.playbackDuration
            );

            embed.setDescription(progressBar);
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
export const command = new NowPlayingCommand();