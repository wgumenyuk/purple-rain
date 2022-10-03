import { EmbedBuilder } from "discord.js";

// Intern
import Command from "@structs/command";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    `disconnect`-Befehl.
*/
class DisconnectCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "disconnect",
            description: "Trennt die Verbindung zum Voice-Channel.",
            usage: "disconnect",
            aliases: [ "leave", "dc" ]
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

        queue.disconnect();

        await message.react("✅");
    }
}

export default DisconnectCommand;