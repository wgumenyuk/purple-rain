import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import Command, { CommandGroup } from "$structs/command";
import Color from "$internal/colors";

// Types
import type { Message } from "discord.js";
import type Bot from "$structs/bot";

/**
    `help`-Befehl.
*/
class HelpCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "help",
            group: CommandGroup.SYSTEM,
            description: "Zeigt Hilfe zum Bot oder einem bestimmten Befehl an.",
            args: [
                { value: "Befehl" }
            ],
            examples: [ "help", "help play" ],
            aliases: [ "h" ]
        });
    }

    /**
        Filtert alle Befehle nach der angegebenen Kategorie.
    */
    private _filterCommandGroup(bot: Bot, group: CommandGroup) {
        return bot.commands.filter((command) => command.group === group);
    }

    /**
        Zeigt allgemeine Hilfe zum Bot und den Befehlen an.
    */
    private _displayGeneralHelp(bot: Bot, message: Message<true>) {
        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setTitle("Hilfe");

        // Kategorien zusammenstellen
        const musicCommands = this._filterCommandGroup(bot, CommandGroup.MUSIC);
        const systemCommands = this._filterCommandGroup(bot, CommandGroup.SYSTEM);

        if(musicCommands.size > 0) {
            embed.addFields({
                name: CommandGroup.MUSIC,
                value: musicCommands.map((command) => inlineCode(command.name)).join(", ")
            });
        }

        if(systemCommands.size > 0) {
            embed.addFields({
                name: CommandGroup.SYSTEM,
                value: systemCommands.map((command) => inlineCode(command.name)).join(", ")
            });
        }

        message.channel.send({ embeds: [ embed ] });
    }

    /**
        Zeigt Hilfe zu einem bestimmten Befehl an.
    */
    private _displayCommandHelp(bot: Bot, message: Message<true>, commandName: string) {
        const command =
            bot.commands.get(commandName) ||
            bot.commands.get(bot.aliases.get(commandName)!);

        if(!command) {
            bot.emit("commandNotFound", message, commandName);
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(Color.PURPLE)
            .setTitle(`Hilfe zu ${inlineCode(command.name)}`)
            .setDescription(command.description)
            .addFields({
                name: "Syntax",
                value: inlineCode(command.usage),
                inline: true
            })
            .setFooter({
                text: `Kategorie: ${command.group}`
            });

        // Aliasse hinzufügen, falls vorhanden
        if(command.aliases.length > 0) {
            embed.addFields({
                name: (command.aliases.length > 1) ? "Aliasse" : "Alias",
                value: command.aliases.map((alias) => inlineCode(alias)).join(", "),
                inline: true
            });
        }

        // Beispiele hinzufügen, falls vorhanden
        if(command.examples.length > 0) {
            embed.addFields({
                name: (command.examples.length > 1) ? "Beispiele" : "Beispiel",
                value: command.examples.map((example) => inlineCode(example)).join("\n")
            });
        }

        message.channel.send({ embeds: [ embed ] });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Bot, message: Message<true>, args: string[]) {
        const [ commandName ] = args;

        if(commandName) {
            this._displayCommandHelp(bot, message, commandName);
            return;
        }

        this._displayGeneralHelp(bot, message);
    }
};

export default HelpCommand;