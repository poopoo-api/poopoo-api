"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Super = null;
try {
    Super = require('puppeteer/lib/cjs/puppeteer/common/FrameManager').Frame;
}
catch (error) {
    Super = require('puppeteer-core/lib/cjs/puppeteer/common/FrameManager').Frame;
}
Super.prototype.clear = function (selector) {
    return this.$(selector).then((element) => element === null || element === void 0 ? void 0 : element.clear());
};
Super.prototype.clickAndWaitForNavigation = function (selector, options) {
    options = options !== null && options !== void 0 ? options : {
        waitUntil: [
            'load',
        ],
    };
    let promises = [
        this.waitForNavigation(options),
        this.waitForSelector(selector, { timeout: options.timeout }).then((element) => element.click()),
    ];
    return Promise.all(promises).then((value) => value.shift());
};
Super.prototype.clickAndWaitForRequest = function (selector, predicate, options) {
    let callback = (request) => {
        let url = request.url();
        if (typeof predicate === 'string' && predicate.includes('*') === true) {
            predicate = new RegExp(predicate.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&').replace(/[*]+/g, '.*?'), 'g');
        }
        if (predicate instanceof RegExp) {
            return predicate.test(url);
        }
        return predicate === url;
    };
    let promises = [
        this._frameManager._page.waitForRequest((typeof predicate === 'function') ? predicate : callback, options),
        this.click(selector),
    ];
    return Promise.all(promises).then((value) => value.shift());
};
Super.prototype.clickAndWaitForResponse = function (selector, predicate, options) {
    let callback = (request) => {
        let url = request.url();
        if (typeof predicate === 'string' && predicate.includes('*') === true) {
            predicate = new RegExp(predicate.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&').replace(/[*]+/g, '.*?'), 'g');
        }
        if (predicate instanceof RegExp) {
            return predicate.test(url);
        }
        return predicate === url;
    };
    let promises = [
        this._frameManager._page.waitForResponse((typeof predicate === 'function') ? predicate : callback, options),
        this.click(selector),
    ];
    return Promise.all(promises).then((value) => value.shift());
};
Super.prototype.count = function (selector) {
    let callback = (selector) => {
        return document.querySelectorAll(selector).length;
    };
    return this.evaluate(callback, selector);
};
Super.prototype.exists = function (selector) {
    let callback = (selector) => {
        return document.querySelector(selector) !== null;
    };
    return this.evaluate(callback, selector);
};
Super.prototype.fillFormByLabel = function (selector, data) {
    return this.$(selector).then((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.fillFormByLabel(data)) !== null && _a !== void 0 ? _a : null; });
};
Super.prototype.fillFormByName = function (selector, data) {
    return this.$(selector).then((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.fillFormByName(data)) !== null && _a !== void 0 ? _a : null; });
};
Super.prototype.fillFormBySelector = function (selector, data) {
    return this.$(selector).then((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.fillFormBySelector(data)) !== null && _a !== void 0 ? _a : null; });
};
Super.prototype.fillFormByXPath = function (selector, data) {
    return this.$(selector).then((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.fillFormByXPath(data)) !== null && _a !== void 0 ? _a : null; });
};
Super.prototype.number = function (selector, decimal = '.', property = 'textContent') {
    return this.$(selector).then((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.number(decimal, property)) !== null && _a !== void 0 ? _a : null; });
};
Super.prototype.selectByLabel = function (selector, ...values) {
    return this.$(selector).then((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.selectByLabel(...values)) !== null && _a !== void 0 ? _a : null; });
};
Super.prototype.string = function (selector, property = 'textContent') {
    return this.$(selector).then((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.string(property)) !== null && _a !== void 0 ? _a : null; });
};
Super.prototype.waitForText = function (predicate, options) {
    if (predicate.includes(`"`) !== true) {
        predicate = `"${predicate}"`;
    }
    else if (predicate.includes(`'`) !== true) {
        predicate = `'${predicate}'`;
    }
    else {
        throw new Error('Predicate cannot include both single and double quotes.');
    }
    return this.waitForXPath(`//*[contains(concat(' ', normalize-space(text()), ' '), ${predicate})]`, {
        ...options,
        visible: true,
    });
};
Super.prototype.waitUntilVisible = function (selector, options) {
    return this.waitForSelector(selector, {
        ...options,
        visible: true,
    });
};
Super.prototype.waitWhileVisible = function (selector, options) {
    return this.waitForSelector(selector, {
        ...options,
        hidden: true,
    });
};
//# sourceMappingURL=FrameManager.js.map