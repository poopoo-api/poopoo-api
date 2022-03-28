import { Base, ChannelCompact, Video, BaseAttributes, Reply } from ".";
import { YoutubeRawData } from "../common";
/** @hidden */
interface CommentAttributes extends BaseAttributes {
    video: Video;
    author: ChannelCompact;
    content: string;
    publishDate: string;
    likeCount: number;
    isAuthorChannelOwner: boolean;
    isPinnedComment: boolean;
    replyCount: number;
    replyContinuation?: string;
}
/** Represents a Comment / Reply */
export default class Comment extends Base implements CommentAttributes {
    /** The video this comment belongs to */
    video: Video;
    /** The comment's author */
    author: ChannelCompact;
    /** The content of this comment */
    content: string;
    /** The publish date of the comment */
    publishDate: string;
    /** How many likes does this comment have */
    likeCount: number;
    /** Whether the comment is posted by the video uploader / owner */
    isAuthorChannelOwner: boolean;
    /** Whether the comment is pinned */
    isPinnedComment: boolean;
    /** Comment's reply count */
    replyCount: number;
    /** Comment's loaded replies */
    replies: Reply[];
    /** Current continuation token to load next replies  */
    replyContinuation?: string;
    /** @hidden */
    constructor(comment?: Partial<CommentAttributes>);
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data: YoutubeRawData): Comment;
    /** URL to the video with this comment being highlighted (appears on top of the comment section) */
    get url(): string;
    /** Load next replies of the comment */
    nextReplies(count?: number): Promise<Reply[]>;
}
export {};
