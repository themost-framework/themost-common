"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TraceUtils = exports.TraceLogger = exports.PathUtils = exports.LangUtils = exports.RandomUtils = exports.Guid = exports.TextUtils = exports.Base26Number = exports.Args = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * MOST Web Framework 2.0 Codename Blueshift
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017, THEMOST LP All rights reserved
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Use of this source code is governed by an BSD-3-Clause license that can be
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * found in the LICENSE file at https://themost.io/license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _blueimpMd = require("blueimp-md5");

var blueimp = _interopRequireDefault(_blueimpMd).default;

var _lodash = require("lodash");

var _ = _interopRequireDefault(_lodash).default;

var _sprintf = require("sprintf");

var sprintf = _sprintf.sprintf;

var _errors = require("./errors");

var ArgumentError = _errors.ArgumentError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Args = exports.Args = function () {
    function Args() {
        _classCallCheck(this, Args);
    }

    _createClass(Args, null, [{
        key: "check",

        /**
         * Checks the expression and throws an exception if the condition is not met.
         * @param {*} expr
         * @param {string|Error} err
         */
        value: function check(expr, err) {
            Args.notNull(expr, "Expression");
            if (typeof expr === "function") {
                expr.call();
            }
            var res = void 0;
            if (typeof expr === "function") {
                res = !expr.call();
            } else {
                res = !expr;
            }
            if (res) {
                if (err instanceof Error) {
                    throw err;
                }
                throw new ArgumentError(err, "ECHECK");
            }
        }

        /**
         *
         * @param {*} arg
         * @param {string} name
         */

    }, {
        key: "notNull",
        value: function notNull(arg, name) {
            if (typeof arg === "undefined" || arg === null) {
                throw new ArgumentError(name + " may not be null or undefined", "ENULL");
            }
        }

        /**
         * @param {*} arg
         * @param {string} name
         */

    }, {
        key: "notString",
        value: function notString(arg, name) {
            if (typeof arg !== "string") {
                throw new ArgumentError(name + " must be a string");
            }
        }

        /**
         * @param {*} arg
         * @param {string} name
         */

    }, {
        key: "notFunction",
        value: function notFunction(arg, name) {
            if (typeof arg !== "function") {
                throw new ArgumentError(name + " must be a function");
            }
        }

        /**
         * @param {*} arg
         * @param {string} name
         */

    }, {
        key: "notNumber",
        value: function notNumber(arg, name) {
            if (typeof arg !== "number") {
                throw new ArgumentError(name + " must be number");
            }
        }

        /**
         * @param {string|*} arg
         * @param {string} name
         */

    }, {
        key: "notEmpty",
        value: function notEmpty(arg, name) {
            Args.notNull(arg, name);
            Args.notString(arg, name);
            if (arg.length === 0) {
                throw new ArgumentError(name + " may not be empty", "EEMPTY");
            }
        }

        /**
         * @param {number|*} arg
         * @param {string} name
         */

    }, {
        key: "notNegative",
        value: function notNegative(arg, name) {
            Args.notNumber(arg, name);
            if (arg < 0) {
                throw new ArgumentError(name + " may not be negative", "ENEG");
            }
        }

        /**
         * @param {number|*} arg
         * @param {string} name
         */

    }, {
        key: "notPositive",
        value: function notPositive(arg, name) {
            Args.notNumber(arg, name);
            if (arg <= 0) {
                throw new ArgumentError(name + " may not be negative or zero", "EPOS");
            }
        }
    }]);

    return Args;
}();

var Base26Number = exports.Base26Number = function () {
    _createClass(Base26Number, null, [{
        key: "toBase26",
        value: function toBase26(x) {
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
                out += String.fromCharCode(a + num % 26);
                num = Math.floor(num / 26);
                length += 1;
            }
            return out;
        }
    }, {
        key: "fromBase26",
        value: function fromBase26(s) {
            var num = 0;
            if (!/[a-z]{8}/.test(s)) {
                throw new Error("Invalid base-26 format.");
            }
            var a = "a".charCodeAt(0);
            for (var i = 7; i >= 0; i--) {
                num = num * 26 + (s[i].charCodeAt(0) - a);
            }
            return num;
        }
    }]);

    function Base26Number(value) {
        _classCallCheck(this, Base26Number);

        this.value = value;
    }

    _createClass(Base26Number, [{
        key: "toString",
        value: function toString() {
            return Base26Number.toBase26(this.value);
        }
    }]);

    return Base26Number;
}();

