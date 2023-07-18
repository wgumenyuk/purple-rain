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
    
    const level = (isProduction) ?
        Level.INFO :
        Level.DEBUG;
    
    const adapters: Adapter[] = [
        new ConsoleAdapter()
    ];

    if(isProduction) {
        const logPath = new URL(
            "../../logs",
            import.meta.url
        ).toString(); // TODO Später ersetzen

        adapters.unshift(new FileAdapater(logPath));
    }

    return new Logger({
        level,
        adapters
    });
};