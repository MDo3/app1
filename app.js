/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./_src/template/assets/js/barbaTransitions/default.js":
/*!*************************************************************!*\
  !*** ./_src/template/assets/js/barbaTransitions/default.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultTransition": () => (/* binding */ defaultTransition)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");

function defaultTransition() {
  return Barba.BaseTransition.extend({
    start: function start() {
      var _this = this;

      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */
      var promises = [this.newContainerLoading, this.fadeOut()]; // As soon the loading is finished and the old page is faded out, let's fade the new page

      Promise.all(promises).then(function (value) {
        _this.fadeIn();
      });
    },

    /**
     * @returns {Promise<any>}
     */
    fadeOut: function fadeOut() {
      var _this2 = this;

      /**
       * this.oldContainer is the HTMLElement of the old Container
       */
      return new Promise(function (resolve) {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(_this2.oldContainer, 'old-container');
        resolve('fadeOut() is resolved');
      });
    },

    /**
     * @returns {Promise<any>}
     */
    fadeIn: function fadeIn() {
      var _this3 = this;

      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */
      return new Promise(function (resolve) {
        _this3.done();

        resolve('fadeIn() is resolved -> EVERYTHING IS DONE!');
      });
    }
  });
}

/***/ }),

/***/ "./_src/template/assets/js/barbaViews/default.js":
/*!*******************************************************!*\
  !*** ./_src/template/assets/js/barbaViews/default.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultView": () => (/* binding */ defaultView)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
/* harmony import */ var _components_Preloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Preloader */ "./_src/template/assets/js/components/Preloader.js");


function defaultView() {
  var firstShow = true;

  function onAnimationComplete(newContainer, oldContainer) {
    var bgColor = newContainer.style.backgroundColor;
    document.documentElement.style.backgroundColor = bgColor;
    newContainer.style.clipPath = '';
    newContainer.style.backgroundColor = '';

    if (oldContainer) {
      oldContainer.remove();
    }

    Theme.trigger('transition_end', [firstShow, newContainer]);
    (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(newContainer, 'new-container');
    (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(newContainer, 'is-loaded');
    firstShow = false;
    (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.documentElement, 'loading');
  }
  /**
   * FadeIn main container when page is loaded
   *
   */


  function showNewContainer() {
    var newContainer = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.barba-container.new-container');
    var oldContainer = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.barba-container.old-container');
    (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(document.documentElement, 'loading'); // Show new container

    if (!newContainer) {
      newContainer = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.barba-container');
    }

    if (newContainer) {
      Theme.trigger('transition_start', [newContainer]);
      var target = newContainer.querySelector('.r-scroll-container');
      var width = Theme.windowW;
      var height = Theme.windowH;
      var attrs = {
        y: 10,
        p2: 0
      };

      if (oldContainer) {
        if (Theme.windowW < 768) {
          Theme.mainScroll.scrollTo(0);
        }

        anime({
          targets: attrs,
          delay: Theme.windowW < 768 ? 600 : 80,
          y: 0,
          p2: Theme.windowH * 1.25,
          duration: 1200,
          easing: 'cubicBezier(.77, 0, .175, 1)',
          begin: function begin() {
            newContainer.style.visibility = 'visible';
            newContainer.style.opacity = 1;
          },
          update: function update() {
            target.style.transform = "translate3d(0, ".concat(attrs.y, "vh, 0)");
            newContainer.style.clipPath = "ellipse(".concat(width * 1.5, "px ").concat(attrs.p2, "px at 50% ").concat(height, "px)");
          },
          complete: function complete() {
            onAnimationComplete(newContainer, oldContainer);
          }
        });
      } else {
        //First run
        newContainer.style.visibility = 'visible';
        newContainer.style.opacity = 1;
        onAnimationComplete(newContainer, oldContainer);
      }
    }
  } // Barba default namespace


  var barbaDefaultView = Barba.BaseView.extend({
    namespace: 'default',
    onEnter: function onEnter() {
      Theme.trigger('new_page_ready');
    },

    /**
     * This function will be fired when the transition
     * to the container has just finished.
     *
     */
    onEnterCompleted: function onEnterCompleted() {
      var loader = new _components_Preloader__WEBPACK_IMPORTED_MODULE_1__["default"]();
      loader.preload((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.barba-container.new-container'), showNewContainer);
    },
    onLeave: function onLeave() {
      Theme.trigger('leave_page');
    },
    onLeaveCompleted: function onLeaveCompleted() {}
  });
  barbaDefaultView.init();
}

/***/ }),

/***/ "./_src/template/assets/js/components/Ajax.js":
/*!****************************************************!*\
  !*** ./_src/template/assets/js/components/Ajax.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ajax": () => (/* binding */ Ajax)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
var UNSENT = 0,
    OPENED = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4;
/* https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */

var OK = 200;

var ReadyStates = /*#__PURE__*/function () {
  function ReadyStates() {
    _classCallCheck(this, ReadyStates);
  }

  _createClass(ReadyStates, null, [{
    key: "UNSENT",
    get: function get() {
      return UNSENT;
    }
  }, {
    key: "OPENED",
    get: function get() {
      return OPENED;
    }
  }, {
    key: "HEADERS_RECEIVED",
    get: function get() {
      return HEADERS_RECEIVED;
    }
  }, {
    key: "LOADING",
    get: function get() {
      return LOADING;
    }
  }, {
    key: "DONE",
    get: function get() {
      return DONE;
    }
  }]);

  return ReadyStates;
}();

var HTTPStatus = /*#__PURE__*/function () {
  function HTTPStatus() {
    _classCallCheck(this, HTTPStatus);
  }

  _createClass(HTTPStatus, null, [{
    key: "OK",
    get: function get() {
      return OK;
    }
  }]);

  return HTTPStatus;
}();

var Ajax = /*#__PURE__*/function () {
  function Ajax() {
    _classCallCheck(this, Ajax);

    this.xhr = new XMLHttpRequest();
  }

  _createClass(Ajax, [{
    key: "onStateChangedEvent",
    value: function onStateChangedEvent(xhr, onSuccess, onError) {
      return function () {
        if (xhr.readyState === ReadyStates.DONE && xhr.status === HTTPStatus.OK) {
          onSuccess(JSON.parse(xhr.responseText));
        } else if (xhr.readyState === ReadyStates.DONE && xhr.status !== HTTPStatus.OK) {
          onError(JSON.parse(xhr.responseText), xhr.status);
        }
      };
    }
  }, {
    key: "encodeData",
    value: function encodeData(data) {
      if ('string' === typeof data) {
        return data;
      } else {
        return Object.keys(data).map(function (key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
      }
    }
  }, {
    key: "get",
    value: function get(endpoint, data, onSuccess, onError) {
      var xhr = this.xhr;
      xhr.open('GET', endpoint + '?' + this.encodeData(data));
      xhr.onreadystatechange = this.onStateChangedEvent(xhr, onSuccess, onError);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      return xhr;
    }
  }, {
    key: "post",
    value: function post(endpoint, data, onSuccess, onError) {
      var xhr = this.xhr;
      xhr.open('POST', endpoint, true);
      xhr.onreadystatechange = this.onStateChangedEvent(xhr, onSuccess, onError);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(this.encodeData(data));
      return xhr;
    }
  }]);

  return Ajax;
}();

/***/ }),

/***/ "./_src/template/assets/js/components/AnimateOnScroll.js":
/*!***************************************************************!*\
  !*** ./_src/template/assets/js/components/AnimateOnScroll.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnimateOnScroll)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var AnimateOnScroll = /*#__PURE__*/function () {
  function AnimateOnScroll() {
    _classCallCheck(this, AnimateOnScroll);

    this.normal = [];
    this.fixed = [];
    this.delay = 0;
  }

  _createClass(AnimateOnScroll, [{
    key: "getElements",
    value: function getElements() {
      this.delay = 0;
      this.normal = [];
      this.fixed = [];
      this.smooth = [];
      var inViewPercent;
      var targetY = 0;

      for (var index = 0; index < this.modulesManager.currentModules.length; index++) {
        var pageModule = this.modulesManager.currentModules[index];

        if (pageModule.fixed) {
          this.fixed.push(pageModule);
        } else if (pageModule.smooth) {
          inViewPercent = pageModule.calculateVisibility();
          pageModule.onScroll(targetY, targetY, inViewPercent);

          if (inViewPercent > 0 && inViewPercent <= 100) {
            this.delay += 30;
            this.animate(pageModule, this.delay);
            pageModule.inView = true;

            if (!pageModule.animateOnce) {
              this.smooth.push(pageModule);
            }
          } else {
            this.smooth.push(pageModule);
          }
        } else {
          inViewPercent = pageModule.calculateVisibility();
          pageModule.onScroll(targetY, targetY, inViewPercent);

          if (inViewPercent > 0 && inViewPercent <= 100) {
            this.delay += 30;
            this.animate(pageModule, this.delay);
            pageModule.inView = true;

            if (!pageModule.animateOnce) {
              this.normal.push(pageModule);
            }
          } else {
            this.normal.push(pageModule);
          }
        }
      }
    }
  }, {
    key: "calcItemVisibility",
    value: function calcItemVisibility(item, targetY, scrollPos) {
      var inViewPercent = item.calculateVisibility(targetY);
      var minPercent = item.viewOffsetTop || 0;
      var maxPercent = item.viewOffsetBottom || 100;

      if (inViewPercent > minPercent && inViewPercent <= maxPercent) {
        if (!item.inView) {
          this.delay += 30;
          item.inView = true;
          this.animate(item, this.delay);
        } else {
          item.onScroll(targetY, scrollPos, inViewPercent);
        }
      } else {
        if (item.inView) {
          item.onOutView();
        }

        item.inView = false;
      }
    }
  }, {
    key: "update",
    value: function update(targetY, scrollPos, force) {
      var el,
          index = 0;
      this.delay = 0;

      for (index = 0; index < this.fixed.length; index++) {
        el = this.fixed[index];
        el.onScroll(targetY, scrollPos);
      }

      for (index = 0; index < this.smooth.length; index++) {
        el = this.smooth[index];
        this.calcItemVisibility(el, targetY, scrollPos);
      }

      if (!force && this.prevScroll && this.prevScroll === scrollPos) {
        return;
      }

      for (index = 0; index < this.normal.length; index++) {
        el = this.normal[index];
        this.calcItemVisibility(el, targetY, scrollPos);
      }

      this.prevScroll = scrollPos;
    }
  }, {
    key: "init",
    value: function init(modulesManager) {
      this.modulesManager = modulesManager;
      this.initModules();
    }
  }, {
    key: "initModules",
    value: function initModules() {
      this.getElements();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.normal = [];
      this.fixed = [];
      this.smooth = [];
    }
  }, {
    key: "animate",
    value: function animate(element, delay) {
      element.onInView(delay);
      element.shown = true;

      if (element.animateOnce && !element.fixed) {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeFromArray)(this.normal, element);
      }
    }
  }]);

  return AnimateOnScroll;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/ChangeColors.js":
/*!************************************************************!*\
  !*** ./_src/template/assets/js/components/ChangeColors.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangeColors)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ChangeColors = /*#__PURE__*/function () {
  function ChangeColors(options) {
    _classCallCheck(this, ChangeColors);

    // The default options
    this.options = Object.assign({
      targets: [],
      source: '.barba-container'
    }, options);
    this.init = this.init.bind(this);
    this.setOppositeColor = this.setOppositeColor.bind(this);
    Theme.on('transition_end', this.init);
    Theme.on('show_menu', this.setOppositeColor);
    Theme.on('hide_menu', this.setOppositeColor);
  }

  _createClass(ChangeColors, [{
    key: "init",
    value: function init(firstLoad, scope) {
      this.source = scope;

      if (this.options.targets.length) {
        this.resetHeaderColors();
        this.setPageColors();
      }

      this.setOppositeColor();
    }
  }, {
    key: "getTargets",
    value: function getTargets() {
      return this.options.targets;
    }
  }, {
    key: "getHeaderBgItems",
    value: function getHeaderBgItems() {
      return document.querySelectorAll('.bg-header');
    }
  }, {
    key: "getSource",
    value: function getSource() {
      if (this.source) {
        return this.source;
      }

      if ('string' === typeof this.options.source) {
        return document.querySelector(this.options.source);
      } else {
        return this.options.source;
      }
    }
  }, {
    key: "clearColors",
    value: function clearColors() {
      this.getTargets().forEach(function (el) {
        el.style.backgroundColor = '';
        el.style.color = '';
      });
    }
  }, {
    key: "getContrast",
    value: function getContrast(hex) {
      if (0 === hex.indexOf('#')) {
        hex = hex.slice(1);
      } // convert 3-digit hex to 6-digits.


      if (3 === hex.length) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      var r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);
      var contrast = Math.sqrt(r * r * .241 + g * g * .691 + b * b * .068);
      return contrast;
    }
  }, {
    key: "getOppositeColor",
    value: function getOppositeColor(hex) {
      return this.getContrast(hex) > 125 ? 'black' : 'white';
    }
  }, {
    key: "getContainerBg",
    value: function getContainerBg() {
      return this.getSource().getAttribute('data-bg-color');
    }
  }, {
    key: "getBgColor",
    value: function getBgColor() {
      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(document.body, 'menu-toggled')) {
        return this.getMenuBgColor();
      } else {
        return this.getSource().getAttribute('data-bg-color');
      }
    }
  }, {
    key: "getTextColor",
    value: function getTextColor() {
      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(document.body, 'menu-toggled')) {
        return this.getMenuTextColor();
      } else {
        return this.getSource().getAttribute('data-color');
      }
    }
  }, {
    key: "getMenuTextColor",
    value: function getMenuTextColor() {
      var menuContainer = document.getElementById('site-navigation');

      if (menuContainer) {
        return menuContainer.getAttribute('data-color');
      } else {
        return '';
      }
    }
  }, {
    key: "getMenuBgColor",
    value: function getMenuBgColor() {
      var menuContainer = document.getElementById('site-navigation');

      if (menuContainer) {
        return menuContainer.getAttribute('data-bg-color');
      } else {
        return '';
      }
    }
  }, {
    key: "setPageColors",
    value: function setPageColors(bgColor, textColor) {
      textColor = textColor || this.getTextColor();
      bgColor = bgColor || this.getBgColor();

      if (bgColor) {
        this.getTargets().forEach(function (el) {
          el.style.backgroundColor = bgColor;
        });
      } else {
        this.getTargets().forEach(function (el) {
          el.style.backgroundColor = '';
        });
      }

      if (textColor) {
        this.getTargets().forEach(function (el) {
          el.style.color = textColor;
        });
      }

      this.setHeaderColors(textColor);
    }
  }, {
    key: "setOppositeColor",
    value: function setOppositeColor(textColor) {
      textColor = textColor || this.getTextColor();
      var oppositeColor = this.getOppositeColor(textColor);
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.documentElement, 'color-light');

      if (oppositeColor === 'black') {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(document.documentElement, 'color-light');
      }
    }
    /**
     * Set header background color to default
     *
     * @memberof ChangeColors
     */

  }, {
    key: "setHeaderColors",
    value: function setHeaderColors(textColor, bgColor) {
      var _this = this;

      bgColor = bgColor || this.getBgColor();

      if (textColor) {
        var header = document.getElementById('masthead');

        if (header) {
          header.style.color = textColor;
        }
      }

      this.getHeaderBgItems().forEach(function (el) {
        if (textColor) {
          el.style.color = textColor;
        }

        _this.setTargetBg(el, bgColor);
      });
    }
    /**
     * Reset header color
     *
     * @memberof ChangeColors
     */

  }, {
    key: "resetHeaderColors",
    value: function resetHeaderColors() {
      var _this2 = this;

      var header = document.getElementById('masthead');
      var bgColor = this.source.getAttribute('data-bg-color') || '';
      var textColor = this.source.getAttribute('data-color') || '';

      if (header) {
        header.style.color = textColor;
      }

      this.getHeaderBgItems().forEach(function (el) {
        el.style.color = textColor;

        _this2.setTargetBg(el, bgColor);
      });
    }
    /**
     * Set/reset element color
     *
     * @param {HTMLElement} element
     * @param {String} textColor color value
     * @memberof ChangeColors
     */

  }, {
    key: "setTargetColor",
    value: function setTargetColor(element, textColor) {
      if (textColor) {
        element.style.color = textColor;
      } else {
        element.style.color = '';
      }
    }
    /**
     * Set/reset element background color
     *
     * @param {HTMLElement} element
     * @param {String} color
     *
     * @memberof ChangeColors
     */

  }, {
    key: "setTargetBg",
    value: function setTargetBg(element, color) {
      if (!element) {
        return;
      }

      if (color) {
        element.style.backgroundColor = color;
      } else {
        element.style.backgroundColor = '';
      }
    }
  }]);

  return ChangeColors;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Checkbox.js":
/*!********************************************************!*\
  !*** ./_src/template/assets/js/components/Checkbox.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Checkbox = /*#__PURE__*/function () {
  function Checkbox(options) {
    _classCallCheck(this, Checkbox);

    // The default options
    this.options = Object.assign({
      selector: 'input[type="checkbox"]',
      wrapperClassName: 'r-checkbox-wrap',
      itemClassName: 'r-checkbox'
    }, options);
    this.isActive = false;
    this.init = this.init.bind(this);
    Theme.on('init_components', this.init);
  }

  _createClass(Checkbox, [{
    key: "getItems",
    value: function getItems(scope) {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)(this.options.selector, scope);
    }
  }, {
    key: "getItemClassName",
    value: function getItemClassName() {
      return this.options.itemClassName;
    }
  }, {
    key: "getWrapperClassName",
    value: function getWrapperClassName() {
      return this.options.wrapperClassName;
    }
  }, {
    key: "init",
    value: function init(firstLoad, scope) {
      var items = this.getItems(scope);
      var wrapClass = this.getWrapperClassName();

      for (var index = 0; index < items.length; index++) {
        var element = items[index];

        if (!(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element.parentNode, wrapClass)) {
          var wrap = document.createElement('span');
          wrap.className = wrapClass;
          element.parentNode.insertBefore(wrap, element);
          var checkbox = document.createElement('span');
          checkbox.className = this.getItemClassName();
          wrap.appendChild(element);
          wrap.appendChild(checkbox);
        }
      }
    }
  }]);

  return Checkbox;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Comments.js":
