"use strict";
module.exports = async function (page) {
    const handler = () => {
        Object.defineProperty(Object.getPrototypeOf(navigator), 'language', {
            get: () => 'en-US',
        });
        Object.defineProperty(Object.getPrototypeOf(navigator), 'languages', {
            get: () => ['en-US', 'en'],
        });
    };
    await page.evaluate(handler);
    await page.evaluateOnNewDocument(handler);
    return page;
};
//# sourceMappingURL=languages.js.map