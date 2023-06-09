import { ChannelType, EmbedBuilder } from "discord.js";
import { Playlist, Song, VinylError } from "@uelgum/vinyl";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Guild, Message, VoiceChannel } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `play`-Befehl.
    Spielt Musik ab.
*/
class PlayCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "play",
            group: CommandGroup.MUSIC,
            description: "Spielt Musik ab.",
            usage: "play <YouTube-URL | Suche>",
            aliases: [
                "p"
            ],
            examples: [
                "play https://www.youtube.com/watch?v=ryT-ltTDCko",
                "play Purple Rain"
            ]
        });
    }

    /**
        Erstellt eine neue Queue.
    */
    private _createQueue(bot: Bot, guild: Guild, voiceChannel: VoiceChannel) {
        bot.vinyl.createQueue({
            guild,
            voiceChannel
        });
    }

    /**
        Erstellt eine Fehler-Embed.
    */
    private _createErrorEmbed(error: unknown) {
        const embed = new EmbedBuilder()
            .setColor(Color.RED);

        const isError = (error instanceof Error);
        const message = (isError) ? error.message : null;
        
        let description: string;

        switch(message) {
            case VinylError.NO_AUDIO_FORMATS:
            case VinylError.NO_LIVESTREAM_AUDIO_FORMATS: {
                description = "Es wurden keine spielbaren Audioformate gefunden.";
                break;
            }

            case VinylError.NO_SEARCH_RESULTS: {
                description = "Es wurden keine Ergebnisse gefunden.";
                break;
            }

            case VinylError.QUEUE_SIZE_EXCEEDED: {
                description = "Die Queue ist voll.";
                break;
            }

            default: {
                description = "Die Anfrage konnte nicht verarbeitet werden.";
            }
        }

        embed.setDescription(description);
        return embed;
    }

    /**
        Fügt Informationen über einen Song an die Embed an.
    */
    private _createSongEmbed(embed: EmbedBuilder, song: Song) {
        embed.addFields([
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
    }

    /**
        Fügt Informationen über eine Playlist an die Embed an.
    */
    private _createPlaylistEmbed(embed: EmbedBuilder, playlist: Playlist) {
        embed.addFields([
            {
                name: "Uploader",
                value: playlist.uploader,
                inline: true
            },
            {
                name: "Songs",
                value: `${playlist.size}`,
                inline: true
            },
            {
                name: "Dauer",
                value: playlist.timestamp,
                inline: true
            },
            {
                name: "Hinzugefügt von",
                value: `<@${playlist.requester.id}>`
            }
        ]);
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Bot, message: Message<true>, args: string[]) {
        const query = args.join(" ");
        
        const member = message.member;
        const voiceChannel = member?.voice?.channel;

        if(!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
            bot.emit("voiceChannelNotFound", message);
            return;
        }

        if(!bot.vinyl.hasQueue(message.guildId)) {
            this._createQueue(bot, message.guild, voiceChannel);
        }

        const queue = bot.vinyl.getQueue(message.guildId);

        if(voiceChannel.id !== queue.channelId) {
            bot.emit("voiceChannelMismatch", message);
            return;
        }

        let result: Song | Playlist;

        try {
            result = await queue.addRequest(member, query);
        } catch(error) {
            const embed = this._createErrorEmbed(error);

            message.channel.send({
                embeds: [
                    embed
                ]
            });

            return;
        }

        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setThumbnail(result.thumbnailUrl)
            .setAuthor({
                name: "🎵 Zur Queue hinzugefügt",
                iconURL: result.requester.displayAvatarURL()
            })
            .setURL(result.url)
            .setTitle(result.name);

        if(result instanceof Song) {
            this._createSongEmbed(embed, result);
        } else if(result instanceof Playlist) {
            this._createPlaylistEmbed(embed, result);
        }

        message.channel.send({
            embeds: [
                embed
            ]
        });

        if(queue.isIdle) {
            return queue.play();
        }
    }
};

/**
    Instanz des Befehls.
*/
export const command = new PlayCommand();