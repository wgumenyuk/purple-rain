import type { User } from "discord.js";
import type { Song } from "$engine/song";

/**
  Playlist-Meta.
*/
type PlaylistMeta = {
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
    Titel.
  */
  title: string;

  /**
    Thumbnail-URL.
  */
  thumbnailUrl: string;

  /**
    Liste von Liedern.
  */
  songs: Song[];

  /**
    Nutzer, der die Playlist angefordert hat.
  */
  user: User;
};

/**
  Playlist.
*/
export class Playlist {
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
    Titel.
  */
  public title: string;
  
  /**
    Thumbnail-URL.
  */
  public thumbnailUrl: string;
  
  /**
    Liste von Liedern.
  */
  public songs: Song[];
  
  /**
    Nutzer, der die Playlist angefordert hat.
  */
  public user: User;  

  /**
    Konstruktor.
  */
  constructor(meta: PlaylistMeta) {
    this.url = meta.url;
    this.channelId = meta.channelId;
    this.channel = meta.channel;
    this.title = meta.title;
    this.thumbnailUrl = meta.thumbnailUrl;
    this.songs = meta.songs;
    this.user = meta.user;
  }

  /**
    Anzahl der Lieder.
  */
  public get length() {
    return this.songs.length;
  }

  /**
    Länge der Playlist in Sekunden.
  */
  public get duration() {
    const duration = this.songs.reduce(function(duration, song) {
      return (song.isLive) ? duration : duration + song.duration;
    }, 0);

    return duration;
  }
};