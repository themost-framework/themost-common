"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
var blueimp = require("blueimp-md5");
var _ = require("lodash");
var sprintf_1 = require("sprintf");
var errors_1 = require("./errors");
var UUID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var HEX_CHARS = "abcdef1234567890";
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var DateTimeRegex = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/g;
var BooleanTrueRegex = /^true$/ig;
var BooleanFalseRegex = /^false$/ig;
var NullRegex = /^null$/ig;
var UndefinedRegex = /^undefined$/ig;
var IntegerRegex = /^[-+]?\d+$/g;
var FloatRegex = /^[+-]?\d+(\.\d+)?$/g;
var GuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
function isNode() {
    return Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}
/**
 * @class
 */
var Args = /** @class */ (function () {
    function Args() {
    }
    /**
     * Checks the expression and throws an exception if the condition is not met.
     * @param {*} expr
     * @param {string|Error} err
     */
    Args.check = function (expr, err) {
        Args.notNull(expr, "Expression");
        if (typeof expr === "function") {
            expr.call();
        }
        var res;
        if (typeof expr === "function") {
            res = !(expr.call());
        }
        else {
            res = (!expr);
        }
        if (res) {
            if (err instanceof Error) {
                throw err;
            }
            throw new errors_1.ArgumentError(err, "ECHECK");
        }
    };
    /**
     *
     * @param {*} arg
     * @param {string} name
     */
    Args.notNull = function (arg, name) {
        if (typeof arg === "undefined" || arg === null) {
            throw new errors_1.ArgumentError(name + " may not be null or undefined", "ENULL");
        }
    };
    /**
     * @param {*} arg
     * @param {string} name
     */
    Args.notString = function (arg, name) {
        if (typeof arg !== "string") {
            throw new errors_1.ArgumentError(name + " must be a string");
        }
    };
    /**
     * @param {*} arg
     * @param {string} name
     */
    Args.notFunction = function (arg, name) {
        if (typeof arg !== "function") {
            throw new errors_1.ArgumentError(name + " must be a function");
        }
    };
    /**
     * @param {*} arg
     * @param {string} name
     */
    Args.notNumber = function (arg, name) {
        if (typeof arg !== "number") {
            throw new errors_1.ArgumentError(name + " must be number");
        }
    };
    /**
     * @param {string|*} arg
     * @param {string} name
     */
    Args.notEmpty = function (arg, name) {
        Args.notNull(arg, name);
        Args.notString(arg, name);
        if (arg.length === 0) {
            throw new errors_1.ArgumentError(name + " may not be empty", "EEMPTY");
        }
    };
    /**
     * @param {number|*} arg
     * @param {string} name
     */
    Args.notNegative = function (arg, name) {
        Args.notNumber(arg, name);
        if (arg < 0) {
            throw new errors_1.ArgumentError(name + " may not be negative", "ENEG");
        }
    };
    /**
     * @param {number|*} arg
     * @param {string} name
     */
    Args.notPositive = function (arg, name) {
        Args.notNumber(arg, name);
        if (arg <= 0) {
            throw new errors_1.ArgumentError(name + " may not be negative or zero", "EPOS");
        }
    };
    return Args;
}());
exports.Args = Args;
var Base26Number = /** @class */ (function () {
    function Base26Number(value) {
        this.value = value;
    }
    Base26Number.toBase26 = function (x) {
        var num = Math.floor(x | 0);
        if (num < 0) {
            throw new Error("A non-positive integer cannot be converted to base-26 format.");
        }
        if (num > 208827064575) {
            throw new Error("A positive integer bigger than 208827064575 cannot be converted to base-26 format.");
        }
        var out = "";
        var length = 1;
        var a = "a".charCodeAt(0);
        while (length <= 8) {
            out += String.fromCharCode(a + (num % 26));
            num = Math.floor(num / 26);
            length += 1;
        }
        return out;
    };
    Base26Number.fromBase26 = function (s) {
        var num = 0;
        if (!/[a-z]{8}/.test(s)) {
            throw new Error("Invalid base-26 format.");
        }
        var a = "a".charCodeAt(0);
        for (var i = 7; i >= 0; i--) {
            num = (num * 26) + (s[i].charCodeAt(0) - a);
        }
        return num;
    };
    Base26Number.prototype.toString = function () {
        return Base26Number.toBase26(this.value);
    };
    return Base26Number;
}());
exports.Base26Number = Base26Number;
var TextUtils = /** @class */ (function () {
    function TextUtils() {
    }
    /**
     * Converts the given parameter to MD5 hex string
     * @static
     * @param {*} value
     * @returns {string|undefined}
     */
    TextUtils.toMD5 = function (value) {
        if (typeof value === "undefined" || value === null) {
            return;
        }
        //browser implementation
        var md5;
        var md5module;
        if (!isNode()) {
            md5 = blueimp;
            if (typeof value === "string") {
                return md5(value);
            }
            else if (value instanceof Date) {
                return md5(value.toUTCString());
            }
            else {
                return md5(JSON.stringify(value));
            }
        }
        //node.js implementation
        md5module = "crypto";
        var crypto = require(md5module);
        md5 = crypto.createHash("md5");
        if (typeof value === "string") {
            md5.update(value);
        }
        else if (value instanceof Date) {
            md5.update(value.toUTCString());
        }
        else {
            md5.update(JSON.stringify(value));
        }
        return md5.digest("hex");
    };
    /**
     * Converts the given parameter to SHA1 hex string
     * @static
     * @param {*} value
     * @returns {string|undefined}
     */
    TextUtils.toSHA1 = function (value) {
        Args.check(isNode(), "This method is not implemented for this environment");
        var crypto = require("crypto");
        if (typeof value === "undefined" || value === null) {
            return;
        }
        var sha1 = crypto.createHash("sha1");
        if (typeof value === "string") {
            sha1.update(value);
        }
        else if (value instanceof Date) {
            sha1.update(value.toUTCString());
        }
        else {
            sha1.update(JSON.stringify(value));
        }
        return sha1.digest("hex");
    };
    /**
     * Converts the given parameter to SHA256 hex string
     * @static
     * @param {*} value
     * @returns {string|undefined}
     */
    TextUtils.toSHA256 = function (value) {
        Args.check(isNode(), "This method is not implemented for this environment");
        var crypto = require("crypto");
        if (typeof value === "undefined" || value === null) {
            return;
        }
        var sha256 = crypto.createHash("sha256");
        if (typeof value === "string") {
            sha256.update(value);
        }
        else if (value instanceof Date) {
            sha256.update(value.toUTCString());
        }
        else {
            sha256.update(JSON.stringify(value));
        }
        return sha256.digest("hex");
    };
    /**
     * Returns a random GUID/UUID string
     * @static
     * @returns {string}
     */
    TextUtils.newUUID = function () {
        var chars = UUID_CHARS;
        var uuid = [];
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (var i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join("");
    };
    return TextUtils;
}());
exports.TextUtils = TextUtils;
/**
 *
 */
var Guid = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} value
     */
    function Guid(value) {
        if (typeof value === "string") {
            var test_1 = value.replace(/^{/, "").replace(/{$/, "");
            Args.check(GuidRegex.test(test_1), "Value must be a valid UUID");
            this.value = test_1;
            return;
        }
        this.value = TextUtils.newUUID();
    }
    /**
     * @param {string} s
     * @returns {boolean}
     */
    Guid.isGuid = function (s) {
        if (typeof s !== "string") {
            return false;
        }
        return GuidRegex.test(s);
    };
    /**
     * @returns {Guid}
     */
    Guid.newGuid = function () {
        return new Guid();
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * @returns {string}
     */
    Guid.prototype.toString = function () {
        return this.value;
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * @returns {string}
     */
    Guid.prototype.valueOf = function () {
        return this.value;
    };
    //noinspection JSUnusedGlobalSymbols
    Guid.prototype.toJSON = function () {
        return this.value;
    };
    return Guid;
}());
exports.Guid = Guid;
/**
 * @class
 */
var RandomUtils = /** @class */ (function () {
    function RandomUtils() {
    }
    /**
     * Returns a random string based on the length specified
     * @param {Number} length
     */
    RandomUtils.randomChars = function (length) {
        length = length || 8;
        var chars = "abcdefghkmnopqursuvwxz2456789ABCDEFHJKLMNPQURSTUVWXYZ";
        var str = "";
        for (var i = 0; i < length; i++) {
            str += chars.substr(this.randomInt(0, chars.length - 1), 1);
        }
        return str;
    };
    /**
     * Returns a random integer between a minimum and a maximum value
     * @param {number} min
     * @param {number} max
     */
    RandomUtils.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * Returns a random string based on the length specified
     * @static
     * @param {number} length
     * @returns {string}
     */
    RandomUtils.randomHex = function (length) {
        length = (length || 8) * 2;
        var str = "";
        for (var i = 0; i < length; i++) {
            str += HEX_CHARS.substr(this.randomInt(0, HEX_CHARS.length - 1), 1);
        }
        return str;
    };
    return RandomUtils;
}());
exports.RandomUtils = RandomUtils;
/**
 * @class
 */
var LangUtils = /** @class */ (function () {
    function LangUtils() {
    }
    /**
     * Returns an array of strings which represents the arguments' names of the given function
     * @param {Function} fn
     * @returns {Array}
     */
    LangUtils.getFunctionParams = function (fn) {
        if (!_.isFunction(fn)) {
            return [];
        }
        var fnStr = fn.toString().replace(STRIP_COMMENTS, "");
        var result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(/([^\s,]+)/g);
        if (result === null) {
            result = [];
        }
        return result;
    };
    /**
     * Parses HTTP form formatted values (e.g. "user[name]", user[password], user[options][rememberMe] etc ) and returns the equivalent native object
     * @param {*} form
     * @param {IConvertOptions} options
     * @returns {*}
     * @example
     *
     */
    LangUtils.parseForm = function (form, options) {
        var result = {};
        if (typeof form === "undefined" || form === null) {
            return result;
        }
        var keys = Object.keys(form);
        _.forEach(keys, function (key) {
            if (form.hasOwnProperty(key)) {
                LangUtils.extend(result, key, form[key], options);
            }
        });
        return result;
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * Parses value value or string and returns the resulted object.
     * @param {*} value
     * @returns {*}
     */
    LangUtils.parseValue = function (value) {
        return LangUtils.convert(value);
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * Parses value value and returns the equivalent integer.
     * @param {*} value
     * @returns {*}
     */
    LangUtils.parseInt = function (value) {
        return parseInt(value, 10) || 0;
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * Parses value value and returns the equivalent float number.
     * @param {*} value
     * @returns {*}
     */
    LangUtils.parseFloat = function (value) {
        return parseFloat(value) || 0;
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * Parses value value and returns the equivalent boolean.
     * @param {*} value
     * @returns {*}
     */
    LangUtils.parseBoolean = function (value) {
        if (typeof value === "undefined" || value === null) {
            return false;
        }
        else if (typeof value === "number") {
            return value !== 0;
        }
        else if (typeof value === "string") {
            if (value.match(IntegerRegex) || value.match(FloatRegex)) {
                return parseInt(value, 10) !== 0;
            }
            else if (value.match(BooleanTrueRegex)) {
                return true;
            }
            else if (value.match(BooleanFalseRegex)) {
                return false;
            }
            else if (/^yes$|^on$|^y$|^valid$/i.test(value)) {
                return true;
            }
            else if (/^no$|^off$|^n$|^invalid$/i.test(value)) {
                return false;
            }
            else {
                return false;
            }
        }
        else if (typeof value === "boolean") {
            return value;
        }
        else {
            return (parseInt(value, 10) || 0) !== 0;
        }
    };
    /**
     * @param {string} value
     */
    LangUtils.convert = function (value) {
        var result;
        if ((typeof value === "string")) {
            if (value.length === 0) {
                result = value;
            }
            if (value.match(BooleanTrueRegex)) {
                result = true;
            }
            else if (value.match(BooleanFalseRegex)) {
                result = false;
            }
            else if (value.match(NullRegex) || value.match(UndefinedRegex)) {
                result = null;
            }
            else if (value.match(IntegerRegex)) {
                result = parseInt(value, 10);
            }
            else if (value.match(FloatRegex)) {
                result = parseFloat(value);
            }
            else if (value.match(DateTimeRegex)) {
                result = new Date(Date.parse(value));
            }
            else {
                result = value;
            }
        }
        else {
            result = value;
        }
        return result;
    };
    /**
     *
     * @param {*} origin
     * @param {string} expr
     * @param {string} value
     * @param {IConvertOptions=} options
     * @returns {*}
     */
    LangUtils.extend = function (origin, expr, value, options) {
        options = options || { convertValues: false };
        //find base notation
        var match = /(^\w+)\[/.exec(expr);
        var name;
        var descriptor;
        var expr1;
        if (match) {
            //get property name
            name = match[1];
            //validate array property
            if (/^\d+$/g.test(name)) {
                //property is an array
                if (!_.isArray(origin.value)) {
                    origin.value = [];
                }
                // get new expression
                expr1 = expr.substr(match.index + match[1].length);
                LangUtils.extend(origin, expr1, value, options);
            }
            else {
                //set property value (unknown)
                origin[name] = origin[name] || new LangUtils();
                descriptor = new UnknownPropertyDescriptor(origin, name);
                // get new expression
                expr1 = expr.substr(match.index + match[1].length);
                LangUtils.extend(descriptor, expr1, value, options);
            }
        }
        else if (expr.indexOf("[") === 0) {
            //get property
            var re = /\[(.*?)]/g;
            match = re.exec(expr);
            if (match) {
                name = match[1];
                // get new expression
                expr1 = expr.substr(match.index + match[0].length);
                if (/^\d+$/g.test(name)) {
                    // property is an array
                    if (!_.isArray(origin.value)) {
                        origin.value = [];
                    }
                }
                if (expr1.length === 0) {
                    if (origin.value instanceof LangUtils) {
                        origin.value = {};
                    }
                    var typedValue = void 0;
                    // convert string value
                    if ((typeof value === "string") && options.convertValues) {
                        typedValue = LangUtils.convert(value);
                    }
                    else {
                        typedValue = value;
                    }
                    if (_.isArray(origin.value)) {
                        origin.value.push(typedValue);
                    }
                    else {
                        origin.value[name] = typedValue;
                    }
                }
                else {
                    if (origin.value instanceof LangUtils) {
                        origin.value = {};
                    }
                    origin.value[name] = origin.value[name] || new LangUtils();
                    descriptor = new UnknownPropertyDescriptor(origin.value, name);
                    LangUtils.extend(descriptor, expr1, value, options);
                }
            }
            else {
                throw new Error("Invalid object property notation. Expected [name]");
            }
        }
        else if (/^\w+$/.test(expr)) {
            if (options.convertValues) {
                origin[expr] = LangUtils.convert(value);
            }
            else {
                origin[expr] = value;
            }
        }
        else {
            throw new Error("Invalid object property notation. Expected property[name] or [name]");
        }
        return origin;
    };
    return LangUtils;
}());
exports.LangUtils = LangUtils;
/**
 * @class
 * @constructor
 */
var UnknownPropertyDescriptor = /** @class */ (function () {
    function UnknownPropertyDescriptor(obj, name) {
        Object.defineProperty(this, "value", { configurable: false, enumerable: true, get: function () { return obj[name]; }, set: function (value) { obj[name] = value; } });
        Object.defineProperty(this, "name", { configurable: false, enumerable: true, get: function () { return name; } });
    }
    return UnknownPropertyDescriptor;
}());
/**
 * @class
 */
var PathUtils = /** @class */ (function () {
    function PathUtils() {
    }
    /**
     *
     * @param {...string} part
     * @returns {string}
     */
    PathUtils.join = function () {
        var part = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            part[_i] = arguments[_i];
        }
        var parts;
        var i;
        var l;
        var pathModule = "path";
        if (isNode()) {
            var path = require(pathModule);
            return path.join.apply(null, part);
        }
        // Split the inputs into a list of path commands.
        parts = [];
        for (i = 0, l = arguments.length; i < l; i++) {
            parts = parts.concat(arguments[i].replace(/\\/g, "/").split("/"));
        }
        // Interpret the path commands to get the new resolved path.
        var newParts = [];
        for (i = 0, l = parts.length; i < l; i++) {
            var part1 = parts[i];
            // Remove leading and trailing slashes
            // Also remove "." segments
            if (!part1 || part1 === ".") {
                continue;
            }
            // Interpret ".." to pop the last segment
            if (part1 === "..") {
                newParts.pop();
            }
            else {
                newParts.push(part1);
            }
        }
        // Preserve the initial slash if there was one.
        if (parts[0] === "") {
            newParts.unshift("");
        }
        // Turn back into a single string path.
        return newParts.join("/") || (newParts.length ? "/" : ".");
    };
    return PathUtils;
}());
exports.PathUtils = PathUtils;
var Reset = "\x1b[0m";
var FgBlack = "\x1b[30m";
var FgRed = "\x1b[31m";
var FgGreen = "\x1b[32m";
var FgYellow = "\x1b[33m";
var FgBlue = "\x1b[34m";
var FgMagenta = "\x1b[35m";
var FgCyan = "\x1b[36m";
var FgWhite = "\x1b[37m";
var Bold = "\x1b[1m";
var LogLevels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
};
var LogLevelColors = {
    error: FgRed,
    warn: FgMagenta,
    info: FgBlack,
    verbose: FgBlue,
    debug: Bold + FgGreen,
};
var TraceLogger = /** @class */ (function () {
    function TraceLogger(options) {
        this.options = {
            colors: true,
            level: "info",
        };
        if (typeof options === "undefined" && options !== null && isNode()) {
            if (process.env.NODE_ENV === "development") {
                this.options.level = "debug";
            }
        }
        if (typeof options !== "undefined" && options !== null) {
            this.options = options;
            //validate logging level
            Args.check(LogLevels.hasOwnProperty(this.options.level), "Invalid logging level. Expected error, warn, info, verbose or debug.");
        }
    }
    TraceLogger.prototype.level = function (level) {
        Args.check(LogLevels.hasOwnProperty(level), "Invalid logging level. Expected error, warn, info, verbose or debug.");
        this.options.level = level;
        return this;
    };
    TraceLogger.prototype.log = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        this.write("info", sprintf_1.sprintf.apply(null, args));
    };
    TraceLogger.prototype.info = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        this.write("info", sprintf_1.sprintf.apply(null, args));
    };
    TraceLogger.prototype.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        this.write("error", sprintf_1.sprintf.apply(null, args));
    };
    TraceLogger.prototype.warn = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        this.write("warn", sprintf_1.sprintf.apply(null, args));
    };
    TraceLogger.prototype.verbose = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        this.write("verbose", sprintf_1.sprintf.apply(null, args));
    };
    TraceLogger.prototype.debug = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        this.write("debug", sprintf_1.sprintf.apply(null, args));
    };
    TraceLogger.prototype.timestamp = function () {
        return (new Date()).toUTCString();
    };
    TraceLogger.prototype.write = function (level, text) {
        if (LogLevels[level] > LogLevels[this.options.level]) {
            return;
        }
        /* tslint:disable:no-console */
        if (this.options.colors) {
            console.log(LogLevelColors[level] + this.timestamp() + " [" + level.toUpperCase() + "] " + text, Reset);
        }
        else {
            console.log(this.timestamp() + " [" + level.toUpperCase() + "] " + text);
        }
        /* tslint:enable:no-console */
    };
    return TraceLogger;
}());
exports.TraceLogger = TraceLogger;
var TraceUtils = /** @class */ (function () {
    function TraceUtils() {
    }
    TraceUtils.useLogger = function (logger) {
        TraceUtils.logger = logger;
    };
    /**
     * @static
     * @param {...*} data
     */
    TraceUtils.log = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        TraceUtils.logger.log.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    };
    /**
     * @static
     * @param {...*} data
     */
    TraceUtils.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        TraceUtils.logger.error.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    };
    /**
     *
     * @static
     * @param {...*} data
     */
    TraceUtils.info = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        TraceUtils.logger.info.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    };
    /**
     *
     * @static
     * @param {*} data
     */
    TraceUtils.warn = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        TraceUtils.logger.warn.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    };
    /**
     *
     * @static
     * @param {...*} data
     */
    TraceUtils.debug = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        TraceUtils.logger.debug.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    };
    return TraceUtils;
}());
exports.TraceUtils = TraceUtils;
TraceUtils.useLogger(new TraceLogger());
//# sourceMappingURL=utils.js.map