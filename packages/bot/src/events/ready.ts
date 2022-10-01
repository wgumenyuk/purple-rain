import { ActivityType } from "discord.js";

// Types
import type Aurelia from "@structs/aurelia";

/**
    Handler für das `ready`-Event.
    Wird ausgeführt, sobald Aurelia eine Verbindung zu Discord hergestellt hat.
*/
const onReady = (bot: Aurelia) => {
    bot.logger.info("Verbindung hergestellt");

    bot.user!.setActivity({
        type: ActivityType.Playing,
        name: "Musik"
    });
};

export default onReady;