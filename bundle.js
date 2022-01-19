/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* This is an example of how to import a partial scss file*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\nnav {\n  display: flex;\n  justify-content: space-around;\n  position: sticky;\n}\n\n.nav-buttons {\n  display: flex;\n  justify-content: space-around;\n  padding: 0.5em 3em 0.5em 3em;\n  gap: 30px;\n}\n\n#logo {\n  display: flex;\n  height: 12vh;\n  width: 12vw;\n}\n\n#username,\n#password,\n#submit {\n  background: radial-gradient(circle, #f7eee9 0%, #f3cffb 100%);\n  height: 5vh;\n  width: 10vw;\n  border-radius: 4px;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  margin-top: 2em;\n}\n\n.login {\n  display: flex;\n  justify-content: space-evenly;\n  flex-direction: column;\n  margin: 2em;\n}\n\n#userInfo {\n  display: flex;\n  justify-content: flex-start;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 2em;\n  margin-right: 2em;\n  overflow: auto;\n}\n\n#welcomePage {\n  display: flex;\n  justify-content: flex-start;\n  margin-left: 2em;\n}\n\n#roomsImg {\n  height: 30vh;\n  width: 30vw;\n}\n\ntable,\nth,\ntd,\n#roomDisplay {\n  margin-top: 2em;\n  border: 1px black;\n  border-style: ridge;\n  overflow: auto;\n}\n\nth,\ntd,\n#roomDisplay {\n  padding: 0.5em;\n  background: radial-gradient(circle, #f7eee9 0%, #f3cffb 100%);\n}\n\n#totalSpent {\n  margin-top: 2em;\n}\n\n#checkIn,\n#roomType,\n.log-out-btn,\n.book-button,\n#mainPageBtn {\n  background: radial-gradient(circle, #f7eee9 0%, #f3cffb 100%);\n  height: 5vh;\n  width: 10vw;\n  border-radius: 4px;\n}\n\n.book-button {\n  background: radial-gradient(circle, #fbf0e9 0%, #f9b794 100%);\n}\n\n#rooms,\n#welcomePage {\n  display: flex;\n  justify-content: flex-start;\n  flex-direction: column;\n  align-items: center;\n  overflow: auto;\n}\n\n#roomDisplay {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: flex-start;\n  padding-left: 5em;\n  height: 15vh;\n  width: 20vw;\n}\n\nhtml {\n  height: 100%;\n  width: 100%;\n  font-family: \"Arvo\", serif;\n}\n\n.hidden {\n  display: none !important;\n}\n\nbody {\n  background: radial-gradient(circle, #fbf0e9 0%, #f9b794 100%);\n}\n\n.main {\n  display: flex;\n  justify-content: center;\n  margin-top: 7em;\n}\n\n#mainScreen {\n  display: flex;\n  justify-content: space-evenly;\n  flex-direction: row;\n  height: 80vh;\n  width: 80vw;\n  overflow: auto;\n}\n\n#error {\n  color: red;\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss","webpack://./src/css/_reset.scss","webpack://./src/css/_navbar.scss","webpack://./src/css/_mixins.scss","webpack://./src/css/_login.scss","webpack://./src/css/_variables.scss","webpack://./src/css/_initial-page.scss","webpack://./src/css/_buttons.scss","webpack://./src/css/_booking.scss"],"names":[],"mappings":"AAAA,2DAAA;ACAA;;;;;;;;;;;;;EAaC,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ADED;;ACAA,gDAAA;AACA;;EAEC,cAAA;ADGD;;ACDA;EACC,cAAA;ADID;;ACFA;EACC,gBAAA;ADKD;;ACHA;EACC,YAAA;ADMD;;ACJA;;EAEC,WAAA;EACA,aAAA;ADOD;;ACLA;EACC,yBAAA;EACA,iBAAA;ADQD;;AEjDA;ECCI,aAAA;EACA,6BDDe;EACjB,gBAAA;AFqDF;;AElDA;ECJI,aAAA;EACA,6BDIe;EACjB,4BAAA;EACA,SAAA;AFsDF;;AEnDA;EACE,aAAA;ECNE,YDOY;ECNZ,WDMkB;AFuDtB;;AIpEA;;;EAGE,6DCEqB;EFCnB,WCFY;EDGZ,WCHiB;EACnB,kBAAA;AJwEF;;AIrEA;EACE,aAAA;EACA,sBAAA;EACA,eCRQ;ALgFV;;AIrEA;EDbI,aAAA;EACA,6BCae;EACjB,sBAAA;EACA,WCdQ;ALuFV;;AM1FA;EHCI,aAAA;EACA,2BGDe;EACjB,sBAAA;EACA,mBAAA;EACA,eDDQ;ECER,iBDFQ;ECGR,cDCO;AL6FT;;AM3FA;EHRI,aAAA;EACA,2BGQe;EACjB,gBAAA;AN+FF;;AM5FA;EHRI,YGSY;EHRZ,WGQkB;ANgGtB;;AM7FA;;;;EAIE,eDnBQ;ECoBR,iBAAA;EACA,mBAAA;EACA,cDlBO;ALkHT;;AM7FA;;;EAGE,cAAA;EACA,6DD3BqB;AL2HvB;;AM7FA;EACE,eDjCQ;ALiIV;;AOpIA;;;;;EAKE,6DAAA;EJCE,WAAA;EACA,WIDiB;EACnB,kBAAA;APwIF;;AOrIA;EACE,6DFXmB;ALmJrB;;AQnJA;;ELCI,aAAA;EACA,2BAAA;EKCF,sBAAA;EACA,mBAAA;EACA,cHEO;ALqJT;;AQpJA;ELPI,aAAA;EACA,uBKOe;EACjB,sBAAA;EACA,uBAAA;EACA,iBAAA;ELNE,YKOY;ELNZ,WKMkB;ARyJtB;;AA5JA;EGJI,YHKY;EGJZ,WHIkB;EACpB,0BAAA;AAgKF;;AA7JA;EACE,wBAAA;AAgKF;;AA7JA;EACE,6DKpBmB;ALoLrB;;AA7JA;EGtBI,aAAA;EACA,uBHsBe;EACjB,eAAA;AAiKF;;AA9JA;EG3BI,aAAA;EACA,6BH2Be;EACjB,mBAAA;EGxBE,YHyBY;EGxBZ,WHwBkB;EACpB,cKzBO;AL4LT;;AAhKA;EACE,UAAA;AAmKF","sourcesContent":["/* This is an example of how to import a partial scss file*/\n@import \"_variables\";\n@import \"_reset\";\n@import \"_mixins\";\n@import \"_navbar\";\n@import \"_login\";\n@import \"initial-page\";\n@import \"buttons\";\n@import \"booking\";\n\nhtml{\n  @include size(100%, 100%);\n  font-family: 'Arvo', serif;\n}\n\n.hidden {\n  display: none !important;\n}\n\nbody {\n  background: $primary-background;\n}\n\n.main{\n  @include flexBox(center);\n  margin-top: 7em;\n}\n\n#mainScreen {\n  @include flexBox(space-evenly);\n  flex-direction: row;\n  @include size(80vh, 80vw);\n  overflow: $scroll;\n}\n\n#error {\n  color: red;\n}","html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}","nav {\n  @include flexBox(space-around);\n  position: sticky;\n}\n\n.nav-buttons {\n  @include flexBox(space-around);\n  padding: 0.5em 3em 0.5em 3em;\n  gap: 30px;\n}\n\n#logo {\n  display: flex;\n  @include size(12vh, 12vw);\n}","@mixin flexBox($content) {\n    display: flex;\n    justify-content: $content;\n}\n\n@mixin size($h, $w) {\n    height: $h;\n    width: $w;\n}","#username, \n#password,\n#submit {\n  background: $secondary-background;\n  @include size(5vh, 10vw);\n  border-radius: 4px;\n}\n\n.login-form{\n  display: flex;\n  flex-direction: column;\n  margin-top: $emSpace;\n}\n\n.login{\n  @include flexBox(space-evenly);\n  flex-direction: column;\n  margin: $emSpace;\n}","$primary-background: radial-gradient(circle, rgb(251, 240, 233) 0%, rgb(249, 183, 148) 100%);\n;\n\n$emSpace: 2em;\n\n$secondary-background: radial-gradient(circle, rgb(247, 238, 233) 0%, rgb(243, 207, 251) 100%);\n\n$scroll: auto;","#userInfo {\n  @include flexBox(flex-start);\n  flex-direction: column;\n  align-items: center;\n  margin-top: $emSpace;\n  margin-right: $emSpace;\n  overflow: $scroll;\n}\n\n#welcomePage{\n  @include flexBox(flex-start);\n  margin-left: 2em;\n}\n\n#roomsImg {\n  @include size(30vh, 30vw);\n}\n\ntable,\nth,\ntd,\n#roomDisplay {\n  margin-top: $emSpace;\n  border: 1px black;\n  border-style: ridge;\n  overflow: $scroll;\n}\n\nth,\ntd,\n#roomDisplay {\n  padding: .5em;\n  background: $secondary-background;\n}\n\n#totalSpent {\n  margin-top: $emSpace;\n}","#checkIn,\n#roomType,\n.log-out-btn,\n.book-button,\n#mainPageBtn {\n  background: $secondary-background;\n  @include size(5vh, 10vw);\n  border-radius: 4px;\n}\n\n.book-button {\n  background: $primary-background;\n}","#rooms,\n#welcomePage {\n  @include flexBox(flex-start);\n  flex-direction: column;\n  align-items: center;\n  overflow: $scroll;\n}\n\n#roomDisplay {\n  @include flexBox(center);\n  flex-direction: column;\n  align-items: flex-start;\n  padding-left: 5em;\n  @include size(15vh, 20vw);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ids = [
  "welcome",
  "pastStay",
  "totalSpent",
  "futureStay",
  "mainScreen",
  "rooms",
  "welcomePage",
];
const [welcomeMsg, pastStay, totalAmt, futureStay, mainDisplay, allRoomsSection, mainImg] = ids.map(id => document.getElementById(id));
const loginPage = document.querySelector(".login")
const nav = document.querySelector(".nav-buttons")
const logOutBtn = document.querySelector(".log-out-btn")

