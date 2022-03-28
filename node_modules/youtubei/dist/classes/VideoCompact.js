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
const common_1 = require("../common");
const _1 = require(".");
/** Represent a compact video (e.g. from search result, playlist's videos, channel's videos) */
class VideoCompact extends _1.Base {
    /** @hidden */
    constructor(videoCompact = {}) {
        super();
        Object.assign(this, videoCompact);
    }
    /** Whether this video is private / deleted or not, only useful in playlist's videos */
    get isPrivateOrDeleted() {
        return !this.duration;
    }
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data) {
        var _a, _b;
        const { videoId, title, lengthText, thumbnail, ownerText, shortBylineText, publishedTimeText, viewCountText, badges, thumbnailOverlays, channelThumbnailSupportedRenderers, detailedMetadataSnippets, } = data;
        this.id = videoId;
        this.title = title.simpleText || ((_a = title.runs[0]) === null || _a === void 0 ? void 0 : _a.text);
        this.thumbnails = new _1.Thumbnails().load(thumbnail.thumbnails);
        this.uploadDate = publishedTimeText === null || publishedTimeText === void 0 ? void 0 : publishedTimeText.simpleText;
        this.description =
            (detailedMetadataSnippets === null || detailedMetadataSnippets === void 0 ? void 0 : detailedMetadataSnippets[0].snippetText.runs.map((r) => r.text).join("")) || "";
        this.duration =
            common_1.getDuration((lengthText === null || lengthText === void 0 ? void 0 : lengthText.simpleText) || ((_b = thumbnailOverlays === null || thumbnailOverlays === void 0 ? void 0 : thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer) === null || _b === void 0 ? void 0 : _b.text.simpleText) ||
                "") || null;
        this.isLive = !!((badges === null || badges === void 0 ? void 0 : badges[0].metadataBadgeRenderer.style) === "BADGE_STYLE_TYPE_LIVE_NOW");
        // Channel
        if (ownerText || shortBylineText) {
            const { browseId } = (ownerText || shortBylineText).runs[0].navigationEndpoint.browseEndpoint;
            const thumbnails = channelThumbnailSupportedRenderers === null || channelThumbnailSupportedRenderers === void 0 ? void 0 : channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails;
            this.channel = new _1.ChannelCompact({
                id: browseId,
                name: (ownerText || shortBylineText).runs[0].text,
                thumbnails: thumbnails ? new _1.Thumbnails().load(thumbnails) : undefined,
                client: this.client,
            });
        }
        this.viewCount = common_1.stripToInt((viewCountText === null || viewCountText === void 0 ? void 0 : viewCountText.simpleText) || (viewCountText === null || viewCountText === void 0 ? void 0 : viewCountText.runs[0].text));
        return this;
    }
    /**
     * Get {@link Video} object based on current video id
     *
     * Equivalent to
     * ```js
     * client.getVideo(videoCompact.id);
     * ```
     */
    getVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.getVideo(this.id);
        });
    }
}
exports.default = VideoCompact;
