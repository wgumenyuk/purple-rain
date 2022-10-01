import fs from "fs";
import path from "path";
import yml from "js-yaml";

// #region Types
type Config = {
    token: string;
    prefix: string;
};
// #endregion

/**
    Pfad zur Konfigurationsdatei.
*/
const CONFIG_PATH = path.join(__dirname, "../config/config.yml");

const file = fs.readFileSync(CONFIG_PATH, "utf-8");
const config = yml.load(file) as Config;

export default config;