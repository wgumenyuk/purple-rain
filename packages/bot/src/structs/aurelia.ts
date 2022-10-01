import { Client, GatewayIntentBits } from "discord.js";

// Intern
import logger from "@loaders/logger";
import loadEvents from "@loaders/events";
import loadCommands from "@loaders/commands";
import { getVersion, gracefulExit } from "@internal/utils";
import config from "@config";

// Types
import type { ColorResolvable } from "discord.js";
import type { Logger } from "@uelgum/logger";
import type Command from "@structs/command";
import type Queue from "@structs/queue";

// #region Types
type Colors = {
    PURPLE: ColorResolvable;
    RED: ColorResolvable;
};
// #endregion

/**
    Intents für Aurelia.
*/
const INTENTS: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
];

/**
    Aurelia.
*/
class Aurelia extends Client {
    // #region Attribute
    /**
        Geladene Befehle.
    */
    public commands: Map<string, Command>;

    /**
        Aliasse der geladenen Befehlen.
    */
    public aliases: Map<string, string>;

    /**
        Musik-Queue.
    */
    public queue: Queue | null;

    /**
        Logger.
    */
    public logger: Logger;
    
    /**
        Farben.
    */
    public readonly colors: Colors;

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

        this.queue = null;
        this.logger = logger;

        this.colors = {
            PURPLE: "#A855F7",
            RED: "#F43F5E"
        };

        this.version = getVersion();
    }

    /**
        Startet Aurelia.
    */
    public async start(): Promise<void> {
        this.logger.info(`Starte Aurelia (v${this.version})`);
        
        process.on("SIGINT", () => gracefulExit(this));

        try {
            await loadEvents(this);
            await loadCommands(this);

            await this.login(config.token);
        } catch(error) {
            this.logger.error(error);
            process.exit(1);
        }
    }
}

export default Aurelia;