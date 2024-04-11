import pino from "pino";

// Types
import type { TransportTargetOptions, ChildLoggerOptions } from "pino";

const isDev = (process.env.NODE_ENV !== "production");
const targets: TransportTargetOptions[] = [];

// `pino-pretty` in Development verwenden.
if(isDev) {
  targets.push({
    target: "pino-pretty"
  });
}

const log = pino({
  level: (isDev) ? "debug" : "info",
  transport: {
    targets
  }
});

/**
  Erzeugt einen neuen Child-Logger.
*/
export const createLogger = function(
  options: ChildLoggerOptions,
  bindings: Record<string, any> = {}
) {
  return log.child(bindings, options);
};