import type { Command } from "$structs/command";

declare module "discord.js" {
  // Events erweitern.
  export interface ClientEvents {
    commandError: [
      message: Message<true>,
      command: Command,
      err: Error
    ];
    commandNotFound: [
      message: Message<true>,
      commandName: string
    ];
  }
}

export {};