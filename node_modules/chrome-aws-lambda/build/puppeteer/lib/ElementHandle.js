"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Super = null;
try {
    Super = require('puppeteer/lib/cjs/puppeteer/common/JSHandle').ElementHandle;
}
catch (error) {
    Super = require('puppeteer-core/lib/cjs/puppeteer/common/JSHandle').ElementHandle;
}
Super.prototype.clear = function () {
    return this.click({ clickCount: 3 }).then(() => this.press('Backspace'));
};
Super.prototype.clickAndWaitForNavigation = function (options) {
    options = options !== null && options !== void 0 ? options : {
        waitUntil: [
            'load',
        ],
    };
    let promises = [
        this._page.waitForNavigation(options),
        this.click(),
    ];
    return Promise.all(promises).then((value) => value.shift());
};
Super.prototype.clickAndWaitForRequest = function (predicate, options) {
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
        this._page.waitForRequest((typeof predicate === 'function') ? predicate : callback, options),
        this.click(),
    ];
    return Promise.all(promises).then((value) => value.shift());
};
Super.prototype.clickAndWaitForResponse = function (predicate, options) {
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
        this._page.waitForResponse((typeof predicate === 'function') ? predicate : callback, options),
        this.click(),
    ];
    return Promise.all(promises).then((value) => value.shift());
};
Super.prototype.fillFormByLabel = function (data) {
    let callback = (node, data) => {
        if (node.nodeName.toLowerCase() !== 'form') {
            throw new Error('Element is not a <form> element.');
        }
        let result = {};
        for (let [key, value] of Object.entries(data)) {
            let selector = [
                `id(string(//label[normalize-space(.) = "${key}"]/@for))`,
                `//label[normalize-space(.) = "${key}"]//*[self::input or self::select or self::textarea]`,
            ].join(' | ');
            if (result.hasOwnProperty(key) !== true) {
                result[key] = [];
            }
            let element = null;
            let elements = [];
            let iterator = document.evaluate(selector, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            while ((element = iterator.iterateNext()) != null) {
                elements.push(element);
            }
            if (elements.length === 0) {
                throw new Error(`No elements match the selector '${selector}' for '${key}'.`);
            }
            let type = (elements[0].getAttribute('type') || elements[0].nodeName).toLowerCase();
            let values = (Array.isArray(value) === true) ? value : [value];
            if (type === 'file') {
                throw new Error(`Input element of type 'file' is not supported.`);
            }
            for (let element of elements) {
                try {
                    element.focus();
                    element.dispatchEvent(new Event('focus'));
                }
                catch (error) {
                }
                if (type === 'select') {
                    element.value = undefined;
                    for (let index of ['value', 'label']) {
                        if (result[key].length > 0) {
                            break;
                        }
                        for (let option of Array.from(element.options)) {
                            option.selected = values.includes(option[index]);
                            if (option.selected === true) {
                                result[key].push(option.value);
                                if (element.multiple !== true) {
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type === 'checkbox' || type === 'radio') {
                    element.checked = (value === true) || values.includes(element.value);
                    if (element.checked === true) {
                        result[key].push(element.value);
                    }
                }
                else if (typeof value === 'string') {
                    if (element.isContentEditable === true) {
                        result[key].push(element.textContent = value);
                    }
                    else {
                        result[key].push(element.value = value);
                    }
                }
                for (let trigger of ['input', 'change']) {
                    element.dispatchEvent(new Event(trigger, { 'bubbles': true }));
                }
                try {
                    element.blur();
                    element.dispatchEvent(new Event('blur'));
                }
                catch (error) {
                }
                if (type === 'checkbox' || type === 'radio') {
                    break;
                }
            }
        }
        return result;
    };
    return this.evaluate(callback, data);
};
Super.prototype.fillFormByName = function (data) {
    let callback = (node, data, heuristic = 'css') => {
        if (node.nodeName.toLowerCase() !== 'form') {
            throw new Error('Element is not a <form> element.');
        }
        let result = {};
        for (let [key, value] of Object.entries(data)) {
            let selector = `[name="${key}"]`;
            if (result.hasOwnProperty(key) !== true) {
                result[key] = [];
            }
            let elements = Array.from(node.querySelectorAll(selector));
            if (elements.length === 0) {
                throw new Error(`No elements match the selector '${selector}' for '${key}'.`);
            }
            let type = (elements[0].getAttribute('type') || elements[0].nodeName).toLowerCase();
            let values = (Array.isArray(value) === true) ? value : [value];
            if (type === 'file') {
                throw new Error(`Input element of type 'file' is not supported.`);
            }
            for (let element of elements) {
                try {
                    element.focus();
                    element.dispatchEvent(new Event('focus'));
                }
                catch (error) {
                }
                if (type === 'select') {
                    element.value = undefined;
                    for (let index of ['value', 'label']) {
                        if (result[key].length > 0) {
                            break;
                        }
                        for (let option of Array.from(element.options)) {
                            option.selected = values.includes(option[index]);
                            if (option.selected === true) {
                                result[key].push(option.value);
                                if (element.multiple !== true) {
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type === 'checkbox' || type === 'radio') {
                    element.checked = (value === true) || values.includes(element.value);
                    if (element.checked === true) {
                        result[key].push(element.value);
                    }
                }
                else if (typeof value === 'string') {
                    if (element.isContentEditable === true) {
                        result[key].push(element.textContent = value);
                    }
                    else {
                        result[key].push(element.value = value);
                    }
                }
                for (let trigger of ['input', 'change']) {
                    element.dispatchEvent(new Event(trigger, { 'bubbles': true }));
                }
                try {
                    element.blur();
                    element.dispatchEvent(new Event('blur'));
                }
                catch (error) {
                }
                if (type === 'checkbox' || type === 'radio') {
                    break;
                }
            }
        }
        return result;
    };
    return this.evaluate(callback, data);
};
Super.prototype.fillFormBySelector = function (data) {
    let callback = (node, data, heuristic = 'css') => {
        if (node.nodeName.toLowerCase() !== 'form') {
            throw new Error('Element is not a <form> element.');
        }
        let result = {};
        for (let [key, value] of Object.entries(data)) {
            let selector = key;
            if (result.hasOwnProperty(key) !== true) {
                result[key] = [];
            }
            let elements = Array.from(node.querySelectorAll(selector));
            if (elements.length === 0) {
                throw new Error(`No elements match the selector '${selector}' for '${key}'.`);
            }
            let type = (elements[0].getAttribute('type') || elements[0].nodeName).toLowerCase();
            let values = (Array.isArray(value) === true) ? value : [value];
            if (type === 'file') {
                throw new Error(`Input element of type 'file' is not supported.`);
            }
            for (let element of elements) {
                try {
                    element.focus();
                    element.dispatchEvent(new Event('focus'));
                }
                catch (error) {
                }
                if (type === 'select') {
                    element.value = undefined;
                    for (let index of ['value', 'label']) {
                        if (result[key].length > 0) {
                            break;
                        }
                        for (let option of Array.from(element.options)) {
                            option.selected = values.includes(option[index]);
                            if (option.selected === true) {
                                result[key].push(option.value);
                                if (element.multiple !== true) {
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type === 'checkbox' || type === 'radio') {
                    element.checked = (value === true) || values.includes(element.value);
                    if (element.checked === true) {
                        result[key].push(element.value);
                    }
                }
                else if (typeof value === 'string') {
                    if (element.isContentEditable === true) {
                        result[key].push(element.textContent = value);
                    }
                    else {
                        result[key].push(element.value = value);
                    }
                }
                for (let trigger of ['input', 'change']) {
                    element.dispatchEvent(new Event(trigger, { 'bubbles': true }));
                }
                try {
                    element.blur();
                    element.dispatchEvent(new Event('blur'));
                }
                catch (error) {
                }
                if (type === 'checkbox' || type === 'radio') {
                    break;
                }
            }
        }
        return result;
    };
    return this.evaluate(callback, data);
};
Super.prototype.fillFormByXPath = function (data) {
    let callback = (node, data) => {
        if (node.nodeName.toLowerCase() !== 'form') {
            throw new Error('Element is not a <form> element.');
        }
        let result = {};
        for (let [key, value] of Object.entries(data)) {
            let selector = key;
            if (result.hasOwnProperty(key) !== true) {
                result[key] = [];
            }
            let element = null;
            let elements = [];
            let iterator = document.evaluate(selector, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            while ((element = iterator.iterateNext()) != null) {
                elements.push(element);
            }
            if (elements.length === 0) {
                throw new Error(`No elements match the selector '${selector}' for '${key}'.`);
            }
            let type = (elements[0].getAttribute('type') || elements[0].nodeName).toLowerCase();
            let values = (Array.isArray(value) === true) ? value : [value];
            if (type === 'file') {
                throw new Error(`Input element of type 'file' is not supported.`);
            }
            for (let element of elements) {
                try {
                    element.focus();
                    element.dispatchEvent(new Event('focus'));
                }
                catch (error) {
                }
                if (type === 'select') {
                    element.value = undefined;
                    for (let index of ['value', 'label']) {
                        if (result[key].length > 0) {
                            break;
                        }
                        for (let option of Array.from(element.options)) {
                            option.selected = values.includes(option[index]);
                            if (option.selected === true) {
                                result[key].push(option.value);
                                if (element.multiple !== true) {
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type === 'checkbox' || type === 'radio') {
                    element.checked = (value === true) || values.includes(element.value);
                    if (element.checked === true) {
                        result[key].push(element.value);
                    }
                }
                else if (typeof value === 'string') {
                    if (element.isContentEditable === true) {
                        result[key].push(element.textContent = value);
                    }
                    else {
                        result[key].push(element.value = value);
                    }
                }
                for (let trigger of ['input', 'change']) {
                    element.dispatchEvent(new Event(trigger, { 'bubbles': true }));
                }
                try {
                    element.blur();
                    element.dispatchEvent(new Event('blur'));
                }
                catch (error) {
                }
                if (type === 'checkbox' || type === 'radio') {
                    break;
                }
            }
        }
        return result;
    };
    return this.evaluate(callback, data);
};
Super.prototype.getInnerHTML = function () {
    return this.evaluate((node) => {
        return node.innerHTML;
    });
};
Super.prototype.getInnerText = function () {
    return this.evaluate((node) => {
        return node.innerText;
    });
};
Super.prototype.number = function (decimal = '.', property = 'textContent') {
    let callback = (node, decimal, property) => {
        let data = node[property];
        if (typeof data === 'string') {
            decimal = decimal !== null && decimal !== void 0 ? decimal : '.';
            if (typeof decimal === 'string') {
                decimal = decimal.replace(/[.]/g, '\\$&');
            }
            let matches = data.match(/((?:[-+]|\b)[0-9]+(?:[ ,.'`´]*[0-9]+)*)\b/g);
            if (matches != null) {
                return matches.map((value) => parseFloat(value.replace(new RegExp(`[^-+0-9${decimal}]+`, 'g'), '').replace(decimal, '.')));
            }
        }
        return null;
    };
    return this.evaluate(callback, decimal, property);
};
Super.prototype.selectByLabel = function (...values) {
    for (let value of values) {
        console.assert(typeof value === 'string', `Values must be strings. Found value '${value}' of type '${typeof value}'.`);
    }
    let callback = (node, values) => {
        if (node.nodeName.toLowerCase() !== 'select') {
            throw new Error('Element is not a <select> element.');
        }
        node.value = undefined;
        let result = [];
        let options = Array.from(node.options);
        for (let option of options) {
            option.selected = values.includes(option.label);
            if (option.selected === true) {
                result.push(option.value);
                if (node.multiple !== true) {
                    break;
                }
            }
        }
        for (let trigger of ['input', 'change']) {
            node.dispatchEvent(new Event(trigger, { bubbles: true }));
        }
        return result;
    };
    return this.evaluate(callback, values);
};
Super.prototype.string = function (property = 'textContent') {
    let callback = (node, property) => {
        let data = node[property];
        if (typeof data === 'string') {
            let patterns = {
                ' ': /[\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]/g,
                '-': /[\u2013\u2014]/g,
                '...': /[\u2026]/g,
                '': /[\u200B\uFEFF]/g,
                '"': /[\u201C\u201D]/g,
                '<': /[\u00AB\u2039]/g,
                '>': /[\u00BB\u203A]/g,
                '|': /[\u007C\u00A6\u01C0\u2223\u2758]/g,
                "'": /[\u2018\u2019\u201A\u201B\u2032]/g,
            };
            for (let [key, value] of Object.entries(patterns)) {
                data = data.replace(value, key);
            }
            return data.replace(/[\s]+/g, ' ').trim();
        }
        return null;
    };
    return this.evaluate(callback, property);
};
//# sourceMappingURL=ElementHandle.js.map