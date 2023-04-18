import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import Command, { CommandGroup } from "$structs/command";
import Color from "$internal/colors";

// Types
import type { Message } from "discord.js";
import type Bot from "$structs/bot";

/**
    `version`-Befehl.
*/
class VersionCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "version",
            group: CommandGroup.SYSTEM,
            description: "Zeigt die aktuelle Version des Bots an."
        });
    }

    public async run(bot: Bot, message: Message<true>, _: any): Promise<void> {
        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setTitle(`Version`)
            .setDescription(`Purple Rain ${inlineCode(bot.version)}`);

        message.channel.send({ embeds: [ embed ] });
    }
}

export default VersionCommand;