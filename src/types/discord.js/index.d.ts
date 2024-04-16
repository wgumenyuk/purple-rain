declare module "discord.js" {
  // Events erweitern.
  export interface ClientEvents {
    commandNotFound: [
      message: Message<true>,
      commandName: string
    ];
  }
}

export {};