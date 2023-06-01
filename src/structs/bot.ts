import { Client, GatewayIntentBits } from "discord.js";

// Intern
import { displayLogo } from "$internal/logo";
import { loadConfig } from "$loaders/config";
import { loadLogger } from "$loaders/logger";
import { loadVinyl } from "$loaders/vinyl";
import { loadVersion } from "$loaders/version";
import { loadEvents } from "$loaders/events";
import { loadCommands } from "$loaders/commands";

// Types
import type { Logger } from "@uelgum/logger";
import type { Vinyl } from "@uelgum/vinyl";
import type { Command } from "$structs/command";

// #region Types
/**
    Konfiguraiton.
*/
type Config = {
    /**
        Token.
    */
    token: string;

    /**
        Prefix.
    */
    prefix: string;

    /**
        Owner-ID.
    */
    ownerId: string;
};
// #endregion

/**
    Intents.
*/
const INTENTS = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
];

/**
    Farben für Embeds.
*/
export const enum Color {
    RED = "#F43F5E",
    YELLOW = "#EAB308",
    GREEN = "#22C55E",
    PURPLE = "#A855F7"
};

/**
    Purple Rain.
*/
export class Bot extends Client {
    // #region Attribute
    /**
        Kollektion von Befehlen.
    */
    public readonly commands: Map<string, Command>;

    /**
        Kollektion von Aliassen.
    */
    public readonly aliases: Map<string, string>;
    
    /**
        Konfiguration.
    */
    public readonly config: Config;

    /**
        Logger.
    */
    public readonly logger: Logger;

    /**
        Vinyl.
    */
    public readonly vinyl: Vinyl;

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

        this.commands = new Map();
        this.aliases = new Map();

        this.config = loadConfig();
        this.logger = loadLogger();
        this.vinyl = loadVinyl();
        this.version = loadVersion();
    }

    /**
        Startet den Bot.
    */
    public async start() {
        console.clear();
        displayLogo();

        this.logger.info(`Starte Purple Rain (${this.version})`);

        try {
            // Loader ausführen
            await loadEvents(this);
            await loadCommands(this);

            // Verbindung herstellen
            await this.login(this.config.token);
        } catch(error) {
            this.logger.error(error);
            process.exit(1);
        }
    }
};