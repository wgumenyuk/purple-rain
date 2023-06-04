import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `version`-Befehl.
    Zeigt die aktuelle Version von Purple Rain an.
*/
class VersionCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "version",
            group: CommandGroup.SYSTEM,
            description: "Zeigt die aktuelle Version von Purple Rain an.",
            usage: "version",
            aliases: [
                "v"
            ],
            examples: []
        });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Bot, message: Message<true>) {
        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setDescription(`Purple Rain ${inlineCode(bot.version)}`);

        message.channel.send({
            embeds: [
                embed
            ]
        });
    }
};

/**
    Instanz des Befehls.
*/
export const command = new VersionCommand();