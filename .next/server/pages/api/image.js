"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/image";
exports.ids = ["pages/api/image"];
exports.modules = {

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("chrome-aws-lambda");

/***/ }),

/***/ "(api)/./pages/api/image.js":
/*!****************************!*\
  !*** ./pages/api/image.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction isValidUrl(string) {\n    try {\n        new URL(string);\n    } catch (_) {\n        return false;\n    }\n    return true;\n}\nasync function handler(req, res) {\n    let url = req.query.url;\n    if (isValidUrl(url) !== true || url.includes(\"<\" || 0 || 0 || 0) || encodeURIComponent(url).includes(\"%3C\" || 0 || 0)) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({\n        error: \"provide valid url\",\n        example: \"/image?url=https://google.com\"\n    }, null, 4));\n    const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().puppeteer.launch({\n        executablePath: await (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().executablePath),\n        args: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().args),\n        headless: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().headless)\n    });\n    const page = await browser.newPage();\n    await page.goto(url, {\n        waitUntil: [\n            'networkidle0',\n            'domcontentloaded',\n            'load'\n        ]\n    });\n    const image = await page.screenshot({\n        type: 'jpeg'\n    });\n    await browser.close();\n    var img = Buffer.from(image, 'base64');\n    res.status(200).setHeader('Content-Type', 'image/jpg').end(img);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvaW1hZ2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdDO1NBRS9CQyxVQUFVLENBQUNDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLEdBQUcsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDQyxHQUFHLENBQUNELE1BQU07SUFDaEIsQ0FBQyxDQUFDLEtBQUssRUFBRUUsQ0FBQyxFQUFFLENBQUM7UUFDWCxNQUFNLENBQUMsS0FBSztJQUNkLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSTtBQUNiLENBQUM7QUFFWSxlQUFlQyxPQUFPLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFLENBQUM7SUFDL0MsR0FBRyxDQUFDQyxHQUFHLEdBQUdGLEdBQUcsQ0FBQ0csS0FBSyxDQUFDRCxHQUFHO0lBQ3ZCLEVBQUUsRUFBQ1AsVUFBVSxDQUFDTyxHQUFHLE1BQU0sSUFBSSxJQUFJQSxHQUFHLENBQUNFLFFBQVEsQ0FBQyxDQUFHLE1BQUksQ0FBRyxJQUFJLENBQVUsSUFBSSxDQUFXLEtBQUtDLGtCQUFrQixDQUFDSCxHQUFHLEVBQUVFLFFBQVEsQ0FBQyxDQUFLLFFBQUksQ0FBSyxJQUFJLENBQUssR0FBRyxNQUFNLENBQUNILEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLEdBQUcsRUFBRUMsU0FBUyxDQUFDLENBQWMsZUFBRSxDQUFrQixtQkFBRUMsSUFBSSxDQUFDQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDQztRQUFBQSxLQUFLLEVBQUUsQ0FBbUI7UUFBRUMsT0FBTyxFQUFFLENBQStCO0lBQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNULEtBQUssQ0FBQ0MsT0FBTyxHQUFHLEtBQUssQ0FBQ25CLHlFQUF5QixDQUFDLENBQUM7UUFDL0NzQixjQUFjLEVBQUUsS0FBSyxDQUFDdEIseUVBQXVCO1FBQzdDdUIsSUFBSSxFQUFFdkIsK0RBQWE7UUFDbkJ3QixRQUFRLEVBQUV4QixtRUFBaUI7SUFDN0IsQ0FBQztJQUVELEtBQUssQ0FBQ3lCLElBQUksR0FBRyxLQUFLLENBQUNOLE9BQU8sQ0FBQ08sT0FBTztJQUNsQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsSUFBSSxDQUFDbkIsR0FBRyxFQUFFLENBQUNvQjtRQUFBQSxTQUFTLEVBQUUsQ0FBQztZQUNoQyxDQUFjO1lBQUUsQ0FBa0I7WUFBRSxDQUFNO1FBQzVDLENBQUM7SUFBQSxDQUFDO0lBQ0YsS0FBSyxDQUFDQyxLQUFLLEdBQUcsS0FBSyxDQUFDSixJQUFJLENBQUNLLFVBQVUsQ0FBQyxDQUFDO1FBQ25DQyxJQUFJLEVBQUUsQ0FBTTtJQUNkLENBQUM7SUFFRCxLQUFLLENBQUNaLE9BQU8sQ0FBQ2EsS0FBSztJQUVuQixHQUFHLENBQUNDLEdBQUcsR0FBR0MsTUFBTSxDQUFDQyxJQUFJLENBQUNOLEtBQUssRUFBRSxDQUFRO0lBRXJDdEIsR0FBRyxDQUFDSyxNQUFNLENBQUMsR0FBRyxFQUFFQyxTQUFTLENBQUMsQ0FBYyxlQUFFLENBQVcsWUFBRXVCLEdBQUcsQ0FBQ0gsR0FBRztBQUNoRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dDEyLy4vcGFnZXMvYXBpL2ltYWdlLmpzPzAzODAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNocm9taXVtIGZyb20gJ2Nocm9tZS1hd3MtbGFtYmRhJztcblxuZnVuY3Rpb24gaXNWYWxpZFVybChzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgbmV3IFVSTChzdHJpbmcpO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVybiBmYWxzZTsgIFxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgbGV0IHVybCA9IHJlcS5xdWVyeS51cmxcbiAgaWYoaXNWYWxpZFVybCh1cmwpICE9PSB0cnVlIHx8IHVybC5pbmNsdWRlcyhcIjxcIiB8fCBcIj5cIiB8fCBcIjxzY3JpcHQ+XCIgfHwgXCI8L3NjcmlwdD5cIikgfHwgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkuaW5jbHVkZXMoXCIlM0NcIiB8fCBcIiUzRVwiIHx8IFwiJTIwXCIpKSByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKS5zZW5kKEpTT04uc3RyaW5naWZ5KHtlcnJvcjogXCJwcm92aWRlIHZhbGlkIHVybFwiLCBleGFtcGxlOiBcIi9pbWFnZT91cmw9aHR0cHM6Ly9nb29nbGUuY29tXCJ9LCBudWxsLCA0KSk7XG4gIGNvbnN0IGJyb3dzZXIgPSBhd2FpdCBjaHJvbWl1bS5wdXBwZXRlZXIubGF1bmNoKHtcbiAgICBleGVjdXRhYmxlUGF0aDogYXdhaXQgY2hyb21pdW0uZXhlY3V0YWJsZVBhdGgsXG4gICAgYXJnczogY2hyb21pdW0uYXJncyxcbiAgICBoZWFkbGVzczogY2hyb21pdW0uaGVhZGxlc3NcbiAgfSk7XG5cbiAgY29uc3QgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpO1xuICBhd2FpdCBwYWdlLmdvdG8odXJsLCB7d2FpdFVudGlsOiBbXG4gICAgJ25ldHdvcmtpZGxlMCcsICdkb21jb250ZW50bG9hZGVkJywgJ2xvYWQnXG4gIF19KTtcbiAgY29uc3QgaW1hZ2UgPSBhd2FpdCBwYWdlLnNjcmVlbnNob3Qoe1xuICAgIHR5cGU6ICdqcGVnJ1xuICB9KTtcblxuICBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG5cbiAgdmFyIGltZyA9IEJ1ZmZlci5mcm9tKGltYWdlLCAnYmFzZTY0Jyk7XG5cbiAgcmVzLnN0YXR1cygyMDApLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2ltYWdlL2pwZycpLmVuZChpbWcpO1xufSJdLCJuYW1lcyI6WyJjaHJvbWl1bSIsImlzVmFsaWRVcmwiLCJzdHJpbmciLCJVUkwiLCJfIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInVybCIsInF1ZXJ5IiwiaW5jbHVkZXMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzdGF0dXMiLCJzZXRIZWFkZXIiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwiZXhhbXBsZSIsImJyb3dzZXIiLCJwdXBwZXRlZXIiLCJsYXVuY2giLCJleGVjdXRhYmxlUGF0aCIsImFyZ3MiLCJoZWFkbGVzcyIsInBhZ2UiLCJuZXdQYWdlIiwiZ290byIsIndhaXRVbnRpbCIsImltYWdlIiwic2NyZWVuc2hvdCIsInR5cGUiLCJjbG9zZSIsImltZyIsIkJ1ZmZlciIsImZyb20iLCJlbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/image.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/image.js"));
module.exports = __webpack_exports__;

})();