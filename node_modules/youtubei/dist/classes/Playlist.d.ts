import { BaseAttributes, VideoCompact, ChannelCompact, Base } from ".";
import { YoutubeRawData } from "../common";
/** @hidden */
interface PlaylistAttributes extends BaseAttributes {
    title: string;
    videoCount: number;
    viewCount: number;
    lastUpdatedAt: string;
    channel?: ChannelCompact;
    videos: VideoCompact[];
    continuation?: string;
}
/** Represents a Playlist, usually returned from `client.getPlaylist()` */
export default class Playlist extends Base implements PlaylistAttributes {
    /** The title of this playlist */
    title: string;
    /** How many videos in this playlist */
    videoCount: number;
    /** How many viewers does this playlist have */
    viewCount: number;
    /** Last time this playlist is updated */
    lastUpdatedAt: string;
    /** The channel that made this playlist */
    channel?: ChannelCompact;
    /** Videos in the playlist */
    videos: VideoCompact[];
    /** Current continuation token to load next videos  */
    continuation: string | undefined;
    /** @hidden */
    constructor(playlist?: Partial<Playlist>);
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data: YoutubeRawData): Playlist;
    /**
     * Load next 100 videos of the playlist, and push the loaded videos to {@link Playlist.videos}
     *
     * @example
     * ```js
     * const playlist = await youtube.getPlaylist(PLAYLIST_ID);
     * console.log(playlist.videos) // first 100 videos
     *
     * let newVideos = await playlist.next();
     * console.log(newVideos) // 100 loaded videos
     * console.log(playlist.videos) // first 200 videos
     *
     * await playlist.next(0); // load the rest of the videos in the playlist
     * ```
     *
     * @param count How many times to load the next videos. Set 0 to load all videos (might take a while on a large playlist!)
     */
    next(count?: number): Promise<VideoCompact[]>;
    /**
     * Get compact videos
     *
     * @param playlistContents raw object from youtubei
     */
    private static parseVideos;
    private static parseSideBarInfo;
}
export {};
