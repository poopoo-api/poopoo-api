"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const zlib_1 = __importDefault(require("zlib"));
const querystring_1 = __importDefault(require("querystring"));
const constants_1 = require("../constants");
class HTTP {
    constructor({ cookie, requestOptions, youtubeClientOptions, https: useHttps, }) {
        this._cookie = cookie;
        this._defaultRequestOptions = requestOptions;
        this._defaultClientOptions = youtubeClientOptions;
        this._httpClient = useHttps ? https_1.default : http_1.default;
    }
    /** Send GET request to Youtube */
    get(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({ method: "GET", path }, options);
            return yield this.request(options);
        });
    }
    /** Send POST request to Youtube */
    post(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign(Object.assign({ method: "POST", path }, options), { params: Object.assign({ key: constants_1.INNERTUBE_API_KEY }, options.params), data: Object.assign({ context: {
                        client: Object.assign({ clientName: "WEB", clientVersion: constants_1.INNERTUBE_CLIENT_VERSION }, this._defaultClientOptions),
                    } }, options.data) });
            return yield this.request(options);
        });
    }
    /**
     * Send request to Youtube
     */
    request(partialOptions) {
        return new Promise((resolve, reject) => {
            const options = Object.assign(Object.assign(Object.assign({ hostname: constants_1.BASE_URL, port: 443 }, partialOptions), this._defaultRequestOptions), { path: `${partialOptions.path}?${querystring_1.default.stringify(partialOptions.params)}`, headers: Object.assign({ "x-youtube-client-version": constants_1.INNERTUBE_CLIENT_VERSION, "x-youtube-client-name": "1", "content-type": "application/json", "accept-encoding": "gzip", cookie: this._cookie }, partialOptions.headers) });
            let body = options.data || "";
            if (options.data)
                body = JSON.stringify(body);
            const request = this._httpClient.request(options, (res) => {
                var _a, _b;
                if ((_a = res.headers["set-cookie"]) === null || _a === void 0 ? void 0 : _a.length)
                    this._cookie = `${this._cookie} ${(_b = res.headers["set-cookie"]) === null || _b === void 0 ? void 0 : _b.map((c) => c.split(";").shift()).join(";")}`;
                const gunzip = zlib_1.default.createGunzip();
                res.pipe(gunzip);
                const buffer = [];
                gunzip
                    .on("data", (data) => {
                    buffer.push(data.toString());
                })
                    .on("end", () => {
                    const data = JSON.parse(buffer.join("").toString());
                    HTTP.returnPromise({
                        status: res.statusCode,
                        headers: res.headers,
                        data,
                    }, resolve, reject);
                })
                    .on("error", reject);
            });
            request.on("error", reject);
            request.write(body);
            request.end();
        });
    }
    static returnPromise(response, resolve, reject) {
        if (response.status === 500)
            reject(response.data);
        resolve(response);
    }
}
exports.default = HTTP;
