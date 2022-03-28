import { ChannelCompact, PlaylistCompact, VideoCompact, ClientTypes, Client } from ".";
export declare type SearchResultType<T> = T extends "video" | VideoCompact ? VideoCompact : T extends "channel" | ChannelCompact ? ChannelCompact : T extends "playlist" | PlaylistCompact ? PlaylistCompact : VideoCompact | ChannelCompact | PlaylistCompact;
/**
 * Represents search result, usually returned from `client.search();`.
 *
 * {@link SearchResult} is a subclass of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
 * with {@link SearchResult.next} method to navigate through pagination
 *
 * @example
 * ```ts
 * const searchResult = await youtube.search("Keyword");
 *
 * console.log(searchResult); // search result from first page
 *
 * let nextSearchResult = await searchResult.next();
 * console.log(nextSearchResult); // search result from second page
 *
 * nextSearchResult = await searchResult.next();
 * console.log(nextSearchResult); // search result from third page
 *
 * console.log(searchResult); // search result from first, second, and third page.
 * ```
 *
 * @noInheritDoc
 */
export default class SearchResult<T> extends Array<SearchResultType<T>> {
    /** The estimated search result count */
    estimatedResults: number;
    continuation?: string;
    private client;
    /** @hidden */
    constructor();
    /**
     * Load this instance
     *
     * @hidden
     */
    load(client: Client): SearchResult<T>;
    /**
     * Initialize data from search
     *
     * @param query Search query
     * @param options Search Options
     * @hidden
     */
    init(query: string, options: ClientTypes.SearchOptions): Promise<SearchResult<T>>;
    /**
     * Load next search data. Youtube returns inconsistent amount of search result, it usually varies from 18 to 20
     *
     * @example
     * ```js
     * const videos = await youtube.search("keyword", { type: "video" });
     * console.log(videos) // first 18-20 videos from the search result
     *
     * let newVideos = await videos.next();
     * console.log(newVideos) // 18-20 loaded videos
     * console.log(videos) // 36-40 first videos from the search result
     * ```
     *
     * @param count How many times to load the next data
     */
    next(count?: number): Promise<Array<SearchResultType<T>>>;
    /** Load videos data from youtube */
    private loadSearchResult;
    /**
     * Get type query value
     *
     * @param type Search type
     * @hidden
     */
    static getSearchTypeParam(type: "video" | "playlist" | "channel" | "all"): string;
}
