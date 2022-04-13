import { Page } from 'puppeteer-core';
declare const _default: (page: Page) => Promise<Page>;
/**
 * Removes global `webdriver` property to mimic headful Chrome.
 *
 * @param page - Page to hook to.
 */
export = _default;
