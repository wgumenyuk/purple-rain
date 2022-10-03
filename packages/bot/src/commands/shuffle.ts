import { EmbedBuilder } from "discord.js";

// Intern
import Command from "@structs/command";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    `shuffle`-Befehl.
*/
class ShuffleCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "shuffle",
            description: "Mischt die Wiedergabeliste durch.",
            usage: "shuffle",
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

        if(queue.size === 0) {
            const description = "Es gibt nichts zum Mischen.";

            const embed = new EmbedBuilder()
                .setColor(bot.colors.RED)
                .setDescription(description);

            message.channel.send({ embeds: [ embed ] });
            return;
        }

        queue.shuffle();

        await message.react("✅");
    }
}

export default ShuffleCommand;