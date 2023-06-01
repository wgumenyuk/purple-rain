import path from "node:path";
import {
    Logger,
    Level,
    ConsoleAdapter,
    FileAdapater
} from "@uelgum/logger";

// Types
import type { Adapter } from "@uelgum/logger";

/**
    Initialisiert den Logger.
*/
export const loadLogger = () => {
    const isProduction = (process.env.NODE_ENV === "production");
    
    const level: Level = (isProduction) ?
        Level.INFO :
        Level.DEBUG;
    
    const adapters: Adapter[] = [
        new ConsoleAdapter()
    ];

    if(isProduction) {
        const logPath = path.resolve(__dirname, "../../logs");
        const fileAdapter = new FileAdapater(logPath);

        adapters.unshift(fileAdapter);
    }

    return new Logger({
        level,
        adapters
    });
};