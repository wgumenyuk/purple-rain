import { ChannelType } from "discord.js";

// Intern
import { Command, CommandGroup } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

/**
    `leave`-Befehl.
    Wirft Purple Rain aus dem Voice-Channel.
*/
class LeaveCommand extends Command {
    /**
        Konstruktor.
    */
    constructor() {
        super({
            name: "leave",
            group: CommandGroup.MUSIC,
            description: "Wirft Purple Rain aus dem Voice-Channel.",
            usage: "leave",
            aliases: [
                "disconnect",
                "dc",
                "l"
            ],
            examples: []
        });
    }

    /**
        Führt den Befehl aus.
    */
    public async run(bot: Bot, message: Message<true>) {
        const member = message.member;
        const voiceChannel = member?.voice?.channel;

        if(!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
            bot.emit("voiceChannelNotFound", message);
            return;
        }

        if(!bot.vinyl.hasQueue(message.guildId)) {
            bot.emit("queueNotFound", message);
            return;
        }

        const queue = bot.vinyl.getQueue(message.guildId);

        if(voiceChannel.id !== queue.channelId) {
            bot.emit("voiceChannelMismatch", message);
            return;
        }

        bot.vinyl.removeQueue(message.guildId);
        await message.react("✅");
    }
};

/**
    Instanz des Befehls.
*/
export const command = new LeaveCommand();