import { inlineCode, EmbedBuilder } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

// Intern
import Command from "@structs/command";
import Queue from "@structs/queue";
import { msToTimestamp } from "@internal/utils";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    `play`-Befehl.
*/
class PlayCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "play",
            description: "Spielt einen Song von YouTube ab.",
            usage: "play <URL oder Suchbegriff>",
            aliases: [ "p" ]
        });
    }

    /**
        Erstellt eine neue Queue.
    */
    private createQueue(bot: Aura, message: Message): void {
        const guild = message.guild!;
        const member = message.member!;
        const voiceChannel = member.voice.channel!;

        const connection = joinVoiceChannel({
            guildId: guild.id,
            channelId: voiceChannel.id,
            adapterCreator: guild.voiceAdapterCreator
        });

        bot.queue = new Queue(connection);

        // Disconnect
        bot.queue.on("disconnect", () => {
            bot.queue = null;
        });

        // Videos
        bot.queue.on("resolvedSong", (song) => {
            const duration = (!song.isLive) ?
                inlineCode(msToTimestamp(song.duration)) :
                "🔴 Live";

            const position = bot.queue!.size + 1;

            const embed = new EmbedBuilder()
                .setColor(bot.colors.PURPLE)
                .setThumbnail(song.imageUrl)
                .setURL(song.videoUrl)
                .setTitle(song.title)
                .setAuthor({
                    name: "🎵 Song hinzugefügt",
                    iconURL: song.member.displayAvatarURL()
                })
                .addFields(
                    { name: "Kanal", value: song.channel, inline: true },
                    { name: "Dauer", value: duration, inline: true },
                    { name: "Hinzugefügt von", value: song.requestedBy },
                    { name: "Position", value: inlineCode(position.toString()), inline: true }
                );

            message.channel.send({ embeds: [ embed ] });
        });

        // Playlists
        bot.queue.on("resolvedPlaylist", (playlist) => {
            const username = playlist.member.nickname || playlist.member.user.username;

            const embed = new EmbedBuilder()
                .setColor(bot.colors.PURPLE)
                .setURL(playlist.playlistUrl)
                .setTitle(playlist.title)
                .setAuthor({
                    name: "🎵 Playlist hinzugefügt",
                    iconURL: playlist.member.displayAvatarURL()
                })
                .addFields(
                    { name: "Videos", value: inlineCode(playlist.size.toString()), inline: true },
                    { name: "Hinzugefügt von", value: username, inline: true }
                );

            message.channel.send({ embeds: [ embed ] });
        });

        // Error
        bot.queue.on("resolveError", (error) => {
            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(error.message);

            message.channel.send({ embeds: [ embed ] });
        });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Aura, message: Message, args: string[]): Promise<void> {
        const member = message.member!;

        if(!member.voice.channel) {
            const description =
                "Du musst in einem Voice-Channel sein, um diesen " +
                "Befehl zu benutzen.";

            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(description);

            message.channel.send({ embeds: [ embed ] });
            return;
        }

        const urlOrSearch = args.join(" ");

        if(!urlOrSearch) {
            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription("Fehlerhafte oder fehlende Argumente.")
                .addFields(
                    { name: "Syntax", value: inlineCode(this.usage) }
                );

            message.channel.send({ embeds: [ embed ] });
            return;
        }

        // Erstmalige Verbindung herstellen, wenn nicht vorhanden
        if(!bot.queue) {
            this.createQueue(bot, message);
        }

        const queue = bot.queue!;

        if(queue.voiceChannelId !== member.voice.channelId) {
            const description =
                "Du musst im selben Voice-Channel sein, um diesen " +
                "Befehl zu verwenden.";

            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(description);

            message.channel.send({ embeds: [ embed ] });
            return;
        }

        await queue.resolve({
            resource: urlOrSearch,
            member
        });

        if(queue.isIdle) queue.play();
    }
}

export default PlayCommand;