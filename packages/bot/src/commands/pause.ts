import { EmbedBuilder } from "discord.js";

// Intern
import Command from "@structs/command";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    `pause`-Befehl.
*/
class PauseCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "pause",
            description: "Pausiert die Wiedergabe.",
            usage: "pause",
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

        if(queue.isPaused) {
            const description = "Gerade wird nichts abgespielt.";

            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(description);

            message.channel.send({ embeds: [ embed ] });
            return;
        }

        queue.pause();

        await message.react("✅");
    }
}

export default PauseCommand;