/*!********************************************************!*\
  !*** ./_src/template/assets/js/components/Comments.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Comments)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
/* harmony import */ var _Ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ajax */ "./_src/template/assets/js/components/Ajax.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Comments = /*#__PURE__*/function () {
  function Comments(options) {
    _classCallCheck(this, Comments);

    // The default options
    this.options = Object.assign({
      containerSelector: '.comments',
      formSelector: '.comments #commentform',
      submitSelector: '.comments #submit'
    }, options);
    this.init = this.init.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    Theme.on('transition_end', this.init);
  }

  _createClass(Comments, [{
    key: "getContainer",
    value: function getContainer() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)(this.options.containerSelector, this.scope);
    }
  }, {
    key: "getForm",
    value: function getForm() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)(this.options.formSelector, this.scope);
    }
  }, {
    key: "getButton",
    value: function getButton() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)(this.options.submitSelector, this.scope);
    }
  }, {
    key: "init",
    value: function init(firstLoad, scope) {
      this.scope = scope || document;
      this.makeLayout();

      if (!this.getContainer()) {
        return;
      }

      this.cancelElement = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#cancel-comment-reply-link', this.scope);

      if (this.getButton() && this.getContainer() && this.getForm()) {
        this.addEvents();
      }
    }
  }, {
    key: "makeLayout",
    value: function makeLayout() {}
    /**
    * Add placeholder element.
    *
    * Places a place holder element above the #respond element for
    * the form to be returned to if needs be.
    *
    *
    * @param {HTMLelement} respondElement the #respond element holding comment form.
    */

  }, {
    key: "addPlaceHolder",
    value: function addPlaceHolder(respondElement) {
      var temporaryElement = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#wp-temp-form-div', this.scope);

      if (temporaryElement) {
        // The element already exists, no need to recreate.
        return;
      }

      temporaryElement = document.createElement('div');
      temporaryElement.id = 'wp-temp-form-div';
      temporaryElement.style.display = 'none';
      respondElement.parentNode.insertBefore(temporaryElement, respondElement);
    }
    /**
    * Cancel event handler.
    *
    * @param {Event} event The calling event.
    */

  }, {
    key: "cancelClick",
    value: function cancelClick(event) {
      var temporaryElement = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#wp-temp-form-div', this.scope);

      if (!temporaryElement || !this.respondElement) {
        // Conditions for cancel link fail.
        return;
      }

      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#comment_parent', this.scope).value = '0'; // Move the respond form back in place of the temporary element.

      temporaryElement.parentNode.replaceChild(this.respondElement, temporaryElement);
      this.cancelElement.style.display = 'none';
      event.preventDefault();
      window.Theme.mainScroll.setBodyHeight();
    }
  }, {
    key: "showError",
    value: function showError(response) {
      var form = this.getForm();
      var message = document.createElement('div');
      message.className = 'comment-error text-accent small';
      message.innerHTML = response.data || '';
      form.appendChild(message);
    }
  }, {
    key: "removeError",
    value: function removeError() {
      var form = this.getForm();
      var message = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.comment-error', form);

      if (message) {
        form.removeChild(message);
      }
    }
    /**
     * On comment form submit
     *
     * @param {Event} event
     */

  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      var _this = this;

      event.preventDefault();
      var container = this.getContainer();
      var button = this.getButton(); // submit button

      var form = this.getForm();
      var author = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#author', form);
      var email = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#email', form);
      var comment = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#comment', form);
      var commentlist = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.comment-list', container); // comment list container

      var cancelreplylink = this.cancelElement;
      var respond = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#respond', container).parentNode; // comment form container

      this.removeError(); // if user is logged in, do not validate author and email fields

      if (author) {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.validate)(author);
      }

      if (email) {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.validateEmail)(email);
      } // validate comment in any case


      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.validate)(comment); // if comment form isn't in process, submit it

      if (!(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(button, 'ajax-doing') && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(author, 'r-error') && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(email, 'r-error') && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(comment, 'r-error')) {
        var ajax = new _Ajax__WEBPACK_IMPORTED_MODULE_1__.Ajax();
        var formData = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.serialize)(form) + '&action=saonara_submit_comment';
        ajax.post(saonara_js_options.ajaxurl, formData, function (response) {
          if (!response.success) {
            _this.showError(response);

            return false;
          }

          var temp = document.createElement('div');
          var commentID = response.data.comment && response.data.comment.comment_ID ? response.data.comment.comment_ID : ''; // Replace comments title

          temp.innerHTML = response.data.title;
          var oldTitle = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.comments-title', container);
          var newTitle = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.comments-title', temp);

          if (!response.success) {
            return;
          }

          if (newTitle && oldTitle) {
            oldTitle.parentNode.replaceChild(newTitle, oldTitle);
          } // Add new comment


          temp.innerHTML = response.data.addedCommentHTML; // if this post already has comments

          if (commentlist) {
            // if in reply to another comment
            if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(respond.previousElementSibling, 'comment') || (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(respond.previousElementSibling, 'trackback') || (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(respond.previousElementSibling, 'pingback')) {
              if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.childrenMatches)(respond.previousElementSibling, '.children').length) {
                // if the other replies exist
                (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.childrenMatches)(respond.previousElementSibling, '.children')[0].appendChild(temp.children[0]);
              } else {
                // if no replies, add <ol class="children">
                var addedCommentHTML = document.createElement('ol');
                addedCommentHTML.className = 'children';
                addedCommentHTML.innerHTML = response.data.addedCommentHTML;
                respond.previousElementSibling.appendChild(addedCommentHTML);
              } // close respond form


              (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.emitEvent)('click', cancelreplylink);
            } else {
              // simple comment
              commentlist.appendChild(temp.children[0]);
            }
          } else {
            // if no comments yet
            var _addedCommentHTML = document.createElement('ol');

            respond = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.comments-content', _this.getContainer());
            _addedCommentHTML.className = 'comment-list';
            _addedCommentHTML.innerHTML = response.data.addedCommentHTML;
            respond.appendChild(_addedCommentHTML);
          } // clear textarea field


          comment.value = '';
          var newComment = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)("#div-comment-".concat(commentID));

          if (newComment) {
            window.Theme.mainScroll.setBodyHeight();
            window.Theme.mainScroll.scrollToElement(newComment);
          }
        }, function (response) {
          console.log('Error');
        });
      }

      return false;
    }
    /**
    * Moves the reply form from its current position to the reply location.
    *
    *
    * @param {String} addBelowId HTML ID of element the form follows.
    * @param {String} commentId  Database ID of comment being replied to.
    * @param {String} respondId  HTML ID of 'respond' element.
    * @param {String} postId     Database ID of the post.
    */

  }, {
    key: "moveReplyForm",
    value: function moveReplyForm(addBelowId, commentId, respondId, postId) {
      // Get elements based on their IDs.
      var addBelowElement = document.getElementById(addBelowId);
      var respondElement = document.getElementById('comment-form-wrap');
      this.respondElement = respondElement; // Get the hidden fields.

      var parentIdField = document.getElementById('comment_parent');
      var postIdField = document.getElementById('comment_post_ID');
      var element, cssHidden, style;

      if (!addBelowElement || !respondElement || !parentIdField) {
        // Missing key elements, fail.
        return;
      }

      this.addPlaceHolder(respondElement); // Set the value of the post.

      if (postId && postIdField) {
        postIdField.value = postId;
      }

      parentIdField.value = commentId;
      this.cancelElement.style.display = '';
      addBelowElement.parentNode.insertBefore(respondElement, addBelowElement.nextSibling);
      setTimeout(function () {
        var offset = window.innerHeight - respondElement.clientHeight;
        window.Theme.mainScroll.setBodyHeight();
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.scrollToElement)(respondElement, offset);
      }, 50);
      return false;
    }
    /**
     * On click inside container
     *
     * @param {Event} event The calling event.
     */

  }, {
    key: "onClick",
    value: function onClick(event) {
      if (event.target.matches('#submit') || (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getCurrentParent)(event.target, '#submit')) {
        this.onSubmit(event);
        return;
      }

      if (event.target.matches('a') || (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getCurrentParent)(event.target, 'a')) {
        var link = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getCurrentParent)(event.target, 'a');
        var url = link.getAttribute('href') ? link.getAttribute('href') : '';

        if (!url) {
          return true;
        } // Reply


        if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(link, 'comment-reply-link')) {
          event.preventDefault();
          var replyLink = link,
              commId = replyLink.getAttribute('data-belowelement'),
              parentId = replyLink.getAttribute('data-commentid'),
              respondId = replyLink.getAttribute('data-respondelement'),
              postId = replyLink.getAttribute('data-postid');

          if (!commId || !parentId || !respondId || !postId) {
            /*
            * Theme or plugin defines own link via custom `wp_list_comments()` callback
            * and calls `moveForm()` either directly or via a custom event hook.
            */
            return;
          }

          this.moveReplyForm(commId, parentId, respondId, postId);
          return false;
        }
      }
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      this.getContainer().addEventListener('click', this.onClick);
      this.getForm().addEventListener('submit', this.onSubmit);
      this.cancelElement.addEventListener('click', this.cancelClick);
    }
  }]);

  return Comments;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/ContactForm7.js":
/*!************************************************************!*\
  !*** ./_src/template/assets/js/components/ContactForm7.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContactForm7)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ContactForm7 = /*#__PURE__*/function () {
  function ContactForm7() {
    _classCallCheck(this, ContactForm7);

    this.init = this.init.bind(this);
    Theme.on('init_components', this.init);
  }

  _createClass(ContactForm7, [{
    key: "init",
    value: function init(firstLoad, scope) {
      this.scope = scope || document;

      if (!firstLoad) {
        // Init Contact forms
        if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(document.body, 'ajax-enabled') && 'undefined' != typeof wpcf7) {
          var forms = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('div.wpcf7 > form');

          for (var i = 0; i < forms.length; i++) {
            wpcf7.init(forms[i]);
          }
        }
      }

      this.addEvents();
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      // Resize scroll after Contact Form 7 submit
      var forms = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('div.wpcf7', this.scope);

      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('wpcf7submit', function () {
          setTimeout(function () {
            window.Theme.mainScroll.setBodyHeight();
          }, 500);
        });
      }
    }
  }]);

  return ContactForm7;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Gallery.js":
/*!*******************************************************!*\
  !*** ./_src/template/assets/js/components/Gallery.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gallery)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Gallery = /*#__PURE__*/function () {
  function Gallery() {
    _classCallCheck(this, Gallery);

    this.init = this.init.bind(this);
    this.initLightbox = this.initLightbox.bind(this);
    this.initVideos = this.initVideos.bind(this);
    this.addActions();
  }

  _createClass(Gallery, [{
    key: "addActions",
    value: function addActions() {
      Theme.on("transition_end", this.init);
      Theme.on("init_gallery", this.initLightbox);
      Theme.on("init_gallery", this.initVideos);
    }
  }, {
    key: "init",
    value: function init(firstLoad, scope) {
      this.initLightbox(scope);
      this.initGalleryLink();
    }
  }, {
    key: "initVideos",
    value: function initVideos(scope) {
      var videos = scope.querySelectorAll("video");

      for (var i = 0; i < videos.length; i++) {
        var vid = videos[i];

        if (vid.getAttribute("autoplay")) {
          vid.play();
        }
      }
    }
  }, {
    key: "initGalleryLink",
    value: function initGalleryLink() {
      var links = document.querySelectorAll(".r-gallery-link");

      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.addEventListener("click", function () {
          var targetSelector = this.getAttribute("data-gallery");

          if (targetSelector) {
            var galleryItem = document.querySelector("".concat(targetSelector, " .r-thumb a.r-thumb__img"));

            if (galleryItem) {
              (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.emitEvent)("click", galleryItem);
            }
          }
        });
      }
    }
  }, {
    key: "getSelectors",
    value: function getSelectors() {
      return ["blocks-gallery-item figure a", "wp-block-image[data-rlightbox] > a", "wp-caption > a", "glightbox"];
    }
  }, {
    key: "initLightbox",
    value: function initLightbox(scope) {
      if ("function" != typeof GLightbox) {
        return false;
      }

      var selectors = this.getSelectors();

      var _loop = function _loop(i) {
        var selector = selectors[i];
        var lightbox = GLightbox({
          selector: selectors[i],
          touchNavigation: true,
          loop: true,
          autoplayVideos: true,
          onOpen: function onOpen() {
            Theme.trigger("saonara_lightbox_open", [selector]);
          },
          onClose: function onClose() {
            Theme.trigger("saonara_lightbox_open", [selector]);
          }
        });
      };

      for (var i = 0; i < selectors.length; i++) {
        _loop(i);
      }
    }
  }]);

  return Gallery;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Menu.js":
/*!****************************************************!*\
  !*** ./_src/template/assets/js/components/Menu.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Menu = /*#__PURE__*/function () {
  function Menu() {
    _classCallCheck(this, Menu);

    this.container = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.r-menu-container');
    this.menu = document.getElementById('primary-menu');
    this.header = document.getElementById('masthead');
    this.isActive = false;
    this.duration = parseInt(this.container.getAttribute('data-duration')) || 800;
    this.toggleMenu = this.toggleMenu.bind(this);
    this.animations = [];
    this.rafId = null;
    this.menuH = 0;
    this.bg = '';
    this.color = '';
    this.hideMenu = this.hideMenu.bind(this);
    this.update = this.update.bind(this);
    this.pointerMoveHandler = this.pointerMoveHandler.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.imagesLoaded = false;
    this.pointer = {
      startY: 0,
      posY: 0
    };
    this.init();
    Theme.on('leave_page', this.hideMenu);
  }

  _createClass(Menu, [{
    key: "update",
    value: function update() {
      var mouseY = this.pointer.posY;

      if (Theme.mouse.pos.y) {
        mouseY = Theme.mouse.pos.y;
      }

      this.targetScale += (Math.abs((mouseY - this.delta) / 200 + 1) - this.targetScale) * 0.1;
      this.targetY += (-1 * (this.menuH - Theme.windowH) / Theme.windowH * mouseY - this.targetY) * 0.1;
      this.menu.style.transform = 'translate3d(0, ' + this.targetY + 'px, 0) scale(1, ' + this.targetScale + ')';
      this.delta = mouseY;
      this.rafId = window.requestAnimationFrame(this.update);
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
  }, {
    key: "getCloseBtn",
    value: function getCloseBtn() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.r-menu-close .menu-close');
    }
  }, {
    key: "getToggle",
    value: function getToggle() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.r-header__item--menu-toggle');
    }
  }, {
    key: "getMenuItems",
    value: function getMenuItems() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.main-navigation a');
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: "cancelAnimations",
    value: function cancelAnimations() {
      if (this.animations.length) {
        for (var i = 0; i < this.animations.length; i++) {
          this.animations[i].pause();
        }
      }

      this.animations = [];
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      var duration = this.getDuration();
      var currentItem = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.current-menu-item', this.container);
      this.isActive = true;
      this.delta = 0;
      this.targetY = 0;
      this.targetScale = 1;
      this.cancelAnimations();

      if (!this.imagesLoaded) {
        this.imagesLoaded = true;
        this.loadImages();
      }

      if (!currentItem) {
        currentItem = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.menu-item.lvl-0', this.container);
      }

      if (currentItem) {
        this.setActiveImage(currentItem.getAttribute('id'), true);
      }

      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(document.body, 'menu-toggled');

      if (this.header) {
        this.header.style.color = this.color;
      }

      Theme.changeColors.setOppositeColor(this.color);
      Theme.trigger('show_menu');
      this.animations.push(anime({
        targets: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.main-menu-inner, .menu-images', this.container),
        opacity: [0, 1],
        duration: duration,
        delay: duration / 2
      }));
      this.animations.push(anime({
        targets: this.container,
        scaleY: [1.25, 1],
        easing: 'easeOutQuad',
        duration: duration,
        delay: duration / 2
      }));
      this.update();
      this.container.style.visibility = 'visible';
      this.container.style.opacity = 1;
    }
  }, {
    key: "hideMenu",
    value: function hideMenu(leavePage, callback) {
      var _this = this;

      if (!this.isActive) {
        return;
      }

      var duration = this.getDuration() / 2;
      this.isActive = false;
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.body, 'menu-toggled');
      Theme.trigger('hide_menu');
      this.animations.push(anime({
        targets: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.main-menu-inner, .menu-images', this.container),
        opacity: 0,
        duration: duration,
        complete: function complete() {
          _this.container.style.visibility = 'hidden';

          if (_this.rafId) {
            window.cancelAnimationFrame(_this.rafId);
          }

          if ('function' === typeof callback) {
            callback();
          }
        }
      }));

      if (this.header) {
        var color = this.header.getAttribute('data-current-color');

        if (!color) {
          color = document.querySelector('.barba-container').getAttribute('data-color');
        }

        this.header.style.color = color;
        Theme.changeColors.setOppositeColor(color);
      }
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.getContainer()) {
        return;
      }

      var hasImages = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.r-nav-image', this.container).length;
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(this.getContainer(), hasImages ? 'has-images' : 'no-images');

      if (Theme.isTouch) {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(this.getContainer(), 'is-touch');
      } else if (Theme.windowW >= 768) {
        var container = this.container.querySelector('.main-menu-container');

        if (container) {
          container.style.overflow = 'hidden';
        }
      }

      this.bg = this.container.getAttribute('data-bg-color');
      this.color = this.container.getAttribute('data-color');

      if (this.menu) {
        this.menuH = this.menu.clientHeight;
      }

      if (this.getToggle()) {
        this.addEvents();
      }
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      if (this.isActive) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
    }
  }, {
    key: "loadImages",
    value: function loadImages() {
      var items = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.r-nav-image', this.container);
      var imgs_container = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('.menu-images__images', this.container);
      var imgs_html = '';

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        imgs_html += '<div class="menu-images__container">';
        imgs_html += '<div class="menu-item-image abs-full" data-id="' + item.getAttribute('data-id') + '">';
        imgs_html += '<div class="full-img bg-image abs-full" style="background-image: url(' + item.getAttribute('data-url') + ')"></div>';
        imgs_html += '<div class="clip-img bg-image abs-full" style="background-image: url(' + item.getAttribute('data-url') + ')"></div>';
        imgs_html += '</div>';
        imgs_html += '</div>';
      }

      imgs_container.innerHTML = imgs_html;
    }
  }, {
    key: "resetActiveImage",
    value: function resetActiveImage() {
      var itemImgs = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.menu-item-img.is-active');

      for (var i = 0; i < itemImgs.length; i++) {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(itemImgs[i], 'is-active');
      }
    }
  }, {
    key: "setActiveImage",
    value: function setActiveImage(id, force) {
      var activeImage = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)(".menu-item-image.is-active", this.container);
      var image = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)(".menu-item-image[data-id=\"".concat(id, "\"]"), this.container);

      if (image && (activeImage != image || force)) {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(activeImage, 'is-active');
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(image, 'is-active');
        anime({
          targets: image.querySelector('.full-img'),
          scale: [1.1, 1],
          duration: 1600,
          easing: 'easeOutQuint'
        });
      }
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      this.resetActiveImage();
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(e) {
      var imageSpan = e.currentTarget.querySelector('.r-nav-image');
      var id = '';

      if (imageSpan) {
        id = imageSpan.getAttribute('data-id');
        this.setActiveImage(id);
      }
    }
  }, {
    key: "pointerMoveHandler",
    value: function pointerMoveHandler(e) {
      var touch = e;

      if (e.type == 'touchmove') {
        e.preventDefault();
        touch = e.targetTouches[0] || e.changedTouches[0];
        this.pointer.posY = touch.clientY;
      }
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this2 = this;

      window.Theme.on('resize', function () {
        if (_this2.menu) {
          _this2.menuH = _this2.menu.clientHeight;
        }
      });
      this.getToggle().addEventListener('click', this.toggleMenu);

      if (this.getCloseBtn()) {
        this.getCloseBtn().addEventListener('click', this.toggleMenu);
      }

      var items = this.getMenuItems();

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        item.addEventListener('mouseenter', this.onMouseEnter);
        item.addEventListener('mouseleave', this.onMouseLeave);
      }
    }
  }]);

  return Menu;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/ModulesManager.js":
/*!**************************************************************!*\
  !*** ./_src/template/assets/js/components/ModulesManager.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModulesManager)
/* harmony export */ });
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules */ "./_src/template/assets/js/modules.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
/* harmony import */ var _AnimateOnScroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnimateOnScroll */ "./_src/template/assets/js/components/AnimateOnScroll.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Basic modules




