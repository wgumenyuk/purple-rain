import fs from "node:fs";

/**
    Pfad zur `config.json`.
*/
const CONFIG_PATH = new URL(
    "../../config.json",
    import.meta.url
);

/**
    Lädt die Konfiguration.
*/
export const loadConfig = () => {
    const config = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(config);
};