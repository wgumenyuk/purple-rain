import { inlineCode, EmbedBuilder } from "discord.js";
import Command from "@structs/command";

// Types
import type { Message } from "discord.js";
import type Aura from "@structs/aura";

/**
    `about`-Befehl.
*/
class AboutCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "about",
            description: "Zeigt Informationen über den Bot an.",
            usage: "about",
            aliases: []
        });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Aura, message: Message): Promise<void> {
        const avatarUrl = bot.user!.avatarURL();
        const description = "Aura ist ein maßgefertigter Musik-Bot für Discord.";

        const embed = new EmbedBuilder()
            .setColor(bot.colors.PURPLE)
            .setThumbnail(avatarUrl)
            .setDescription(description)
            .addFields({ name: "Version", value: inlineCode(`v${bot.version}`) });

        message.channel.send({ embeds: [ embed ] });
    }
}

export default AboutCommand;