/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
///
var EventEmitter = require('events').EventEmitter;
var LangUtils = require('./utils').LangUtils;
var applyEachSeries = require('async').applyEachSeries;
require('es6-promise/auto');

/**
 * Wraps an async listener and returns a callback-like function
 * @param {function(...*):Promise<void>} asyncListener
 */
function wrapAsyncListener(asyncListener) {
    /**
     * @this SequentialEventEmitter
     */
    var result = function() {
        // get arguments without callback
        var args = [].concat(Array.prototype.slice.call(arguments, 0, arguments.length -1));
        // get callback
        var callback = arguments[arguments.length - 1];
        return asyncListener.apply(this, args).then(function() {
            return callback();
        }).catch(function(err) {
            return callback(err);
        });
    }
    // set async listener property in order to have an option to unsubscribe
    Object.defineProperty(result, '_listener', {
        configurable: true,
        enumerable: true,
        value: asyncListener
    });
    return result;
}

/**
 * Wraps an async listener and returns a callback-like function
 * @param {string} event
 * @param {function(...*):Promise<void>} asyncListener
 */
function wrapOnceAsyncListener(event, asyncListener) {
    /**
     * @this SequentialEventEmitter
     */
    var result = function() {
        var callee = arguments.callee;
        // get arguments without callback
        var args = [].concat(Array.prototype.slice.call(arguments, 0, arguments.length -1));
        // get callback
        var callback = arguments[arguments.length - 1];
        var self = this;
        return asyncListener.apply(self, args).then(function() {
            // manually remove async listener
            self.removeListener(event, callee);
            return callback();
        }).catch(function(err) {
            // manually remove async listener
            self.removeListener(event, callee);
            return callback(err);
        });
    }
    // set async listener property in order to have an option to unsubscribe
    Object.defineProperty(result, '_listener', {
        configurable: true,
        enumerable: true,
        value: asyncListener
    });
    return result;
}

/**
 * SequentialEventEmitter class is an extension of node.js EventEmitter class where listeners are executing in series.
 * @class
 * @constructor
 * @augments EventEmitter
 */
function SequentialEventEmitter() {
    //
}
LangUtils.inherits(SequentialEventEmitter, EventEmitter);

/**
 * Executes event listeners in series.
 * @param {String} event - The event that is going to be executed.
 * @param {...*} args - An object that contains the event arguments.
 */
// eslint-disable-next-line no-unused-vars
SequentialEventEmitter.prototype.emit = function(event, args)
{
    //ensure callback
    callback = callback || function() {};
    //get listeners
    if (typeof this.listeners !== 'function') {
        throw new Error('undefined listeners');
    }
    var listeners = this.listeners(event);

    var argsAndCallback = [].concat(Array.prototype.slice.call(arguments, 1));
    if (argsAndCallback.length > 0) {
        //check the last argument (expected callback function)
        if (typeof argsAndCallback[argsAndCallback.length - 1] !== "function") {
            throw new TypeError("Expected event callback");
        }
    }
    //get callback function (the last argument of arguments list)
    var callback = argsAndCallback[argsAndCallback.length - 1];

    //validate listeners
    if (listeners.length===0) {
        //exit emitter
        return callback();
    }
    //apply each series
    return applyEachSeries.apply(this, [listeners].concat(argsAndCallback));
};
/**
 *
 * @param {string} event
 * @param {function(...*):Promise<void>} asyncListener
 * @returns this
 */
SequentialEventEmitter.prototype.subscribe = function(event, asyncListener) {
    return this.on(event, wrapAsyncListener(asyncListener));
}

/**
 *
 * @param {string} event
 * @param {function(...*):Promise<void>} asyncListener
 * @returns this
 */
SequentialEventEmitter.prototype.unsubscribe = function(event, asyncListener) {
    // get event listeners
    var listeners = this.listeners(event);
    // enumerate
    for (var i = 0; i < listeners.length; i++) {
        var item = listeners[i];
        // if listener has an underlying listener
        if (typeof item._listener === 'function') {
            // and it's the same with the listener specified
            if (item._listener === asyncListener) {
                // remove listener and break
                this.removeListener(event, item);
                break;
            }
        }
    }
    return this;
}

/**
 *
 * @param {string} event
 * @param {function(...*):Promise<void>} asyncListener
 */
SequentialEventEmitter.prototype.subscribeOnce = function(event, asyncListener) {
    return this.once(event, wrapOnceAsyncListener(event, asyncListener));
}

/**
 *
 * @param {string} event
 * @param {...args} args
 */
// eslint-disable-next-line no-unused-vars
SequentialEventEmitter.prototype.next = function(event, args) {
    var self = this;
    /**
     * get arguments as array
     * @type {*[]}
     */
    var argsAndCallback = [event].concat(Array.prototype.slice.call(arguments, 1));
    // eslint-disable-next-line no-undef
    return new Promise(function(resolve, reject) {
        // set callback
        argsAndCallback.push(function(err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
        // emit event
        self.emit.apply(self, argsAndCallback);
    });

}

if (typeof exports !== 'undefined') {
    module.exports.SequentialEventEmitter = SequentialEventEmitter;
}