var ModulesManager = /*#__PURE__*/function () {
  function ModulesManager() {
    _classCallCheck(this, ModulesManager);

    this.modules = _modules__WEBPACK_IMPORTED_MODULE_0__;
    this.currentModules = [];
    this.oldModules = [];
    this.init = this.init.bind(this);
    this.scroll = this.scroll.bind(this);
    this.resize = this.resize.bind(this);
    this.destroyModules = this.destroyModules.bind(this);
    Theme.on('init_components', this.init);
    Theme.on('transition_end', this.destroyModules);
    Theme.on('scroll', this.scroll);
    Theme.on('resize', this.resize);
  }

  _createClass(ModulesManager, [{
    key: "init",
    value: function init(firstLoad, scope) {
      var _this = this;

      this.scope = scope;
      this.oldModules = this.currentModules;
      this.currentModules = [];
      var p = Promise.resolve();
      p.then(this.initModules()).then(function () {
        _this.initAnimateScroll();

        if (_this.animateScroll) {
          _this.animOnScroll.init(_this);
        }

        Theme.trigger('modules_inited', [firstLoad, scope]);
      });
    }
  }, {
    key: "initAnimateScroll",
    value: function initAnimateScroll() {
      this.animateScroll = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.body, 'animate-scroll');

      if (this.animateScroll) {
        this.animOnScroll = new _AnimateOnScroll__WEBPACK_IMPORTED_MODULE_2__["default"]();
      }
    }
  }, {
    key: "initModules",
    value: function initModules() {
      var _this2 = this;

      return new Promise(function (resolve) {
        var modules = Array.prototype.slice.call((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.qsa)('[data-module]', _this2.scope));
        var changeHeaderColor = Array.prototype.slice.call((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.qsa)('[data-header-color], [data-header-bg]', _this2.scope));

        for (var index = 0; index < modules.length; index++) {
          var moduleEl = modules[index];

          if (!(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(moduleEl, 'module-active') && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(moduleEl, 'r-no-module')) {
            var moduleName = moduleEl.getAttribute('data-module');
            (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.addClass)(moduleEl, 'module-active');

            if (moduleName && 'function' == typeof _this2.modules[moduleName]) {
              var pageModule = new _this2.modules[moduleName]({
                container: moduleEl
              });

              _this2.currentModules.push(pageModule);
            }
          }
        }

        for (var _index = 0; _index < changeHeaderColor.length; _index++) {
          var headerEl = changeHeaderColor[_index];

          if (headerEl.getAttribute('data-header-color') || headerEl.getAttribute('data-header-bg')) {
            var _pageModule = new _this2.modules['HeaderColor']({
              container: headerEl
            });

            _this2.currentModules.push(_pageModule);
          }
        }

        resolve(true);
      });
    }
  }, {
    key: "getModuleByName",
    value: function getModuleByName(moduleName) {
      for (var i = 0; i < this.currentModules.length; i++) {
        if (moduleName === this.currentModules[i].slug) {
          return this.currentModules[i];
        }
      }

      return null;
    }
  }, {
    key: "hideComplete",
    value: function hideComplete(callback) {
      if ('function' === typeof callback) {
        callback();
      }
    }
    /**
     * Animate modules on Leave Page
     *
     * @memberof ModulesManager
     */

  }, {
    key: "hideModules",
    value: function hideModules(callback) {
      var _this3 = this;

      var visibleModules = this.getVisibleModules();
      var timelines = [];
      var finished = 0;

      for (var i = 0; i < visibleModules.length; i++) {
        var animOut = visibleModules[i].getOutAnimation();

        if (animOut) {
          timelines.push(animOut);
        }
      }

      if (timelines.length) {
        for (var _i = 0; _i < timelines.length; _i++) {
          timelines[_i].play();

          timelines[_i].finished.then(function () {
            finished++;

            if (finished >= timelines.length) {
              _this3.hideComplete(callback);
            }
          });
        }
      } else {
        this.hideComplete(callback);
      }
    }
  }, {
    key: "destroyModules",
    value: function destroyModules() {
      for (var index = 0; index < this.oldModules.length; index++) {
        this.oldModules[index].destroy();
        this.oldModules[index] = null;
      }

      this.oldModules = [];
    }
  }, {
    key: "getVisibleModules",
    value: function getVisibleModules() {
      var visibleModules = [];

      for (var index = 0; index < this.currentModules.length; index++) {
        var pageModule = this.currentModules[index];

        if (pageModule.moduleInView(this.scrollPos) || pageModule.fixed) {
          visibleModules.push(pageModule);
        }
      }

      return visibleModules;
    }
  }, {
    key: "scroll",
    value: function scroll(obj) {
      var targetY = obj.targetY,
          scrollPos = obj.scrollTop;
      this.scrollPos = scrollPos;

      if (this.animateScroll) {
        this.animOnScroll.update(targetY, scrollPos);
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      for (var index = 0; index < this.currentModules.length; index++) {
        this.currentModules[index].resize();
      }
    }
  }]);

  return ModulesManager;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Mouse.js":
/*!*****************************************************!*\
  !*** ./_src/template/assets/js/components/Mouse.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mouse)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Mouse = /*#__PURE__*/function () {
  /**
   *
   * @param {object} options
   */
  function Mouse(options) {
    _classCallCheck(this, Mouse);

    // The default options
    this.options = Object.assign({
      cursor: '.r-cursor',
      //set cursor states (busy, hide, etc.)
      state: '[data-cursor]',
      //link
      link: '.r-js-hover, a.page-numbers, .site-branding .custom-logo, figure > a',
      linkLarge: '.r-js-hover--large',
      //hide cursor
      hide: 'a.comment-reply-link',
      //state classes
      isHover: 'is-hover',
      isHoverLarge: 'is-hover-large',
      isHidden: 'is-hidden'
    }, options);
    this.cursor = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)(this.options.cursor);
    this.resetCursor = this.resetCursor.bind(this);
    this.initCursorStates = this.initCursorStates.bind(this);
    this.pos = {
      x: 0,
      y: 0,
      cursorX: 0,
      cursorY: 0
    };
    this.isAnimated = false;
    this.init(); // Reinit hover links after loading a new page through Ajax

    Theme.on('init_components', this.initCursorStates);
    Theme.on('transition_end', this.resetCursor);
  }

  _createClass(Mouse, [{
    key: "resetCursor",
    value: function resetCursor() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(this.cursor, 'busy');
    } //region getters

  }, {
    key: "getCursor",
    value: function getCursor() {
      return this.cursor;
    }
  }, {
    key: "getStates",
    value: function getStates() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)(this.options.state, this.scope);
    }
  }, {
    key: "getLinks",
    value: function getLinks() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)(this.options.link, this.scope);
    }
  }, {
    key: "getLargeLinks",
    value: function getLargeLinks() {
      var selector = this.options.linkLarge;
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)(selector, this.scope);
    }
  }, {
    key: "getHidden",
    value: function getHidden() {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)(this.options.hide, this.scope);
    }
  }, {
    key: "init",
    value: function init() {
      if (device.desktop()) {
        this.mouseMove = this.mouseMove.bind(this);
        this.initCursorPosition(); //init cursor

        if (this.getCursor()) {
          (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(document.documentElement, 'cursor-active');
          this.update = this.update.bind(this);
          this.linkEnter = this.linkEnter.bind(this);
          this.linkLeave = this.linkLeave.bind(this);
          this.linkLargeEnter = this.linkLargeEnter.bind(this);
          this.linkLargeLeave = this.linkLargeLeave.bind(this);
          this.hideEnter = this.hideEnter.bind(this);
          this.hideLeave = this.hideLeave.bind(this);
          this.stateEnter = this.stateEnter.bind(this);
          this.stateLeave = this.stateLeave.bind(this);
          this.targetY = 0;
          this.targetX = 0;
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.targetY += (this.pos.cursorY - this.targetY) * 0.2;
      this.targetX += (this.pos.cursorX - this.targetX) * 0.2;
      this.cursor.style.transform = "translate3d(" + this.targetX + "px, " + this.targetY + "px, 0)";
      this.rafId = window.requestAnimationFrame(this.update);
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
      this.pos.cursorX = this.pos.x;
      this.pos.cursorY = this.pos.y;

      if (this.cursor && !this.isAnimated) {
        this.isAnimated = true;
        this.update();
      }
    }
  }, {
    key: "linkEnter",
    value: function linkEnter() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(this.getCursor(), this.options.isHover);
    }
  }, {
    key: "linkLeave",
    value: function linkLeave() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(this.getCursor(), this.options.isHover);
    }
  }, {
    key: "linkLargeEnter",
    value: function linkLargeEnter() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(this.getCursor(), this.options.isHoverLarge);
    }
  }, {
    key: "linkLargeLeave",
    value: function linkLargeLeave() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(this.getCursor(), this.options.isHoverLarge);
    }
  }, {
    key: "hideEnter",
    value: function hideEnter() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(this.getCursor(), this.options.isHidden);
    }
  }, {
    key: "hideLeave",
    value: function hideLeave() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(this.getCursor(), this.options.isHidden);
    }
  }, {
    key: "stateEnter",
    value: function stateEnter(e) {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(this.getCursor(), e.target.getAttribute('data-cursor'));
    }
  }, {
    key: "stateLeave",
    value: function stateLeave(e) {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(this.getCursor(), e.target.getAttribute('data-cursor'));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.documentElement, 'cursor-active');
      document.removeEventListener('mousemove', this.mouseMove);
    }
  }, {
    key: "initCursorStates",
    value: function initCursorStates(firstLoad, scope) {
      if (!this.getCursor() || !device.desktop()) {
        return;
      }

      var i = 0;

      if (firstLoad) {
        this.scope = document;
      } else {
        this.scope = scope || document;
      } //links


      var links = this.getLinks();

      for (i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseenter', this.linkEnter);
        links[i].addEventListener('mouseleave', this.linkLeave);
      }

      var linksLarge = this.getLargeLinks();

      for (i = 0; i < linksLarge.length; i++) {
        linksLarge[i].addEventListener('mouseenter', this.linkLargeEnter);
        linksLarge[i].addEventListener('mouseleave', this.linkLargeLeave);
      } //hide


      var hide = this.getHidden();

      for (i = 0; i < hide.length; i++) {
        hide[i].addEventListener('mouseenter', this.hideEnter);
        hide[i].addEventListener('mouseleave', this.hideLeave);
      } //states


      var states = this.getStates();

      for (i = 0; i < states.length; i++) {
        states[i].addEventListener('mouseenter', this.stateEnter);
        states[i].addEventListener('mouseleave', this.stateLeave);
      }
    }
  }, {
    key: "initCursorPosition",
    value: function initCursorPosition() {
      document.addEventListener('mousemove', this.mouseMove);
    }
  }]);

  return Mouse;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/ParallaxColumns.js":
/*!***************************************************************!*\
  !*** ./_src/template/assets/js/components/ParallaxColumns.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ParallaxColumns)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ParallaxColumns = /*#__PURE__*/function () {
  function ParallaxColumns(options) {
    _classCallCheck(this, ParallaxColumns);

    var _defaults = {
      scrollSpeed: 0.1
    };
    this.defaults = Object.assign({}, _defaults, options);
    this.elements = [];
    this.isActive = false;
    this.destroy = this.destroy.bind(this);
    this.init = this.init.bind(this);
    this.scroll = this.scroll.bind(this);
    this.resize = this.resize.bind(this);
    Theme.on('init_components', this.init);
    Theme.on('scroll', this.scroll);
    Theme.on('resize', this.resize);
    Theme.on('needsResize', this.resize);
  }

  _createClass(ParallaxColumns, [{
    key: "firstColSelector",
    value: function firstColSelector() {
      return 'div.product.r-layout--default .r-product-gallery, .r-parallax-columns > .r-first-col';
    }
  }, {
    key: "lastColSelector",
    value: function lastColSelector() {
      return 'div.product.r-layout--default .entry-summary, .r-parallax-columns > .r-last-col';
    }
  }, {
    key: "getSelector",
    value: function getSelector() {
      return 'div.product.r-layout--default, .r-parallax-columns';
    }
  }, {
    key: "getAnimationEl",
    value: function getAnimationEl(scope) {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)(this.getSelector(), scope);
    }
  }, {
    key: "getScrollSpeed",
    value: function getScrollSpeed() {
      return this.defaults.scrollSpeed;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.isActive = false;
      this.elements = [];
    }
  }, {
    key: "init",
    value: function init(needsUpdate, scope) {
      scope = scope || document;
      this.destroy();

      if (!(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(document.documentElement, 'r-smooth-scroll')) {
        return;
      }

      var windowH = Theme.windowH;
      var offset = 0;

      if (Theme.windowW < 992) {
        return;
      }

      var domElements = this.getAnimationEl(scope);

      for (var index = 0; index < domElements.length; index++) {
        var container = domElements[index];
        var elLeft = container.querySelector(this.firstColSelector());
        var elRight = container.querySelector(this.lastColSelector());

        if (!elLeft || !elRight) {
          continue;
        }

        var elLeftHeight = elLeft.clientHeight;
        var elRightHeight = elRight.clientHeight;
        var sectionHeight = Math.max(elLeftHeight, elRightHeight);

        if (sectionHeight + 150 > windowH && container.children.length > 1) {
          var containerTop = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.relativeOffsetTop)(container) + offset;
          var elLeftTop = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.relativeOffsetTop)(elLeft) + offset;
          var elRightTop = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.relativeOffsetTop)(elRight) + offset;
          var deffer01 = sectionHeight - elLeftHeight;
          var deffer02 = sectionHeight - elRightHeight;
          var animType = 'default';
          var minH = Math.min(elLeftHeight, elRightHeight);

          if (minH <= windowH) {
            animType = 'top';
          }

          if ('parallax' === animType) {
            // Parallax
            deffer01 = sectionHeight - elLeftHeight - (elLeftHeight < windowH ? windowH - elLeftHeight - 150 : 0);
            deffer02 = sectionHeight - elRightHeight - (elRightHeight < windowH ? windowH - elRightHeight - 150 : 0);
          } else if ('top' == animType) {
            // Fix on top
            deffer01 = sectionHeight - elLeftHeight - (elLeftHeight < windowH ? windowH - elLeftHeight : 0);
            deffer02 = sectionHeight - elRightHeight - (elRightHeight < windowH ? windowH - elRightHeight : 0);
          }

          elLeft.style.transform = 'translate3d(0, 0, 0)';
          elRight.style.transform = 'translate3d(0, 0, 0)';
          this.elements.push({
            container: container,
            fixOnTop: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(container, 'r-parallax-columns'),
            top: containerTop,
            bottom: containerTop + container.clientHeight,
            columnRightY: 0,
            columnLeftY: 0,
            type: animType,
            sectionHeight: sectionHeight,
            deffer01: deffer01,
            deffer02: deffer02,
            elLeft: {
              el: elLeft,
              top: elLeftTop,
              height: elLeftHeight,
              bottom: elLeftTop + elLeftHeight
            },
            elRight: {
              el: elRight,
              top: elRightTop,
              height: elRightHeight,
              bottom: elRightTop + elRightHeight
            },
            inView: false
          });
        }
      }

      if (this.elements.length) {
        this.isActive = true;
      }

      if (needsUpdate) {
        this.update();
      }
    }
  }, {
    key: "scroll",
    value: function scroll() {
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var targetY = Theme.scroll.target;

      if (!this.isActive) {
        return;
      }

      var windowH = Theme.windowH;

      for (var index = 0; index < this.elements.length; index++) {
        var el = this.elements[index];
        var offset = el.fixOnTop ? 0 : Theme.headerH;
        var columnLeft = el.elLeft.el;
        var columnRight = el.elRight.el;
        var sectionTop = el.top - targetY - offset;
        var per = -sectionTop / (el.sectionHeight - windowH);

        if (-sectionTop + windowH >= el.sectionHeight) {
          // On top
          if (el.sectionHeight - 200 > windowH) {
            el.columnLeftY = el.deffer01;
            el.columnRightY = el.deffer02;
            columnLeft.style.transform = 'translate3d(0, ' + el.columnLeftY + 'px, 0)';
            columnRight.style.transform = 'translate3d(0, ' + el.columnRightY + 'px, 0)';
          }
        } else if (el.sectionHeight > -sectionTop && -sectionTop > 0) {
          if (el.sectionHeight - 200 > windowH) {
            el.columnLeftY = el.deffer01 * per;
            el.columnRightY = el.deffer02 * per;
            columnLeft.style.transform = 'translate3d(0, ' + el.columnLeftY + 'px, 0)';
            columnRight.style.transform = 'translate3d(0, ' + el.columnRightY + 'px, 0)';
          }
        } else if (el.columnLeftY != 0 || el.columnRightY != 0) {
          el.columnLeftY = 0;
          el.columnRightY = 0;
          columnLeft.style.transform = 'translate3d(0, 0, 0)';
          columnRight.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      this.init(true);
    }
  }]);

  return ParallaxColumns;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Preloader.js":
/*!*********************************************************!*\
  !*** ./_src/template/assets/js/components/Preloader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Preloader)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Preloading Images
 *
 */


