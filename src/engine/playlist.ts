import type { GuildMember } from "discord.js";
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
    Thumbnail-URL.
  */
  thumbnailUrl: string;

  /**
    Titel.
  */
  title: string;

  /**
    Liste von Liedern.
  */
  songs: Song[];

  /**
    Nutzer, der die Playlist angefordert hat.
  */
  user: GuildMember;
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
    Thumbnail-URL.
  */
  public thumbnailUrl: string;

  /**
    Titel.
  */
  public title: string;

  /**
    Liste von Liedern.
  */
  public songs: Song[];
  
  /**
    Nutzer, der die Playlist angefordert hat.
  */
  public user: GuildMember;  

  /**
    Konstruktor.
  */
  constructor(meta: PlaylistMeta) {
    this.url = meta.url;
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