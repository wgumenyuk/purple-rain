import { Client, Collection, GatewayIntentBits } from "discord.js";

// Loaders
import loadLogger from "$loaders/logger";
import loadConfig from "$loaders/config";
import loadVersion from "$loaders/version";
import loadEvents from "$loaders/events";
import loadCommands from "$loaders/commands";

// Intern
import displayLogo from "$internal/displayLogo";

// Types
import type Logger from "@uelgum/logger";
import type Command from "$structs/command";
import type { Config } from "$loaders/config";

/**
    Intents.
*/
const INTENTS: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
];

/**
    Purple Rain.
*/
class Bot extends Client {
    // #region Attribute
    /**
        Befehle.
    */
    public commands: Collection<string, Command>;

    /**
        Aliasse der Befehle.
    */
    public aliases: Collection<string, string>;

    /**
        Logger.
    */
    public logger: Logger;

    /**
        Ob der Bot sich im Development-Modus befindet.
    */
    public readonly isDev: boolean;

    /**
        Konfiguration.
    */
    public readonly config: Config;

    /**
        Version.
    */
    public readonly version: string;
    // #endregion

    /**
        Konstruktor.
    */
    constructor() {
        super({
            intents: INTENTS
        });

        this.commands = new Collection();
        this.aliases = new Collection();

        this.isDev = (process.env.NODE_ENV !== "production");

        this.logger = loadLogger();
        this.config = loadConfig();
        this.version = loadVersion();
    }

    /**
        Startet den Bot.
    */
    public async start() {
        displayLogo();

        if(this.isDev) {
            this.logger.debug("Dev-Modus aktiviert");
        }

        this.logger.info(`Starte Purple Rain (${this.version})`);

        try {
            // Loader ausführen
            await loadEvents(this);
            await loadCommands(this);

            // Verbinden mit Discord
            await this.login(this.config.token);
        } catch(error) {
            this.logger.error(error);
            process.exit(1);
        }
    }
};

export default Bot;