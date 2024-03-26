import type { User } from "discord.js";

/**
 * Liedmeta.
*/
type SongMeta = {
  /**
   * Name des Channels.
  */
  channel: string;

  /**
   * Channel-ID.
  */
  channelId: string;

  /**
   * Liste von Thumbnail-URLs.
  */
  thumbnails: string[];

  /**
   * Titel.
  */
  title: string;
  
  /**
   * Länge des Liedes.
  */
  duration: number;

  /**
   * Nutzer, der das Lied angefordert hat.
  */
  user: User;
};

/**
 * Lied.
*/
export class Song {
  /**
   * Name des Channels.
  */
  public channel: string;

  /**
   * Channel-ID.
  */
  public channelId: string;

  /**
   * Liste von Thumbnail-URLs.
  */
  public thumbnails: string[];

  /**
   * Titel.
  */
  public title: string;

  /**
   * Länge des Liedes in Sekunden.
  */
  public duration: number;

  /**
   * Nutzer, der das Lied angefordert hat.
  */
  public user: User;

  /**
   * Konstruktor.
  */
  constructor(meta: SongMeta) {
    this.channel = meta.channel;
    this.channelId = meta.channelId;
    this.thumbnails = meta.thumbnails;
    this.title = meta.title;
    this.duration = meta.duration;
    this.user = meta.user;
  }

  /**
   * Ob das Lied ein Livestream ist.
  */
  public get isLive() {
    return (this.duration === Infinity);
  }
};