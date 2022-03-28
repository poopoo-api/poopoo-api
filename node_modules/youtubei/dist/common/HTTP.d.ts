/// <reference types="node" />
import https from "https";
import { YoutubeRawData } from "./types";
import { Client } from "../classes/Client";
interface Options extends https.RequestOptions {
    params: Record<string, any>;
    data: any;
    headers: Record<string, string>;
}
export default class HTTP {
    private _httpClient;
    private _cookie;
    private _defaultRequestOptions;
    private _defaultClientOptions;
    constructor({ cookie, requestOptions, youtubeClientOptions, https: useHttps, }: Client.ClientOptions);
    /** Send GET request to Youtube */
    get(path: string, options: Partial<Options>): Promise<YoutubeRawData>;
    /** Send POST request to Youtube */
    post(path: string, options: Partial<Options>): Promise<YoutubeRawData>;
    /**
     * Send request to Youtube
     */
    private request;
    private static returnPromise;
}
export {};
