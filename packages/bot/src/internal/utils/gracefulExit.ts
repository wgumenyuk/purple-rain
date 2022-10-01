import type Aurelia from "@structs/aurelia";

/**
    Fährt den Server ordnungsgemäß herunter.
*/
const gracefulExit = (bot: Aurelia) => {
    bot.logger.warn("Fahre ordnungsgemäß herunter...");

    bot.destroy();
    process.exit(0);
};

export {
    gracefulExit
};