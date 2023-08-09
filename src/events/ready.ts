import { Events } from "discord.js";

// Intern
import { logger } from "$internal/logger";

// Types
import type { Bot } from "$structs/bot";

/**
    Name des Events.
*/
export const name = Events.ClientReady;

/**
    Wird ausgeführt, sobald der Bot eine Verbindung zu
    Discord hergestellt hat.
*/
export const handler = (bot: Bot) => {
    logger.info("Verbindung hergestellt");
};