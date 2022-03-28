import { YoutubeRawData } from "../common";
import { Chat, BaseVideo, BaseVideoAttributes } from ".";
/** @hidden */
interface LiveVideoAttributes extends BaseVideoAttributes {
    watchingCount: number;
    chatContinuation?: string;
}
interface LiveVideoEvents {
    chat: (chat: Chat) => void;
}
declare interface LiveVideo {
    on<T extends keyof LiveVideoEvents>(event: T, listener: LiveVideoEvents[T]): AsyncIterableIterator<any>;
    emit<T extends keyof LiveVideoEvents>(event: T, ...args: Parameters<LiveVideoEvents[T]>): boolean;
}
/** Represents a video that's currently live, usually returned from `client.getVideo()` */
declare class LiveVideo extends BaseVideo implements LiveVideoAttributes {
    /** Number of people who's watching the live stream right now */
    watchingCount: number;
    /** Current continuation token to load next chat  */
    chatContinuation: string;
    private _delay;
    private _chatRequestPoolingTimeout;
    private _timeoutMs;
    private _isChatPlaying;
    private _chatQueue;
    /** @hidden */
    constructor(video?: Partial<LiveVideoAttributes>);
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data: YoutubeRawData): LiveVideo;
    /**
     * Start polling for get live chat request
     *
     * @param delay chat delay in millisecond
     */
    playChat(delay?: number): void;
    /** Stop request polling for live chat */
    stopChat(): void;
    /** Start request polling */
    private pollChatContinuation;
    /** Parse chat data from Youtube and add to chatQueue */
    private parseChat;
}
export default LiveVideo;
