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
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "(instrument)/./instrumentation.ts":
/*!****************************!*\
  !*** ./instrumentation.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\nasync function register() {\n    if (true) {\n        console.log(\"=\".repeat(60));\n        console.log(\"INSTRUMENTATION: Application Starting\");\n        console.log(\"=\".repeat(60));\n        console.log(`Timestamp: ${new Date().toISOString()}`);\n        console.log(`Node Environment: ${\"development\"}`);\n        console.log(`Database URL: ${process.env.DATABASE_URL ? \"Connected\" : \"Not configured\"}`);\n        console.log(\"=\".repeat(60));\n        const originalFetch = global.fetch;\n        global.fetch = async (...args)=>{\n            const startTime = Date.now();\n            const url = typeof args[0] === \"string\" ? args[0] : args[0]?.toString();\n            try {\n                const response = await originalFetch(...args);\n                const duration = Date.now() - startTime;\n                console.log(`[FETCH] ${url} - Status: ${response.status} - Duration: ${duration}ms`);\n                return response;\n            } catch (error) {\n                const duration = Date.now() - startTime;\n                console.error(`[FETCH ERROR] ${url} - Duration: ${duration}ms - Error: ${error}`);\n                throw error;\n            }\n        };\n        console.log(\"[INSTRUMENTATION] Global fetch monitoring enabled\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vaW5zdHJ1bWVudGF0aW9uLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxlQUFlQTtJQUNwQixJQUFJQyxJQUE2QixFQUFVO1FBQ3pDRyxRQUFRQyxHQUFHLENBQUMsSUFBSUMsTUFBTSxDQUFDO1FBQ3ZCRixRQUFRQyxHQUFHLENBQUM7UUFDWkQsUUFBUUMsR0FBRyxDQUFDLElBQUlDLE1BQU0sQ0FBQztRQUN2QkYsUUFBUUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUlFLE9BQU9DLFdBQVcsR0FBRyxDQUFDO1FBQ3BESixRQUFRQyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsRUFBRUosYUFBb0IsQ0FBQyxDQUFDO1FBQ3ZERyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUVKLFFBQVFDLEdBQUcsQ0FBQ1EsWUFBWSxHQUFHLGNBQWMsaUJBQWlCLENBQUM7UUFDeEZOLFFBQVFDLEdBQUcsQ0FBQyxJQUFJQyxNQUFNLENBQUM7UUFFdkIsTUFBTUssZ0JBQWdCQyxPQUFPQyxLQUFLO1FBQ2xDRCxPQUFPQyxLQUFLLEdBQUcsT0FBTyxHQUFHQztZQUN2QixNQUFNQyxZQUFZUixLQUFLUyxHQUFHO1lBQzFCLE1BQU1DLE1BQU0sT0FBT0gsSUFBSSxDQUFDLEVBQUUsS0FBSyxXQUFXQSxJQUFJLENBQUMsRUFBRSxHQUFHQSxJQUFJLENBQUMsRUFBRSxFQUFFSTtZQUU3RCxJQUFJO2dCQUNGLE1BQU1DLFdBQVcsTUFBTVIsaUJBQWlCRztnQkFDeEMsTUFBTU0sV0FBV2IsS0FBS1MsR0FBRyxLQUFLRDtnQkFFOUJYLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRVksSUFBSSxXQUFXLEVBQUVFLFNBQVNFLE1BQU0sQ0FBQyxhQUFhLEVBQUVELFNBQVMsRUFBRSxDQUFDO2dCQUVuRixPQUFPRDtZQUNULEVBQUUsT0FBT0csT0FBTztnQkFDZCxNQUFNRixXQUFXYixLQUFLUyxHQUFHLEtBQUtEO2dCQUM5QlgsUUFBUWtCLEtBQUssQ0FBQyxDQUFDLGNBQWMsRUFBRUwsSUFBSSxhQUFhLEVBQUVHLFNBQVMsWUFBWSxFQUFFRSxNQUFNLENBQUM7Z0JBQ2hGLE1BQU1BO1lBQ1I7UUFDRjtRQUVBbEIsUUFBUUMsR0FBRyxDQUFDO0lBQ2Q7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2VzY2FwZS1yb29tLWFzc2lnbm1lbnQvLi9pbnN0cnVtZW50YXRpb24udHM/ZDdkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XG4gIGlmIChwcm9jZXNzLmVudi5ORVhUX1JVTlRJTUUgPT09ICdub2RlanMnKSB7XG4gICAgY29uc29sZS5sb2coJz0nLnJlcGVhdCg2MCkpO1xuICAgIGNvbnNvbGUubG9nKCdJTlNUUlVNRU5UQVRJT046IEFwcGxpY2F0aW9uIFN0YXJ0aW5nJyk7XG4gICAgY29uc29sZS5sb2coJz0nLnJlcGVhdCg2MCkpO1xuICAgIGNvbnNvbGUubG9nKGBUaW1lc3RhbXA6ICR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfWApO1xuICAgIGNvbnNvbGUubG9nKGBOb2RlIEVudmlyb25tZW50OiAke3Byb2Nlc3MuZW52Lk5PREVfRU5WfWApO1xuICAgIGNvbnNvbGUubG9nKGBEYXRhYmFzZSBVUkw6ICR7cHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMID8gJ0Nvbm5lY3RlZCcgOiAnTm90IGNvbmZpZ3VyZWQnfWApO1xuICAgIGNvbnNvbGUubG9nKCc9Jy5yZXBlYXQoNjApKTtcblxuICAgIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSBnbG9iYWwuZmV0Y2g7XG4gICAgZ2xvYmFsLmZldGNoID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCB1cmwgPSB0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgPyBhcmdzWzBdIDogYXJnc1swXT8udG9TdHJpbmcoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcmlnaW5hbEZldGNoKC4uLmFyZ3MpO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFtGRVRDSF0gJHt1cmx9IC0gU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c30gLSBEdXJhdGlvbjogJHtkdXJhdGlvbn1tc2ApO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgICAgY29uc29sZS5lcnJvcihgW0ZFVENIIEVSUk9SXSAke3VybH0gLSBEdXJhdGlvbjogJHtkdXJhdGlvbn1tcyAtIEVycm9yOiAke2Vycm9yfWApO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJ1tJTlNUUlVNRU5UQVRJT05dIEdsb2JhbCBmZXRjaCBtb25pdG9yaW5nIGVuYWJsZWQnKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInJlZ2lzdGVyIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUlVOVElNRSIsImNvbnNvbGUiLCJsb2ciLCJyZXBlYXQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJOT0RFX0VOViIsIkRBVEFCQVNFX1VSTCIsIm9yaWdpbmFsRmV0Y2giLCJnbG9iYWwiLCJmZXRjaCIsImFyZ3MiLCJzdGFydFRpbWUiLCJub3ciLCJ1cmwiLCJ0b1N0cmluZyIsInJlc3BvbnNlIiwiZHVyYXRpb24iLCJzdGF0dXMiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(instrument)/./instrumentation.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(instrument)/./instrumentation.ts"));
module.exports = __webpack_exports__;

})();