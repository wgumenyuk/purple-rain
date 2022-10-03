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
    `playskip`-Befehl.
*/
class PlaySkipCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "playskip",
            description: "Überspringt und spielt einen Song von YouTube ab.",
            usage: "playskip <URL oder Suchbegriff>",
            aliases: [ "ps" ]
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

        if(!bot.queue) {
            const description = "Aura ist nicht in einem Voice-Channel.";

            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(description);

            message.channel.send({ embeds: [ embed ] });
            return;
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
            front: true,
            member
        });

        queue.skip();
    }
}

export default PlaySkipCommand;