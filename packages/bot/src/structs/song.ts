import type { GuildMember } from "discord.js";

// #region Types
type SongOptions = {
    title: string;
    channel: string;
    duration: number;
    imageUrl: string;
    videoUrl: string;
    streamUrl: string;
};
// #endregion

/**
    Song.
*/
class Song {
    // #region Attribute
    /**
        Nutzer, der den Song angefordert hat.
    */
    public member: GuildMember;

    /**
        Titel.
    */
    public readonly title: string;

    /**
        Kanal.
    */
    public readonly channel: string;

    /**
        Dauer.
    */
    public readonly duration: number;

    /**
        URL zum Thumbnail.
    */
    public readonly imageUrl: string;

    /**
        URL zum Video.
    */
    public readonly videoUrl: string;

    /**
        URL zum Audio-Stream.
    */
    public readonly streamUrl: string;
    // #endregion

    /**
        Konstruktor.
    */
    constructor(member: GuildMember, options: SongOptions) {
        this.member = member;
        this.title = options.title;
        this.channel = options.channel;
        this.duration = options.duration;
        this.imageUrl = options.imageUrl;
        this.videoUrl = options.videoUrl;
        this.streamUrl = options.streamUrl;
    }

    /**
        Ob der Song live ist.
    */
    public get isLive() {
        return (this.duration === Infinity);
    }

    /**
        Name des Nutzers, der den Song angefordert hat.
    */
    public get requestedBy() {
        return this.member.nickname || this.member.user.username;
    }
}

export default Song;