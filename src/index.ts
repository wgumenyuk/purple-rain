import path from "node:path";
import { addAliases } from "module-alias";

/**
    Startet das Programm. 
*/
const main = async () => {
    console.clear();

    addAliases({
        "$internal": path.join(__dirname, "internal"),
        "$loaders": path.join(__dirname, "loaders"),
        "$structs": path.join(__dirname, "structs")
    });

    const Bot = (await import("$structs/bot")).default;
    const bot = new Bot();

    bot.start();
};

main();