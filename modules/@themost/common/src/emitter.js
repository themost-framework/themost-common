/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import {applyEachSeries} from "async";
import {EventEmitter} from "events";
import Symbol from "symbol";
const listenersProperty = "listeners";
const listenerProperty = Symbol("listener");
/**
 * @class
 * @extends EventEmitter
 */
export class SequentialEventEmitter extends EventEmitter {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Emits an event by specifying additional arguments where the last argument is a callback function
     * @param {string | symbol} event
     * @param args
     * @returns {*}
     */
// eslint-disable-next-line no-unused-vars
    emit(event, ...args) {
        //get listeners
        if (typeof this[listenersProperty] !== "function") {
            throw new Error("undefined listeners");
        }
        //get arguments as array (remove the first argument -event name-)
        const argsAndCallback = [].concat(Array.prototype.slice.call(arguments, 1));
        if (argsAndCallback.length > 0) {
            //check the last argument (expected callback function)
            if (typeof argsAndCallback[argsAndCallback.length - 1] !== "function") {
                throw new TypeError("Expected event callback");
            }
        }
        //get callback function (the last argument of arguments list)
        const callback = argsAndCallback[argsAndCallback.length - 1];
        //get array of listeners
        const listeners = this[listenersProperty](event);
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
    addListener(event, listener) {
        return super.addListener(event, listener);
    }
    /**
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns this
     */
    on(event, listener) {
        return super.on(event, listener);
    }
    /**
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns this
     */
    prependListener(event, listener) {
        return super.prependListener(event, listener);
    }
    /**
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns this
     */
    prependOnceListener(event, listener) {
        return super.prependOnceListener(event, listener);
    }
    /**
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns this
     */
    removeListener(event, listener) {
        return super.removeListener(event, listener);
    }
    /**
     * @param {string|symbol} event
     * @returns this
     */
    removeAllListeners(event) {
    return super.removeAllListeners(event);
}

    /**
     * @param {number} n
     * @returns this
     */
    setMaxListeners(n) {
    return super.setMaxListeners(n);
}

    /**
     * @return {*|number}
     */
    getMaxListeners() {
    return super.getMaxListeners();
}

    /**
     * @param type
     * @return {*|number}
     */
    listenerCount(type) {
    return super.listenerCount(type);
}

    /**
     * @param {string|symbol} event
     * @param {Function} listener
     * @return {SequentialEventEmitter}
     */
    once(event, listener) {
    const self = this;
    if (typeof listener !== "function") {
        throw TypeError("listener must be a function");
    }
    let fired = false;
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
}
