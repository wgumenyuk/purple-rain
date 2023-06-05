import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import { Color } from "$structs/bot";
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `help`-Befehl.
    Zeigt Hilfe zu Befehlen an.
*/
class HelpCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "help",
            group: CommandGroup.SYSTEM,
            description: "Zeigt Hilfe zu Befehlen an.",
            usage: "help [Befehl]",
            aliases: [
                "h"
            ],
            examples: [
                "help play",
                "help"
            ]
        });
    }

    /**
        Zeigt allgemeine Hilfe an.
    */
    private _displayGeneralHelp(bot: Bot, message: Message<true>) {
        const description =
            "Purple Rain ist ein maßgefertigter Musik-Bot für " +
            "den Gentlemen's Club. " +
            `Der Prefix von Purple Rain ist ${inlineCode(bot.config.prefix)}.`;

        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setAuthor({
                name: "❓ Hilfe",
                iconURL: message.author.displayAvatarURL()
            })
            .setThumbnail(bot.user!.displayAvatarURL())
            .setDescription(description)
            .setFooter({
                text: `Insgesamt ${bot.commands.size} Befehle`
            });

        const commands = [ ...bot.commands.values() ];

        const musicCommands = commands
            .filter((command) => command.group === CommandGroup.MUSIC)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((command) => inlineCode(command.name))
            .join(", ");

        const systemCommands =  commands
            .filter((command) => command.group === CommandGroup.SYSTEM)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((command) => inlineCode(command.name))
            .join(", ");
        
        embed.addFields([
            {
                name: CommandGroup.MUSIC,
                value: musicCommands
            },
            {
                name: CommandGroup.SYSTEM,
                value: systemCommands
            }
        ]);

        message.channel.send({
            embeds: [
                embed
            ]
        });
    }

    /**
        Zeigt Hilfe zu einem Befehl an.  
    */
    private _displayCommandHelp(
        bot: Bot,
        message: Message<true>,
        commandName: string
    ) {
        const command =
            bot.commands.get(commandName) ||
            bot.commands.get(bot.aliases.get(commandName)!);

        if(!command) {
            bot.emit("commandNotFound", message, commandName);
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setAuthor({
                name: "❓ Hilfe",
                iconURL: message.author.displayAvatarURL()
            })
            .setThumbnail(bot.user!.displayAvatarURL())
            .setTitle(inlineCode(command.name))
            .setDescription(command.description)
            .setFooter({
                text: `Kategorie: ${command.group}`
            })
            .addFields([
                {
                    name: "Syntax",
                    value: inlineCode(command.usage)
                }
            ]);

        // Aliasse hinzufügen
        if(command.aliases.length > 0) {
            const fieldName = (command.aliases.length > 1) ?
                "Aliasse" :
                "Alias";

            const fieldValue = command.aliases
                .map((alias) => inlineCode(alias))
                .join(", ");

            embed.addFields({
                name: fieldName,
                value: fieldValue
            });
        }

        // Beispiele hinzufügen
        if(command.examples.length > 0) {
            const fieldName = (command.examples.length > 1) ?
                "Beispiele" :
                "Beispiel";

            const fieldValue = command.examples
                .map((example) => `- ${inlineCode(example)}`)
                .join("\n");

            embed.addFields({
                name: fieldName,
                value: fieldValue
            });
        }

        message.channel.send({
            embeds: [
                embed
            ]
        });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Bot, message: Message<true>, args: string[]) {
        const [ commandName ] = args;

        if(commandName) {
            this._displayCommandHelp(
                bot,
                message,
                commandName.toLowerCase()
            );

            return;
        }

        this._displayGeneralHelp(bot, message);
    }
};

/**
    Instanz des Befehls.
*/
export const command = new HelpCommand();