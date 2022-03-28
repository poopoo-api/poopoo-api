"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/** Represents a MixPlaylist, usually returned from `client.getPlaylist()` */
class MixPlaylist extends _1.Base {
    /** @hidden */
    constructor(playlist = {}) {
        super();
        /** How many viewers does this playlist have */
        this.videos = [];
        Object.assign(this, playlist);
    }
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data) {
        const twoColumnWatchNextResults = data.contents.twoColumnWatchNextResults;
        const playlist = twoColumnWatchNextResults.playlist.playlist;
        this.title = playlist.titleText.simpleText;
        this.id = playlist.playlistId;
        this.videoCount = playlist.contents.length;
        this.videos = MixPlaylist.parseVideos(playlist.contents, this);
        return this;
    }
    /**
     * Get compact videos
     *
     * @param MixplaylistContents raw object from youtubei
     */
    static parseVideos(MixplaylistContents, playlist) {
        const videosRenderer = MixplaylistContents.map((c) => c.playlistPanelVideoRenderer);
        const videos = [];
        for (const videoRenderer of videosRenderer) {
            if (!videoRenderer)
                continue;
            const video = new _1.VideoCompact({ client: playlist.client }).load(videoRenderer);
            videos.push(video);
        }
        return videos;
    }
}
exports.default = MixPlaylist;
