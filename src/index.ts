import path from "node:path";
import { addAliases } from "module-alias";

/**
    Main.
*/
const main = async () => {
    // Aliasse hinzufügen
    addAliases({
        "$internal": path.resolve(__dirname, "internal"),
        "$loaders": path.resolve(__dirname, "loaders"),
        "$structs": path.resolve(__dirname, "structs")
    });

    // Bot initialisieren
    const { Bot } = await import("$structs/bot");
    const bot = new Bot();

    return bot.start();
};

main();