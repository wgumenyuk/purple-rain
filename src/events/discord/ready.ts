import type Bot from "$structs/bot";

/**
    Handler für `ready`.
    Wird ausgeführt, sobald der Bot mit Discord verbunden ist.
*/
const onReady = (bot: Bot) => {
    bot.logger.info("Verbindung hergestellt");
};

export default onReady;