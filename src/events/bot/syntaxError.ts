import { EmbedBuilder, inlineCode } from "discord.js";

// Intern
import Color from "$internal/colors";

// Types
import type { Message } from "discord.js";
import type Command from "$structs/command";

/**
    Handler für `syntaxError`.
    Wird ausgeführt, wenn ein Befehl falsch verwendet wird.
*/
const onSyntaxError = (_: any, message: Message<true>, command: Command) => {
    const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setDescription("Der Befehl wurde falsch verwendet.")
        .addFields({
            name: "Syntax",
            value: inlineCode(command.usage)
        });

    message.channel.send({ embeds: [ embed ] });
};

export default onSyntaxError;