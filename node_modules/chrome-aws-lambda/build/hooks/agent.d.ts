import { Page } from 'puppeteer-core';
declare const _default: (page: Page) => Promise<Page>;
/**
 * Removes `Headless` from the User Agent string, if present.
 *
 * @param page - Page to hook to.
 */
export = _default;
