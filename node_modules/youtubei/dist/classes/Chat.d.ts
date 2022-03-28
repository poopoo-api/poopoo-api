import { Base, ChannelCompact, Video, BaseAttributes } from ".";
import { YoutubeRawData } from "../common";
/** @hidden */
interface ChatAttributes extends BaseAttributes {
    video: Video;
    author: ChannelCompact;
    message: string;
    timestamp: number;
}
/** Represents a chat in a live stream */
export default class Chat extends Base implements ChatAttributes {
    /** The video this chat belongs to */
    video: Video;
    /** The chat's author */
    author: ChannelCompact;
    /** The message of this chat */
    message: string;
    /** Timestamp in usec / microsecond */
    timestamp: number;
    /** @hidden */
    constructor(chat?: Partial<ChatAttributes>);
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data: YoutubeRawData): Chat;
}
export {};
