"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
var async_1 = require("async");
var events_1 = require("events");
var Symbol = require("symbol");
var listenersProperty = "listeners";
var listenerProperty = Symbol("listener");
/**
 * @class
 * @extends EventEmitter
 */
var SequentialEventEmitter = /** @class */ (function (_super) {
    __extends(SequentialEventEmitter, _super);
    /**
     * @constructor
     */
    function SequentialEventEmitter() {
        return _super.call(this) || this;
    }
    /**
     * Emits an event by specifying additional arguments where the last argument is a callback function
     * @param {string | symbol} event
     * @param args
     * @returns {any}
     */
    SequentialEventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
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
        return async_1.applyEachSeries.apply(this, [listeners].concat(argsAndCallback));
    };
    SequentialEventEmitter.prototype.addListener = function (event, listener) {
        return _super.prototype.addListener.call(this, event, listener);
    };
    SequentialEventEmitter.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    SequentialEventEmitter.prototype.prependListener = function (event, listener) {
        return _super.prototype.prependListener.call(this, event, listener);
    };
    SequentialEventEmitter.prototype.prependOnceListener = function (event, listener) {
        return _super.prototype.prependOnceListener.call(this, event, listener);
    };
    SequentialEventEmitter.prototype.removeListener = function (event, listener) {
        return _super.prototype.removeListener.call(this, event, listener);
    };
    SequentialEventEmitter.prototype.removeAllListeners = function (event) {
        return _super.prototype.removeAllListeners.call(this, event);
    };
    SequentialEventEmitter.prototype.setMaxListeners = function (n) {
        return _super.prototype.setMaxListeners.call(this, n);
    };
    SequentialEventEmitter.prototype.getMaxListeners = function () {
        return _super.prototype.getMaxListeners.call(this);
    };
    SequentialEventEmitter.prototype.listenerCount = function (type) {
        return _super.prototype.listenerCount.call(this, type);
    };
    SequentialEventEmitter.prototype.once = function (type, listener) {
        var self = this;
        if (typeof listener !== "function") {
            throw TypeError("listener must be a function");
        }
        var fired = false;
        function g() {
            self.removeListener(type, g);
            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }
        g[listenerProperty] = listener;
        self.on(type, g);
        return this;
    };
    return SequentialEventEmitter;
}(events_1.EventEmitter));
exports.SequentialEventEmitter = SequentialEventEmitter;
//# sourceMappingURL=emitter.js.map