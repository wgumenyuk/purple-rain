import type { Command } from "$structs/command";

/**
    Definitionen für eigene Events.
*/
declare module "discord.js" {
    export interface ClientEvents {
        commandError: [
            message: Message<true>,
            command: Command,
            error: Error
        ];
        commandNotFound: [
            message: Message<true>,
            commandName: string
        ];
        usageError: [
            message: Message<true>,
            command: Command
        ];
        queueNotFound: [ message: Message<true> ];
        voiceChannelMismatch: [ message: Message<true> ];
        voiceChannelNotFound: [ message: Message<true> ];
    }
}