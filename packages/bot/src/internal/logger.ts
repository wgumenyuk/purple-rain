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

import pino from "pino";

// Types
import type {
  Bindings,
  ChildLoggerOptions,
  TransportTargetOptions
} from "pino";

const isDev = (process.env.NODE_ENV !== "production");
const targets: TransportTargetOptions[] = [];

if(isDev) {
  targets.push({
    target: "pino-pretty"
  });
}

const parentLogger = pino({
  level: (isDev) ? "debug" : "info",
  transport: {
    targets
  }
});

/**
 * Erzeugt einen neuen Unterlogger.
*/
export const logger = function(bindings: Bindings, options: ChildLoggerOptions) {
  return parentLogger.child(bindings, options);
};