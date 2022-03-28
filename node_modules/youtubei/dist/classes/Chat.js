"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/** Represents a chat in a live stream */
class Chat extends _1.Base {
    /** @hidden */
    constructor(chat = {}) {
        super();
        Object.assign(this, chat);
    }
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data) {
        const { id, message, authorName, authorPhoto, timestampUsec, authorExternalChannelId, } = data;
        // Basic information
        this.id = id;
        this.message = message.runs.map((r) => r.text).join("");
        this.author = new _1.ChannelCompact({
            id: authorExternalChannelId,
            name: authorName.simpleText,
            thumbnails: authorPhoto.thumbnails,
            client: this.client,
        });
        this.timestamp = +timestampUsec;
        return this;
    }
}
exports.default = Chat;
