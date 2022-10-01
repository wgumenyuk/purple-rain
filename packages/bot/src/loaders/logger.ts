import path from "path";
import { Logger } from "@uelgum/logger";

/**
    Pfad zum Log-Ordner.
*/
const LOG_PATH = path.join(__dirname, "../../logs");

/**
    Logger.
*/
const logger = new Logger({
    level: "INFO",
    logPath: LOG_PATH,
    writeFile: (process.env.NODE_ENV === "production")
});

export default logger;