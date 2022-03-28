import { YoutubeRawData } from "../common";
import { Base, PlaylistCompact, Thumbnails, VideoCompact, BaseAttributes } from ".";
/** @hidden */
export interface ChannelCompactAttributes extends BaseAttributes {
    name: string;
    thumbnails?: Thumbnails;
    videoCount?: number;
    subscriberCount?: string;
    videoContinuation?: string | null;
    playlistContinuation?: string | null;
}
/**  Represents a Youtube Channel */
export default class ChannelCompact extends Base implements ChannelCompactAttributes {
    /** The channel's name */
    name: string;
    /** Thumbnails of the Channel with different sizes */
    thumbnails?: Thumbnails;
    /** How many video does this channel have */
    videoCount?: number;
    /**
     * How many subscriber does this channel have,
     *
     * This is not the exact amount, but a literal string like `"1.95M subscribers"`
     */
    subscriberCount?: string;
    /** Loaded videos on the channel, fetched from `channel.nextVideos()` */
    videos: VideoCompact[];
    /** Loaded playlists on the channel, fetched from `channel.nextPlaylists()` */
    playlists: PlaylistCompact[];
    /** Current continuation token to load next videos */
    videoContinuation?: string | null;
    /** Current continuation token to load next playlists */
    playlistContinuation?: string | null;
    /** @hidden */
    constructor(channel?: Partial<ChannelCompactAttributes>);
    /** The URL of the channel page */
    get url(): string;
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data: YoutubeRawData): ChannelCompact;
    /**
     * Load next 30 videos made by the channel, and push the loaded videos to {@link Channel.videos}
     *
     * @example
     * ```js
     * const channel = await youtube.findOne(CHANNEL_NAME, {type: "channel"});
     * await channel.nextVideos();
     * console.log(channel.videos) // first 30 videos
     *
     * let newVideos = await channel.nextVideos();
     * console.log(newVideos) // 30 loaded videos
     * console.log(channel.videos) // first 60 videos
     *
     * await channel.nextVideos(0); // load the rest of the videos in the channel
     * ```
     *
     * @param count How many time to load the next videos, pass `0` to load all
     *
     * @return New loaded videos
     */
    nextVideos(count?: number): Promise<VideoCompact[]>;
    /**
     * Load next 30 playlists made by the channel, and push the loaded playlists to {@link Channel.playlists}
     *
     * @example
     * ```js
     * const channel = await youtube.findOne(CHANNEL_NAME, {type: "channel"});
     * await channel.nextPlaylists();
     * console.log(channel.playlists) // first 30 playlists
     *
     * let newPlaylists = await channel.nextPlaylists();
     * console.log(newPlaylists) // 30 loaded playlists
     * console.log(channel.playlists) // first 60 playlists
     *
     * await channel.nextPlaylists(0); // load the rest of the playlists in the channel
     * ```
     *
     * @param count How many time to load the next playlists, pass `0` to load all
     *
     * @return New loaded playlists
     */
    nextPlaylists(count?: number): Promise<PlaylistCompact[]>;
    /** Get tab data from youtube */
    private getTabData;
    /** Parse tab data from request, tab name is ignored if it's a continuation data */
    private static parseTabData;
}
