/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/app/static/js/index.mjs":
/*!****************************************!*\
  !*** ./public/app/static/js/index.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar _require = require('express-validator'),\n  body = _require.body,\n  validationResult = _require.validationResult;\nvar PORT = 5001;\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var customRequestForm = document.querySelector(\"#custom-request form\");\n  var sessionForm = document.querySelector(\"#book-session form\");\n  var partnershipForm = document.querySelector(\"#partnership form\");\n  customRequestForm.addEventListener(\"submit\", function (event) {\n    event.preventDefault();\n    var formData = new FormData(customRequestForm);\n    var data = Object.fromEntries(formData.entries());\n    set(ref(database, \"customRequests/\" + Date.now()), data).then(function () {\n      alert(\"Custom request submitted successfully!\");\n      customRequestForm.reset();\n    })[\"catch\"](function (error) {\n      console.error(\"Error submitting custom request:\", error);\n    });\n  });\n  sessionForm.addEventListener(\"submit\", function (event) {\n    event.preventDefault();\n    var formData = new FormData(sessionForm);\n    var data = Object.fromEntries(formData.entries());\n    set(ref(database, \"sessions/\" + Date.now()), data).then(function () {\n      alert(\"Session booked successfully!\");\n      sessionForm.reset();\n    })[\"catch\"](function (error) {\n      console.error(\"Error booking session:\", error);\n    });\n  });\n  partnershipForm.addEventListener(\"submit\", function (event) {\n    event.preventDefault();\n    var formData = new FormData(partnershipForm);\n    var data = Object.fromEntries(formData.entries());\n    set(ref(database, \"partnerships/\" + Date.now()), data).then(function () {\n      alert(\"Partnership request submitted successfully!\");\n      partnershipForm.reset();\n    })[\"catch\"](function (error) {\n      console.error(\"Error submitting partnership request:\", error);\n    });\n  });\n});\n\n//# sourceURL=webpack://pdubbs-final/./public/app/static/js/index.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/app/static/js/index.mjs"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;