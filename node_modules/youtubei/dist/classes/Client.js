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
const constants_1 = require("../constants");
const common_1 = require("../common");
const _1 = require(".");
/** Youtube Client */
class Client {
    constructor(options = {}) {
        const fullOptions = Object.assign(Object.assign({ cookie: "", https: true, requestOptions: {} }, options), { youtubeClientOptions: Object.assign({ hl: "en", gl: "US" }, options.youtubeClientOptions) });
        this.http = new common_1.HTTP(fullOptions);
    }
    /**
     * Searches for videos / playlists / channels
     *
     * @param query The search query
     * @param searchOptions Search options
     *
     */
    search(query, searchOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = Object.assign({ type: "all", params: "" }, searchOptions);
            const result = new _1.SearchResult().load(this);
            yield result.init(query, options);
            return result;
        });
    }
    /**
     * Search for videos / playlists / channels and returns the first result
     *
     * @return Can be {@link VideoCompact} | {@link PlaylistCompact} | {@link Channel} | `undefined`
     */
    findOne(query, searchOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.search(query, searchOptions)).shift();
        });
    }
    /** Get playlist information and its videos by playlist id or URL */
    getPlaylist(playlistIdOrUrl) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const playlistId = common_1.getQueryParameter(playlistIdOrUrl, "list");
            if (playlistId.startsWith("RD")) {
                const response = yield this.http.post(`${constants_1.I_END_POINT}/next`, {
                    data: { playlistId },
                });
                if (response.data.error) {
                    return undefined;
                }
                return new _1.MixPlaylist({ client: this }).load(response.data);
            }
            const response = yield this.http.post(`${constants_1.I_END_POINT}/browse`, {
                data: { browseId: `VL${playlistId}` },
            });
            if (response.data.error || ((_c = (_b = (_a = response.data.alerts) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.alertRenderer) === null || _c === void 0 ? void 0 : _c.type) === "ERROR") {
                return undefined;
            }
            return new _1.Playlist({ client: this }).load(response.data);
        });
    }
    /** Get video information by video id or URL */
    getVideo(videoIdOrUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoId = common_1.getQueryParameter(videoIdOrUrl, "v");
            const response = yield this.http.get(`${constants_1.WATCH_END_POINT}`, {
                params: { v: videoId, pbj: "1" },
            });
            if (!response.data[3].response.contents)
                return undefined;
            return (!response.data[2].playerResponse.playabilityStatus.liveStreamability
                ? new _1.Video({ client: this }).load(response.data)
                : new _1.LiveVideo({ client: this }).load(response.data));
        });
    }
    /** Get channel information by channel id+ */
    getChannel(channelId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`${constants_1.I_END_POINT}/browse`, {
                data: { browseId: channelId },
            });
            if (response.data.error || ((_c = (_b = (_a = response.data.alerts) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.alertRenderer) === null || _c === void 0 ? void 0 : _c.type) === "ERROR") {
                return undefined;
            }
            return new _1.Channel({ client: this }).load(response.data);
        });
    }
}
exports.default = Client;
