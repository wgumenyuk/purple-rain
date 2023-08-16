import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

/**
    Pfad zur `package.json`.
*/
const PACKAGE_JSON_PATH = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../package.json"
);

/**
    Lädt die Version aus der `package.json`.
*/
export const loadVersion = () => {
    const file = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    const { version } = JSON.parse(file);

    return `v${version}`;
};