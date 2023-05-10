import type { Message } from "discord.js";
import type Bot from "$structs/bot";

// #region Types
/**
    Argument für den Befehl.
*/
type Arg = {
    /**
        Wert des Arguments.
    */
    value: string;

    /**
        Ob das Argument benötigt ist.
        Legt fest, ob das Argument als `<Beispiel>` oder `[Beispiel]` angezeigt wird.
    */
    required?: boolean;
};

/**
    Optionen für den Befehl.
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
        Argumente des Befehls.
    */
    args?: Arg[];

    /**
        Beispiele zur Verwendung des Befehls.
    */
    examples?: string[];

    /**
        Aliasse.
    */
    aliases?: string[];
};
// #endregion

/**
    Kategorie.
*/
const enum CommandGroup {
    MUSIC = "🎵 Musik",
    SYSTEM = "⚙️ System"
};

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
        Kategorie.
    */
    public readonly group: CommandGroup;

    /**
        Beschreibung.
    */
    public readonly description: string;

    /**
        Argumente des Befehls.
    */
    public readonly args: Arg[];

    /**
        Beispiele zur Verwendung des Befehls.
    */
    public readonly examples: string[];
    
    /**
        Aliasse.
    */
    public readonly aliases: string[];
    // #endregion

    /**
        Konstruktor.
    */
    constructor(options: Options) {
        this.name = options.name;
        this.group = options.group;
        this.description = options.description;
        this.args = options.args || [];
        this.examples = options.examples || [];
        this.aliases = options.aliases || [];
    }

    /**
        Überprüft, ob ein Objekt eine Instanz von `Command`
        ist.
    */
    public static isCommand(object: unknown) {
        return (object instanceof Command);
    }

    /**
        Erklärung zur Verwendung des Befehls.
    */
    public get usage() {
        let usage = this.name;

        if(this.args.length > 0) {
            const args = this.args
                .map((arg) => arg.required ? `<${arg.value}>` : `[${arg.value}]`)
                .join(" ");

            usage += ` ${args}`;
        }

        return usage;
    }

    /**
        Führt den Befehl aus.
    */
    public abstract run(bot: Bot, message: Message<true>, args: string[]): Promise<void>;
};

export {
    CommandGroup
};

export default Command;