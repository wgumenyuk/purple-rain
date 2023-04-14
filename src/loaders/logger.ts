import Logger, { ConsoleAdapter, FileAdapter } from "@uelgum/logger";

// Types
import type { Adapter, Level } from "@uelgum/logger";

/**
    Node-Environment.
*/
const IS_PROD = (process.env.NODE_ENV === "production");

/**
    Lädt den Logger.
*/
const loadLogger = () => {
    const level: Level = (IS_PROD) ? "INFO" : "DEBUG";
    const adapters: Adapter[] = [ new ConsoleAdapter() ];

    if(IS_PROD) {
        adapters.unshift(
            new FileAdapter({
                path: "../../logs"
            })
        );
    }

    const logger = new Logger({
        level,
        adapters
    });

    return logger;
};

export default loadLogger;