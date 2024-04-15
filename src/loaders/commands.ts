import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "fast-glob";

// Intern
import { isCommandFile } from "$structs/command";

// Types
import type { PurpleRain } from "$structs/purple-rain";
import type { Command } from "$structs/command";

/**
  Glob-Pfad zum `commands`-Ordner.
*/
const COMMANDS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../commands/**/*.js"
);

/**
  Fügt einen Befehl hinzu.
*/
const addCommand = function(bot: PurpleRain, command: Command, filePath: string) {
  const { name, aliases } = command;

  if(bot.commands.has(name)) {
    bot.log.warn(`skipping duplicate command name: ${filePath}`);
    return;
  }

  bot.commands.set(name, command);

  for(const alias of aliases) {
    if(bot.aliases.has(alias)) {
      bot.log.warn(`skipping duplicate command alias: ${filePath}`);
      continue;
    }

    bot.aliases.set(alias, name);
  }
};

/**
  Lädt alle Befehle.
*/
export const loadCommands = async function(bot: PurpleRain) {
  const filePaths = await glob(COMMANDS_PATH);

  for(const filePath of filePaths) {
    let file: unknown;

    try {
      file = await import(filePath);  
    } catch(err) {
      bot.log.warn(err, `failed to command: ${filePath}`);
      continue;
    }

    if(!isCommandFile(file)) {
      bot.log.warn(`skipping invalid command: ${filePath}`);
      continue;
    }

    const { command } = file;

    addCommand(
      bot,
      command,
      filePath
    );
  }
};