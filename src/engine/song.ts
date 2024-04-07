import type { GuildMember } from "discord.js";

/**
  Lied-Meta.
*/
type SongMeta = {
  /**
    YouTube-URL.
  */
  url: string;

  /**
    Channel-ID.
  */
  channelId: string;

  /**
    Name des Channels.
  */
  channel: string;

  /**
    Thumbnail-URL.
  */
  thumbnailUrl: string | null;

  /**
    Titel.
  */
  title: string;

  /**
    Dauer in Sekunden.
  */
  duration: number;

  /**
    Nutzer, der das Lied angefordert hat.
  */
  user: GuildMember;
};

/**
  Lied.
*/
export class Song {
  /**
    YouTube-URL.
  */
  public url: string;

  /**
    Channel-ID.
  */
  public channelId: string;

  /**
    Name des Channels.
  */
  public channel: string;

  /**
    Thumbnail-URL.
  */
  public thumbnailUrl: string | null;

  /**
    Titel.
  */
  public title: string;

  /**
    Dauer in Sekunden.
  */
  public duration: number;

  /**
    Nutzer, der das Lied angefordert hat.
  */
  public user: GuildMember;

  /**
    Konstruktor.
  */
  constructor(meta: SongMeta) {
    this.url = meta.url;
    this.channelId = meta.channelId;
    this.channel = meta.channel;
    this.thumbnailUrl = meta.thumbnailUrl;
    this.title = meta.title;
    this.duration = meta.duration;
    this.user = meta.user;
  }

  /**
    Ob das Lied ein Livestream ist.
  */
  public get isLive() {
    return (this.duration === Infinity);
  }
};