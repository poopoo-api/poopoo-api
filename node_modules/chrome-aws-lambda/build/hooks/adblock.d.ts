import { Page } from 'puppeteer-core';
declare const _default: (page: Page) => Promise<Page>;
/**
 * Enables ad blocking in page.
 * Requires `@cliqz/adblocker-puppeteer` package.
 *
 * @param page - Page to hook to.
 */
export = _default;
