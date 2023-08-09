import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

/**
    Aktuelle Node.js-Umgebung.
*/
const MODE = process.env.NODE_ENV;

/**
    Pfad zur `.env`-Datei.
*/
const CONFIG_PATH = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    `../../.env.${MODE}`
);

// Konfiguration laden
config({
    path: CONFIG_PATH
});

/**
    Ob sich der Bot im `production`-Modus befindet.
*/
export const IS_PROD = (MODE === "production");

/**
    Token.
*/
export const TOKEN = process.env.TOKEN!;

/**
    Owner-ID.
*/
export const OWNER_ID = process.env.OWNER_ID!

/**
    Prefix des Bots.
*/
export const PREFIX = process.env.PREFIX!;