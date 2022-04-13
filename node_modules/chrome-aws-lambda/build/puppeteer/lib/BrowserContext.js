"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Super = null;
try {
    Super = require('puppeteer/lib/cjs/puppeteer/common/Browser').BrowserContext;
}
catch (error) {
    Super = require('puppeteer-core/lib/cjs/puppeteer/common/Browser').BrowserContext;
}
Super.prototype.defaultPage = async function (...hooks) {
    let page = null;
    let pages = await this.pages();
    if (pages.length === 0) {
        pages = [await this.newPage()];
    }
    page = pages.shift();
    if (hooks != null && Array.isArray(hooks) === true) {
        for (let hook of hooks) {
            page = await hook(page);
        }
    }
    return page;
};
let newPage = Super.prototype.newPage;
Super.prototype.newPage = async function (...hooks) {
    let page = await newPage.apply(this, arguments);
    if (hooks != null && Array.isArray(hooks) === true) {
        for (let hook of hooks) {
            page = await hook(page);
        }
    }
    return page;
};
//# sourceMappingURL=BrowserContext.js.map