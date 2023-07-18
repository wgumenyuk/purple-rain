import fs from "node:fs";

/**
    Pfad zur `package.json`.
*/
const PACKAGE_JSON_PATH = new URL(
    "../../package.json",
    import.meta.url
);

/**
    Lädt die Version aus der `package.json`.
*/
export const loadVersion = () => {
    const file = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    const { version } = JSON.parse(file);

    return `v${version}`;
};