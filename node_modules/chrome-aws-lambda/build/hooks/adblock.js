"use strict";
const fs_1 = require("fs");
const https_1 = require("https");
let adblocker = null;
module.exports = async function (page) {
    if (adblocker == null) {
        const { fullLists, PuppeteerBlocker } = require('@cliqz/adblocker-puppeteer');
        adblocker = await PuppeteerBlocker.fromLists((url) => {
            return new Promise((resolve, reject) => {
                return https_1.get(url, (response) => {
                    if (response.statusCode !== 200) {
                        return reject(`Unexpected status code: ${response.statusCode}.`);
                    }
                    let result = '';
                    response.on('data', (chunk) => {
                        result += chunk;
                    });
                    response.on('end', () => {
                        return resolve({ text: () => result });
                    });
                });
            });
        }, fullLists, { enableCompression: false }, {
            path: '/tmp/adblock.bin',
            read: fs_1.promises.readFile,
            write: fs_1.promises.writeFile,
        });
    }
    return await adblocker.enableBlockingInPage(page).then(() => page);
};
//# sourceMappingURL=adblock.js.map