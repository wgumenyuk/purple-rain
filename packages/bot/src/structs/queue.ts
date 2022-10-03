import { TypedEmitter } from "tiny-typed-emitter";
import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource
} from "@discordjs/voice";

// Intern
import Resolver from "@structs/resolver";
import Stream from "@structs/stream";

// Types
import {
    AudioPlayer,
    AudioResource,
    VoiceConnection,
    VoiceConnectionStatus
} from "@discordjs/voice";
import type Song from "@structs/song";
import type { Playlist, Context as ResolveContext } from "@structs/resolver";

// #region Types
type QueueEvents = {
    disconnect: () => void;
    resolvedSong: (song: Song) => void;
    resolvedPlaylist: (playlist: Playlist) => void;
    resolveError: (error: Error) => void;
};
// #endregion

/**
    Queue für Musik.
*/
class Queue extends TypedEmitter<QueueEvents> {
    // #region Attribute
    /**
        Verbindung zum Voice-Channel.
    */
    private connection: VoiceConnection;

    /**
        Audio-Player.
    */
    private audioPlayer: AudioPlayer;

    /**
        Aktuelle Audio-Ressource.
    */
    private audioResource: AudioResource | null;

    /**
        Resolover.
    */
    private resolver: Resolver;

    /**
        Liste von Songs.
    */
    public songs: Song[];

    /**
        Aktueller Song.
    */
    public currentSong: Song | null;

    /**
        ID des Voice-Channels.
    */
    public readonly voiceChannelId: string;
    // #endregion

    /**
        Konstruktor.
    */
    constructor(connection: VoiceConnection) {
        super();

        this.connection = connection;
        this.voiceChannelId = this.connection.joinConfig.channelId!;

        this.songs = [];
        this.currentSong = null;

        this.audioPlayer = createAudioPlayer();
        this.audioResource = null;

        this.resolver = new Resolver(this);

        this.connection.on("stateChange", (_, state) => {
            switch(state.status) {
                case VoiceConnectionStatus.Destroyed:
                case VoiceConnectionStatus.Disconnected: {
                    this.emit("disconnect");
                    break;
                }
            }
        });

        this.audioPlayer.on("stateChange", (_, state) => {
            if(state.status === AudioPlayerStatus.Idle) {
                this.play();
            }
        });

        this.connection.subscribe(this.audioPlayer);
    }

    /**
        Anzahl der Songs in der Queue.
    */
    public get size(): number {
        return this.songs.length;
    }

    /**
        Ob die Wiedergabe untätig ist.
    */
    public get isIdle(): boolean {
        return (this.audioPlayer.state.status === AudioPlayerStatus.Idle); 
    }

    /**
        Ob die Wiedergabe laufend ist.
    */
    public get isPlaying(): boolean {
        return (this.audioPlayer.state.status === AudioPlayerStatus.Playing); 
    }

    /**
        Ob die Wiedergabe pausiert ist.
    */
    public get isPaused(): boolean {
        return (this.audioPlayer.state.status === AudioPlayerStatus.Paused);
    }

    /**
        Geschätzte Dauer der Queue.
    */
    public get duration(): number {
        return this.songs
            .map((song) => song.duration)
            .reduce((acc, cur) => acc + cur);
    }

    /**
        Playback-Dauer des aktuellen Songs in Millisekunden.
    */
    public get playback(): number {
        return this.audioResource?.playbackDuration || 0;
    }

    /**
        Pausiert die Wiedergabe.
    */
    public pause(): void {
        if(this.isPlaying) this.audioPlayer.pause();
    }

    /**
        Setzt die Wiedergabe fort.
    */
    public unpause(): void {
        if(this.isPaused) this.audioPlayer.unpause();
    }

    /**
        Trennt die Verbindung.
    */
    public disconnect(): void {
        this.connection.destroy();
    }

    /**
        Resolved eine YouTube-Ressource.
    */
    public async resolve(context: ResolveContext): Promise<void> {
        return this.resolver.resolve(context);
    }

    /**
        Fügt einen Song zur Queue hinzu.
    */
    public addSong(song: Song, front?: boolean): void {
        if(front) {
            this.songs.unshift(song);
        } else {
            this.songs.push(song);
        }
    }

    /**
        Überspringt den aktuellen Song.
    */
    public skip(): void {
        this.audioPlayer.stop();
    }

    /**
        Mischt die Songs durch.
    */
    public shuffle(): void {
        if(this.size === 0) return;

        for(let i = this.size - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ this.songs[i], this.songs[j] ] = [ this.songs[j], this.songs[i] ];
        }
    }

    /**
        Spielt den ersten Song aus der Queue ab.
    */
    public play(): void {
        this.currentSong = this.songs.shift() || null;

        if(!this.currentSong) {
            this.audioResource = null;
            return;
        }

        const stream = new Stream(this.currentSong.streamUrl);

        this.audioResource = createAudioResource(stream.ffmpeg);

        this.audioPlayer.play(this.audioResource);
    }
}

export default Queue;