const domUpdates = {
  hide(elements) {
    elements.map(element => element.classList.add('hidden'))
  },

  show(elements) {
    elements.map((element) => element.classList.remove('hidden'));
  },

  displayCurrentUserInfo(user, rooms) {
    this.hide([loginPage, allRoomsSection]);
    this.show([mainDisplay, nav, logOutBtn, mainImg]);
    welcomeMsg.innerText = '';
    pastStay.innerHTML = '';
    totalAmt.innerText = '';
    futureStay.innerHTML = '';
    user.pastBookings.map((booking) => {
      const room = rooms.find(room => {
        if (room.number === booking.roomNumber) {
          return room.roomType;
        }
      });
      welcomeMsg.innerText = `
                Welcome back ${user.name}
            `;
      pastStay.innerHTML += `
             <tr>
              <td id="pastStayDate">${booking.date}</td>
              <td id="pastStayRoom">${booking.roomNumber} #</td>
              <td id="pastStayType">${room.roomType}</td>
            </tr>
            `;

      totalAmt.innerText = `You have spent $${user.totalSpent.toFixed(2)} on past visits`;
    });
    user.futureBookings.map((booking) => {
      const room = rooms.find((room) => {
        if (room.number === booking.roomNumber) {
          return room.roomType;
        }
      });
      futureStay.innerHTML += `
             <tr>
              <td id="futureStayDate">${booking.date}</td>
              <td id="futureStayRoom">${booking.roomNumber} #</td>
              <td id="futureStayType">${room.roomType}</td>
            </tr>
            `;
    });
  },

  displayAvailableRooms(rooms) {
    this.hide([mainImg]);
    this.show([allRoomsSection]);
    allRoomsSection.innerHTML = '';
    if (!rooms.length) {
      allRoomsSection.innerHTML = `
            <h1 id="noRooms">We are so sorry. There are no available rooms for the dates you suggested. Please try another date</h1>`
    } else {
      rooms.forEach((room) => {
        let beds;
        if (room.numBeds > 1) {
          beds = 'beds'
        } else {
          beds = "bed";
        }  
        allRoomsSection.innerHTML += `
            <article id="roomDisplay">
                <h1>SELECT A ROOM ABOVE TO BOOK</h1>
                <li class="type-of-room">${room.roomType.toUpperCase()}</li>
                <li id="roomNum">Room number ${room.number}.</li>
                <li id="bidet">Has a bidet? ${room.bidet}.</li>
                <li id="numBeds">Has ${room.numBeds} ${room.bedSize} ${beds}.</li>
                <li id="cost">Price per night is ${room.costPerNight}.</li>
            </article>`;
      });
    }
  },

  filterRooms(filter, rooms) {
    allRoomsSection.innerHTML = '';
    if (filter === 'Select Room Type') {
      this.displayAvailableRooms(rooms)
    } else {
      const filtered = rooms.filter(room => room.roomType === filter)
      if (filtered.length > 0) {
        filtered.forEach(room => {
          allRoomsSection.innerHTML += `
                        <article id="roomDisplay">
                        <h1 class="type-of-room">${room.roomType.toUpperCase()}</h1>
                         <li id="roomNum">Room number ${room.number}.</li>
                        <li id="bidet">Has a bidet? ${room.bidet}.</li>
                        <li id="numBeds">Has ${room.numBeds} beds.</li>
                        <li id="cost">Price per night is ${room.costPerNight}.</li>
                        <button class="book-button" id=${room.number}>Book</button>
                        </article>`;
        });
      } else {
        allRoomsSection.innerHTML = `
                <h1 id="noRooms">We are so sorry. There are no available ${filter}'s. Please try another room type.</h1>`
      }
    }
  },
  
  popUpWindow(data) {
    allRoomsSection.innerHTML = `
        <h1 id="message">${data.message}</h1>
        <h3>We look forward to seeing you on ${data.newBooking.date}</h3>
        <h3>Here is your room number: 
        ${data.newBooking.roomNumber}</h3>
        <button id="mainPageBtn">Home</button>
        `
  },

  displayErr(name, message) {
    const page = document.getElementById(name)
    page.innerHTML = `
    <h1 id="message">${message}. Please try again.</h1>
    `;
  }

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userData": () => (/* binding */ userData),
/* harmony export */   "roomsData": () => (/* binding */ roomsData),
/* harmony export */   "allBookingsData": () => (/* binding */ allBookingsData),
/* harmony export */   "updateBookings": () => (/* binding */ updateBookings),
/* harmony export */   "getSingleUser": () => (/* binding */ getSingleUser)
/* harmony export */ });
const userData = () => {
  return fetch("http://localhost:3001/api/v1/customers")
    .then((response) => response.json())
};

