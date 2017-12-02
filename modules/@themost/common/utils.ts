/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import blueimp = require("blueimp-md5");
import * as _ from "lodash";
import {sprintf} from "sprintf";
import {ArgumentError} from "./errors";

const UUID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const HEX_CHARS = "abcdef1234567890";
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

const DateTimeRegex = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/g;
const BooleanTrueRegex = /^true$/ig;
const BooleanFalseRegex = /^false$/ig;
const NullRegex = /^null$/ig;
const UndefinedRegex = /^undefined$/ig;
const IntegerRegex =/^[-+]?\d+$/g;
const FloatRegex =/^[+-]?\d+(\.\d+)?$/g;
const GuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

function isNode() {
    return Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}

/**
 * @class
 */
export class Args {
    /**
     * Checks the expression and throws an exception if the condition is not met.
     * @param {*} expr
     * @param {string|Error} err
     */
    public static check(expr:any, err:string|Error) {
        Args.notNull(expr,"Expression");
        if (typeof expr === "function") {
            expr.call();
        }
        let res;
        if (typeof expr === "function") {
            res = !(expr.call());
        } else {
            res = (!expr);
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
    public static notNull(arg:any, name:string) {
        if (typeof arg === "undefined" || arg === null) {
            throw new ArgumentError(name + " may not be null or undefined", "ENULL");
        }
    }

    /**
     * @param {*} arg
     * @param {string} name
     */
    public static notString(arg:any, name:string) {
        if (typeof arg !== "string") {
            throw new ArgumentError(name + " must be a string");
        }
    }

    /**
     * @param {*} arg
     * @param {string} name
     */
    public static notFunction(arg:any, name:string) {
        if (typeof arg !== "function") {
            throw new ArgumentError(name + " must be a function");
        }
    }

    /**
     * @param {*} arg
     * @param {string} name
     */
    public static notNumber(arg:any, name:string) {
        if (typeof arg !== "number") {
            throw new ArgumentError(name + " must be number");
        }
    }

    /**
     * @param {string|*} arg
     * @param {string} name
     */
    public static notEmpty(arg, name) {
        Args.notNull(arg,name);
        Args.notString(arg,name);
        if (arg.length === 0) {
            throw new ArgumentError(name + " may not be empty", "EEMPTY");
        }
    }

    /**
     * @param {number|*} arg
     * @param {string} name
     */
    public static notNegative(arg, name) {
        Args.notNumber(arg,name);
        if (arg<0) {
            throw new ArgumentError(name + " may not be negative", "ENEG");
        }
    }

    /**
     * @param {number|*} arg
     * @param {string} name
     */
    public static notPositive(arg, name) {
        Args.notNumber(arg,name);
        if (arg<=0) {
            throw new ArgumentError(name + " may not be negative or zero", "EPOS");
        }
    }
}

export class Base26Number {

    public static toBase26(x:number):string {
        let num = Math.floor(x | 0);
        if (num<0) {
            throw new Error("A non-positive integer cannot be converted to base-26 format.");
        }
        if (num>208827064575) {
            throw new Error("A positive integer bigger than 208827064575 cannot be converted to base-26 format.");
        }
        let out = "";
        let length= 1;
        const a = "a".charCodeAt(0);
        while(length<=8) {
            out += String.fromCharCode(a + (num % 26));
            num = Math.floor(num / 26);
            length += 1;
        }
        return out;
    }

    public static fromBase26(s:string):number {
        let num = 0;
        if (!/[a-z]{8}/.test(s)) {
            throw new Error("Invalid base-26 format.");
        }
        const a = "a".charCodeAt(0);
        for (let i = 7; i >=0; i--) {
            num = (num * 26) + (s[i].charCodeAt(0) - a);
        }
        return num;
    }

    private value:number;

    constructor(value) {
        this.value = value;
    }

    public toString() {
        return Base26Number.toBase26(this.value);
    }

}

export class TextUtils {
    /**
     * Converts the given parameter to MD5 hex string
     * @static
     * @param {*} value
     * @returns {string|undefined}
     */
    public static toMD5(value:any):string {

        if (typeof value === "undefined" || value === null) {
            return;
        }
        //browser implementation
        let md5;
        let md5module;
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
        const crypto = require(md5module);
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
    public static toSHA1(value:any):string {

        Args.check(isNode(),"This method is not implemented for this environment");

        const crypto = require("crypto");
        if (typeof value === "undefined" || value === null) {
            return;
        }
        const sha1 = crypto.createHash("sha1");
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
    public static toSHA256(value:any):string {

        Args.check(isNode(),"This method is not implemented for this environment");

        const crypto = require("crypto");
        if (typeof value === "undefined" || value === null) {
            return;
        }
        const sha256 = crypto.createHash("sha256");
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
    public static newUUID():string {
        const chars = UUID_CHARS;
        const uuid = [];
        // rfc4122, version 4 form
        let r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join("");
    }
}

/**
 *
 */
export class Guid {
    /**
     * @param {string} s
     * @returns {boolean}
     */
    public static isGuid(s:string):boolean {
        if (typeof s !== "string") {
            return false;
        }
        return GuidRegex.test(s);
    }
    /**
     * @returns {Guid}
     */
    public static newGuid():Guid {
        return new Guid();
    }

    private value:string;

    /**
     * @constructor
     * @param {string} value
     */
    constructor(value?:string) {
        if (typeof value === "string") {
            const test = value.replace(/^{/,"").replace(/{$/,"");
            Args.check(GuidRegex.test(test),"Value must be a valid UUID");
            this.value = test;
            return;
        }
        this.value = TextUtils.newUUID();
    }
//noinspection JSUnusedGlobalSymbols
    /**
     * @returns {string}
     */
    public toString() {
        return this.value;
    }
//noinspection JSUnusedGlobalSymbols
    /**
     * @returns {string}
     */
    public valueOf() {
        return this.value;
    }
//noinspection JSUnusedGlobalSymbols
    public toJSON() {
        return this.value;
    }

}

/**
 * @class
 */
export class RandomUtils {
    /**
     * Returns a random string based on the length specified
     * @param {Number} length
     */
    public static randomChars(length:number):string {
        length = length || 8;
        const chars = "abcdefghkmnopqursuvwxz2456789ABCDEFHJKLMNPQURSTUVWXYZ";
        let str = "";
        for(let i = 0; i < length; i++) {
            str += chars.substr(this.randomInt(0, chars.length-1),1);
        }
        return str;
    }

    /**
     * Returns a random integer between a minimum and a maximum value
     * @param {number} min
     * @param {number} max
     */
    public static randomInt(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Returns a random string based on the length specified
     * @static
     * @param {number} length
     * @returns {string}
     */
    public static randomHex(length:number):string {
        length = (length || 8)*2;
        let str = "";
        for(let i = 0; i < length; i++) {
            str += HEX_CHARS.substr(this.randomInt(0, HEX_CHARS.length-1),1);
        }
        return str;
    }
}

export interface IConvertOptions {
    convertValues:boolean;
}

/**
 * @class
 */
export class LangUtils {

    /**
     * Returns an array of strings which represents the arguments' names of the given function
     * @param {Function} fn
     * @returns {Array}
     */
    public static getFunctionParams(fn) {
        if (!_.isFunction(fn)) {
            return [];
        }
        const fnStr = fn.toString().replace(STRIP_COMMENTS, "");
        let result = fnStr.slice(fnStr.indexOf("(")+1, fnStr.indexOf(")")).match(/([^\s,]+)/g);
        if(result === null) {
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
    public static parseForm(form, options?:IConvertOptions) {
        const result = {};
        if (typeof form === "undefined" || form===null) {
            return result;
        }
        const keys = Object.keys(form);
        _.forEach(keys, (key) => {
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
    public static parseValue(value:any):any {
        return LangUtils.convert(value);
    }
//noinspection JSUnusedGlobalSymbols
    /**
     * Parses value value and returns the equivalent integer.
     * @param {*} value
     * @returns {*}
     */
    public static parseInt(value:any) {
        return parseInt(value,10) || 0;
    }
//noinspection JSUnusedGlobalSymbols
    /**
     * Parses value value and returns the equivalent float number.
     * @param {*} value
     * @returns {*}
     */
    public static parseFloat(value:any) {
        return parseFloat(value) || 0;
    }
//noinspection JSUnusedGlobalSymbols
    /**
     * Parses value value and returns the equivalent boolean.
     * @param {*} value
     * @returns {*}
     */
    public static parseBoolean(value:any) {
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
            return (parseInt(value,10) || 0) !== 0;
        }
    }
    /**
     * @param {string} value
     */
    private static convert(value) {
        let result;
        if ((typeof value === "string")) {
            if (value.length===0) {
                result = value;
            }
            if (value.match(BooleanTrueRegex)) {
                result = true;
            } else if (value.match(BooleanFalseRegex)) {
                result = false;
            } else if (value.match(NullRegex) || value.match(UndefinedRegex)) {
                result = null;
            } else if (value.match(IntegerRegex)) {
                result = parseInt(value,10);
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
    private static extend(origin:any, expr:string, value:string, options?:IConvertOptions) {

        options = options || { convertValues:false };
        //find base notation
        let match = /(^\w+)\[/.exec(expr);
        let name;
        let descriptor;
        let expr1;
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
        } else if (expr.indexOf("[")===0) {
            //get property
            const re = /\[(.*?)]/g;
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
                    let typedValue;
                    // convert string value
                    if ((typeof value === "string") && options.convertValues) {
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
                        origin.value = { };
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

}

/**
 * @class
 * @constructor
 */
class UnknownPropertyDescriptor {
    constructor(obj, name) {
        Object.defineProperty(this, "value", { configurable:false, enumerable:true, get() { return obj[name]; }, set(value) { obj[name]=value; } });
        Object.defineProperty(this, "name", { configurable:false, enumerable:true, get() { return name; } });
    }
}

/**
 * @class
 */
export class PathUtils {
    /**
     *
     * @param {...string} part
     * @returns {string}
     */
    public static join(...part):string {
        let parts;
        let i;
        let l;
        const pathModule = "path";
        if (isNode()) {
            const path = require(pathModule);
            return path.join.apply(null, part);
        }
        // Split the inputs into a list of path commands.
        parts = [];
        for (i = 0, l = arguments.length; i < l; i++) {
            parts = parts.concat(arguments[i].replace(/\\/g,"/").split("/"));
        }
        // Interpret the path commands to get the new resolved path.
        const newParts = [];
        for (i = 0, l = parts.length; i < l; i++) {
            const part1 = parts[i];
            // Remove leading and trailing slashes
            // Also remove "." segments
            if (!part1 || part1 === ".") { continue; }
            // Interpret ".." to pop the last segment
            if (part1 === "..") { newParts.pop(); } else { newParts.push(part1); }
        }
        // Preserve the initial slash if there was one.
        if (parts[0] === "") { newParts.unshift(""); }
        // Turn back into a single string path.
        return newParts.join("/") || (newParts.length ? "/" : ".");
    }
}

export interface ITraceLogger {

    level(level:string):ITraceLogger;
    /**
     * @param {...*} data
     */
    log(...data);
    /**
     * @param {...*} data
     */
    info(...data);
    /**
     * @param {...*} data
     */
    error(...data);
    /**
     * @param {...*} data
     */
    warn(...data);
    /**
     * @param {...*} data
     */
    debug(...data);
}
const Reset = "\x1b[0m";
const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m";
const FgWhite = "\x1b[37m";

const LogLevels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
};

const LogLevelColors = {
    error: FgRed,
    warn: FgMagenta,
    info: FgBlack,
    verbose: FgBlue,
    debug: FgGreen,
};

export interface ITraceLoggerOptions {
    colors:boolean;
    level:string;
}

export class TraceLogger implements ITraceLogger {

    private options: ITraceLoggerOptions;

    constructor(options?:ITraceLoggerOptions) {
        this.options = {
            colors:true,
            level:"info",
        };
        if (typeof options === "undefined" && options !== null && isNode()) {
            if (process.env.NODE_ENV === "development") {
                this.options.level = "debug";
            }
        }
        if (typeof options !== "undefined" && options !== null ) {
            this.options = options;
            //validate logging level
            Args.check(LogLevels.hasOwnProperty(this.options.level), "Invalid logging level. Expected error, warn, info, verbose or debug.");
        }
    }

    public level(level:string) {
        Args.check(LogLevels.hasOwnProperty(level), "Invalid logging level. Expected error, warn, info, verbose or debug.");
        this.options.level = level;
        return this;
    }

    public log(...data: any[]) {
        const args = Array.prototype.slice.call(arguments);
        this.write("info", sprintf.apply(null, args));
    }

    public info(...data: any[]) {
        const args = Array.prototype.slice.call(arguments);
        this.write("info", sprintf.apply(null, args));
    }

    public error(...data: any[]) {
        const args = Array.prototype.slice.call(arguments);
        this.write("error", sprintf.apply(null, args));
    }

    public warn(...data: any[]) {
        const args = Array.prototype.slice.call(arguments);
        this.write("warn", sprintf.apply(null, args));
    }

    public verbose(...data: any[]) {
        const args = Array.prototype.slice.call(arguments);
        this.write("verbose", sprintf.apply(null, args));
    }

    public debug(...data: any[]) {
        const args = Array.prototype.slice.call(arguments);
        this.write("debug", sprintf.apply(null, args));
    }

    private timestamp():string {
        return (new Date()).toUTCString();
    }

    private write(level:string, text:string) {
        if (LogLevels[level]>LogLevels[this.options.level]) {
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

}

export class TraceUtils {

    public static logger:ITraceLogger;

    public static useLogger(logger:ITraceLogger) {
        TraceUtils.logger = logger;
    }

    /**
     * @static
     * @param {...*} data
     */
    public static log(...data) {
        TraceUtils.logger.log.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    }

    /**
     * @static
     * @param {...*} data
     */
    public static error(...data) {
        TraceUtils.logger.error.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    }

    /**
     *
     * @static
     * @param {...*} data
     */
    public static info(...data) {
        TraceUtils.logger.info.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    }

    /**
     *
     * @static
     * @param {*} data
     */
    public static warn(...data) {
        TraceUtils.logger.warn.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    }

    /**
     *
     * @static
     * @param {...*} data
     */
    public static debug(...data) {
        TraceUtils.logger.debug.apply(TraceUtils.logger, Array.prototype.slice.call(arguments));
    }
}

TraceUtils.useLogger(new TraceLogger());
