import path from "path";
import glob from "glob-promise";

// Types
import type Aurelia from "@structs/aurelia";
import type Command from "@structs/command";

/**
    Pfad zum Befehls-Ordner.
*/
const COMMANDS_PATH = path.resolve(__dirname, "../commands/*.js").replaceAll("\\", "/");

/**
    Lädt alle verfügbaren Events.
*/
const loadCommands = async (bot: Aurelia) => {
    const start = performance.now();

    const files = await glob(COMMANDS_PATH);

    for(const file of files) {
        const command = new (await import(file)).default as Command;

        bot.commands.set(command.name, command);
        
        command.aliases
            .map((alias) => alias.toLowerCase())
            .forEach((alias) => bot.aliases.set(alias, command.name));
    }

    const end = performance.now();
    const diff = Math.round(end - start);

    bot.logger.info(`Befehle geladen (${diff}ms)`);
};

export default loadCommands;