const roomsData = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then((response) => response.json())
};

const allBookingsData = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then((response) => response.json())
};

const updateBookings = (booking) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
};

const getSingleUser = (id) => {
  const url = `http://localhost:3001/api/v1/customers/${id}`;
  return fetch(url)
    .then((response) => response.json())
}



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(room) {
    this.roomNumber = room.number || 0;
    this.type = room.roomType || '';
    this.hasBidet = room.bidet || false;
    this.bedSize = room.bedSize || '';
    this.numBeds = room.numBeds || 0;
    this.costPerNight = room.costPerNight || 0;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class User {
  constructor(user) {
    this.name = user.name || 'new user';
    this.id = user.id || Date.now();
    this.allBookings = [];
    this.pastBookings = [];
    this.futureBookings = [];
    this.totalSpent = 0;
  }

  getAllBookings(bookings) {
    bookings.forEach(booking => booking.userID === this.id ? this.allBookings.push(booking) : booking);
    this.getPastAndFutureBookings();
  }

  getPastAndFutureBookings() {
    this.futureBookings = [];
    this.pastBookings = [];
    this.allBookings.forEach(booking => {
      let todayDate = new Date()
      let dateOne = new Date(booking.date);
      if (dateOne < todayDate && booking.userID === this.id) {
        this.pastBookings.push(booking)
      } else if (booking.userID === this.id && dateOne > todayDate) {
        this.futureBookings.push(booking);
      }
    });
    this.sortBookings()
  }

  getTotalSpent(rooms) {
    rooms.forEach(room => {
      this.pastBookings.forEach((booking) =>
        booking.roomNumber === room.number
          ? (this.totalSpent += room.costPerNight)
          : booking
      );
    });
    return this.totalSpent.toFixed(2)
  }

  sortBookings() {
    this.futureBookings = this.futureBookings.sort((bookingA, bookingB) => {
      return new Date(bookingA.date) - new Date(bookingB.date)
    });

    this.pastBookings = this.pastBookings.sort((bookingA, bookingB) => {
      return new Date(bookingB.date) < new Date(bookingA.date)
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Bookings {
  constructor(booking) {
    this.id = booking.id || '';
    this.userId = booking.userId || 0;
    this.date = booking.date || '';
    this.roomNumber = booking.roomNumber || 0;
    this.roomServiceCharges = booking.roomServiceCharges || [];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bookings);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/image-from-rawpixel-id-3018024-png.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/kisspng-m-gustave-hotel-lobby-boy-5-lobby-boy-2-zero-bar-propaganda-5addf024831701.451758941524494372537.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


class Hotel {
  constructor(rooms, bookings, user) {
    this.rooms = rooms || [];
    this.bookings = bookings || [];
    this.availableRooms = [];
    this.user = user || '';
  }

  getAvailableRooms(date) {
    this.availableRooms = [];
    const currentBookings = this.bookings.flat(1).filter(booking => {
      let requestedDate = date.split('-').join('')
      let bookingDate = booking.date.split('/').join('');
      return requestedDate === bookingDate
    });
    const available = this.rooms.flat(1).filter(room => {
      const num = currentBookings.map(book => book.roomNumber)
      return !num.includes(room.number)
    });
    this.availableRooms.push(available);
    _domUpdates__WEBPACK_IMPORTED_MODULE_0__.default.displayAvailableRooms(this.availableRooms.flat(1));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _Classes_Room__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _Classes_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _Classes_Bookings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_image_from_rawpixel_id_3018024_png_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _images_kisspng_m_gustave_hotel_lobby_boy_5_lobby_boy_2_zero_bar_propaganda_5addf024831701_451758941524494372537_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _Classes_Hotel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);











// DOM elements
const ids = [
  "checkIn",
  "roomType",
  "rooms",
  "submit",
  "logOutBtn",
  "mainScreen",
  "welcomePage",
];
const [checkIn, roomFilter, allRoomsSection, loginBtn, logOutBtn, mainDisplay, mainImg] = ids.map(id => document.getElementById(id));

document.getElementById('checkIn').valueAsDate = new Date();
const today = new Date().toISOString().split('T')[0];

document.getElementById('checkIn').setAttribute('min', today);
const roomSelector = document.querySelectorAll('.filter');
const loginPage = document.querySelector(".login");
const nav = document.querySelector(".nav-buttons");


// Global Variables
let currentUser;
let allRooms = [];
let allBookings = [];
let currentHotel;

// Functions
const confirmBooking = (event, rooms, currentUser) => {
  let today = new Date(checkIn.value).toISOString().split("T")[0];
  today = today.split("-").join("/");
  const roomBook = rooms.find(room => event.target.id == room.number);
  const booking = {
    "userID": currentUser.id,
    "date": today,
    "roomNumber": roomBook.number
  }
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.updateBookings)(booking)
    .then((data) => _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.popUpWindow(data))
    .catch((err) => _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.displayErr('rooms', err.message));
}

const booking = (date) => {
  currentHotel.getAvailableRooms(date);
};

const updateData = (id) => {
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getSingleUser)(id), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.roomsData)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.allBookingsData)()])
    .then((data) => {
      console.log(data, 'data')
      startPage(data, id);
    })
    .catch(
      (err) => _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.displayErr("error", err.message));
}

const startPage = (data) => {
  currentUser = "";
  allRooms = [];
  allBookings = [];
  currentHotel = "";
  allBookings.push(data[2].bookings);
  allRooms.push(data[1].rooms);
  currentUser = new _Classes_User__WEBPACK_IMPORTED_MODULE_4__.default(data[0]);
  allBookings.forEach((booking) => currentUser.getAllBookings(booking));
  allBookings.map((booking) => new _Classes_Bookings__WEBPACK_IMPORTED_MODULE_5__.default(booking));
  allRooms.map((room) => new _Classes_Room__WEBPACK_IMPORTED_MODULE_3__.default(room));
  currentUser.getTotalSpent(allRooms.flat(1));
  currentHotel = new _Classes_Hotel__WEBPACK_IMPORTED_MODULE_9__.default(allRooms, allBookings, currentUser);
  _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.displayCurrentUserInfo(currentUser, allRooms.flat(1));
}

const logOut = () => {
  currentUser = '';
  allRooms = [];
  allBookings = [];
  currentHotel = '';
  _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.show([loginPage, allRoomsSection]);
  _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.hide([mainDisplay, nav, logOutBtn, mainImg]);
  document.getElementById("username").value = '';
  document.getElementById("password").value = '';
}

// Event Listeners
window.addEventListener('load', function (event) {
  event.preventDefault()
  _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.hide([
    document.querySelector(".nav-buttons"),
    document.querySelector(".log-out-btn"),
  ]);
})

loginBtn.addEventListener('click', function (event) {
  event.preventDefault()
  const username = document.getElementById('username');
  const password = document.getElementById('password')

  if (username.value.slice(0, 8) === 'customer' && password.value === 'overlook2021') {
    if (username.value.split('').length > 8) {
      const split = username.value.split('').length - 8;
      let id = username.value.split("").slice(-split);
      id = parseInt(id, 10);
      // getUpdatedData(id);
      updateData(id);
    }
  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.displayErr(
      "error",
      "Login incorrect. Check your spelling"
    );
  }
})

checkIn.addEventListener('change', function () {
  booking(checkIn.value);
  roomSelector.forEach(filter => {
    if (filter.defaultSelected) {
      filter.selected = true;
      return false;
    }
  });
});

roomFilter.addEventListener('change', function () {
  _domUpdates__WEBPACK_IMPORTED_MODULE_1__.default.filterRooms(
    roomFilter.value,
    currentHotel.availableRooms.flat(1)
  );
});

allRoomsSection.addEventListener('click', function (event) {
  if (event.target.id === 'mainPageBtn') {
    checkIn.valueAsDate = new Date()
    roomFilter.value = 'Select Room Type';
    updateData(currentUser.id);
  } else {
    confirmBooking(
      event,
      currentHotel.availableRooms.flat(1),
      currentUser
    );
  }
});

logOutBtn.addEventListener('click', logOut)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map