var Preloader = /*#__PURE__*/function () {
  function Preloader(options) {
    _classCallCheck(this, Preloader);

    // The default options
    this.options = Object.assign({
      container: document
    }, options);
  }

  _createClass(Preloader, [{
    key: "getContainer",
    value: function getContainer() {
      return this.options.container;
    }
  }, {
    key: "loadVideos",
    value: function loadVideos(container, callback) {
      var videos = container.querySelectorAll('video');

      var _loop = function _loop(i) {
        var video = videos[i];
        video.addEventListener('loadeddata', function () {
          if (i == videos.length - 1) {
            callback();
          }
        }, false);
      };

      for (var i = 0; i < videos.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "loadFonts",
    value: function loadFonts(callback) {
      var fonts = [];

      for (var i = 0; i < saonara_js_options.fonts.length; i++) {
        if ('sans-serif' != saonara_js_options.fonts[i]['font-family'] && 'Arimo' != saonara_js_options.fonts[i]['font-family']) {
          fonts.push(saonara_js_options.fonts[i]['font-family']);
        }
      }

      if (fonts.length == 0) {
        callback();
      } else {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.waitForWebfonts)(fonts, function () {
          callback();
        });
      }
    }
    /**
     * Preload images/videos
     *
     * @param {HTMLElement} container
     * @memberof Preloader
     */

  }, {
    key: "preload",
    value: function preload(container, callback) {
      var _this = this;

      container = container || this.getContainer();
      var dataBgs = container.querySelectorAll('[data-image_lg]');
      var dataImages = container.querySelectorAll('img');
      this.loadFonts(function () {
        setTimeout(function () {
          var imgLoad = imagesLoaded('#masthead');

          for (var i = 0; i < dataImages.length; i++) {
            var el = dataImages[i];

            if (!(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(el.parentNode, 'r-image-mask')) {
              imgLoad.addImage(el);
            }
          }

          for (var j = 0; j < dataBgs.length; j++) {
            var _el = dataBgs[j];
            var src = '';

            if (_this.windowW >= 800 && _el.getAttribute('data-image_lg')) {
              src = _el.getAttribute('data-image_lg');
            } else {
              src = _el.getAttribute('data-image');
            }

            imgLoad.addBackground(src, _el);
          }

          imgLoad.on('always', function () {
            callback();
          });
        }, 80);
      });
    }
  }]);

  return Preloader;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/ScriptsLoader.js":
/*!*************************************************************!*\
  !*** ./_src/template/assets/js/components/ScriptsLoader.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScriptsLoader)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScriptsLoader = /*#__PURE__*/function () {
  function ScriptsLoader() {
    _classCallCheck(this, ScriptsLoader);

    this.scope = document;
    this.afterLoadFile = this.afterLoadFile.bind(this);
    this.init = this.init.bind(this);
    Theme.on('init_components', this.init);
  }

  _createClass(ScriptsLoader, [{
    key: "init",
    value: function init(firstLoad, scope) {
      // Do not eval scripts if page was loaded not via Ajax
      if (firstLoad) {
        return;
      }

      this.scope = scope || document;
      this.loadScripts();
    }
    /**
     * Get all scripts
     *
     * @returns {NodeList}
     * @memberof ScriptsLoader
     */

  }, {
    key: "getScripts",
    value: function getScripts() {
      return this.scope.querySelectorAll('script');
    }
  }, {
    key: "getFooterScripts",
    value: function getFooterScripts() {
      return document.querySelectorAll('#r-wp-footer script');
    }
    /**
     * Triggered after all scripts have been either loaded or confirmed broken.
     *
     * @memberof ScriptsLoader
     */

  }, {
    key: "allDone",
    value: function allDone() {
      Theme.trigger('script_loaded');
    }
    /**
     * Execute JavaScript scripts loaded via AJAX
     *
     * @memberof ScriptsLoader
     */

  }, {
    key: "loadScripts",
    value: function loadScripts() {
      // If we don't clone the results then "scripts"
      // will actually update live as we insert the new
      // tags, and we'll get caught in an endless loop
      this.scriptsClone = [];
      var scripts = this.getScripts();
      var footerScripts = this.getFooterScripts();

      for (var i = 0; i < scripts.length; i++) {
        this.scriptsClone.push(scripts[i]);
      }

      for (var _i = 0; _i < footerScripts.length; _i++) {
        this.scriptsClone.push(footerScripts[_i]);
      }

      this.totalLoaded = 0;
      this.totalScripts = this.scriptsClone.length;

      if (this.scriptsClone.length > 0) {
        this.LoadFile(this.scriptsClone[0]);
      }
    }
  }, {
    key: "afterLoadFile",
    value: function afterLoadFile() {
      this.totalLoaded++;

      if (this.totalLoaded >= this.totalScripts) {
        this.allDone();
      } else {
        this.LoadFile(this.scriptsClone[this.totalLoaded]);
      }
    }
  }, {
    key: "LoadFile",
    value: function LoadFile(script) {
      var _this = this;

      if (!script) {
        this.afterLoadFile();
      }

      var scriptSrc = script.getAttribute('src');
      var s = document.createElement('script'); // Copy all the attributes from the original script

      for (var j = 0; j < script.attributes.length; j++) {
        var a = script.attributes[j];
        s.setAttribute(a.name, a.value);
      }

      if (scriptSrc) {
        s.async = false;

        s.onload = function () {
          _this.afterLoadFile();
        };

        if (script && script.parentNode) {
          script.parentNode.replaceChild(s, script);
        }
      } else {
        s.appendChild(document.createTextNode(script.innerHTML));

        if (script && script.parentNode) {
          script.parentNode.replaceChild(s, script);
        }

        this.afterLoadFile();
      }
    }
  }]);

  return ScriptsLoader;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Scroll.js":
/*!******************************************************!*\
  !*** ./_src/template/assets/js/components/Scroll.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scroll)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Scroll = /*#__PURE__*/function () {
  function Scroll(options) {
    _classCallCheck(this, Scroll);

    // The default options
    this.options = Object.assign({
      scrollSpeed: parseFloat(saonara_js_options.scroll_speed),
      containerSelector: ".r-scroll-container",
      smooth: false,
      callback: null
    }, options);
    this.container = document.querySelector(this.options.containerSelector);
    this.targetY = 0;
    this.prevTarget = 0;
    this.prevScroll = 0;
    this.scrollY = 0;
    this.direction = "";
    this.isAnimated = false;
    this.isBlocked = false;
    this.rafId = null;
    this.init = this.init.bind(this);
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.update = this.update.bind(this);
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
    this.setBodyHeight = this.setBodyHeight.bind(this);
    this.initGlobal();
  }

  _createClass(Scroll, [{
    key: "initGlobal",
    value: function initGlobal() {
      Theme.on('transition_end', this.init);
      Theme.on('resize', this.resize);
      Theme.on('needsResize', this.setBodyHeight);
      Theme.on('leave_page', this.block);
      window.addEventListener("scroll", this.scroll);
      Theme.on('scroll_to_hash', this.scrollToElement.bind(this));
    }
  }, {
    key: "getSpeed",
    value: function getSpeed() {
      return this.options.scrollSpeed;
    }
  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return window.pageYOffset;
    }
  }, {
    key: "isSmooth",
    value: function isSmooth() {
      return this.options.smooth;
    }
  }, {
    key: "block",
    value: function block() {
      this.isBlocked = true;
      this.prevScroll = 0;
      this.scrolled = false;
      this.targetY = 0;
      this.scrollTarget = 0;
    }
  }, {
    key: "unblock",
    value: function unblock() {
      this.isBlocked = false;
    }
  }, {
    key: "init",
    value: function init(firstLoad, scope) {
      scope = scope || document;
      window.scrollTo(0, 0);
      this.container = scope.querySelector(this.options.containerSelector);
      this.prevScroll = 0;
      this.scrolled = false;
      this.targetY = 0;
      this.scrollTarget = 0;
      this.setBodyHeight();
      this.direction = '';
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.documentElement, 'scrolled');
      this.unblock();
    }
  }, {
    key: "onScrollTo",
    value: function onScrollTo() {
      if ("function" === typeof this.callback) {
        this.callback();
        this.callback = null;
      }
    }
  }, {
    key: "updateDirection",
    value: function updateDirection(targetY) {
      if (targetY < this.prevScroll && 'up' != this.direction) {
        this.direction = 'up';
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(document.body, 'scroll-up');
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.body, 'scroll-down');
      } else if (targetY > this.prevScroll && 'down' != this.direction) {
        this.direction = 'down';
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.body, 'scroll-up');
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(document.body, 'scroll-down');
      }
    }
  }, {
    key: "updateScroll",
    value: function updateScroll(scrollPos) {
      this.targetY += (scrollPos - this.targetY) * this.getSpeed();
      this.targetY = parseFloat(this.targetY.toFixed(2));

      if (this.isSmooth()) {
        this.container.style.transform = "translate3d(0, -" + this.targetY + "px, 0)";
      }

      if (this.scrollTarget > 0 && this.targetY.toFixed(0) <= this.scrollTarget) {
        this.onScrollTo();
        this.scrollTarget = 0;
      }
    }
  }, {
    key: "scroll",
    value: function scroll() {
      this.scrollY = this.getScrollTop();

      if (this.scrollY < 0) {
        this.scrollY = 0;
      }

      if (this.rafId) {
        window.cancelAnimationFrame(this.rafId);
      }

      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.isBlocked) {
        return false;
      }

      var scrollTop = this.scrollY;

      if (scrollTop > this.getOffset()) {
        if (!this.scrolled) {
          this.scrolled = true;
          (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(document.documentElement, 'scrolled');
        }
      } else {
        if (this.scrolled) {
          this.scrolled = false;
          (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(document.documentElement, 'scrolled');
        }
      }

      this.updateDirection(scrollTop);
      this.updateScroll(scrollTop);
      var obj = {
        targetY: this.targetY,
        scrollTop: scrollTop,
        direction: this.direction
      };
      this.options.callback(obj);
      this.prevScroll = scrollTop <= 0 ? 0 : scrollTop;

      if (this.targetY === this.prevTarget) {
        window.cancelAnimationFrame(this.rafId);
        return;
      }

      this.prevTarget = this.targetY;
      this.rafId = window.requestAnimationFrame(this.update);
    }
  }, {
    key: "getOffset",
    value: function getOffset() {
      return 30;
    }
  }, {
    key: "setBodyHeight",
    value: function setBodyHeight(container) {
      container = container || this.container;
      this.bodyH = container.querySelector(".r-scroll-inner").offsetHeight;

      if (this.isSmooth()) {
        document.body.style.height = this.bodyH + "px";
      } else {
        document.body.style.height = "";
      }

      Theme.stickyFooter();
    }
  }, {
    key: "scrollToElement",
    value: function scrollToElement(element) {
      if (!element) {
        return;
      }

      var header = document.getElementById("masthead");
      var pos = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.relativeOffsetTop)(element);

      if (header) {
        var rect = header.getBoundingClientRect();
        pos -= rect.top + rect.height + 50;
      }

      if (pos < 0) {
        pos = 0;
      }

      this.scrollTo(pos);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(targetY, callback) {
      var duration = 600;

      if (this.isSmooth()) {
        this.scrollTarget = targetY + 1;
        this.callback = callback;
        window.scrollTo(0, targetY);
      } else {
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.animScrollTo)(targetY, function () {
          if ("function" === typeof callback) {
            callback();
          }
        }, duration);
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      this.init();
    }
  }]);

  return Scroll;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Table.js":
/*!*****************************************************!*\
  !*** ./_src/template/assets/js/components/Table.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Table)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Table = /*#__PURE__*/function () {
  function Table(options) {
    _classCallCheck(this, Table);

    // The default options
    this.options = Object.assign({
      selector: '.entry-content > table',
      wrapperClassName: 'r-scroll-table'
    }, options);
    this.init = this.init.bind(this);
    Theme.on('init_components', this.init);
  }

  _createClass(Table, [{
    key: "getItems",
    value: function getItems(scope) {
      scope = scope || document;
      return scope.querySelectorAll(this.options.selector);
    }
  }, {
    key: "getWrapperClassName",
    value: function getWrapperClassName() {
      return this.options.wrapperClassName;
    }
  }, {
    key: "init",
    value: function init(firstLoad, scope) {
      var items = this.getItems(scope);
      var wrapClass = this.getWrapperClassName();

      for (var index = 0; index < items.length; index++) {
        var element = items[index];
        var wrap = document.createElement('div');
        wrap.className = wrapClass;
        element.parentNode.insertBefore(wrap, element);
        wrap.appendChild(element);
      }
    }
  }]);

  return Table;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/Widgets.js":
/*!*******************************************************!*\
  !*** ./_src/template/assets/js/components/Widgets.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Widgets)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Widgets = /*#__PURE__*/function () {
  function Widgets() {
    _classCallCheck(this, Widgets);

    this.init = this.init.bind(this);
    Theme.on('init_components', this.init);
  }

  _createClass(Widgets, [{
    key: "getArchiveWidgets",
    value: function getArchiveWidgets(scope) {
      return scope.querySelectorAll('.widget_archive select');
    }
  }, {
    key: "getGategoriesWidgets",
    value: function getGategoriesWidgets(scope) {
      return scope.querySelectorAll('.widget_categories select');
    }
  }, {
    key: "getItems",
    value: function getItems(scope) {
      scope = scope || document;
      return scope.querySelectorAll(this.getSelector());
    }
  }, {
    key: "init",
    value: function init(firstLoad, scope) {
      var archiveItems = this.getArchiveWidgets(scope);
      var categoriesItems = this.getGategoriesWidgets(scope);

      var _loop = function _loop(index) {
        var element = archiveItems[index];

        element.onchange = function () {
          if (element.options[element.selectedIndex].value !== '') {
            document.location.href = this.options[this.selectedIndex].value;
          }
        };
      };

      for (var index = 0; index < archiveItems.length; index++) {
        _loop(index);
      }

      var _loop2 = function _loop2(_index) {
        var element = categoriesItems[_index];

        element.onchange = function () {
          if (element.options[element.selectedIndex].value > 0) {
            element.parentNode.submit();
          }
        };
      };

      for (var _index = 0; _index < categoriesItems.length; _index++) {
        _loop2(_index);
      }
    }
  }]);

  return Widgets;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/barbaHandler.js":
/*!************************************************************!*\
  !*** ./_src/template/assets/js/components/barbaHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BarbaHandler)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
/* harmony import */ var _barbaTransitions_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../barbaTransitions/default */ "./_src/template/assets/js/barbaTransitions/default.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var BarbaHandler = /*#__PURE__*/function () {
  function BarbaHandler() {
    _classCallCheck(this, BarbaHandler);

    this.initBarba();
    this.linkClicked = false;
  }

  _createClass(BarbaHandler, [{
    key: "replaceMeta",
    value: function replaceMeta(newPageRawHTML) {
      var head = document.head,
          newPageRawHead = newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
          newPageHead = document.createElement('head');
      newPageHead.innerHTML = newPageRawHead;
      var headTags = ["meta[name='keywords']", "meta[name='description']", "meta[property^='og']", "meta[name^='twitter']", "meta[itemprop]", "link[itemprop]", "link[rel='prev']", "link[rel='next']", "link[rel='canonical']", "link[rel='alternate']"].join(',');
      var oldHeadTags = head.querySelectorAll(headTags);

      for (var i = 0; i < oldHeadTags.length; i++) {
        head.removeChild(oldHeadTags[i]);
      }

      var newHeadTags = newPageHead.querySelectorAll(headTags);

      for (var _i = 0; _i < newHeadTags.length; _i++) {
        head.appendChild(newHeadTags[_i]);
      }
    }
  }, {
    key: "customAction",
    value: function customAction(newHtmlEl) {}
  }, {
    key: "replaceWpFooter",
    value: function replaceWpFooter(newHtmlEl) {
      var statPixel = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('img#wpstats');
      var oldContainer = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#r-wp-footer');
      var newContainer = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#r-wp-footer', newHtmlEl);
      var adminBar = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)('#wpadminbar', newHtmlEl);

      if (statPixel) {
        statPixel.remove();
      }

      if (adminBar) {
        adminBar.style.position = 'fixed';
      }

      if (oldContainer) {
        oldContainer.innerHTML = '';
      }

      if (newContainer && oldContainer) {
        oldContainer.innerHTML = newContainer.innerHTML;
      }
    }
  }, {
    key: "setActiveMenuItems",
    value: function setActiveMenuItems(newHtmlEl) {
      // Update current menu item
      var newItems = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.menu-item.current-menu-item', newHtmlEl);
      var oldItems = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.menu-item.current-menu-item');
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(oldItems, 'current-menu-item');
      newItems.forEach(function (item) {
        var menuItems = document.querySelectorAll(".".concat(item.getAttribute('id')));
        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(menuItems, 'current-menu-item');
      }); // Update current menu ancestor

      newItems = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.menu-item.current-menu-ancestor', newHtmlEl);
      oldItems = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qsa)('.menu-item.current-menu-ancestor');
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(oldItems, 'current-menu-ancestor');
      newItems.forEach(function (item) {
        var menuItem = document.getElementById(item.getAttribute('id'));

        if (menuItem) {
          (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(menuItem, 'current-menu-ancestor');
        }
      });
    }
  }, {
    key: "initBarba",
    value: function initBarba() {
      var _this = this;

      Barba.Utils.xhrTimeout = 4000;
      Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck; //Disable Cache

      Barba.Pjax.cacheEnabled = false; // Prevent load new content on link hover

      Barba.Prefetch.onLinkEnter = function (event) {
        return false;
      };
      /**
      * This function needs to be called as soon the Transition is finished
      *
      * @memberOf Barba.BaseTransition
      */


      Barba.BaseTransition.done = function () {
        this.deferred.resolve();
      };

      Barba.Pjax.init();
      Barba.Prefetch.init();
      Barba.Pjax.lastClicked = null;
      Barba.Pjax.preventCheck = this.preventCheck;
      Barba.Dispatcher.on('initStateChange', function () {
        _this.linkClicked = false; // Google Analytics

        if (Barba.HistoryManager.history.length > 0 && typeof ga === 'function') {
          ga('send', 'pageview', location.pathname);
        }
      });
      Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {
        var response = newPageRawHTML.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', newPageRawHTML);
        var newHtmlEl = document.createElement('html');
        newHtmlEl.innerHTML = response;
        var newBody = newHtmlEl.getElementsByTagName('notbody');

        if (newBody.length) {
          _this.bodyClasses = newBody[0].getAttribute('class');
        } else {
          _this.bodyClasses = '';
        }

        _this.setActiveMenuItems(newHtmlEl);

        _this.replaceMeta(response); // Replace wp-footer


        _this.replaceWpFooter(newHtmlEl); // For custom actions


        _this.customAction(newHtmlEl);
      });
      /**
       * Function called as soon the transition is finished
       *
       */

      Barba.Dispatcher.on('transitionCompleted', function () {
        _this.linkClicked = false; // Set new body classes

        document.body.setAttribute('class', _this.bodyClasses); //Scroll to hash

        (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.scrollToHash)();
      });
      /**
       * Return a transition object
       *
       * @return {Barba.Transition} Transition object
       */

      Barba.Pjax.getTransition = function () {
        return (0,_barbaTransitions_default__WEBPACK_IMPORTED_MODULE_1__.defaultTransition)();
      };

      Barba.Dispatcher.on('linkClicked', function (anchor) {
        Barba.Pjax.lastClicked = anchor;
        _this.linkClicked = true;
      });
    }
    /**
     * Determine if the link should be followed
     * By adding .no-barba class to the element, you can also deactivate pjax transition.
     *
     * @param  {MouseEvent} event
     * @param  {HTMLElement} element
     * @return {Boolean}
     */

  }, {
    key: "preventCheck",
    value: function preventCheck(event, element) {
      if (element && element.hash) {
        if ('#' === element.hash.charAt(0) && Barba.Utils.cleanLink(element.href) === Barba.Utils.cleanLink(window.location.href)) {
          if ('cancel-comment-reply-link' === element.getAttribute('id')) {
            return false;
          }

          var target = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.qs)(element.hash);

          if (target) {
            event.preventDefault();
            Theme.trigger('scroll_to_hash', [target]);
            return false;
          }
        }
      }

      if (!Barba.Pjax.originalPreventCheck(event, element)) {
        return false;
      } // If is Customize Preview


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(document.body, 'ajax-disabled')) {
        return false;
      } // If is admin bar link


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element, 'ab-item')) {
        return false;
      } // If is comment reply link


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element, 'comment-reply-link')) {
        return false;
      } // If is comment edit link


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element, 'comment-edit-link')) {
        return false;
      }

      if (element.href) {
        // If is admin link
        if (element.href.indexOf('wp-admin') >= 0) {
          return false;
        }
      } // Add to cart


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element, 'ajax_add_to_cart')) {
        return false;
      } // Remove/Restore cart item


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element, 'remove') && element.getAttribute('data-product_id') || (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element, 'remove_from_cart_button') || (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element, 'restore-item')) {
        return false;
      } // Download product


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(element.parentNode, 'download-file')) {
        return false;
      } // If link is an image


      if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.linkIsMedia)(element)) {
        return false;
      }

      if ('function' === typeof Theme.customPreventCheck) {
        return Theme.customPreventCheck(event, element);
      } else {
        return true;
      }
    }
  }]);

  return BarbaHandler;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/webgl/Background.js":
