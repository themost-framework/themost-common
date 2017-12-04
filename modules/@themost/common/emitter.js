"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SequentialEventEmitter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _async = require("async");

var applyEachSeries = _async.applyEachSeries;

var _events = require("events");

var EventEmitter = _events.EventEmitter;

var _symbol = require("symbol");

var _Symbol = _interopRequireDefault(_symbol).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * MOST Web Framework 2.0 Codename Blueshift
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, THEMOST LP All rights reserved
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Use of this source code is governed by an BSD-3-Clause license that can be
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * found in the LICENSE file at https://themost.io/license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var listenersProperty = "listeners";
var listenerProperty = _Symbol("listener");
/**
 * @class
 * @extends EventEmitter
 */

var SequentialEventEmitter = exports.SequentialEventEmitter = function (_EventEmitter) {
    _inherits(SequentialEventEmitter, _EventEmitter);

    /**
     * @constructor
     */
    function SequentialEventEmitter() {
        _classCallCheck(this, SequentialEventEmitter);

        return _possibleConstructorReturn(this, (SequentialEventEmitter.__proto__ || Object.getPrototypeOf(SequentialEventEmitter)).call(this));
    }

    /**
     * Emits an event by specifying additional arguments where the last argument is a callback function
     * @param {string | symbol} event
     * @param args
     * @returns {*}
     */
    // eslint-disable-next-line no-unused-vars


    _createClass(SequentialEventEmitter, [{
        key: "emit",
        value: function emit(event) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            //get listeners
            if (typeof this[listenersProperty] !== "function") {
                throw new Error("undefined listeners");
            }
            //get arguments as array (remove the first argument -event name-)
            var argsAndCallback = [].concat(Array.prototype.slice.call(arguments, 1));
            if (argsAndCallback.length > 0) {
                //check the last argument (expected callback function)
                if (typeof argsAndCallback[argsAndCallback.length - 1] !== "function") {
                    throw new TypeError("Expected event callback");
                }
            }
            //get callback function (the last argument of arguments list)
            var callback = argsAndCallback[argsAndCallback.length - 1];
            //get array of listeners
            var listeners = this[listenersProperty](event);
            //validate listeners
            if (listeners.length === 0) {
                //exit emitter by executing the defined callback
                return callback();
            }
            //apply each series
            return applyEachSeries.apply(this, [listeners].concat(argsAndCallback));
        }
        /**
         * @param {string|symbol} event
         * @param {Function} listener
         * @returns this
         */

    }, {
        key: "addListener",
        value: function addListener(event, listener) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "addListener", this).call(this, event, listener);
        }
        /**
         * @param {string|symbol} event
         * @param {Function} listener
         * @returns this
         */

    }, {
        key: "on",
        value: function on(event, listener) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "on", this).call(this, event, listener);
        }
        /**
         * @param {string|symbol} event
         * @param {Function} listener
         * @returns this
         */

    }, {
        key: "prependListener",
        value: function prependListener(event, listener) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "prependListener", this).call(this, event, listener);
        }
        /**
         * @param {string|symbol} event
         * @param {Function} listener
         * @returns this
         */

    }, {
        key: "prependOnceListener",
        value: function prependOnceListener(event, listener) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "prependOnceListener", this).call(this, event, listener);
        }
        /**
         * @param {string|symbol} event
         * @param {Function} listener
         * @returns this
         */

    }, {
        key: "removeListener",
        value: function removeListener(event, listener) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "removeListener", this).call(this, event, listener);
        }
        /**
         * @param {string|symbol} event
         * @returns this
         */

    }, {
        key: "removeAllListeners",
        value: function removeAllListeners(event) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "removeAllListeners", this).call(this, event);
        }

        /**
         * @param {number} n
         * @returns this
         */

    }, {
        key: "setMaxListeners",
        value: function setMaxListeners(n) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "setMaxListeners", this).call(this, n);
        }

        /**
         * @return {*|number}
         */

    }, {
        key: "getMaxListeners",
        value: function getMaxListeners() {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "getMaxListeners", this).call(this);
        }

        /**
         * @param type
         * @return {*|number}
         */

    }, {
        key: "listenerCount",
        value: function listenerCount(type) {
            return _get(SequentialEventEmitter.prototype.__proto__ || Object.getPrototypeOf(SequentialEventEmitter.prototype), "listenerCount", this).call(this, type);
        }

        /**
         * @param {string|symbol} event
         * @param {Function} listener
         * @return {SequentialEventEmitter}
         */

    }, {
        key: "once",
        value: function once(event, listener) {
            var self = this;
            if (typeof listener !== "function") {
                throw TypeError("listener must be a function");
            }
            var fired = false;
            function g() {
                self.removeListener(event, g);
                if (!fired) {
                    fired = true;
                    listener.apply(this, arguments);
                }
            }
            g[listenerProperty] = listener;
            self.on(event, g);
            return this;
        }
    }]);

    return SequentialEventEmitter;
}(EventEmitter);
//# sourceMappingURL=emitter.js.map
