import fs from "fs";
import path from "path";

/**
    Pfad zu `package.json`.
*/
const PACKAGE_JSON_PATH = path.join(__dirname, "../../package.json");

/**
    Lädt die Version aus `package.json`.
*/
const loadVersion = () => {
    const file = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    const { version } = JSON.parse(file);

    return `v${version}`;
};

export default loadVersion;