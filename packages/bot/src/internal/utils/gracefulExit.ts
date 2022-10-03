import type Aura from "@structs/aura";

/**
    Fährt den Server ordnungsgemäß herunter.
*/
const gracefulExit = (bot: Aura) => {
    bot.logger.warn("Fahre ordnungsgemäß herunter...");

    bot.destroy();
    process.exit(0);
};

export {
    gracefulExit
};