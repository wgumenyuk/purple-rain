import pino from "pino";

// Types
import type {
  Bindings,
  ChildLoggerOptions,
  TransportTargetOptions as Target
} from "pino";

const isDev = (process.env.NODE_ENV !== "production");

const targets: Target[] = [];

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
 * Erstellt einen neuen Child-Logger.
*/
export function logger(options: ChildLoggerOptions, bindings: Bindings = {}) {
  return parentLogger.child(bindings, options);
};