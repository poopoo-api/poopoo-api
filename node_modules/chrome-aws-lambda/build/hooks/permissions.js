"use strict";
module.exports = async function (page) {
    const handler = () => {
        let query = window.navigator.permissions.query;
        Permissions.prototype.query = function (parameters) {
            var _a;
            if (((_a = parameters === null || parameters === void 0 ? void 0 : parameters.name) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                return Promise.resolve({
                    onchange: null,
                    state: 'denied',
                });
            }
            return query(parameters);
        };
    };
    await page.evaluate(handler);
    await page.evaluateOnNewDocument(handler);
    return page;
};
//# sourceMappingURL=permissions.js.map