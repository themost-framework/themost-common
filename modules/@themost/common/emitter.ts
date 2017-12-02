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
import * as Symbol from "symbol";
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
     * @returns {any}
     */
    public emit(event: string|symbol, ...args: any[]) {
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

    public addListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.addListener(event, listener);
    }

    public on(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }

    public prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.prependListener(event, listener);
    }

    public prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.prependOnceListener(event, listener);
    }

    public removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.removeListener(event, listener);
    }

    public removeAllListeners(event?: string | symbol): this {
        return super.removeAllListeners(event);
    }

    public setMaxListeners(n: number): this {
        return super.setMaxListeners(n);
    }
    public getMaxListeners(): number {
        return super.getMaxListeners();
    }

    public listenerCount(type: string | symbol): number {
        return super.listenerCount(type);
    }

    public once(type: string|symbol, listener: (...args: any[]) => void) {
        const self = this as EventEmitter;
        if (typeof listener !== "function") {
            throw TypeError("listener must be a function");
        }
        let fired = false;
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
    }
}
