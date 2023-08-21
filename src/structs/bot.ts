import { Client, GatewayIntentBits } from "discord.js";

// Intern
import { loadVinyl } from "$loaders/vinyl";
import { loadVersion } from "$loaders/version";
import { loadEvents } from "$loaders/events";
import { loadCommands } from "$loaders/commands";
import { displayLogo } from "$internal/logo";
import { logger } from "$internal/logger";
import { TOKEN } from "$internal/config";

// Types
import type { Vinyl } from "@uelgum/vinyl";
import type { Command } from "$structs/command";

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

        this.vinyl = loadVinyl();
        this.version = loadVersion();
    }

    /**
        Startet den Bot.
    */
    public async start() {
        console.clear();
        displayLogo();

        logger.info(`Starte Purple Rain (${this.version})`);

        try {
            await Promise.all([
                loadEvents(this),
                loadCommands(this),
                this.login(TOKEN)
            ]);
        } catch(error) {
            logger.error(error);
            process.exit(1);
        }
    }
};