import type { Queue } from "$engine/queue";

declare module "discord.js" {
  interface ClientEvents {
    voiceChannelJoin: [
      Queue
    ];
    voiceChannelLeave: [
      Queue
    ];
    queueCreate: [
      Queue
    ];
    queueDestroy: [
      Queue
    ];
  }
}

export {};