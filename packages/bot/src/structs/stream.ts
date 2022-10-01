import { FFmpeg } from "prism-media";
import { StreamType } from "@discordjs/voice";

/**
    Stream.
*/
class Stream {
    // #region Attribute
    /**
        Typ.
    */
    public readonly type: StreamType;

    /**
        URL des Audio-Streams.
    */
    public readonly url: string;

    /**
        Argumente für FFmpeg.
    */
    public readonly args: string[];

    /**
        FFmpeg-Stream.
    */
    public readonly ffmpeg: FFmpeg;
    // #endregion

    /**
        Konstruktor.
    */
    constructor(url: string) {
        this.type = StreamType.Opus;
        this.url = url;

        this.args = [
            "-reconnect", "1",
            "-reconnect_streamed", "1",
            "-reconnect_delay_max", "5",
            "-i", this.url,
            "-analyzeduration", "0",
            "-loglevel", "0",
            "-ar", "48000",
            "-ac", "2",
            "-f", "opus"
        ];

        this.ffmpeg = new FFmpeg({
            args: this.args,
            shell: false
        });
    }
}

export default Stream;