/*!****************************************************************!*\
  !*** ./_src/template/assets/js/components/webgl/Background.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GL_Background)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GL_Background = /*#__PURE__*/function () {
  function GL_Background(options) {
    _classCallCheck(this, GL_Background);

    this.gl = options.gl;
    this.el = options.el;
    this.srcWidth = 0;
    this.srcHeight = 0;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.time = 0;
    this.bounds = {};
    this.offset = 0;
    this.threshold = 100;
    this.speed = 1;
    this.parallax = 1;
    this.parallaxOffset = 0;
    this.isRounded = options.isRounded;
    this.color = this.getColor();
    this.start = 0;
    this.duration = 1000;
    this.end = 0;
    this.resize();
  }

  _createClass(GL_Background, [{
    key: "inView",
    value: function inView(scrollPos) {
      var threshold = this.threshold;
      scrollPos = scrollPos || 0;
      var rect = this.bounds,
          offset = this.offset,
          target = scrollPos * this.speed,
          transform = (this.y - scrollPos) * this.speed + this.parallaxOffset,
          start = rect.y + offset - target,
          end = rect.bottom + offset - target;
      return {
        isVisible: start < threshold + Theme.windowH && end > -threshold,
        start: start,
        end: end,
        transform: transform
      };
    }
  }, {
    key: "getColor",
    value: function getColor() {
      var container = this.el;
      var bgColor = container.style.backgroundColor;

      if (!bgColor) {
        bgColor = window.getComputedStyle(container).getPropertyValue('background-color');
      }

      if (bgColor) {
        container.setAttribute('data-bg-color', bgColor);
        container.style.backgroundColor = 'transparent';
      }

      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getRGBA)(bgColor, true);
    }
  }, {
    key: "getScale",
    value: function getScale() {
      var containerRatio = this.width / this.height,
          imageRatio = this.srcWidth / this.srcHeight,
          scale = {
        x: 1,
        y: 1
      };

      if (imageRatio < containerRatio) {
        scale.x = 1;
        scale.y = imageRatio / containerRatio;
      } else {
        if (imageRatio > containerRatio) {
          scale.x = containerRatio / imageRatio;
          scale.y = 1;
        }
      }

      return scale;
    }
  }, {
    key: "easing",
    value: function easing(t) {
      var t1 = t - 1;
      return 1 - t1 * t1 * t1 * t1;
    }
  }, {
    key: "render",
    value: function render(program, bufferInfo, scrollY, diff, force) {
      if (!this.width || !this.height) {
        return;
      }

      var t = this.inView(scrollY),
          y = t.transform.toFixed(2),
          x = this.x,
          now = Date.now(),
          diffTarget = 0,
          anim = 0,
          alpha = 1,
          xTarget = 0;
      this.isVisible = t.isVisible;

      if (this.isVisible || force) {
        var uMatrix = twgl.m4.identity(),
            uTMatrix = twgl.m4.identity();

        if (this.isRounded && !this.start) {
          this.start = Date.now();
          this.end = this.start + this.duration;
        }

        this.time++;

        if (this.isRounded && now - this.start < this.duration) {
          var p = (now - this.start) / this.duration;
          anim = this.easing(p);
          diffTarget = 1.5 + (0 - 1.5) * anim;
          xTarget = 100 + (0 - 100) * anim;
          alpha = 0 + 1 * anim;
          diff += diffTarget;

          if (this.x < Theme.windowW / 2) {
            x -= xTarget;
          } else {
            x += xTarget;
          }
        }

        twgl.m4.scale(uTMatrix, [this.scale.x, this.scale.y, 1], uTMatrix);
        twgl.m4.ortho(0, this.gl.canvas.width, this.gl.canvas.height, 0, -1, 1, uMatrix);
        twgl.m4.translate(uMatrix, [x, y, 1], uMatrix);
        twgl.m4.scale(uMatrix, [this.width, this.height, 1], uMatrix);
        twgl.setUniforms(program, {
          uMatrix: uMatrix,
          uTMatrix: uTMatrix,
          uTex: null,
          isBg: 1,
          isRounded: this.isRounded ? 1 : 0,
          uColor: this.color,
          has_texture: 0,
          uDiff: diff,
          uAlpha: alpha,
          uTime: this.time
        });
        twgl.drawBufferInfo(this.gl, bufferInfo);
      }
    }
  }, {
    key: "resize",
    value: function resize(scrollPos) {
      var windowH = Theme.windowH;
      var rect = this.el.getBoundingClientRect();
      var speed = parseFloat(this.el.getAttribute('data-parallax') || 1);
      var top = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.relativeOffsetTop)(this.el, document.body, true);
      this.speed = speed;
      this.parallax = 1 / speed;
      this.bounds = {
        y: top,
        bottom: top + rect.height,
        height: rect.height
      };
      this.width = rect.width;
      this.height = rect.height;
      this.x = rect.width / 2 + rect.x;
      this.y = (rect.height / 2 + top) * this.parallax;
      this.parallaxOffset = (top - windowH / 2) * this.speed - (top - windowH / 2);
      this.offset = this.speed + this.parallaxOffset;
      this.scale = this.getScale();
    }
  }]);

  return GL_Background;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/webgl/CanvasBack.js":
/*!****************************************************************!*\
  !*** ./_src/template/assets/js/components/webgl/CanvasBack.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasBack)
/* harmony export */ });
/* harmony import */ var _Texture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Texture */ "./_src/template/assets/js/components/webgl/Texture.js");
/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Background */ "./_src/template/assets/js/components/webgl/Background.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var CanvasBack = /*#__PURE__*/function () {
  function CanvasBack(options) {
    _classCallCheck(this, CanvasBack);

    this.ctxSelector = options.ctxSelector;
    this.gl = null;
    this.items = [];
    this.oldItems = [];
    this.needsUpdate = false;
    this.rafId = null;
    this.render = this.render.bind(this);
    this.renderTextures = this.renderTextures.bind(this);
    this.init = this.init.bind(this);
    this.initItems = this.initItems.bind(this);
    this.resize = this.resize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    Theme.on('transition_end', this.initItems);
    Theme.on('scroll', this.onScroll);
    Theme.on('resize', this.resize);
    Theme.on('needsResize', this.resize);
    this.init();
  }

  _createClass(CanvasBack, [{
    key: "init",
    value: function init() {
      if (Theme.windowW < 768) {
        return;
      }

      if (!(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(document.documentElement, 'r-smooth-scroll')) {
        return;
      }

      if (Theme.windowW < 1200 && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(document.documentElement, 'r-webgl--md')) {
        return;
      }

      this.ctx = document.querySelector(this.ctxSelector);

      if (!this.ctx) {
        return;
      }

      this.gl = this.ctx.getContext('webgl');

      if (!this.gl) {
        return;
      }

      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      twgl.resizeCanvasToDisplaySize(this.gl.canvas);
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
      this.scrollY = window.pageYOffset || 0;
      this.dist = 0;
      this.diff = 0;
      this.time = 0;
      this.program = this.createProgram();
      this.bufferInfo = twgl.primitives.createPlaneBufferInfo(this.gl, 1, 1, 15, 15);
      this.useProgram();
    }
  }, {
    key: "getVS",
    value: function getVS() {
      return "\n        precision mediump float;\n        attribute vec3 position;\n        attribute vec2 texcoord;\n        uniform mat4 uMatrix;\n        uniform mat4 uTMatrix;\n        uniform vec2 uOffset;\n        uniform float uDiff;\n        uniform float uTime;\n        uniform float isBg;\n        uniform float isCover;\n        uniform float isRounded;\n        varying vec2 vTexcoord;\n            \n        void main() {\n            vec3 pos = position.xzy;\n            vec2 uv = vTexcoord;\n                    \n            // if ( isBg < 0.5 || isRounded > 0.5 ){\n                float bending = (cos(uTime * .0015 + pos.x * 3.025) + sin(uTime * .01 + pos.y * 12.30)) * 2.;\n                float effect = bending * uDiff;\n                pos.y += effect / 11. * cos(pos.y) * sin(pos.y);\n            // }\n            \n            gl_Position = uMatrix * vec4(pos, 1.0);\n            \n            vTexcoord = (uTMatrix * vec4(texcoord - vec2(.5), 0, 1)).xy + vec2(.5);\n            \n       }";
    }
  }, {
    key: "getFS",
    value: function getFS() {
      return "\n        precision mediump float;\n        varying vec2 vTexcoord;\n        uniform vec2 offset;\n        uniform vec2 scale;\n        uniform sampler2D uTex;\n        uniform vec4 uColor;\n        uniform float uAlpha;\n        uniform float isBg;\n        uniform float isRounded;\n        uniform float uTime;\n        uniform float has_texture;\n        \n\n        void main() {\n            \n            vec2 dist = vTexcoord - vec2(0.5);\n            float mixAmount = 1.0 - (uTime * 1.5) / 100.0;\n            float radius = 1.0;   \n            float circle = 1.0 - smoothstep(radius - 0.02, radius, dot(dist, dist) * 4.1);\n            \n            if ( mixAmount < 0.0 ) {\n                mixAmount = 0.0;\n            }\n        \n            float _scaleX = scale.x - 1.0;\n            float _scaleY = scale.y - 1.0;\n            float x = vTexcoord.x - ( vTexcoord.x * _scaleX ) * 0.5 + _scaleX * 0.25 + offset.x;\n            float y = vTexcoord.y - ( vTexcoord.y * _scaleY ) * 0.5 + _scaleY * 0.25 + offset.y;\n        \n            float dx = x;\n            float dy = y;\n            if( dx > 1.0 ) {\n                dx = 2.0 - x;\n            }\n            if( dx < 0.0 ) {\n                dx = -1.0 * x;\n            }\n            if( dy > 1.0 ) {\n                dy = 2.0 - y;\n            }\n            if( dy < 0.0 ) {\n                dy = -1.0 * y;\n            }\n        \n           \n            vec2 uv_displaced = vec2( dx, dy ); \n            vec4 tex = texture2D( uTex, uv_displaced );\n   \n            if ( uAlpha < 1.0 && mixAmount < uAlpha ) {\n                mixAmount = uAlpha;\n            }\n            \n            if ( isBg > 0.5 && isRounded > .5 ) {\n                gl_FragColor = circle < 0.5 ? mix(vec4(0), uColor, circle) : mix(vec4(0), uColor, uAlpha);\n            } else if ( isBg > 0.5 ) { \n\n                gl_FragColor = uColor;\n                \n            } else if ( has_texture < 0.5 ) {\n                \n                gl_FragColor = isRounded > .5 && circle < 0.5 ? mix(vec4(0), uColor, circle) : uColor;\n                \n            } else {\n                \n                if ( isRounded > .5 ) {\n                    if ( circle < 0.5 ) {\n                        \n                        gl_FragColor = mix(vec4(0), uColor, circle);\n                        \n                    } else {\n                        gl_FragColor = mixAmount == 0.0 ? tex : mix(tex, uColor, mixAmount);\n                    }\n                } else {\n                    gl_FragColor = mixAmount == 0.0 ? tex : mix(tex, uColor, mixAmount);\n                }\n                \n            }\n\n        }";
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.resetAnim();

      for (var i = 0; i < this.oldItems.length; i++) {
        var item = this.oldItems[i];
        this.gl.deleteTexture(item.texture);
      }

      this.oldItems = [];
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this = this;

      if (!this.gl) {
        return;
      }

      this.scrollY = Theme.scroll.target;
      this.time = 0;
      this.dist = 0;
      this.diff = 0;
      twgl.resizeCanvasToDisplaySize(this.gl.canvas);
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
      setTimeout(function () {
        for (var i = 0; i < _this.items.length; i++) {
          _this.items[i].resize();
        }

        _this.renderTextures();
      }, 50);
      this.resetAnim();
    }
  }, {
    key: "resetAnim",
    value: function resetAnim() {
      this.isAnimating = false;
      this.time = 0;

      if (this.rafId) {
        window.cancelAnimationFrame(this.rafId);
      }
    }
  }, {
    key: "addBg",
    value: function addBg(el) {
      var bgEl = new _Background__WEBPACK_IMPORTED_MODULE_1__["default"]({
        el: el,
        gl: this.gl,
        isRounded: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(el, 'is-style-rounded')
      });
      this.items.push(bgEl);
    }
  }, {
    key: "addTexture",
    value: function addTexture(el, options) {
      var glImage = new _Texture__WEBPACK_IMPORTED_MODULE_0__["default"]({
        img: el,
        gl: this.gl,
        url: options && options.url ? options.url : '',
        options: options ? options : {},
        container: options && options.container ? options.container : '',
        onLoad: this.render
      });
      this.items.push(glImage);
    }
  }, {
    key: "getCoverUrl",
    value: function getCoverUrl(el) {
      var imgUrl = '';

      if (!el) {
        return '';
      }

      if (Theme.windowW < 768) {
        imgUrl = el.getAttribute('data-url-sm');
      } else {
        imgUrl = el.getAttribute('data-url');
      }

      return imgUrl || '';
    }
  }, {
    key: "getSelectors",
    value: function getSelectors() {
      var items = ['.wp-block-cover.gl-image > .r-cover-mask > .r-cover-image', '.wp-block-image.gl-image img', '.wp-block-gallery.gl-image:not(.is-style-carousel) img', '.wp-block-media-text.gl-image .wp-block-media-text__media img', '.wc-block-grid.gl-image li img', '.item-thumb.gl-image img', '.post-thumbnail.gl-image img', '.wp-block-latest-posts.gl-image img', '.r-product__link.gl-image img'];
      return items.join(', ');
    }
  }, {
    key: "getBgSelectors",
    value: function getBgSelectors() {
      var items = ['.has-background:not(.no-gl):not(.wp-block-button__link):not(.wp-block-separator)'];
      return items.join(', ');
    }
  }, {
    key: "getImages",
    value: function getImages(scope) {
      if (Theme.windowW < 768) {
        return [];
      } else {
        return scope.querySelectorAll(this.getSelectors());
      }
    }
  }, {
    key: "getBgs",
    value: function getBgs(scope) {
      return scope.querySelectorAll(this.getBgSelectors());
    }
  }, {
    key: "getCircle",
    value: function getCircle(scope) {
      return scope.querySelectorAll('.r-circle');
    }
  }, {
    key: "isExternal",
    value: function isExternal(url) {
      if (!url) {
        return true;
      }

      return url.indexOf(saonara_js_options.homeurl) < 0;
    }
  }, {
    key: "initItems",
    value: function initItems(firstLoad, scope) {
      this.firstLoad = firstLoad;

      if (!firstLoad) {
        this.oldItems = this.items;
        this.destroy();
      }

      this.items = [];

      if (Theme.windowW < 768) {
        return;
      }

      if (!this.gl) {
        return;
      }

      this.scrollY = window.pageYOffset;
      this.dist = 0;
      this.diff = 0;
      this.time = 0;
      var images = this.getImages(scope);
      var bgs = this.getBgs(scope);
      var circle = this.getCircle(scope);

      for (var i = 0; i < bgs.length; i++) {
        var bgEl = bgs[i];

        if (!bgEl.getAttribute('data-bg-color')) {
          this.addBg(bgEl);
        }
      }

      for (var _i = 0; _i < circle.length; _i++) {
        var circleEl = circle[_i];

        if (!circleEl.getAttribute('data-bg-color')) {
          this.addBg(circleEl);
        }
      }

      for (var _i2 = 0; _i2 < images.length; _i2++) {
        var isExternalImage = false;
        var container = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.getCurrentParent)(images[_i2], '.gl-image');
        var options = {
          scale: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'gl-scale'),
          toTop: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'gl-top'),
          toBottom: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'gl-bottom'),
          toLeft: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'gl-left'),
          toRight: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'gl-right'),
          isRounded: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'is-style-rounded')
        };

        if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'wp-block-cover')) {
          options.url = this.getCoverUrl(container.querySelector('.r-cover-image'));
          options.container = images[_i2].parentNode;
          options.isCover = true;
          isExternalImage = this.isExternal(options.url);
        } else if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'wp-block-media-text') && (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(container, 'is-image-fill')) {
          var block = container.querySelector('.wp-block-media-text__media');
          options.url = this.getCoverUrl(container);
          options.container = block;
          isExternalImage = this.isExternal(options.url);
        } else {
          if ((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.hasClass)(images[_i2].parentNode, 'r-image-mask')) {
            options.container = images[_i2].parentNode;
          }

          isExternalImage = this.isExternal(images[_i2].getAttribute('src'));
        }

        if (isExternalImage) {
          images[_i2].style.display = 'block';
          images[_i2].style.visibility = 'visible';
        } else {
          this.addTexture(images[_i2], options);
        }
      }

      if (!this.isAnimating) {
        this.render();
        this.isAnimating = true;
      }
    }
  }, {
    key: "clearCtx",
    value: function clearCtx() {
      var gl = this.gl;

      if (!gl) {
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }, {
    key: "renderTexture",
    value: function renderTexture(item) {
      item.render(this.program, this.bufferInfo, this.scrollY, this.diff);
    }
  }, {
    key: "renderTextures",
    value: function renderTextures() {
      this.time++;
      this.clearCtx();

      for (var i = 0; i < this.items.length; i++) {
        this.renderTexture(this.items[i]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var frames = 80;
      this.needsUpdate = false;

      if (this.diff.toFixed(3) != 0) {
        this.time = 0; //reset timer
      }

      if (this.time <= frames) {
        this.needsUpdate = true;
      } else {
        this.needsUpdate = false;
      }

      if (this.needsUpdate) {
        this.renderTextures();
      } else {
        this.resetAnim();
        return;
      }

      this.rafId = window.requestAnimationFrame(this.render);
    }
  }, {
    key: "onLoadTexture",
    value: function onLoadTexture() {
      this.time = 0;

      if (!this.isAnimating) {
        this.render();
        this.isAnimating = true;
      }
    }
  }, {
    key: "onScroll",
    value: function onScroll(obj) {
      var smoothY = obj.targetY,
          scrollPos = obj.scrollTop;
      this.scrollY = smoothY;
      this.dist += .1 * (scrollPos - this.dist);
      this.diff = .002 * (scrollPos - this.dist);

      if (this.diff > 1) {
        this.diff = 1;
      } else if (this.diff < -1) {
        this.diff = -1;
      }

      if (!this.isAnimating) {
        this.render();
        this.isAnimating = true;
      }
    }
  }, {
    key: "useProgram",
    value: function useProgram() {
      var gl = this.gl;
      var pr = this.program;
      gl.useProgram(pr.program);
      twgl.setBuffersAndAttributes(gl, pr, this.bufferInfo);
    }
  }, {
    key: "createProgram",
    value: function createProgram() {
      return twgl.createProgramInfo(this.gl, [this.getVS(), this.getFS()]);
    }
  }]);

  return CanvasBack;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/webgl/CanvasFront.js":
/*!*****************************************************************!*\
  !*** ./_src/template/assets/js/components/webgl/CanvasFront.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasFront)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var CanvasFront = /*#__PURE__*/function () {
  function CanvasFront(options) {
    _classCallCheck(this, CanvasFront);

    this.ctxSelector = options.ctxSelector;
    this.gl = null;
    this.isActive = false;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.resize = this.resize.bind(this);
    this.init();
    Theme.on('show_menu', this.show);
    Theme.on('hide_menu', this.hide);
    Theme.on('resize', this.resize);
  }

  _createClass(CanvasFront, [{
    key: "init",
    value: function init() {
      this.ctx = document.querySelector(this.ctxSelector);

      if (this.ctx) {
        this.gl = this.ctx.getContext("webgl");
      } else {
        return;
      }

      if (!this.gl) {
        return;
      }

      twgl.resizeCanvasToDisplaySize(this.gl.canvas);
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
      this.el = null;
      this.duration = 400;
      this.width = Theme.windowW;
      this.height = Theme.windowH;
      this.x = this.width / 2;
      this.y = this.height / 2;
      this.time = 0;
      this.uniforms = {
        vertScale: 1,
        fragScale: 1,
        color: this.getColor()
      };
      this.program = this.createProgram();
      this.bufferInfo = twgl.primitives.createPlaneBufferInfo(this.gl, 1, 1, 15, 15);
      this.useProgram();
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;

      if (this.isActive) {
        return;
      }

      this.isActive = true;
      this.setBg(document.getElementById('site-navigation'));
      var attrs = {
        y: this.height * -0.5,
        diff: 1
      };
      this.dist = 0;
      this.time = 0;
      anime({
        targets: attrs,
        y: this.height / 2,
        diff: 0,
        duration: this.duration,
        easing: 'easeInOutQuad',
        update: function update() {
          _this.y = attrs.y;
          _this.dist += .1 * (attrs.y - _this.dist);
          _this.diff = attrs.diff;
          _this.time++;

          _this.render();
        }
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      this.isActive = false;
      var attrs = {
        y: this.height / 2,
        diff: 1.5
      };
      this.dist = 0;
      this.time = 0;
      anime({
        targets: attrs,
        y: this.height * -0.5,
        diff: 0,
        duration: this.duration,
        easing: 'easeInOutQuad',
        update: function update() {
          _this2.y = attrs.y;
          _this2.dist += .1 * (attrs.y - _this2.dist);
          _this2.diff = attrs.diff;
          _this2.time++;

          _this2.render();
        }
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      this.time = 0;
      this.dist = 0;
      this.diff = 0;
      this.x = this.width / 2;
      this.y = this.height / 2;
      twgl.resizeCanvasToDisplaySize(this.gl.canvas);
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

      if (this.isActive) {
        this.render();
      }
    }
  }, {
    key: "setDuration",
    value: function setDuration() {
      if (!this.el) {
        return;
      }

      this.duration = this.el.getAttribute('data-duration') || 400;
    }
  }, {
    key: "setBg",
    value: function setBg(el) {
      if (!el) {
        return;
      }

      this.el = el;
      this.uniforms.color = this.getColor();
      this.setDuration();
    }
  }, {
    key: "getColor",
    value: function getColor() {
      if (!this.el) {
        return [0, 0, 0, 1];
      }

      var container = this.el;
      var colorAttr = container.getAttribute('data-bg-color');
      var rgbColor = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hexToRgb)(colorAttr);

      if (rgbColor) {
        return [rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255, 1];
      } else {
        return [0, 0, 0, 1];
      }
    }
  }, {
    key: "clearCtx",
    value: function clearCtx() {
      var gl = this.gl;

      if (!gl) {
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }, {
    key: "render",
    value: function render() {
      var uMatrix = twgl.m4.identity(),
          uTMatrix = twgl.m4.identity();
      this.clearCtx();
      twgl.m4.scale(uTMatrix, [1, 1, 1], uTMatrix);
      twgl.m4.ortho(0, this.width, this.height, 0, -1, 1, uMatrix);
      twgl.m4.translate(uMatrix, [this.x, this.y, 1], uMatrix);
      twgl.m4.scale(uMatrix, [this.width, this.height, 1], uMatrix);
      twgl.setUniforms(this.program, {
        uMatrix: uMatrix,
        uTMatrix: uTMatrix,
        uFragScale: this.uniforms.fragScale,
        uColor: this.uniforms.color,
        uDiff: this.diff,
        uTime: this.time
      });
      twgl.drawBufferInfo(this.gl, this.bufferInfo);
    }
  }, {
    key: "useProgram",
    value: function useProgram() {
      var gl = this.gl;
      var pr = this.program;
      gl.useProgram(pr.program);
      twgl.setBuffersAndAttributes(gl, pr, this.bufferInfo);
    }
  }, {
    key: "createProgram",
    value: function createProgram() {
      return twgl.createProgramInfo(this.gl, ["\n       precision mediump float;\n       attribute vec3 position;\n       attribute vec2 texcoord;\n       uniform mat4 uMatrix;\n       uniform float uDiff;\n       uniform float uTime;\n       varying vec2 vTexcoord;\n       void main() {\n            vec3 pos = position.xzy;\n            vec2 uv = vTexcoord;\n\n            float bending = (cos(uTime * .0015 + pos.x * 3.025) + sin(uTime * .01 + pos.y * 12.30)) * 2.;\n            float effect = bending * uDiff;\n            pos.y += effect / 11. * cos(pos.y) * sin(pos.y);\n           \n            gl_Position = uMatrix * vec4(pos, 1.0);\n\n       }", "precision mediump float;\n       uniform vec4 uColor;\n\n       void main() {\n\n            gl_FragColor = uColor;\n          \n       }"]);
    }
  }]);

  return CanvasFront;
}();



/***/ }),

/***/ "./_src/template/assets/js/components/webgl/Texture.js":
/*!*************************************************************!*\
  !*** ./_src/template/assets/js/components/webgl/Texture.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GL_Texture)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GL_Texture = /*#__PURE__*/function () {
  function GL_Texture(options) {
    _classCallCheck(this, GL_Texture);

    this.gl = options.gl;
    this.img = options.img;
    this.url = options.url || '';
    this.opt = options.options;
    this.container = options.container || options.img;
    this.defaultColor = [0, 0, 0, 0];
    this.onLoad = options.onLoad || false;
    this.loaded = 0;
    this.srcWidth = 0;
    this.srcHeight = 0;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.time = 0;
    this.bounds = {};
    this.offset = 0;
    this.scaleFactor = 1.4;
    this.speed = 1;
    this.parallax = 1;
    this.parallaxOffset = 0;
    this.isRounded = options.options.isRounded;
    this.isCover = options.isCover || options.url ? true : false;
    this.alpha = 1;
    this.threshold = 100;
    this.isVisible = false;
    this.uniforms = {
      parallax: 0,
      fragScale: 1,
      color: this.defaultColor,
      time: -30
    };
    this.init();
  }

  _createClass(GL_Texture, [{
    key: "getOverlayColor",
    value: function getOverlayColor(el) {
      var color = el.style.backgroundColor;

      if (!color) {
        color = window.getComputedStyle(el).getPropertyValue('background-color');
      }

      if (color) {
        color = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.rgb2hex)(color);
      }

      el.style.backgroundColor = 'transparent';
      return color;
    }
  }, {
    key: "getCoverUrl",
    value: function getCoverUrl() {
      var imgUrl = '';
      var mask = this.container.querySelector('.r-cover-image');

      if (!mask) {
        return this.url;
      }

      if (this.width < 768) {
        imgUrl = mask.getAttribute('data-url-sm');
      } else if (this.width < 1400) {
        imgUrl = mask.getAttribute('data-url-lg');
      } else {
        imgUrl = mask.getAttribute('data-url');
      }

      return imgUrl || this.url;
    }
  }, {
    key: "init",
    value: function init() {
      if (this.img) {
        this.parentLink = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getCurrentParent)(this.img, 'a', '.gl-image');
        this.parent = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getCurrentParent)(this.img, '.wp-block-image, .item-thumb', '.gl-image');
        this.lazy = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getCurrentParent)(this.container, '.r-lazy-image', '.gl-image');

        if (Theme.windowW > 3000 && this.img.getAttribute('data-url-full')) {
          this.img.setAttribute('src', this.img.getAttribute('data-url-full'));
        }
      }

      this.resize();

      if (this.isCover) {
        this.url = this.getCoverUrl();
        var cover = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getCurrentParent)(this.container, '.wp-block-cover', '.gl-image');
        this.img = new Image();
        this.img.setAttribute('src', this.url);

        if (cover) {
          this.img.setAttribute('data-color', this.getOverlayColor(cover));
          this.alpha = cover.getAttribute('data-alpha');
        }
      }

      this.uniforms.color = this.getColor();
    }
  }, {
    key: "inView",
    value: function inView(scrollPos) {
      scrollPos = scrollPos || 0;
      var threshold = this.threshold,
          wH = Theme.windowH,
          rect = this.bounds,
          offset = this.offset,
          percentage = 0,
          target = scrollPos * this.speed,
          transform = (this.y - scrollPos) * this.speed + this.parallaxOffset,
          start = rect.y + offset - target,
          end = rect.bottom + offset - target,
          isVisible = start < threshold + wH && end > -threshold;

      if (isVisible) {
        percentage = (scrollPos + wH - rect.y) / ((wH + rect.height) / 100);
      } else {
        percentage = 0;
      }

      return {
        isVisible: isVisible,
        start: start,
        end: end,
        percentage: percentage,
        transform: transform
      };
    }
  }, {
    key: "intersectRatio",
    value: function intersectRatio(imageHeight, start, end) {
      var cmDesiredHeight;
      var diff = start - Theme.windowH;
      var current = 1 * (Theme.windowH + end + imageHeight);
      return cmDesiredHeight = Math.abs(diff / current), cmDesiredHeight = Math.max(0, Math.min(1, cmDesiredHeight));
    }
  }, {
    key: "getColor",
    value: function getColor() {
      var colorAttr = this.img.getAttribute("data-color");

      if (!colorAttr) {
        return this.defaultColor;
      }

      var rgbColor = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.hexToRgb)(colorAttr);

      if (rgbColor) {
        return [rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255, 1];
      } else {
        return this.defaultColor;
      }
    }
  }, {
    key: "getMeshScale",
    value: function getMeshScale() {
      var containerRatio = this.width / this.height,
          imageRatio = this.srcWidth / this.srcHeight,
          scale = {
        x: 1,
        y: 1
      };

      if (imageRatio < containerRatio) {
        scale.x = 1;
        scale.y = imageRatio / containerRatio;
      } else {
        if (imageRatio > containerRatio) {
          scale.x = containerRatio / imageRatio;
          scale.y = 1;
        }
      }

      return scale;
    }
  }, {
    key: "getScale",
    value: function getScale(percentInView) {
      var scaleX = 1,
          scaleY = 1;

      if (this.opt.toTop || this.opt.toBottom || this.opt.toLeft || this.opt.toRight) {
        scaleX = scaleY = this.scaleFactor;
      }

      if (this.opt.scale) {
        scaleX = scaleY = scaleX * Math.max(this.scaleFactor - percentInView / 100, 1);
      }

      return [scaleX, scaleY];
    }
  }, {
    key: "getOffset",
    value: function getOffset(percentInView) {
      var offset = [0, 0];
      var offsetX = 0;
      var offsetY = 0;

      if (this.opt.toTop) {
        offsetY = (percentInView / 100 / 2 - 0.25) / 2;
      }

      if (this.opt.toBottom) {
        offsetY = (percentInView / 100 / 2 - 0.25) / -2;
      }

      if (this.opt.toLeft) {
        offsetX = (percentInView / 100 / 2 - 0.25) / 4;
      }

      if (this.opt.toRight) {
        offsetX = (percentInView / 100 / 2 - 0.25) / -4;
      }

      offset = [offsetX, offsetY];
      return offset;
    }
  }, {
    key: "createTexture",
    value: function createTexture(img) {
      var _this = this;

      var gl = this.gl;
      this.loading = true;
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.preloadImage)(img, function (loadedImg) {
        if (_this.lazy) {
          _this.lazy.style.backgroundColor = 'transparent';
        }

        _this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, _this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, loadedImg);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        _this.srcWidth = loadedImg.naturalWidth;
        _this.srcHeight = loadedImg.naturalHeight;
        _this.loaded = 1;
        _this.loading = false;
        _this.texScale = _this.getMeshScale();

        if ('function' === typeof _this.onLoad) {
          _this.onLoad(true);
        }
      });
    }
  }, {
    key: "scroll",
    value: function scroll(scrollPos, targetY) {
      if (!this.parentLink) {
        return;
      }

      var target = (this.bounds.top - scrollPos - (parseFloat(targetY) - this.bounds.height / 2)) * -1;
      this.parentLink.style.transform = "translate3d(0px, ".concat(target, "px, 0px)");
    }
  }, {
    key: "render",
    value: function render(program, bufferInfo, scrollY, diff) {
      var gl = this.gl;
      var t = this.inView(scrollY),
          y = t.transform.toFixed(2);
      this.isVisible = t.isVisible;

      if (this.isVisible) {
        if (!this.loading && !this.loaded && this.img) {
          this.createTexture(this.img);
        }

        if (!this.start) {
          this.start = Date.now();
          this.end = this.start + this.duration;
        }

        this.time++;
        var uMatrix = twgl.m4.identity(),
            uTMatrix = twgl.m4.identity();
        twgl.m4.scale(uTMatrix, [this.texScale.x, this.texScale.y, 1], uTMatrix);
        twgl.m4.ortho(0, gl.canvas.width, gl.canvas.height, 0, -1, 1, uMatrix);
        twgl.m4.translate(uMatrix, [this.x, y, 1], uMatrix);
        twgl.m4.scale(uMatrix, [this.width, this.height, 1], uMatrix);
        twgl.setUniforms(program, {
          uMatrix: uMatrix,
          uTMatrix: uTMatrix,
          uTex: this.texture,
          isBg: 0,
          isCover: this.isCover ? 1 : 0,
          isRounded: this.isRounded ? 1 : 0,
          uAlpha: this.alpha,
          uColor: this.uniforms.color,
          has_texture: this.loaded,
          uDiff: diff,
          uTime: this.time,
          scale: this.getScale(t.percentage),
          offset: this.getOffset(t.percentage)
        });
        twgl.drawBufferInfo(gl, bufferInfo);

        if (this.speed != 1 && this.parentLink) {
          this.scroll(scrollY, y);
        }
      }
    }
  }, {
    key: "resize",
    value: function resize(scrollPos) {
      var windowH = Theme.windowH;
      var speed = 1,
          top = 0;
      var rect = this.container.getBoundingClientRect();
      top = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.relativeOffsetTop)(this.container, document.body, true);

      if (!this.loaded) {
        this.srcWidth = rect.width;
        this.srcHeight = rect.height;
      }

      if (this.parent) {
        speed = parseFloat(this.parent.getAttribute('data-parallax')) || 1;
      }

      this.speed = speed;
      this.parallax = 1 / speed;
      this.bounds = {
        y: top,
        x: rect.left,
        top: top,
        bottom: top + rect.height,
        height: rect.height
      };
      this.width = rect.width;
      this.height = rect.height;
      this.x = rect.width / 2 + rect.x;
      this.y = (rect.height / 2 + top) * this.parallax;
      this.parallaxOffset = (top - windowH / 2) * this.speed - (top - windowH / 2);
      this.offset = this.speed + this.parallaxOffset;
      this.uniforms.parallax = this.parallax;
      this.uniforms.fragScale = 1;
      this.texScale = this.getMeshScale();
    }
  }]);

  return GL_Texture;
}();



