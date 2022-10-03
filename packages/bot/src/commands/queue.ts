import { inlineCode, EmbedBuilder } from "discord.js";

// Intern
import Command from "@structs/command";
import { msToTimestamp } from "@internal/utils";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    `queue`-Befehl.
*/
class QueueCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "queue",
            description: "Zeigt Informationen über die Wiedergabeliste an.",
            usage: "queue",
            aliases: []
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

        const embed = new EmbedBuilder()
            .setColor(bot.colors.PURPLE)
            .setAuthor({
                name: "🎵 Wiedergabeliste",
                iconURL: member.displayAvatarURL()
            });

        if(queue.size === 0) {
            embed.setDescription("Die Wiedergabeliste ist leer.");
            message.channel.send({ embeds: [ embed ] });
            return;
        }

        // Erste 10 Songs
        const firstSongs = queue.songs
            .slice(0, 10)
            .map((song, i) => {
                const position = `${i + 1}`;
                return `[${inlineCode(position)}] ${song.title}`;
            })
            .join("\n");

        const description = `Es werden die ersten 10 Songs angezeigt.\n\n${firstSongs}\n`;
        embed.setDescription(description);
        
        const queueDuration = msToTimestamp(queue.duration);

        const footer = `Songs: ${queue.size} • Dauer: ${queueDuration}`;
        embed.setFooter({ text: footer });

        message.channel.send({ embeds: [ embed ] });
    }
}

export default QueueCommand;