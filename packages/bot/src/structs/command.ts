import type { Message } from "discord.js";
import type Aurelia from "@structs/aurelia";

// #region Types
type CommandOptions = {
    name: string;
    description: string;
    usage: string;
    aliases: string[];
};
// #endregion

/**
    Befehl.
*/
abstract class Command {
    // #region Attribute
    /**
        Name.
    */
    public readonly name: string;

    /**
        Beschreibung.
    */
    public readonly description: string;

    /**
        Syntax.
    */
    public readonly usage: string;

    /**
        Aliasse.
    */
    public readonly aliases: string[];
    // #endregion

    /**
        Konstruktor.
    */
    constructor(options: CommandOptions) {
        this.name = options.name;
        this.description = options.description;
        this.usage = options.usage;
        this.aliases = options.aliases;
    }

    /**
        Führt den Befehl aus.
    */
    public abstract run(bot: Aurelia, message: Message, args?: string[]): Promise<void>;
}

export default Command;