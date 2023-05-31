import path from "node:path";
import Logger, { ConsoleAdapter, FileAdapter } from "@uelgum/logger";

// Types
import type { Adapter, Level } from "@uelgum/logger";

/**
    Initialisiert den Logger.
*/
export const loadLogger = () => {
    const isProduction = (process.env.NODE_ENV === "production");
    
    const level: Level = (isProduction) ?
        "INFO" :
        "DEBUG";
    
    const adapters: Adapter[] = [
        new ConsoleAdapter()
    ];

    if(isProduction) {
        const fileAdapter = new FileAdapter({
            path: path.resolve(__dirname, "../../logs")
        });

        adapters.unshift(fileAdapter);
    }

    return new Logger({
        level,
        adapters
    });
};