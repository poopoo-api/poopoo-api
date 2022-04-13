"use strict";
module.exports = async function (page) {
    let result = await page.browser().userAgent();
    if (result.includes('Headless') === true) {
        await page.setUserAgent(result.replace('Headless', ''));
    }
    return page;
};
//# sourceMappingURL=agent.js.map