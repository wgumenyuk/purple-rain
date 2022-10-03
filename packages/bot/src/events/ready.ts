import { ActivityType } from "discord.js";

// Types
import type Aura from "@structs/aura";

/**
    Handler für das `ready`-Event.
    Wird ausgeführt, sobald Aura eine Verbindung zu Discord hergestellt hat.
*/
const onReady = (bot: Aura) => {
    bot.logger.info("Verbindung hergestellt");

    bot.user!.setActivity({
        type: ActivityType.Playing,
        name: "Musik"
    });
};

export default onReady;