import type { Message } from "discord.js";
import type { Bot } from "$structs/bot";

// #region Types
/**
    Optionen für Befehle.
*/
type Options = {
    /**
        Name.
    */
    name: string;

    /**
        Kategorie.
    */
    group: CommandGroup;

    /**
        Beschreibung.
    */
    description: string;

    /**
        Syntax des Befehls.
    */
    usage: string;

    /**
        Aliasse.
    */
    aliases: string[];

    /**
        Beispiele.
    */
    examples: string[];
};
// #endregion

/**
    Kategorie eines Befehls.
*/
export const enum CommandGroup {
    MUSIC = "🎵 Musik",
    SYSTEM = "⚙️ System"
};

/**
    Befehl.
*/
export abstract class Command {
    // #region Attribute
    /**
        Name.
    */
    public readonly name: string;

    /**
        Kategorie.
    */
    public readonly group: CommandGroup;

    /**
        Beschreibung.
    */
    public readonly description: string;

    /**
        Syntax des Befehls.
    */
    public readonly usage: string;

    /**
        Aliasse.
    */
    public readonly aliases: string[];

    /**
        Beispiele.
    */
    public readonly examples: string[];
    // #endregion

    /**
        Konstruktor.
    */
    constructor(options: Options) {
        this.name = options.name;
        this.group = options.group;
        this.description = options.description;
        this.usage = options.usage;
        this.aliases = options.aliases;
        this.examples = options.examples;
    }

    /**
        Überprüft, ob ein Objekt eine Instanz von `Command` ist.
    */
    public static isCommand(object: unknown) {
        return (object instanceof Command);
    }

    /**
        Führt den Befehl aus.
    */
    public abstract run(
        bot: Bot,
        message: Message<true>,
        args: string[]
    ): Promise<void>;
};