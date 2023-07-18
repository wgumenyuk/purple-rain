import { fileURLToPath } from "node:url";
import path from "node:path";
import glob from "fast-glob";

// Intern
import { Command } from "$structs/command";

// Types
import type { Bot } from "$structs/bot";

// #region Types
/**
    Datei, die einen Befehl exportiert.
*/
type CommandFile = {
    /**
        Instanz des Befehls.
    */
    command: Command;
};
// #endregion

/**
    Glob-Pfad zum `/commands`-Ordner.
*/
const COMMANDS_PATH = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../commands/**/*.js"
);

/**
    Fügt den Befehl zur Kollektion hinzu.
*/
const _addCommand = (bot: Bot, command: Command, file: string) => {
    const name = command.name.toLowerCase();

    if(bot.commands.has(name)) {
        const basename = path.basename(file);
        throw new Error(`commands: Doppelter Name "${name}" in ${basename}`);
    }

    bot.commands.set(name, command);
};

/**
    Fügt alle Aliasse eines Befehls zur Kollektion hinzu.
*/
const _addAliases = (bot: Bot, command: Command, file: string) => {
    const name = command.name.toLowerCase();
    const aliases = command.aliases.map((alias) => alias.toLowerCase());

    for(const alias of aliases) {
        if(bot.aliases.has(alias)) {
            const basename = path.basename(file);
            throw new Error(`commands: Doppelter Alias "${alias}" in ${basename}`);
        }

        bot.aliases.set(alias, name);
    }
};

/**
    Lädt alle Befehle.
*/
export const loadCommands = async (bot: Bot) => {
    const files = await glob(COMMANDS_PATH);

    for(const file of files) {
        const { command } = await import(file) as CommandFile;

        if(!Command.isCommand(command)) {
            const basename = path.basename(file);
            throw new Error(`commands: Ungültiger Befehl in ${basename}`);
        }

        _addCommand(bot, command, file);
        _addAliases(bot, command, file);
    }
};