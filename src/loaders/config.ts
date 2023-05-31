import fs from "node:fs";
import path from "node:path";

/**
    Pfad zur `config.json`.
*/
const CONFIG_PATH = path.resolve(__dirname, "../../config.json");

/**
    Lädt die Konfiguration.
*/
export const loadConfig = () => {
    const config = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(config);
};