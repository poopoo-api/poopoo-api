"use strict";
module.exports = function (page) {
    return page.emulateTimezone('UTC').then(() => page);
};
//# sourceMappingURL=timezone.js.map