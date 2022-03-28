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
/** Represents a Playlist, usually returned from `client.getPlaylist()` */
class Playlist extends _1.Base {
    /** @hidden */
    constructor(playlist = {}) {
        super();
        /** Videos in the playlist */
        this.videos = [];
        Object.assign(this, playlist);
    }
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data) {
        var _a, _b, _c;
        const sidebarRenderer = data.sidebar.playlistSidebarRenderer.items;
        const primaryRenderer = sidebarRenderer[0].playlistSidebarPrimaryInfoRenderer;
        const metadata = data.metadata.playlistMetadataRenderer;
        // Basic information
        this.id = (_a = Object.values(metadata)
            .find((v) => v.includes("playlist?list="))) === null || _a === void 0 ? void 0 : _a.split("=")[1];
        this.title = metadata.title;
        const { stats } = primaryRenderer;
        if (primaryRenderer.stats.length === 3) {
            this.videoCount = Playlist.parseSideBarInfo(stats[0], true);
            this.viewCount = Playlist.parseSideBarInfo(stats[1], true);
            this.lastUpdatedAt = Playlist.parseSideBarInfo(stats[2], false);
        }
        else if (stats.length === 2) {
            this.videoCount = Playlist.parseSideBarInfo(stats[0], true);
            this.lastUpdatedAt = Playlist.parseSideBarInfo(stats[1], false);
        }
        const playlistContents = ((_b = data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
            .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
            .playlistVideoListRenderer) === null || _b === void 0 ? void 0 : _b.contents) || [];
        // Video Continuation Token
        this.continuation = common_1.getContinuationFromItems(playlistContents);
        // Channel
        const videoOwner = (_c = sidebarRenderer[1]) === null || _c === void 0 ? void 0 : _c.playlistSidebarSecondaryInfoRenderer.videoOwner;
        if (videoOwner) {
            const { title, thumbnail } = videoOwner.videoOwnerRenderer;
            this.channel = new _1.ChannelCompact({
                id: title.runs[0].navigationEndpoint.browseEndpoint.browseId,
                name: title.runs[0].text,
                thumbnails: new _1.Thumbnails().load(thumbnail.thumbnails),
                client: this.client,
            });
        }
        // Videos
        this.videos = Playlist.parseVideos(playlistContents, this);
        return this;
    }
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
    next(count = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVideos = [];
            for (let i = 0; i < count || count == 0; i++) {
                if (!this.continuation)
                    break;
                const response = yield this.client.http.post(`${constants_1.I_END_POINT}/browse`, {
                    data: { continuation: this.continuation },
                });
                const playlistContents = response.data.onResponseReceivedActions[0].appendContinuationItemsAction
                    .continuationItems;
                const videos = common_1.mapFilter(playlistContents, "playlistVideoRenderer");
                newVideos.push(...videos.map((video) => new _1.VideoCompact({ client: this.client }).load(video)));
                this.continuation = common_1.getContinuationFromItems(playlistContents);
            }
            this.videos.push(...newVideos);
            return newVideos;
        });
    }
    /**
     * Get compact videos
     *
     * @param playlistContents raw object from youtubei
     */
    static parseVideos(playlistContents, playlist) {
        const videosRenderer = playlistContents.map((c) => c.playlistVideoRenderer);
        const videos = [];
        for (const videoRenderer of videosRenderer) {
            if (!videoRenderer)
                continue;
            const video = new _1.VideoCompact({ client: playlist.client }).load(videoRenderer);
            videos.push(video);
        }
        return videos;
    }
    static parseSideBarInfo(stats, parseInt) {
        let data;
        if ("runs" in stats)
            data = stats.runs.map((r) => r.text).join("");
        else
            data = stats.simpleText.replace(/[^0-9]/g, "");
        if (parseInt)
            data = +data.replace(/[^0-9]/g, "");
        return data;
    }
}
exports.default = Playlist;
