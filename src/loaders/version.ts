import fs from "node:fs";
import path from "node:path";

/**
    Pfad zu `package.json`.
*/
const PACKAGE_JSON_PATH = path.join(__dirname, "../../package.json");

/**
    Lädt die Version aus `package.json`.
*/
const loadVersion = () => {
    const file = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    let { version } = JSON.parse(file);

    return `v${version}`;
};

export default loadVersion;