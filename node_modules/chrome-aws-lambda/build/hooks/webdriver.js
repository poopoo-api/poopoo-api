"use strict";
module.exports = async function (page) {
    const handler = () => {
        Object.defineProperty(Object.getPrototypeOf(navigator), 'webdriver', {
            get: () => false,
        });
    };
    await page.evaluate(handler);
    await page.evaluateOnNewDocument(handler);
    return page;
};
//# sourceMappingURL=webdriver.js.map