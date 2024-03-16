/**
 *     ____                   __        ____        _     
 *    / __ \__  ___________  / /__     / __ \____ _(_)___
 *   / /_/ / / / / ___/ __ \/ / _ \   / /_/ / __ `/ / __ \
 *  / ____/ /_/ / /  / /_/ / /  __/  / _, _/ /_/ / / / / /
 * /_/    \__,_/_/  / .___/_/\___/  /_/ |_|\__,_/_/_/ /_/
 *                 /_/
 * 
 * Purple Rain
 * Artjom & Wlad G. Gumenyuk
 * GPL-3.0
 * 
*/

import { Redis } from "ioredis";

// Types
import type { Bot } from "$structs/bot";

/**
 * Name des Pub/Sub-Channels.
*/
const CHANNEL_NAME = "purple-rain";

/**
 * Event-Handler für ankommende Nachrichten im Pub/Sub-Channel.
*/
const handleMessage = function(this: Bot, channel: string, message: string) {
  try {
    const { event, payload } = JSON.parse(message);
    this.emit(event, payload);
  } catch(err) {
    this.log.error(err, "failed to parse Redis message");
  }
};

/**
 * Stellt eine Verbindung zu Redis her.
*/
export const loadRedis = async function(this: Bot) {
  this.log.info("connecting to Redis database");

  const { host, port, password } = this.config.redis;

  this.db = new Redis({
    host,
    port,
    password,
    lazyConnect: true
  });

  this.dbSub = this.db.duplicate();

  try {
    await Promise.all([
      this.db.connect(),
      this.dbSub.connect(),
      this.dbSub.subscribe(CHANNEL_NAME)
    ]);
  } catch(err) {
    this.log.fatal(err, "failed to connect to Redis database");
    process.exit(1);
  }

  this.dbSub.on("message", handleMessage.bind(this));
  this.log.info("connected to Redis database");
};