var TextUtils = exports.TextUtils = function () {
    function TextUtils() {
        _classCallCheck(this, TextUtils);
    }

    _createClass(TextUtils, null, [{
        key: "toMD5",

        /**
         * Converts the given parameter to MD5 hex string
         * @static
         * @param {*} value
         * @returns {string|undefined}
         */
        value: function toMD5(value) {

            if (typeof value === "undefined" || value === null) {
                return;
            }
            //browser implementation
            var md5 = void 0;
            var md5module = void 0;
            if (!isNode()) {
                md5 = blueimp;
                if (typeof value === "string") {
                    return md5(value);
                } else if (value instanceof Date) {
                    return md5(value.toUTCString());
                } else {
                    return md5(JSON.stringify(value));
                }
            }
            //node.js implementation
            md5module = "crypto";
            var crypto = require(md5module);
            md5 = crypto.createHash("md5");
            if (typeof value === "string") {
                md5.update(value);
            } else if (value instanceof Date) {
                md5.update(value.toUTCString());
            } else {
                md5.update(JSON.stringify(value));
            }
            return md5.digest("hex");
        }

        /**
         * Converts the given parameter to SHA1 hex string
         * @static
         * @param {*} value
         * @returns {string|undefined}
         */

    }, {
        key: "toSHA1",
        value: function toSHA1(value) {

            Args.check(isNode(), "This method is not implemented for this environment");

            var crypto = require("crypto");
            if (typeof value === "undefined" || value === null) {
                return;
            }
            var sha1 = crypto.createHash("sha1");
            if (typeof value === "string") {
                sha1.update(value);
            } else if (value instanceof Date) {
                sha1.update(value.toUTCString());
            } else {
                sha1.update(JSON.stringify(value));
            }
            return sha1.digest("hex");
        }

        /**
         * Converts the given parameter to SHA256 hex string
         * @static
         * @param {*} value
         * @returns {string|undefined}
         */

    }, {
        key: "toSHA256",
        value: function toSHA256(value) {

            Args.check(isNode(), "This method is not implemented for this environment");

            var crypto = require("crypto");
            if (typeof value === "undefined" || value === null) {
                return;
            }
            var sha256 = crypto.createHash("sha256");
            if (typeof value === "string") {
                sha256.update(value);
            } else if (value instanceof Date) {
                sha256.update(value.toUTCString());
            } else {
                sha256.update(JSON.stringify(value));
            }
            return sha256.digest("hex");
        }

        /**
         * Returns a random GUID/UUID string
         * @static
         * @returns {string}
         */

    }, {
        key: "newUUID",
        value: function newUUID() {
            var chars = UUID_CHARS;
            var uuid = [];
            // rfc4122, version 4 form
            var r = void 0;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
            uuid[14] = "4";

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (var i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r];
                }
            }
            return uuid.join("");
        }
    }]);

    return TextUtils;
}();

/**
 *
 */


