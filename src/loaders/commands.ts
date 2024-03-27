import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "fast-glob";

// Intern
import { isCommand } from "$structs/command";

// Types
import type { Command } from "$structs/command";
import type { PurpleRain } from "$structs/purple-rain";

/**
  Glob-Pfad zum `/commands`-Ordner.
*/
const COMMANDS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../commands/**/*.js"
);

/**
  Registriert einen Befehl.
*/
const addCommand = function(this: PurpleRain, command: Command, filePath: string) {
  const { name } = command;

  if(this.commands.has(name)) {
    this.log.warn(`command name "${name}" already added: ${filePath}`);
    return;
  }

  this.commands.set(name, command);
};

/**
  Registriert die Aliasse eines Befehls.
*/
const addAliases = function(this: PurpleRain, command: Command, filePath: string) {
  for(const alias of command.aliases) {
    if(this.aliases.has(alias)) {
      this.log.warn(`command alias "${alias}" already added: ${filePath}`);
      continue;
    }

    this.aliases.set(alias, command.name);
  }
};

/**
  Lädt alle Befehle.
*/
export const loadCommands = async function(this: PurpleRain) {
  this.log.info("loading commands");

  const filePaths = await glob(COMMANDS_PATH);

  for(const filePath of filePaths) {
    try {
      const file = await import(filePath);

      if(!isCommand(file)) {
        this.log.warn(`skipping invalid command: ${filePath}`);
        continue;
      }

      const { command } = file;

      // Befehl registrieren.
      addCommand.call(this, command, filePath);
      addAliases.call(this, command, filePath);
    } catch(err) {
      this.log.warn(err, `failed to command: ${filePath}`);
    }
  }

  this.log.info(`loaded ${this.commands.size} commands`);
};