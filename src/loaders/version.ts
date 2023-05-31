import fs from "node:fs";
import path from "node:path";

/**
    Pfad zur `package.json`.
*/
const PACKAGE_JSON_PATH = path.resolve(__dirname, "../../package.json");

/**
    Lädt die Version aus der `package.json`.
*/
export const loadVersion = () => {
    const file = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    const { version } = JSON.parse(file);

    return `v${version}`;
};