/***/ }),

/***/ "./_src/template/assets/js/modules.js":
/*!********************************************!*\
  !*** ./_src/template/assets/js/modules.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cover": () => (/* reexport safe */ _modules_Cover__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "AnimView": () => (/* reexport safe */ _modules_AnimView__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "AnimScroll": () => (/* reexport safe */ _modules_AnimScroll__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "HeaderColor": () => (/* reexport safe */ _modules_HeaderColor__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _modules_Cover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Cover */ "./_src/template/assets/js/modules/Cover.js");
/* harmony import */ var _modules_AnimView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/AnimView */ "./_src/template/assets/js/modules/AnimView.js");
/* harmony import */ var _modules_AnimScroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/AnimScroll */ "./_src/template/assets/js/modules/AnimScroll.js");
/* harmony import */ var _modules_HeaderColor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/HeaderColor */ "./_src/template/assets/js/modules/HeaderColor.js");





/***/ }),

/***/ "./_src/template/assets/js/modules/AnimScroll.js":
/*!*******************************************************!*\
  !*** ./_src/template/assets/js/modules/AnimScroll.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnimScroll)
/* harmony export */ });
/* harmony import */ var _DefaultModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultModule */ "./_src/template/assets/js/modules/DefaultModule.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var AnimScroll = /*#__PURE__*/function (_DefaultModule) {
  _inherits(AnimScroll, _DefaultModule);

  var _super = _createSuper(AnimScroll);

  function AnimScroll(options) {
    _classCallCheck(this, AnimScroll);

    var _defaults = {
      container: null,
      animView: false,
      animateOnce: false,
      smooth: true
    };
    return _super.call(this, Object.assign({}, _defaults, options));
  }

  _createClass(AnimScroll, [{
    key: "onScroll",
    value: function onScroll(targetY, scrollPos, inViewPercent) {
      this.container.style.transform = "translate3d(-".concat(inViewPercent, "%, 0, 0)");
    }
  }]);

  return AnimScroll;
}(_DefaultModule__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./_src/template/assets/js/modules/AnimView.js":
/*!*****************************************************!*\
  !*** ./_src/template/assets/js/modules/AnimView.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnimView)
/* harmony export */ });
/* harmony import */ var _DefaultModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultModule */ "./_src/template/assets/js/modules/DefaultModule.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var AnimView = /*#__PURE__*/function (_DefaultModule) {
  _inherits(AnimView, _DefaultModule);

  var _super = _createSuper(AnimView);

  function AnimView(options) {
    _classCallCheck(this, AnimView);

    var _defaults = {
      container: null,
      animView: false,
      animateOnce: true,
      viewOffsetTop: 10,
      viewOffsetBottom: 90,
      smooth: false
    };
    return _super.call(this, Object.assign({}, _defaults, options));
  }

  _createClass(AnimView, [{
    key: "onInView",
    value: function onInView() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.addClass)(this.container, 'in-view');
    }
  }, {
    key: "onOutView",
    value: function onOutView() {
      (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.removeClass)(this.container, 'in-view');
    }
  }]);

  return AnimView;
}(_DefaultModule__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./_src/template/assets/js/modules/Cover.js":
/*!**************************************************!*\
  !*** ./_src/template/assets/js/modules/Cover.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cover)
/* harmony export */ });
/* harmony import */ var _DefaultModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultModule */ "./_src/template/assets/js/modules/DefaultModule.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Cover = /*#__PURE__*/function (_DefaultModule) {
  _inherits(Cover, _DefaultModule);

  var _super = _createSuper(Cover);

  function Cover(options) {
    var _this;

    _classCallCheck(this, Cover);

    var _defaults = {
      container: null,
      animView: false,
      smooth: true,
      animateOnce: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(options.container, 'has-parallax') && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(options.container, 'gl-image') ? false : true
    };
    _this = _super.call(this, Object.assign({}, _defaults, options));
    _this.smoothScroll = true;
    return _this;
  }

  _createClass(Cover, [{
    key: "getUrl",
    value: function getUrl() {
      var imgUrl = '';

      if (Theme.windowW < 768) {
        imgUrl = this.image.getAttribute('data-url-sm');
      } else {
        imgUrl = this.image.getAttribute('data-url');
      }

      return imgUrl;
    }
  }, {
    key: "render",
    value: function render() {
      this.image = null;
      this.wrapper = null;
      this.isParallax = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(this.container, 'has-parallax');
      this.isGl = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(this.container, 'gl-image') && (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.documentElement, 'r-smooth-scroll');
      this.image = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.qs)('.r-cover-image', this.container);

      if (Theme.windowW >= 768 && Theme.windowW < 1200 && (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.documentElement, 'r-smooth-scroll') && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.documentElement, 'r-webgl--md')) {
        this.isGl = false;
      }

      if (!this.image) {
        return;
      }
    }
  }, {
    key: "loadImage",
    value: function loadImage() {
      var img = this.image;
      var imgUrl = this.getUrl();

      if (!this.isGl) {
        img.style.backgroundImage = 'url(' + imgUrl + ')';

        if (this.container.getAttribute('data-bg-color')) {
          this.container.style.backgroundColor = this.container.getAttribute('data-bg-color');
        }
      } else {
        this.image = null;
      }
    }
  }, {
    key: "onInView",
    value: function onInView() {
      if (!this.shown && this.image) {
        this.loadImage();
      }
    }
  }, {
    key: "onScroll",
    value: function onScroll(targetY, scrollPos, percentage) {
      if (!this.isGl && this.isParallax && this.image) {
        this.image.style.transform = 'translate3d(0, ' + percentage / 2 + '%, 0)';
      }
    }
  }]);

  return Cover;
}(_DefaultModule__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./_src/template/assets/js/modules/DefaultModule.js":
/*!**********************************************************!*\
  !*** ./_src/template/assets/js/modules/DefaultModule.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DefaultModule)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Default Module
 */
var DefaultModule = /*#__PURE__*/function () {
  function DefaultModule(options) {
    _classCallCheck(this, DefaultModule);

    this.slug = options.slug || 'saonara/default'; // Module slug

    this.container = options.container;
    this.options = options;
    this.animateOnce = false !== options.animateOnce;
    this.viewOffsetTop = options.viewOffsetTop || 0;
    this.viewOffsetBottom = options.viewOffsetBottom || 100;
    this.smooth = options.smooth || false;
    this.fixed = options.fixed || false; // do not calculate view percentage

    this.inView = false; // module in viewport

    this.shown = false; // module was shown

    this.wW = window.Theme.windowW; // viewport width

    this.wH = window.Theme.windowH; // viewport height

    this.pos = {
      top: 0,
      bottom: 0,
      height: 0,
      left: 0
    };
    this.init();
  }

  _createClass(DefaultModule, [{
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
    /**
     * Play animation before leaving page
     *
     * @memberof DefaultModule
     */

  }, {
    key: "getOutAnimation",
    value: function getOutAnimation() {
      return false;
    }
  }, {
    key: "init",
    value: function init() {
      this.render();
      this.calculatePos();
      this.addEvents();
    }
  }, {
    key: "calculatePos",
    value: function calculatePos() {
      var rect = this.getContainer().getBoundingClientRect();
      this.pos = {
        top: rect.top,
        bottom: rect.top + rect.height,
        height: rect.height,
        left: rect.left,
        width: rect.width
      };
    }
  }, {
    key: "moduleInView",
    value: function moduleInView(scrollPos) {
      var inViewPercent = this.calculateVisibility(scrollPos);

      if (inViewPercent > 0 && inViewPercent <= 100) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "isForm",
    value: function isForm() {
      return 'FORM' === this.getContainer().tagName;
    }
  }, {
    key: "calculateVisibility",
    value: function calculateVisibility(scrollPos) {
      scrollPos = scrollPos || 0;
      var viewportHeight = this.wH;
      var percentage = 0;

      if (this.pos.top > scrollPos + viewportHeight) {
        percentage = 0;
      } else if (this.pos.bottom < scrollPos) {
        percentage = 0;
      } else {
        percentage = (scrollPos + viewportHeight - this.pos.top) / ((viewportHeight + this.pos.height) / 100);
      }

      return percentage;
    }
  }, {
    key: "onInView",
    value: function onInView(delay) {}
  }, {
    key: "onOutView",
    value: function onOutView() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "addEvents",
    value: function addEvents() {}
  }, {
    key: "onScroll",
    value: function onScroll(targetY, scrollPos, inViewPercent) {}
  }, {
    key: "onHide",
    value: function onHide() {}
  }, {
    key: "onResize",
    value: function onResize() {}
  }, {
    key: "resize",
    value: function resize() {
      var _this = this;

      this.wW = window.Theme.windowW;
      this.wH = window.Theme.windowH;
      setTimeout(function () {
        _this.calculatePos();

        _this.onResize();
      }, 50);
    }
  }]);

  return DefaultModule;
}();



/***/ }),

