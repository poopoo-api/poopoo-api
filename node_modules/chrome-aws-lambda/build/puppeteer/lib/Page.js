"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Super = null;
try {
    Super = require('puppeteer/lib/cjs/puppeteer/common/Page').Page;
}
catch (error) {
    Super = require('puppeteer-core/lib/cjs/puppeteer/common/Page').Page;
}
Super.prototype.block = function (predicates) {
    return this._client.send('Network.setBlockedURLs', {
        urls: predicates
    });
};
Super.prototype.clear = function (selector) {
    return this.mainFrame().clear(selector);
};
Super.prototype.clickAndWaitForNavigation = function (selector, options) {
    return this.mainFrame().clickAndWaitForNavigation(selector, options);
};
Super.prototype.clickAndWaitForRequest = function (selector, predicate, options) {
    return this.mainFrame().clickAndWaitForRequest(selector, predicate, options);
};
Super.prototype.clickAndWaitForResponse = function (selector, predicate, options) {
    return this.mainFrame().clickAndWaitForResponse(selector, predicate, options);
};
Super.prototype.count = function (selector) {
    return this.mainFrame().count(selector);
};
Super.prototype.exists = function (selector) {
    return this.mainFrame().exists(selector);
};
Super.prototype.fillFormByLabel = function (selector, data) {
    return this.mainFrame().fillFormByLabel(selector, data);
};
Super.prototype.fillFormByName = function (selector, data) {
    return this.mainFrame().fillFormByName(selector, data);
};
Super.prototype.fillFormBySelector = function (selector, data) {
    return this.mainFrame().fillFormBySelector(selector, data);
};
Super.prototype.fillFormByXPath = function (selector, data) {
    return this.mainFrame().fillFormByXPath(selector, data);
};
Super.prototype.number = function (selector, decimal = '.', property = 'textContent') {
    return this.mainFrame().number(selector, decimal, property);
};
Super.prototype.selectByLabel = function (selector, ...values) {
    return this.mainFrame().selectByLabel(selector, ...values);
};
Super.prototype.string = function (selector, property = 'textContent') {
    return this.mainFrame().string(selector, property);
};
Super.prototype.waitForInflightRequests = function (requests = 0, alpha = 500, omega = 500, options) {
    let result = {
        reject: null,
        resolve: null,
    };
    let timeout;
    let timeoutAlpha;
    let timeoutOmega;
    if (options == null) {
        options = {
            timeout: this._timeoutSettings.navigationTimeout(),
        };
    }
    let inflight = 0;
    const check = () => {
        if (inflight <= Math.max(0, requests)) {
            if (timeoutOmega !== undefined) {
                clearTimeout(timeoutOmega);
            }
            timeoutOmega = setTimeout(onTimeoutOmega, omega);
        }
    };
    const clear = () => {
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
        if (timeoutAlpha !== undefined) {
            clearTimeout(timeoutAlpha);
        }
        if (timeoutOmega !== undefined) {
            clearTimeout(timeoutOmega);
        }
        this.off('request', onRequestStarted);
        this.off('requestfailed', onRequestSettled);
        this.off('requestfinished', onRequestSettled);
    };
    function onRequestStarted() {
        if (timeoutAlpha !== undefined) {
            clearTimeout(timeoutAlpha);
        }
        if (timeoutOmega !== undefined) {
            clearTimeout(timeoutOmega);
        }
        ++inflight;
    }
    function onRequestSettled() {
        if (inflight > 0) {
            --inflight;
        }
        check();
    }
    function onTimeout() {
        clear();
        return result.reject(new Error(`Navigation timeout of ${options.timeout} ms exceeded.`));
    }
    function onTimeoutAlpha() {
        clear();
        return result.resolve();
    }
    function onTimeoutOmega() {
        clear();
        return result.resolve();
    }
    this.on('request', onRequestStarted);
    this.on('requestfailed', onRequestSettled);
    this.on('requestfinished', onRequestSettled);
    if (options.timeout !== 0) {
        timeout = setTimeout(onTimeout, options.timeout);
    }
    timeoutAlpha = setTimeout(onTimeoutAlpha, alpha);
    return new Promise((resolve, reject) => {
        result.reject = reject;
        result.resolve = resolve;
    });
};
Super.prototype.waitForText = function (predicate, options) {
    return this.mainFrame().waitForText(predicate, options);
};
Super.prototype.waitUntilVisible = function (selector, options) {
    return this.mainFrame().waitUntilVisible(selector, options);
};
Super.prototype.waitWhileVisible = function (selector, options) {
    return this.mainFrame().waitWhileVisible(selector, options);
};
Super.prototype.withTracing = function (options, callback) {
    return this.tracing.start(options).then(async () => {
        if (typeof callback === 'function') {
            await callback(this);
        }
        return await this.tracing.stop();
    });
};
//# sourceMappingURL=Page.js.map