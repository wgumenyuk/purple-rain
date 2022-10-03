import { inlineCode, EmbedBuilder } from "discord.js";

// Intern
import Command from "@structs/command";
import { createProgressBar, msToTimestamp } from "@internal/utils";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    `nowplaying`-Befehl.
*/
class NowPlayingCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "nowplaying",
            description: "Zeigt Informationen über den aktuellen Song an.",
            usage: "nowplaying",
            aliases: [ "np" ]
        });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Aura, message: Message): Promise<void> {
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

        if(!bot.queue) {
            const description = "Aura ist nicht in einem Voice-Channel.";

            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(description);

            message.channel.send({ embeds: [ embed ] });
            return;
        }

        const queue = bot.queue;

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

        const currentSong = queue.currentSong;

        if(!currentSong) {
            const description = "Gerade wird nichts abgespielt.";

            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(description);

            message.channel.send({ embeds: [ embed ] });
            return;
        }

        const duration = (!currentSong.isLive) ?
                msToTimestamp(currentSong.duration) :
                "🔴 Live";

        const embed = new EmbedBuilder()
            .setColor(bot.colors.PURPLE)
            .setThumbnail(currentSong.imageUrl)
            .setURL(currentSong.videoUrl)
            .setTitle(currentSong.title)
            .setAuthor({
                name: "🎵 Spiele jetzt",
                iconURL: member.displayAvatarURL()
            })
            .addFields(
                { name: "Kanal", value: currentSong.channel, inline: true },
                { name: "Dauer", value: inlineCode(duration), inline: true },
                { name: "Hinzugefügt von", value: currentSong.requestedBy }
            );

        if(!currentSong.isLive) {
            const playback = msToTimestamp(queue.playback);
            const progressBar = createProgressBar(currentSong.duration, queue.playback);
            
            const description = `${inlineCode(playback)}/${inlineCode(duration)} ${progressBar}`;

            embed.setDescription(description);
        }

        message.channel.send({ embeds: [ embed ] });
    }
}

export default NowPlayingCommand;