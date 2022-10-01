import { inlineCode } from "discord.js";
import ytpl from "ytpl";
import ytsr from "ytsr";
import ytdl from "ytdl-core-discord";

// Intern
import Song from "@structs/song";

// Types
import type { GuildMember } from "discord.js";
import type { chooseFormatOptions as FormatOptions } from "ytdl-core";
import type Queue from "@structs/queue";

// #region Types
type Playlist = {
    title: string;
    playlistUrl: string;
    imageUrl: string | null;
    size: number;
    member: GuildMember;
};

type Context = {
    member: GuildMember;
    resource: string;
    front?: boolean;
    silent?: boolean;
};
// #endregion

/**
    Resolver.
*/
class Resolver {
    // #region Attribute
    /**
        Musik-Queue.
    */
    private queue: Queue;
    // #endregion

    /**
        Konstruktor.
    */
    constructor(queue: Queue) {
        this.queue = queue;
    }

    /**
        Resolved ein YouTube-Video.
    */
    private async resolveVideo(context: Context): Promise<void> {
        const { member, resource, silent, front } = context;

        const info = await ytdl.getInfo(resource);
        const video = info.videoDetails;

        const formatOptions: FormatOptions = {};

        if(video.isLiveContent) {
            formatOptions.quality = [ 95, 94, 93, 92, 91 ];
        } else {
            formatOptions.filter = "audioonly";
        }

        const duration = (!video.isLiveContent) ?
            parseFloat(video.lengthSeconds) * 1000 :
            Infinity;

        const format = ytdl.chooseFormat(info.formats, formatOptions);
        const thumbnail = video.thumbnails[video.thumbnails.length - 1];

        const song = new Song(member, {
            title: video.title,
            channel: video.ownerChannelName,
            imageUrl: thumbnail.url,
            videoUrl: video.video_url,
            streamUrl: format.url,
            duration
        });

        if(!silent) {
            this.queue.emit("resolvedSong", song);
        }

        this.queue.addSong(song, front);
    }

    /**
        Resolved eine YouTube-Playlist.
    */
    private async resolvePlaylist(context: Context): Promise<void> {
        const { member, resource } = context;

        const info = await ytpl(resource);

        const videos = info.items;
        const firstVideo = videos.shift();

        if(!firstVideo) {
            return;
        }

        this.queue.emit("resolvedPlaylist", {
            title: info.title,
            playlistUrl: info.url,
            imageUrl: info.bestThumbnail.url,
            size: info.estimatedItemCount,
            member
        });

        // Restliche Videos asynchron laden
        setImmediate(async () => {
            for(const video of videos) {
                try {
                    await this.resolveVideo({
                        ...context,
                        resource: video.url,
                        silent: true
                    });
                } catch(error) {
                    continue;
                }
            }
        });

        // Erstes Video direkt laden
        return this.resolveVideo({ ...context, resource: firstVideo.url });
    }

    /**
        Resolved eine Suche auf YouTube.
    */
    private async resolveSearch(context: Context): Promise<void> {
        const { resource } = context;

        const results = await ytsr(resource, {
            pages: 1,
            limit: 1
        });

        const result = results.items[0];

        if(!result || result.type !== "video") {
            this.queue.emit("resolveError",
                new Error(`Keine Ergebnisse für ${inlineCode(resource)} gefunden.`)
            );

            return;
        }

        return this.resolveVideo({
            ...context,
            resource: result.url
        });
    }

    /**
        Resolved eine angeforderte YouTube-Ressource.
    */
    public async resolve(context: Context): Promise<void> {
        const { resource } = context;

        // Playlists
        if(ytpl.validateID(resource)) {
            return this.resolvePlaylist(context);
        }

        // Videos
        if(ytdl.validateURL(resource)) {
            return this.resolveVideo(context);
        }

        // Suche
        return this.resolveSearch(context);
    }
}

export type {
    Context,
    Playlist
};

export default Resolver;