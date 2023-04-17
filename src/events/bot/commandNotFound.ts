import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import Color from "$internal/colors";

// Types
import type { Message } from "discord.js";

/**
    Handler für `commandNotFound`.
    Wird ausgeführt, wenn ein Befehl nicht gefunden wird.
*/
const onCommandNotFound = (_: any, message: Message<true>, commandName: string) => {
    const error = `Der Befehl ${inlineCode(commandName)} wurde nicht gefunden.`;

    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription(error)

    message.channel.send({ embeds: [ embed ] });
};

export default onCommandNotFound;