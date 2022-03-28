"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/** Represents a Reply */
class Reply extends _1.Base {
    /** @hidden */
    constructor(reply = {}) {
        super();
        Object.assign(this, reply);
    }
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data) {
        const { authorText, authorThumbnail, authorEndpoint, contentText, publishedTimeText, commentId, likeCount, authorIsChannelOwner, } = data;
        // Basic information
        this.id = commentId;
        this.content = contentText.runs.map((r) => r.text).join("");
        this.publishDate = publishedTimeText.runs.shift().text;
        this.likeCount = likeCount;
        this.isAuthorChannelOwner = authorIsChannelOwner;
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
}
exports.default = Reply;
