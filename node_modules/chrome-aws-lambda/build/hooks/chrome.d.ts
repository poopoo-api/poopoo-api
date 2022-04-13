import { Page } from 'puppeteer-core';
declare const _default: (page: Page) => Promise<Page>;
/**
 * Mocks the global `chrome` property to mimic headful Chrome.
 *
 * @param page - Page to hook to.
 */
export = _default;
