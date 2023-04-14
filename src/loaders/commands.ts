import path from "path";
import glob from "fast-glob";

// Types
import type Bot from "$structs/bot";
import type Command from "$structs/command";

/**
    Glob-Pfad zum `commands`-Ordner.
*/
const COMMANDS_PATH = path
    .join(__dirname, "../commands/**/*.js")
    .replaceAll("\\", "/");

/**
    Registriert einen Befehl beim Bot.
*/
const addCommand = (bot: Bot, command: Command) => {
    const name = command.name.toLowerCase();

    if(bot.commands.has(name)) {
        throw new Error(`Command-Loader: Doppelte Verwendung des Namens "${name}"`);
    }

    bot.commands.set(name, command);
};

/**
    Registriert alle Aliasse eines Befehls beim Bot.
*/
const addAliases = (bot: Bot, command: Command) => {
    const name = command.name.toLowerCase();
    const aliases = command.aliases.map((alias) => alias.toLowerCase());

    for(const alias of aliases) {
        if(bot.aliases.has(alias)) {
            throw new Error(`Command-Loader: Doppelte Verwendung des Alias "${alias}"`);
        }

        bot.aliases.set(alias, name);
    }
};

/**
    Lädt alle Befehle aus dem `commands`-Ordner.
*/
const loadCommands = async (bot: Bot) => {
    const files = await glob(COMMANDS_PATH);

    for(const file of files) {
        const command: Command = new (await import(file)).default;
        
        // Befehl und seine Aliasse hinzufügen
        addCommand(bot, command);
        addAliases(bot, command);
    }

    bot.logger.debug("Befehle geladen");
};

export default loadCommands;