var Guid = exports.Guid = function () {
    _createClass(Guid, null, [{
        key: "isGuid",

        /**
         * @param {string} s
         * @returns {boolean}
         */
        value: function isGuid(s) {
            if (typeof s !== "string") {
                return false;
            }
            return GuidRegex.test(s);
        }

        /**
         * @returns {Guid}
         */

    }, {
        key: "newGuid",
        value: function newGuid() {
            return new Guid();
        }

        /**
         * @constructor
         * @param {string=} value
         */

    }]);

    function Guid(value) {
        _classCallCheck(this, Guid);

        if (typeof value === "string") {
            var test = value.replace(/^{/, "").replace(/{$/, "");
            Args.check(GuidRegex.test(test), "Value must be a valid UUID");
            this.value = test;
            return;
        }
        this.value = TextUtils.newUUID();
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @returns {string}
     */


    _createClass(Guid, [{
        key: "toString",
        value: function toString() {
            return this.value;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * @returns {string}
         */

    }, {
        key: "valueOf",
        value: function valueOf() {
            return this.value;
        }

        //noinspection JSUnusedGlobalSymbols

    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.value;
        }
    }]);

    return Guid;
}();

/**
 * @class
 */


var RandomUtils = exports.RandomUtils = function () {
    function RandomUtils() {
        _classCallCheck(this, RandomUtils);
    }

    _createClass(RandomUtils, null, [{
        key: "randomChars",

        /**
         * Returns a random string based on the length specified
         * @param {Number} length
         */
        value: function randomChars(length) {
            length = length || 8;
            var chars = "abcdefghkmnopqursuvwxz2456789ABCDEFHJKLMNPQURSTUVWXYZ";
            var str = "";
            for (var i = 0; i < length; i++) {
                str += chars.substr(this.randomInt(0, chars.length - 1), 1);
            }
            return str;
        }

        /**
         * Returns a random integer between a minimum and a maximum value
         * @param {number} min
         * @param {number} max
         */

    }, {
        key: "randomInt",
        value: function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /**
         * Returns a random string based on the length specified
         * @static
         * @param {number} length
         * @returns {string}
         */

    }, {
        key: "randomHex",
        value: function randomHex(length) {
            length = (length || 8) * 2;
            var str = "";
            for (var i = 0; i < length; i++) {
                str += HEX_CHARS.substr(this.randomInt(0, HEX_CHARS.length - 1), 1);
            }
            return str;
        }
    }]);

    return RandomUtils;
}();

/**
 * @class
 */


var LangUtils = exports.LangUtils = function () {
    function LangUtils() {
        _classCallCheck(this, LangUtils);
    }

    _createClass(LangUtils, null, [{
        key: "getFunctionParams",


        /**
         * Returns an array of strings which represents the arguments' names of the given function
         * @param {Function} fn
         * @returns {Array}
         */
        value: function getFunctionParams(fn) {
            if (!_.isFunction(fn)) {
                return [];
            }
            var fnStr = fn.toString().replace(STRIP_COMMENTS, "");
            var result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(/([^\s,]+)/g);
            if (result === null) {
                result = [];
            }
            return result;
        }

        /**
         * Parses HTTP form formatted values (e.g. "user[name]", user[password], user[options][rememberMe] etc ) and returns the equivalent native object
         * @param {*} form
         * @param {IConvertOptions} options
         * @returns {*}
         * @example
         *
         */

    }, {
        key: "parseForm",
        value: function parseForm(form, options) {
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
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Parses value value or string and returns the resulted object.
         * @param {*} value
         * @returns {*}
         */

    }, {
        key: "parseValue",
        value: function parseValue(value) {
            return LangUtils.convert(value);
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Parses value value and returns the equivalent integer.
         * @param {*} value
         * @returns {*}
         */

    }, {
        key: "parseInt",
        value: function (_parseInt) {
            function parseInt(_x) {
                return _parseInt.apply(this, arguments);
            }

            parseInt.toString = function () {
                return _parseInt.toString();
            };

            return parseInt;
        }(function (value) {
            return parseInt(value, 10) || 0;
        })

        //noinspection JSUnusedGlobalSymbols
        /**
         * Parses value value and returns the equivalent float number.
         * @param {*} value
         * @returns {*}
         */

    }, {
        key: "parseFloat",
        value: function (_parseFloat) {
            function parseFloat(_x2) {
                return _parseFloat.apply(this, arguments);
            }

            parseFloat.toString = function () {
                return _parseFloat.toString();
            };

            return parseFloat;
        }(function (value) {
            return parseFloat(value) || 0;
        })

        //noinspection JSUnusedGlobalSymbols
        /**
         * Parses value value and returns the equivalent boolean.
         * @param {*} value
         * @returns {*}
         */

    }, {
        key: "parseBoolean",
        value: function parseBoolean(value) {
            if (typeof value === "undefined" || value === null) {
                return false;
            } else if (typeof value === "number") {
                return value !== 0;
            } else if (typeof value === "string") {
                if (value.match(IntegerRegex) || value.match(FloatRegex)) {
                    return parseInt(value, 10) !== 0;
                } else if (value.match(BooleanTrueRegex)) {
                    return true;
                } else if (value.match(BooleanFalseRegex)) {
                    return false;
                } else if (/^yes$|^on$|^y$|^valid$/i.test(value)) {
                    return true;
                } else if (/^no$|^off$|^n$|^invalid$/i.test(value)) {
                    return false;
                } else {
                    return false;
                }
            } else if (typeof value === "boolean") {
                return value;
            } else {
                return (parseInt(value, 10) || 0) !== 0;
            }
        }

        /**
         * @param {string} value
         */

    }, {
        key: "convert",
        value: function convert(value) {
            var result = void 0;
            if (typeof value === "string") {
                if (value.length === 0) {
                    result = value;
                }
                if (value.match(BooleanTrueRegex)) {
                    result = true;
                } else if (value.match(BooleanFalseRegex)) {
                    result = false;
                } else if (value.match(NullRegex) || value.match(UndefinedRegex)) {
                    result = null;
                } else if (value.match(IntegerRegex)) {
                    result = parseInt(value, 10);
                } else if (value.match(FloatRegex)) {
                    result = parseFloat(value);
                } else if (value.match(DateTimeRegex)) {
                    result = new Date(Date.parse(value));
                } else {
                    result = value;
                }
            } else {
                result = value;
            }
            return result;
        }

        /**
         *
         * @param {*} origin
         * @param {string} expr
         * @param {string} value
         * @param {IConvertOptions=} options
         * @returns {*}
         */

    }, {
        key: "extend",
        value: function extend(origin, expr, value, options) {

            options = options || { convertValues: false };
            //find base notation
            var match = /(^\w+)\[/.exec(expr);
            var name = void 0;
            var descriptor = void 0;
            var expr1 = void 0;
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
                } else {
                    //set property value (unknown)
                    origin[name] = origin[name] || new LangUtils();
                    descriptor = new UnknownPropertyDescriptor(origin, name);
                    // get new expression
                    expr1 = expr.substr(match.index + match[1].length);
                    LangUtils.extend(descriptor, expr1, value, options);
                }
            } else if (expr.indexOf("[") === 0) {
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
                        if (typeof value === "string" && options.convertValues) {
                            typedValue = LangUtils.convert(value);
                        } else {
                            typedValue = value;
                        }
                        if (_.isArray(origin.value)) {
                            origin.value.push(typedValue);
                        } else {
                            origin.value[name] = typedValue;
                        }
                    } else {
                        if (origin.value instanceof LangUtils) {
                            origin.value = {};
                        }
                        origin.value[name] = origin.value[name] || new LangUtils();
                        descriptor = new UnknownPropertyDescriptor(origin.value, name);
                        LangUtils.extend(descriptor, expr1, value, options);
                    }
                } else {
                    throw new Error("Invalid object property notation. Expected [name]");
                }
            } else if (/^\w+$/.test(expr)) {
                if (options.convertValues) {
                    origin[expr] = LangUtils.convert(value);
                } else {
                    origin[expr] = value;
                }
            } else {
                throw new Error("Invalid object property notation. Expected property[name] or [name]");
            }
            return origin;
        }
    }]);

    return LangUtils;
}();

/**
 * @class
 * @constructor
 */


var UnknownPropertyDescriptor = function UnknownPropertyDescriptor(obj, name) {
    _classCallCheck(this, UnknownPropertyDescriptor);

    Object.defineProperty(this, "value", {
        configurable: false, enumerable: true, get: function get() {
            return obj[name];
        },
        set: function set(value) {
            obj[name] = value;
        }
    });
    Object.defineProperty(this, "name", {
        configurable: false, enumerable: true, get: function get() {
            return name;
        }
    });
};

/**
 * @class
 */


var PathUtils = exports.PathUtils = function () {
    function PathUtils() {
        _classCallCheck(this, PathUtils);
    }

    _createClass(PathUtils, null, [{
        key: "join",

        /**
         *
         * @param {...string} part
         * @returns {string}
         */
        value: function join() {
            for (var _len = arguments.length, part = Array(_len), _key = 0; _key < _len; _key++) {
                part[_key] = arguments[_key];
            }

            var parts = void 0;
            var i = void 0;
            var l = void 0;
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
                } else {
                    newParts.push(part1);
                }
            }
            // Preserve the initial slash if there was one.
            if (parts[0] === "") {
                newParts.unshift("");
            }
            // Turn back into a single string path.
            return newParts.join("/") || (newParts.length ? "/" : ".");
        }
    }]);

    return PathUtils;
}();

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
    debug: 4
};

