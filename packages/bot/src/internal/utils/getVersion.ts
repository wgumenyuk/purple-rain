import fs from "fs";
import path from "path";

/**
    Pfad zu `package.json`.
*/
const PACKAGE_PATH = path.join(__dirname, "../../../package.json");

/**
    Ruft die Version aus `package.json` ab.
*/
const getVersion = () => {
    const file = fs.readFileSync(PACKAGE_PATH, "utf-8");
    const pkg = JSON.parse(file);

    let version = pkg.version;

    if(process.env.NODE_ENV !== "production") {
        version += "-dev";
    }

    return version;
};

export {
    getVersion
};