import assert from "node:assert";
import { ChannelType, Colors, EmbedBuilder } from "discord.js";

// Intern
import { Command } from "$structs/command";

// Types
import type { Message } from "discord.js";
import type { CommandMeta } from "$structs/command";
import type { PurpleRain } from "$structs/purple-rain";

/**
  Abstrakter Musikbefehl.
*/
export abstract class MusicCommand extends Command {
  /**
    Konstruktor.
  */
  constructor(meta: CommandMeta) {
    super(meta);
  }

  /**
    Überprüft, ob der Befehl ausgeführt werden kann.
  */
  public check(bot: PurpleRain, message: Message<true>) {
    // TODO: Checks ausführen.
    return super.check(bot, message);
  }
};