var LogLevelColors = {
    error: FgRed,
    warn: FgMagenta,
    info: FgBlack,
    verbose: FgBlue,
    debug: Bold + FgGreen
};

/**
 * extends ITraceLogger
 */

var TraceLogger = function () {
    function TraceLogger(options) {
        _classCallCheck(this, TraceLogger);

        this.options = {
            colors: true,
            level: "info"
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

    _createClass(TraceLogger, [{
        key: "level",
        value: function level(_level) {
            Args.check(LogLevels.hasOwnProperty(_level), "Invalid logging level. Expected error, warn, info, verbose or debug.");
            this.options.level = _level;
            return this;
        }
    }, {
        key: "log",
        value: function log() {
            for (var _len2 = arguments.length, data = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                data[_key2] = arguments[_key2];
            }

            var args = Array.prototype.slice.call(arguments);
            this.write("info", sprintf.apply(null, args));
        }
    }, {
        key: "info",
        value: function info() {
            for (var _len3 = arguments.length, data = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                data[_key3] = arguments[_key3];
            }

            var args = Array.prototype.slice.call(arguments);
            this.write("info", sprintf.apply(null, args));
        }
    }, {
        key: "error",
        value: function error() {
            for (var _len4 = arguments.length, data = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                data[_key4] = arguments[_key4];
            }

            var args = Array.prototype.slice.call(arguments);
            this.write("error", sprintf.apply(null, args));
        }
    }, {
        key: "warn",
        value: function warn() {
            for (var _len5 = arguments.length, data = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                data[_key5] = arguments[_key5];
            }

            var args = Array.prototype.slice.call(arguments);
            this.write("warn", sprintf.apply(null, args));
        }
    }, {
        key: "verbose",
        value: function verbose() {
            for (var _len6 = arguments.length, data = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                data[_key6] = arguments[_key6];
            }

            var args = Array.prototype.slice.call(arguments);
            this.write("verbose", sprintf.apply(null, args));
        }
    }, {
        key: "debug",
        value: function debug() {
            for (var _len7 = arguments.length, data = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                data[_key7] = arguments[_key7];
            }

            var args = Array.prototype.slice.call(arguments);
            this.write("debug", sprintf.apply(null, args));
        }
    }, {
        key: "timestamp",
        value: function timestamp() {
            return new Date().toUTCString();
        }
    }, {
        key: "write",
        value: function write(level, text) {
            if (LogLevels[level] > LogLevels[this.options.level]) {
                return;
            }
            /* tslint:disable:no-console */
            if (this.options.colors) {
                console.log(LogLevelColors[level] + this.timestamp() + " [" + level.toUpperCase() + "] " + text, Reset);
            } else {
                console.log(this.timestamp() + " [" + level.toUpperCase() + "] " + text);
            }
            /* tslint:enable:no-console */
        }
    }]);

    return TraceLogger;
}();

exports.TraceLogger = TraceLogger;

var TraceUtils = exports.TraceUtils = function () {
    function TraceUtils() {
        _classCallCheck(this, TraceUtils);
    }

    _createClass(TraceUtils, null, [{
        key: "useLogger",
        value: function useLogger(logger) {
            TraceUtils.logger = logger;
        }

        /**
         * @static
         * @param {...*} data
         */

    }, {
        key: "log",
        value: function log() {
            for (var _len8 = arguments.length, data = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                data[_key8] = arguments[_key8];
            }

            TraceUtils.logger.log.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
        }

        /**
         * @static
         * @param {...*} data
         */

    }, {
        key: "error",
        value: function error() {
            for (var _len9 = arguments.length, data = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                data[_key9] = arguments[_key9];
            }

            TraceUtils.logger.error.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
        }

        /**
         *
         * @static
         * @param {...*} data
         */

    }, {
        key: "info",
        value: function info() {
            for (var _len10 = arguments.length, data = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                data[_key10] = arguments[_key10];
            }

            TraceUtils.logger.info.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
        }

        /**
         *
         * @static
         * @param {*} data
         */

    }, {
        key: "warn",
        value: function warn() {
            for (var _len11 = arguments.length, data = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                data[_key11] = arguments[_key11];
            }

            TraceUtils.logger.warn.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
        }

        /**
         *
         * @static
         * @param {...*} data
         */

    }, {
        key: "debug",
        value: function debug() {
            for (var _len12 = arguments.length, data = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                data[_key12] = arguments[_key12];
            }

            TraceUtils.logger.debug.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
        }
    }]);

    return TraceUtils;
}();

TraceUtils.useLogger(new TraceLogger());

//# sourceMappingURL=utils.js.map