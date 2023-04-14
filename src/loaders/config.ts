import fs from "fs";
import path from "path";
import { z } from "zod";

// #region Types
/**
    Konfiguration.
*/
type Config = z.infer<typeof configSchema>;
// #endregion

/**
    Pfad zur `config.json`.
*/
const CONFIG_PATH = path.join(__dirname, "../../config.json");

// Konfigurations-Schema
const configSchema = z.object({
    /**
        Token.
    */
    token: z.string()
        .length(72)
});

/**
    Lädt die Konfiguration.
*/
const loadConfig = () => {
    const file = fs.readFileSync(CONFIG_PATH, "utf-8");
    const config = JSON.parse(file);

    // Konfiguration überprüfen
    return configSchema.parse(config);
};

export type {
    Config
};

export default loadConfig;