/***/ "./_src/template/assets/js/modules/HeaderColor.js":
/*!********************************************************!*\
  !*** ./_src/template/assets/js/modules/HeaderColor.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeaderColor)
/* harmony export */ });
/* harmony import */ var _DefaultModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultModule */ "./_src/template/assets/js/modules/DefaultModule.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var HeaderColor = /*#__PURE__*/function (_DefaultModule) {
  _inherits(HeaderColor, _DefaultModule);

  var _super = _createSuper(HeaderColor);

  function HeaderColor(options) {
    _classCallCheck(this, HeaderColor);

    var _defaults = {
      container: null,
      animView: false,
      animateOnce: false,
      smooth: false
    };
    return _super.call(this, Object.assign({}, _defaults, options));
  }

  _createClass(HeaderColor, [{
    key: "render",
    value: function render() {
      this.isActive = false;
      this.color = this.container.getAttribute('data-header-color');
      this.bg = this.container.getAttribute('data-header-bg');
      this.header = document.getElementById('masthead');
    }
  }, {
    key: "onScroll",
    value: function onScroll(targetY, scrollPos, inViewPercent) {
      if (this.pos.top - scrollPos < 60 && this.pos.bottom - scrollPos > 60) {
        if (!this.isActive) {
          this.isActive = true;
          Theme.changeColors.setHeaderColors(this.color, this.bg);
          Theme.changeColors.setOppositeColor(this.color);

          if (this.header) {
            this.header.setAttribute('data-current-color', this.color);
          }
        }
      } else {
        if (this.isActive) {
          this.isActive = false;

          if (this.header && this.color === this.header.getAttribute('data-current-color')) {
            Theme.changeColors.resetHeaderColors();
            Theme.changeColors.setOppositeColor();
            this.header.setAttribute('data-current-color', '');
          }
        }
      }
    }
  }]);

  return HeaderColor;
}(_DefaultModule__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./_src/template/assets/js/utils/EventEmitter.js":
/*!*******************************************************!*\
  !*** ./_src/template/assets/js/utils/EventEmitter.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function _default() {
    _classCallCheck(this, _default);

    this.callbacks = {};
    this.callbacks.base = {};
  }
  /**
   * On
   */


  _createClass(_default, [{
    key: "on",
    value: function on(_names, callback) {
      var that = this; // Errors

      if (typeof _names === 'undefined' || _names === '') {
        console.warn('wrong names');
        return false;
      }

      if (typeof callback === 'undefined') {
        console.warn('wrong callback');
        return false;
      } // Resolve names


      var names = this.resolveNames(_names); // Each name

      names.forEach(function (_name) {
        // Resolve name
        var name = that.resolveName(_name); // Create namespace if not exist

        if (!(that.callbacks[name.namespace] instanceof Object)) {
          that.callbacks[name.namespace] = {};
        } // Create callback if not exist


        if (!(that.callbacks[name.namespace][name.value] instanceof Array)) {
          that.callbacks[name.namespace][name.value] = [];
        } // Add callback


        that.callbacks[name.namespace][name.value].push(callback);
      });
      return this;
    }
    /**
     * Off
     */

  }, {
    key: "off",
    value: function off(_names) {
      var that = this; // Errors

      if (typeof _names === 'undefined' || _names === '') {
        console.warn('wrong name');
        return false;
      } // Resolve names


      var names = this.resolveNames(_names); // Each name

      names.forEach(function (_name) {
        // Resolve name
        var name = that.resolveName(_name); // Remove namespace

        if (name.namespace !== 'base' && name.value === '') {
          delete that.callbacks[name.namespace];
        } // Remove specific callback in namespace
        else {
          // Default
          if (name.namespace === 'base') {
            // Try to remove from each namespace
            for (var namespace in that.callbacks) {
              if (that.callbacks[namespace] instanceof Object && that.callbacks[namespace][name.value] instanceof Array) {
                delete that.callbacks[namespace][name.value]; // Remove namespace if empty

                if (Object.keys(that.callbacks[namespace]).length === 0) {
                  delete that.callbacks[namespace];
                }
              }
            }
          } // Specified namespace
          else if (that.callbacks[name.namespace] instanceof Object && that.callbacks[name.namespace][name.value] instanceof Array) {
            delete that.callbacks[name.namespace][name.value]; // Remove namespace if empty

            if (Object.keys(that.callbacks[name.namespace]).length === 0) {
              delete that.callbacks[name.namespace];
            }
          }
        }
      });
      return this;
    }
    /**
     * Trigger
     */

  }, {
    key: "trigger",
    value: function trigger(_name, _args) {
      // Errors
      if (typeof _name === 'undefined' || _name === '') {
        console.warn('wrong name');
        return false;
      }

      var that = this;
      var finalResult = null;
      var result = null; // Default args

      var args = !(_args instanceof Array) ? [] : _args; // Resolve names (should on have one event)

      var name = this.resolveNames(_name); // Resolve name

      name = this.resolveName(name[0]); // Default namespace

      if (name.namespace === 'base') {
        // Try to find callback in each namespace
        for (var namespace in that.callbacks) {
          if (that.callbacks[namespace] instanceof Object && that.callbacks[namespace][name.value] instanceof Array) {
            that.callbacks[namespace][name.value].forEach(function (callback) {
              result = callback.apply(that, args);

              if (typeof finalResult === 'undefined') {
                finalResult = result;
              }
            });
          }
        }
      } // Specified namespace
      else if (this.callbacks[name.namespace] instanceof Object) {
        if (name.value === '') {
          console.warn('wrong name');
          return this;
        }

        that.callbacks[name.namespace][name.value].forEach(function (callback) {
          result = callback.apply(that, args);

          if (typeof finalResult === 'undefined') {
            finalResult = result;
          }
        });
      }

      return finalResult;
    }
    /**
     * Resolve names
     */

  }, {
    key: "resolveNames",
    value: function resolveNames(_names) {
      var names = _names;
      names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
      names = names.replace(/[,/]+/g, ' ');
      names = names.split(' ');
      return names;
    }
    /**
     * Resolve name
     */

  }, {
    key: "resolveName",
    value: function resolveName(name) {
      var newName = {};
      var parts = name.split('.');
      newName.original = name;
      newName.value = parts[0];
      newName.namespace = 'base'; // Base namespace
      // Specified namespace

      if (parts.length > 1 && parts[1] !== '') {
        newName.namespace = parts[1];
      }

      return newName;
    }
  }]);

  return _default;
}();



/***/ }),

/***/ "./_src/template/assets/js/utils/helpers.js":
/*!**************************************************!*\
  !*** ./_src/template/assets/js/utils/helpers.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitForWebfonts": () => (/* binding */ waitForWebfonts),
/* harmony export */   "qs": () => (/* binding */ qs),
/* harmony export */   "qsa": () => (/* binding */ qsa),
/* harmony export */   "$on": () => (/* binding */ $on),
/* harmony export */   "$off": () => (/* binding */ $off),
/* harmony export */   "$delegate": () => (/* binding */ $delegate),
/* harmony export */   "removeFromArray": () => (/* binding */ removeFromArray),
/* harmony export */   "isInViewport": () => (/* binding */ isInViewport),
/* harmony export */   "getPercentOfView": () => (/* binding */ getPercentOfView),
/* harmony export */   "addClass": () => (/* binding */ addClass),
/* harmony export */   "removeClass": () => (/* binding */ removeClass),
/* harmony export */   "hasClass": () => (/* binding */ hasClass),
/* harmony export */   "getCurrentParent": () => (/* binding */ getCurrentParent),
/* harmony export */   "outerHeight": () => (/* binding */ outerHeight),
/* harmony export */   "relativeOffsetTop": () => (/* binding */ relativeOffsetTop),
/* harmony export */   "validate": () => (/* binding */ validate),
/* harmony export */   "validateEmail": () => (/* binding */ validateEmail),
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "childrenMatches": () => (/* binding */ childrenMatches),
/* harmony export */   "emitEvent": () => (/* binding */ emitEvent),
/* harmony export */   "scrollToHash": () => (/* binding */ scrollToHash),
/* harmony export */   "scrollToElement": () => (/* binding */ scrollToElement),
/* harmony export */   "animScrollTo": () => (/* binding */ animScrollTo),
/* harmony export */   "linkIsMedia": () => (/* binding */ linkIsMedia),
/* harmony export */   "preloadImage": () => (/* binding */ preloadImage),
/* harmony export */   "preloadImageUrl": () => (/* binding */ preloadImageUrl),
/* harmony export */   "getMousePos": () => (/* binding */ getMousePos),
/* harmony export */   "parseImageSrc": () => (/* binding */ parseImageSrc),
/* harmony export */   "getRGB": () => (/* binding */ getRGB),
/* harmony export */   "getRGBA": () => (/* binding */ getRGBA),
/* harmony export */   "hexToRgb": () => (/* binding */ hexToRgb),
/* harmony export */   "rgb2hex": () => (/* binding */ rgb2hex),
/* harmony export */   "MathUtils": () => (/* binding */ MathUtils)
/* harmony export */ });
/**
 * Wait for web fonts
 *
 */
function waitForWebfonts(fonts, callback) {
  var loadedFonts = 0;
  var done = false;
  var totaltime = 0;

  for (var i = 0, l = fonts.length; i < l; ++i) {
    (function (font) {
      var node = document.createElement('span'); // Characters that vary significantly among different fonts

      node.innerHTML = 'giItT1WQy@!-/#'; // Visible - so we can measure it - but not on the screen

      node.style.position = 'absolute';
      node.style.left = '-10000px';
      node.style.top = '-10000px'; // Large font size makes even subtle changes obvious

      node.style.fontSize = '300px'; // Reset any font properties

      node.style.fontFamily = 'sans-serif';
      node.style.fontVariant = 'normal';
      node.style.fontStyle = 'normal';
      node.style.fontWeight = 'normal';
      node.style.letterSpacing = '0';
      document.body.appendChild(node); // Remember width with no applied web font

      var width = node.offsetWidth;
      node.style.fontFamily = font;
      var interval;

      function checkFont() {
        totaltime += 50; // Compare current width with original width

        if (node && node.offsetWidth != width) {
          ++loadedFonts;
          node.parentNode.removeChild(node);
          node = null;
        }

        if (totaltime > 2000) {
          if (interval) {
            clearInterval(interval);
          }

          if (!done) {
            done = true;
            callback();
          }

          return true;
        } // If all fonts have been loaded


        if (loadedFonts >= fonts.length) {
          if (interval) {
            clearInterval(interval);
          }

          if (loadedFonts == fonts.length) {
            if (!done) {
              callback();
            }

            done = true;
            return true;
          }
        }
      }

      if (!checkFont()) {
        interval = setInterval(checkFont, 50);
      }
    })(fonts[i]);
  }
}
/**
 * Get element by CSS selector:
 *
 * @param {string} selector
 * @param {HTMLElement} scope find in
 * @returns {HTMLElement} found element
 */

function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}
/**
 * Get element(s) by CSS selector:
 *
 * @param {string} selector
 * @param {HTMLElement} scope find in
 * @returns {HTMLCollection} found elements
 */

function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
} // addEventListener wrapper:

function $on(target, type, callback, useCapture) {
  if (!target) {
    return;
  }

  target.addEventListener(type, callback, !!useCapture);
} // removeEventListener wrapper:

function $off(target, type, callback, useCapture) {
  if (!target) {
    return;
  }

  target.removeEventListener(type, callback, !!useCapture);
} // Attach a handler to event for all elements that match the selector,
// now or in the future, based on a root element

function $delegate(target, selector, type, handler) {
  // https://developer.mozilla.org/en-US/docs/Web/Events/blur
  var useCapture = type === 'blur' || type === 'focus';
  $on(target, type, dispatchEvent, useCapture);

  function dispatchEvent(event) {
    var targetElement = event.target;
    var potentialElements = qsa(selector, target);
    var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

    if (hasMatch) {
      handler.call(targetElement, event);
    }
  }
}
/**
 * Removes an element from an array
 *
 * const x = [1,2,3]; remove(x, 2); x ~== [1,3]
 *
 * @param {array} array
 * @param {any} thing element to remove
 * @returns {array} array without element
 */

function removeFromArray(array, thing) {
  var index = array.indexOf(thing);

  if (index === -1) {
    return array;
  }

  array.splice(index, 1);
}
/**
 * Is element in viewport?
 *
 * @param {HTMLElement} element
 * @param {number} targetY scroll position
 */

function isInViewport(element, targetY) {
  var scroll = targetY || window.scrollY || window.pageYOffset;
  var boundsTop = element.getBoundingClientRect().top + scroll;
  var viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };
  var bounds = {
    top: boundsTop,
    bottom: boundsTop + element.clientHeight
  };
  return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top;
}
/**
 * @param {HTMLElement} element
 * @returns {number} percent of element in view
 */

function getPercentOfView(element) {
  var viewTop = window.pageYOffset;
  var viewBottom = viewTop + window.innerHeight;
  var rect = element.getBoundingClientRect();
  var elementTop = rect.top + viewTop;
  var elementBottom = elementTop + rect.height;

  if (elementTop >= viewBottom || elementBottom <= viewTop) {
    // higher or lower than viewport
    return 0;
  } else if (elementTop <= viewTop && elementBottom >= viewBottom) {
    // element is completely in viewport and bigger than viewport
    return 100;
  } else if (elementBottom <= viewBottom) {
    if (elementTop < viewTop) {
      // intersects viewport top
      return Math.round((elementBottom - viewTop) / window.innerHeight * 100);
    } else {
      // completely inside viewport
      return Math.round((elementBottom - elementTop) / window.innerHeight * 100);
    }
  } else {
    // intersects viewport bottom
    //  elementBottom >= viewBottom && elementTop <= viewBottom
    return Math.round((viewBottom - elementTop) / window.innerHeight * 100);
  }
}
/**
 * Add class
 *
 * @param {HTMLElement} element
 * @param {string} cls
 */

function addClass(element, cls) {
  if (element instanceof Element || element instanceof HTMLDocument) {
    if (!hasClass(element, cls)) {
      element.className += ' ' + cls;
    }
  } else if (element && element.length) {
    for (var i = 0; i < element.length; i++) {
      if (!hasClass(element[i], cls)) {
        element[i].className += ' ' + cls;
      }
    }
  }
}
/**
 * Delete class
 *
 * @param {HTMLElement} element
 * @param {string} cls
 */

function removeClass(element, cls) {
  if (element && element.length) {
    for (var i = 0; i < element.length; i++) {
      element[i].className = element[i].className.replace(new RegExp('(?:^|\\s)' + cls + '(?!\\S)'), '');
    }
  } else if (element instanceof Element || element instanceof HTMLDocument) {
    element.className = element.className.replace(new RegExp('(?:^|\\s)' + cls + '(?!\\S)'), '');
  }
}
/**
 * Has class?
 *
 * @param {HTMLElement} element
 * @param {string} cls
 *
 * @returns {boolean} Has class
 */

function hasClass(element, cls) {
  if (!element) {
    return false;
  }

  if (!element.className) {
    return false;
  }

  if (element.className.match('(?:^|\\s)' + cls + '(?!\\S)')) {
    return true;
  }

  return false;
}
/**
 * Find first ancestor of an element by selector
 *
 * @param {HTMLElement} child
 * @param {String} selector
 * @param {String} stopSelector
 */

function getCurrentParent(child, selector, stopSelector) {
  var currentParent = null;

  while (child) {
    if (child.matches(selector)) {
      currentParent = child;
      break;
    } else if (stopSelector && child.matches(stopSelector)) {
      break;
    }

    child = child.parentElement;
  }

  return currentParent;
}
/**
 * Outer height with margin
 *
 * @param {HTMLElement} element
 * @returns {number} element height in pixels
 */

function outerHeight(element) {
  var height = element.offsetHeight;
  var style = getComputedStyle(element);
  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}
/**
 * Get the offset position of an element relative to body
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @returns {number}
 */

function relativeOffsetTop(element, parent, fromZero) {
  var curtop = document.documentElement.offsetTop || 0;

  if (fromZero) {
    curtop = 0;
  }

  if (!element) {
    return 0;
  }

  if (!parent) {
    parent = document.body;
  }

  if (element.offsetParent) {
    do {
      curtop += element.offsetTop;

      if (element === parent) {
        return curtop;
      }
    } while (element = element.offsetParent);

    return curtop;
  }
}
/**
 * Check if field value lenth more than 3 symbols ( for name and comment )
 *
 * @param {HTMLElement} field input with value
 * @returns {boolean}
 */

function validate(field) {
  var val = field.value || '';

  if (val.length < 3) {
    addClass(field, 'r-error');
    return false;
  } else {
    removeClass(field, 'r-error');
    return true;
  }
}
/**
 * Check if email is correct
 *
 * @param {HTMLElement} field input with email value
 * @returns {boolean}
 */

function validateEmail(field) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var emailToValidate = field.value;

  if (!emailReg.test(emailToValidate) || emailToValidate == "") {
    addClass(field, 'r-error');
    return false;
  } else {
    removeClass(field, 'r-error');
    return true;
  }
}
/*
 * Serialize all form data into a query string
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */

function serialize(form) {
  // Setup our serialized data
  var serialized = []; // Loop through each field in the form

  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i]; // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields

    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue; // If a multi-select, get all selections

    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
      }
    } // Convert field data to a query string
    else if (field.type !== 'checkbox' && field.type !== 'radio' || field.checked) {
      serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
    }
  }

  return serialized.join('&');
}
/*
 * Get all direct descendant elements that match a selector
 * Dependency: the matches() polyfill: https://vanillajstoolkit.com/polyfills/matches/
 *
 * @param  {Node}   elem     The element to get direct descendants for
 * @param  {String} selector The selector to match against
 * @return {Array}           The matching direct descendants
 */

function childrenMatches(element, selector) {
  if (!element) {
    return [];
  }

  return Array.prototype.filter.call(element.children, function (child) {
    return child.matches(selector);
  });
}
/*
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {Node}   element   The element to attach the event to
 * @param  {Object} detail Any details to pass along with the event
 */

function emitEvent(type, element, detail) {
  // Make sure there's an event type
  if (!type) return; // Variables

  element = element || window;
  detail = detail || {}; // Create a new event

  var event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail
  }); // Dispatch the event

  element.dispatchEvent(event);
}
function scrollToHash(offsetTop) {
  offsetTop = offsetTop || 100; // check if 「#」 exists

  if (location.hash) {
    var anchor = document.querySelector(location.hash);

    if (anchor) {
      var rect = anchor.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var top = rect.top + scrollTop;
      animScrollTo(top);
    }
  }
}
function scrollToElement(element, offsetTop) {
  if ('number' != typeof offsetTop) {
    offsetTop = 0;
  }

  if (!element) {
    return;
  }

  var elTop = relativeOffsetTop(element);
  var top = elTop - offsetTop;
  window.scrollTo(0, top);
}
function animScrollTo(destination, callback) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
  var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'easeInOutQuad';
  var easings = {
    linear: function linear(m) {
      return m;
    },
    easeInOutQuad: function easeInOutQuad(m) {
      return m < 0.5 ? 2 * m * m : -1 + (4 - 2 * m) * m;
    },
    easeOutExpo: function easeOutExpo(m) {
      return m === 1 ? 1 : -Math.pow(2, -10 * m) + 1;
    },
    easeOutQuad: function easeOutQuad(m) {
      return m * (m - m);
    },
    easeInQuart: function easeInQuart(m) {
      return m * m * m * m;
    }
  };
  var start = window.pageYOffset;
  var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);

    if (callback) {
      callback();
    }

    return;
  }

  function scroll() {
    var now = 'now' in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, (now - startTime) / duration);
    var timeFunction = easings[easing](time);
    window.scroll(0, Math.abs(Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }

      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}
