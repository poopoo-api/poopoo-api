import { BaseVideo, BaseVideoAttributes, Comment } from ".";
import { YoutubeRawData } from "../common";
/** @hidden */
interface VideoAttributes extends BaseVideoAttributes {
    duration: number;
    comments: Comment[];
    commentContinuation?: string;
}
/** Represents a Video, usually returned from `client.getVideo()`  */
export default class Video extends BaseVideo implements VideoAttributes {
    /** The duration of this video in second */
    duration: number;
    /**
     * Comments of this video
     *
     * You need to load the comment first by calling `video.nextComments()` as youtube doesn't send any comments data when loading the video (from `client.getVideo()`)
     */
    comments: Comment[];
    /** Current continuation token to load next comments  */
    commentContinuation?: string;
    /** @hidden */
    constructor(video?: Partial<VideoAttributes>);
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data: YoutubeRawData): Video;
    /**
     * Load next 20 comments of the video, and push the loaded comments to {@link Video.comments}
     * You can only load up to 2000 comments from a video, this is due to the limitation from Youtube
     *
     * @example
     * ```js
     * const video = await youtube.getVideo(VIDEO_ID);
     * await video.nextComments();
     * console.log(video.comments) // first 20 comments
     *
     * let newComments = await video.nextComments();
     * console.log(newComments) // 20 loaded comments
     * console.log(video.comments) // first 40 comments
     *
     * await video.nextComments(0); // load the rest of the comments in the video
     * ```
     *
     * @param count How many times to load the next comments. Set 0 to load all comments (might take a while on a video with many comments!)
     *
     * @returns Loaded comments
     */
    nextComments(count?: number): Promise<Comment[]>;
}
export {};
