import path from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";

// Intern
import { IS_PROD } from "$internal/config";

// Types
import type { TransportTargetOptions } from "pino";

/**
    Pfad zum `/logs`-Ordner.
*/
const LOG_FILES_PATH = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../logs/current.log"
);

/**
    Targets für `pino`.
*/
const targets: TransportTargetOptions[] = [
    {
        target: "pino-pretty",
        level: (IS_PROD) ? "info" : "debug",
        options: {}
    }
];

if(IS_PROD) {
    targets.push({
        target: "pino/file",
        level: "info",
        options: {
            destination: LOG_FILES_PATH
        }
    });
}

/**
    Logger.
*/
export const logger = pino({
    transport: {
        targets
    }
});