/**
 * If href is an image
 *
 * @param {Element} element
 *
 * @returns {boolean}
 */

function linkIsMedia(element) {
  if (element && element.getAttribute('href')) {
    if (element.getAttribute('href').match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return true;
    }
  }

  return false;
}
/**
 * Preload image
 *
 * @param {string} imageEl - image source
 * @param {function} callback
 *
 */

function preloadImage(imageEl, callback) {
  var image = null;

  function onReady() {
    if (callback) {
      if (image) {
        callback(image);
      } else {
        callback(imageEl);
      }
    }
  }

  if (!imageEl.complete) {
    if (imageEl.src) {
      image = new Image();
      image.onload = onReady;
      image.onerror = onReady;

      if (imageEl.sizes) {
        image.sizes = imageEl.sizes;
      }

      if (imageEl.srcset) {
        image.srcset = imageEl.srcset;
      }

      image.src = imageEl.src;
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
}
/**
 * Preload image from Url
 *
 * @param {string} imageUrl - image source
 * @param {function} callback
 *
 */

function preloadImageUrl(imageUrl, callback) {
  var image;

  function onReady() {
    if (callback) {
      callback(image);
    }
  }

  if (imageUrl) {
    image = new Image();
    image.onload = onReady;
    image.onerror = onReady;
    image.src = imageUrl;
  } else {
    // image already loaded...
    onReady();
  }
}
/**
 * Get mouse position
 *
 * @param {Event} e
 *
 * @returns {Object} - x, y
 */

function getMousePos(e) {
  var posx = 0,
      posy = 0;
  e = e || window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  };
}
/**
 * Parse the HTML <img> srcset attribute
 *
 */

function parseImageSrc(img) {
  var integerRegex = /^\d+$/;

  if (!img) {
    return [];
  }

  var srcset = img.getAttribute('srcset');

  if (!srcset) {
    return [];
  }

  function deepUnique(array) {
    function compare(a, b) {
      if (a.width < b.width) {
        return -1;
      }

      if (a.width > b.width) {
        return 1;
      }

      return 0;
    }

    return array.sort(compare).filter(function (element, index) {
      return JSON.stringify(element) !== JSON.stringify(array[index - 1]);
    });
  }

  return deepUnique(srcset.split(',').map(function (part) {
    var result = {};
    part.trim().split(/\s+/).forEach(function (element, index) {
      if (index === 0) {
        result.url = element;
        return;
      }

      var value = element.slice(0, element.length - 1);
      var postfix = element[element.length - 1];
      var integerValue = parseInt(value, 10);
      var floatValue = parseFloat(value);

      if (postfix === 'w' && integerRegex.test(value)) {
        result.width = integerValue;
      } else if (postfix === 'h' && integerRegex.test(value)) {
        result.height = integerValue;
      } else if (postfix === 'x' && !Number.isNaN(floatValue)) {
        result.density = floatValue;
      } else {
        throw new Error("Invalid srcset descriptor: ".concat(element));
      }
    });
    return result;
  }));
}
function getRGB(color, asArray) {
  function parseColor(color) {
    var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);

    if (m) {
      return [parseInt(m[1]) / 255, parseInt(m[2]) / 255, parseInt(m[3]) / 255];
    }

    m = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i);

    if (m) {
      return [parseInt(m[1]) / 255, parseInt(m[2]) / 255, parseInt(m[3]) / 255];
    }
  }

  var component = parseColor(color);

  if (asArray) {
    return component;
  } else {
    return 'rgb(' + component.join(',') + ')';
  }
}
function getRGBA(color, asArray) {
  function parseColor(color) {
    var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);

    if (m) {
      return [parseFloat(parseInt(m[1]) / 255), parseFloat(parseInt(m[2]) / 255), parseFloat(parseInt(m[3]) / 255), 1.0];
    }

    m = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i);

    if (m) {
      return [parseInt(m[1]) / 255, parseInt(m[2]) / 255, parseInt(m[3]) / 255, m[4]];
    }
  }

  var component = parseColor(color);

  if (asArray) {
    return component;
  } else {
    return 'rgba(' + component.join(',') + ')';
  }
}
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
} //Function to convert hex format to a rgb color

function rgb2hex(orig) {
  var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
  return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
}
var MathUtils = {
  lineEq: function lineEq(y2, y1, x2, x1, currentVal) {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1),
        b = y1 - m * x1;
    return m * currentVal + b;
  },
  lerp: function lerp(a, b, n) {
    return (1 - n) * a + n * b;
  },
  getRandomFloat: function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
};

/***/ }),

/***/ "./_src/template/assets/js/utils/polyfills.js":
/*!****************************************************!*\
  !*** ./_src/template/assets/js/utils/polyfills.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;

    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };

    var toInteger = function toInteger(value) {
      var number = Number(value);

      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function from(arrayLike
    /*, mapFn, thisArg */
    ) {
      var C = this;
      var items = Object(arrayLike);

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;

      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
      var kValue;

      while (k < len) {
        kValue = items[k];

        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k += 1;
      }

      A.length = len;
      return A;
    };
  }();
}
/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */


if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */


if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;

    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);

    return null;
  };
}
/**
 * CustomEvent() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */


(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
/**
 * Promise polyfill
 * https://github.com/taylorhakes/promise-polyfill
 */


(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
})(this, function () {
  'use strict';
  /**
   * @this {Promise}
   */

  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        // @ts-ignore
        return constructor.reject(reason);
      });
    });
  } // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())


  var setTimeoutFunc = setTimeout;

  function isArray(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop() {} // Polyfill for Function.prototype.bind


  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }
  /**
   * @constructor
   * @param {Function} fn
   */


  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */

    this._state = 0;
    /** @type {!boolean} */

    this._handled = false;
    /** @type {Promise|undefined} */

    this._value = undefined;
    /** @type {!Array<!Function>} */

    this._deferreds = [];
    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }

    if (self._state === 0) {
      self._deferreds.push(deferred);

      return;
    }

    self._handled = true;

    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;

      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }

      var ret;

      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }

      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');

      if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;

        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }

      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }

    self._deferreds = null;
  }
  /**
   * @constructor
   */


  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }
  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */


  function doResolve(fn, self) {
    var done = false;

    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop);
    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.prototype['finally'] = finallyConstructor;

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
            var then = val.then;

            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }

          args[i] = val;

          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && _typeof(value) === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise.resolve(arr[i]).then(resolve, reject);
      }
    });
  }; // Use polyfill for setImmediate for performance gains


  Promise._immediateFn = // @ts-ignore
  typeof setImmediate === 'function' && function (fn) {
    // @ts-ignore
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };
  /** @suppress {undefinedVars} */


  var globalNS = function () {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
      return self;
    }

    if (typeof window !== 'undefined') {
      return window;
    }

    if (typeof __webpack_require__.g !== 'undefined') {
      return __webpack_require__.g;
    }

    throw new Error('unable to locate global object');
  }();

  if (!('Promise' in globalNS)) {
    globalNS['Promise'] = Promise;
  } else if (!globalNS.Promise.prototype['finally']) {
    globalNS.Promise.prototype['finally'] = finallyConstructor;
  }
});
/**
 * Array.prototype.forEach() polyfill
 *
 */


if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
/**
 * remove Node
 *
 */


(function () {
  function remove() {
    this.parentNode && this.parentNode.removeChild(this);
  }

  if (!Element.prototype.remove) Element.prototype.remove = remove;
  if (Text && !Text.prototype.remove) Text.prototype.remove = remove;
})();

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./_src/template/assets/js/app.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/polyfills */ "./_src/template/assets/js/utils/polyfills.js");
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_polyfills__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/helpers */ "./_src/template/assets/js/utils/helpers.js");
/* harmony import */ var _components_barbaHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/barbaHandler */ "./_src/template/assets/js/components/barbaHandler.js");
/* harmony import */ var _components_Scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Scroll */ "./_src/template/assets/js/components/Scroll.js");
/* harmony import */ var _components_Mouse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Mouse */ "./_src/template/assets/js/components/Mouse.js");
/* harmony import */ var _components_Menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Menu */ "./_src/template/assets/js/components/Menu.js");
/* harmony import */ var _components_Comments__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Comments */ "./_src/template/assets/js/components/Comments.js");
/* harmony import */ var _components_Checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Checkbox */ "./_src/template/assets/js/components/Checkbox.js");
/* harmony import */ var _components_Table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Table */ "./_src/template/assets/js/components/Table.js");
/* harmony import */ var _components_Widgets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Widgets */ "./_src/template/assets/js/components/Widgets.js");
/* harmony import */ var _components_Gallery__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Gallery */ "./_src/template/assets/js/components/Gallery.js");
/* harmony import */ var _components_ParallaxColumns__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/ParallaxColumns */ "./_src/template/assets/js/components/ParallaxColumns.js");
/* harmony import */ var _components_ModulesManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/ModulesManager */ "./_src/template/assets/js/components/ModulesManager.js");
/* harmony import */ var _components_ScriptsLoader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/ScriptsLoader */ "./_src/template/assets/js/components/ScriptsLoader.js");
/* harmony import */ var _components_ContactForm7__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/ContactForm7 */ "./_src/template/assets/js/components/ContactForm7.js");
/* harmony import */ var _components_ChangeColors__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/ChangeColors */ "./_src/template/assets/js/components/ChangeColors.js");
/* harmony import */ var _barbaViews_default__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./barbaViews/default */ "./_src/template/assets/js/barbaViews/default.js");
/* harmony import */ var _components_webgl_CanvasBack__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/webgl/CanvasBack */ "./_src/template/assets/js/components/webgl/CanvasBack.js");
/* harmony import */ var _components_webgl_CanvasFront__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/webgl/CanvasFront */ "./_src/template/assets/js/components/webgl/CanvasFront.js");
/* harmony import */ var _utils_EventEmitter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/EventEmitter */ "./_src/template/assets/js/utils/EventEmitter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**!
Theme Name: Saonara
Theme URI: -
Author: Roma Murzinov
Author URI: https://themeforest.net/user/mrmurza/
Description:
Version: 1.1.1
Requires at least: WordPress 5.0.0
License: Themeforest Split License
License URI: License.txt
Text Domain: saonara
Tags: one-column, flexible-header, accessibility-ready, custom-colors, custom-menu, custom-logo, editor-style, featured-images, footer-widgets, sticky-post, threaded-comments, translation-ready
*/





















var Theme = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Theme, _EventEmitter);

  var _super = _createSuper(Theme);

  function Theme() {
    var _this;

    _classCallCheck(this, Theme);

    _this = _super.call(this);
    _this.resizeTimeout = null;
    _this.firstLoad = true;
    _this.windowW = 0;
    _this.windowH = 0;
    _this.headerH = 0;
    _this.scroll = {
      y: window.pageYOffset,
      target: window.pageYOffset,
      direction: 'down'
    };
    _this.indicator = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.qs)('.r-scroll-indicator svg');
    _this.showOverlay = _this.showOverlay.bind(_assertThisInitialized(_this));
    _this.hideOverlay = _this.hideOverlay.bind(_assertThisInitialized(_this));
    _this.initComponents = _this.initComponents.bind(_assertThisInitialized(_this));
    _this.stickyFooter = _this.stickyFooter.bind(_assertThisInitialized(_this));
    _this.resize = _this.resize.bind(_assertThisInitialized(_this));
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
    _this.isTouch = 'ontouchstart' in window || window.navigator.msMaxTouchPoints;

    _this.addEvents();

    return _this;
  }
  /**
   * When page is ready
   *
   * @memberof Theme
   */


  _createClass(Theme, [{
    key: "onReady",
    value: function onReady() {
      var _this2 = this;

      this.showUI();
      this.isMobile = device.mobile();
      this.windowW = window.innerWidth;
      this.windowH = window.innerHeight;
      this.headerH = document.getElementById('masthead').clientHeight;
      this.setAnimeDefaults();
      this.fixAdminBar();
      this.scriptsLoader = new _components_ScriptsLoader__WEBPACK_IMPORTED_MODULE_13__["default"]();
      this.changeColors = new _components_ChangeColors__WEBPACK_IMPORTED_MODULE_15__["default"]({
        targets: [document.documentElement, document.getElementById('barba-wrapper')]
      });
      this.mouse = new _components_Mouse__WEBPACK_IMPORTED_MODULE_4__["default"]();
      this.mainScroll = new _components_Scroll__WEBPACK_IMPORTED_MODULE_3__["default"]({
        smooth: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.documentElement, 'r-smooth-scroll') && this.windowW >= 768,
        callback: this.onScroll
      });
      this.canvasBack = new _components_webgl_CanvasBack__WEBPACK_IMPORTED_MODULE_17__["default"]({
        ctxSelector: '.gl-back-canvas'
      });
      this.canvasFront = new _components_webgl_CanvasFront__WEBPACK_IMPORTED_MODULE_18__["default"]({
        ctxSelector: '.gl-front-canvas'
      });
      this.modulesManager = new _components_ModulesManager__WEBPACK_IMPORTED_MODULE_12__["default"]();
      this.menu = new _components_Menu__WEBPACK_IMPORTED_MODULE_5__["default"]();
      this.comments = new _components_Comments__WEBPACK_IMPORTED_MODULE_6__["default"]();
      this.checkbox = new _components_Checkbox__WEBPACK_IMPORTED_MODULE_7__["default"]();
      this.table = new _components_Table__WEBPACK_IMPORTED_MODULE_8__["default"]();
      this.widgets = new _components_Widgets__WEBPACK_IMPORTED_MODULE_9__["default"]();
      this.gallery = new _components_Gallery__WEBPACK_IMPORTED_MODULE_10__["default"]();
      this.contactForm = new _components_ContactForm7__WEBPACK_IMPORTED_MODULE_14__["default"]();
      this.columns = new _components_ParallaxColumns__WEBPACK_IMPORTED_MODULE_11__["default"]();
      this.initBarba();
      this.on('transition_start', this.initComponents);
      this.on('transition_end', this.hideOverlay);
      this.on('leave_page', this.showOverlay);
      document.documentElement.classList += ' theme-inited';

      if (window.twttr !== undefined) {
        window.twttr.ready(function () {
          window.twttr.events.bind('loaded', function () {
            setTimeout(function () {
              _this2.trigger('needsResize');
            }, 1500);
          });
        });
      }
    }
    /**
     * These components will be initialized each time a new page is loaded.
     *
     * @param {HTMLElement} scope The new container.
     * @memberof Theme
     */

  }, {
    key: "initComponents",
    value: function initComponents(scope) {
      var _this3 = this;

      document.getElementById('masthead').setAttribute('data-current-color', '');
      this.stickyFooter(scope);
      this.trigger('init_components', [this.firstLoad, scope]);
      this.firstLoad = false;

      if (window.twttr !== undefined) {
        window.twttr.ready(function () {
          _this3.onResize();
        });
      }
    }
    /**
     * When the document view (window) has been resized
     *
     * @memberof Theme
     */

  }, {
    key: "onResize",
    value: function onResize() {
      this.windowW = window.innerWidth;
      this.windowH = window.innerHeight;
      this.headerH = document.getElementById('masthead').clientHeight;
      this.stickyFooter();
      this.trigger('resize');
    }
    /**
     * Keep the footer at the bottom
     *
     * @memberof Theme
     */

  }, {
    key: "stickyFooter",
    value: function stickyFooter(scope) {
      scope = scope || document;
      var windowH = window.innerHeight;
      var footer = scope.querySelector('.sidebar-footer');
      var content = scope.querySelector('.site-main');
      content.style.minHeight = '';

      if (!footer) {
        return;
      }

      var contentH = content.offsetHeight;
      var footerH = footer.offsetHeight;

      if (contentH < windowH && footerH < windowH) {
        content.style.minHeight = windowH - footerH + 'px';
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this4 = this;

      var newWidth = window.innerWidth;
      var needsResize = false;

      if (newWidth != this.windowW) {
        if (newWidth < 768 && this.windowW >= 768) {
          window.location.reload();
        } else if (this.windowW < 768 && newWidth >= 768) {
          window.location.reload();
        }
      }

      if (!this.isMobile) {
        needsResize = true;
      } else {
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if (newWidth != this.windowW) {
          needsResize = true; // Update the window width for next time

          this.windowW = newWidth;
        }
      }

      if (needsResize) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(function () {
          _this4.onResize();
        }, 250);
      }
    }
    /**
     * The document view has been scrolled
     *
     * @param {Object} obj Information about the scroll.
     * @param {number} obj.targetY Smooth scroll target
     * @param {number} obj.scrollTop The number of pixels the document is currently scrolled
     * @param {string} obj.direction The direction of the Vertical Scroll
     * @memberof Theme
     */

  }, {
    key: "onScroll",
    value: function onScroll(obj) {
      this.scroll = {
        y: obj.scrollTop,
        target: obj.targetY,
        direction: obj.direction
      };
      var coeff = (this.mainScroll.bodyH - this.windowH) / 100;
      this.scrollPercent = obj.targetY / coeff;

      if (this.indicator) {
        this.indicator.style.transform = "rotate(".concat(this.scrollPercent * 5, "deg)");
      }

      this.trigger('scroll', [obj]);
    }
    /**
     * Add event listeners
     *
     * @memberof Theme
     */

  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this5 = this;

      document.addEventListener('DOMContentLoaded', function () {
        _this5.onReady();
      });
      window.addEventListener('resize', this.resize);
      window.addEventListener('orientationchange', this.resize);
    }
    /**
     * Show hidden items at startup
     *
     * @memberof Theme
     */

  }, {
    key: "showUI",
    value: function showUI() {
      document.documentElement.className += ' is-ready';
    }
    /**
     * Set anime.js defaults
     *
     * @memberof Theme
     */

  }, {
    key: "setAnimeDefaults",
    value: function setAnimeDefaults() {
      if (defaultTweenSettings) {
        defaultTweenSettings.duration = parseInt(saonara_js_options.animation_duration);
        defaultTweenSettings.easing = saonara_js_options.animation_easing || 'easeInOutQuart';
      }
    }
    /**
     * Set admin bar fixed position
     *
     * @memberof Theme
     */

  }, {
    key: "fixAdminBar",
    value: function fixAdminBar() {
      var adminBar = document.getElementById('wpadminbar');

      if (adminBar) {
        adminBar.style.position = 'fixed';
      }
    }
    /**
     * Show overlay to prevent clicks when a transition is in progress
     *
     * @memberof Theme
     */

  }, {
    key: "showOverlay",
    value: function showOverlay() {
      var overlay = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.qs)('.r-overlay');

      if (overlay) {
        overlay.style.display = 'block';
      }
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay() {
      var overlay = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.qs)('.r-overlay');

      if (overlay) {
        overlay.style.display = 'none';
      }
    }
    /**
     * Init default Barba views
     *
     * @memberof Theme
     */

  }, {
    key: "initBarba",
    value: function initBarba() {
      var views = [_barbaViews_default__WEBPACK_IMPORTED_MODULE_16__.defaultView];

      for (var i = 0; i < views.length; i++) {
        var view = views[i];

        if ('function' === typeof view) {
          //init view
          view();
        }
      }

      new _components_barbaHandler__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
  }]);

  return Theme;
}(_utils_EventEmitter__WEBPACK_IMPORTED_MODULE_19__["default"]);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.Theme = new Theme(window, document);
})();

/******/ })()
;
