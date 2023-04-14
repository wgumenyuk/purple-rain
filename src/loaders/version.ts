import fs from "fs";
import path from "path";

/**
    Pfad zu `package.json`.
*/
const PACKAGE_JSON_PATH = path.join(__dirname, "../../package.json");

/**
    Node-Environment.
*/
const IS_DEV = (process.env.NODE_ENV !== "production");

/**
    Lädt die Version aus `package.json`.
*/
const loadVersion = () => {
    const file = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    let { version } = JSON.parse(file);

    if(IS_DEV) {
        version += "-dev";
    }

    return `v${version}`;
};

export default loadVersion;