"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const common_1 = require("../common");
const constants_1 = require("../constants");
/** Represents a Comment / Reply */
class Comment extends _1.Base {
    /** @hidden */
    constructor(comment = {}) {
        super();
        /** Comment's loaded replies */
        this.replies = [];
        Object.assign(this, comment);
    }
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data) {
        const { authorText, authorThumbnail, authorEndpoint, contentText, publishedTimeText, commentId, voteCount, authorIsChannelOwner, pinnedCommentBadge, replyCount, } = data.comment.commentRenderer;
        // Basic information
        this.id = commentId;
        this.content = contentText.runs.map((r) => r.text).join("");
        this.publishDate = publishedTimeText.runs.shift().text;
        this.likeCount = +((voteCount === null || voteCount === void 0 ? void 0 : voteCount.simpleText) || 0);
        this.isAuthorChannelOwner = authorIsChannelOwner;
        this.isPinnedComment = !!pinnedCommentBadge;
        this.replyCount = replyCount;
        // Reply Continuation
        this.replies = [];
        this.replyContinuation = data.replies
            ? common_1.getContinuationFromItems(data.replies.commentRepliesRenderer.contents)
            : undefined;
        // Author
        const { browseId } = authorEndpoint.browseEndpoint;
        this.author = new _1.ChannelCompact({
            id: browseId,
            name: authorText.simpleText,
            thumbnails: new _1.Thumbnails().load(authorThumbnail.thumbnails),
            client: this.client,
        });
        return this;
    }
    /** URL to the video with this comment being highlighted (appears on top of the comment section) */
    get url() {
        return `https://www.youtube.com/watch?v=${this.video.id}&lc=${this.id}`;
    }
    /** Load next replies of the comment */
    nextReplies(count = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReplies = [];
            for (let i = 0; i < count || count == 0; i++) {
                if (!this.replyContinuation)
                    break;
                // Send request
                const response = yield this.client.http.post(`${constants_1.I_END_POINT}/next`, {
                    data: { continuation: this.replyContinuation },
                });
                const continuationItems = response.data.onResponseReceivedEndpoints[0].appendContinuationItemsAction
                    .continuationItems;
                this.replyContinuation = common_1.getContinuationFromItems(continuationItems, [
                    "button",
                    "buttonRenderer",
                    "command",
                ]);
                const replies = common_1.mapFilter(continuationItems, "commentRenderer");
                newReplies.push(...replies.map((i) => new _1.Reply({ video: this.video, comment: this, client: this.client }).load(i)));
            }
            this.replies.push(...newReplies);
            return newReplies;
        });
    }
}
exports.default = Comment;
