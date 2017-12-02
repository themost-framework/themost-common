"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var utils_1 = require("../utils");
require("source-map-support/register");
describe('test common errors', function () {
    it('should use Args', function () {
        chai_1.assert.doesNotThrow(function () {
            var a = 5;
            utils_1.Args.check(typeof a === 'number', "Expected number");
        });
        chai_1.assert.throws(function () {
            var a = 5;
            utils_1.Args.check(typeof a === 'string', "Expected string");
        });
        chai_1.assert.doesNotThrow(function () {
            var a = "test";
            utils_1.Args.notString(a, "Argument");
        });
        chai_1.assert.throws(function () {
            var a = 5;
            utils_1.Args.notString(a, "Argument");
        });
        chai_1.assert.doesNotThrow(function () {
            var a = "test";
            utils_1.Args.notEmpty(a, "Argument");
        });
        chai_1.assert.throws(function () {
            var a = 5;
            utils_1.Args.notEmpty(a, "Argument");
        });
        chai_1.assert.doesNotThrow(function () {
            var a = 100;
            utils_1.Args.notNegative(a, "Argument");
        });
        chai_1.assert.throws(function () {
            var a = -100;
            utils_1.Args.notNegative(a, "Argument");
        });
        chai_1.assert.doesNotThrow(function () {
            var a = function () {
                return;
            };
            utils_1.Args.notFunction(a, "Argument");
        });
        chai_1.assert.throws(function () {
            var a = -100;
            utils_1.Args.notFunction(a, "Argument");
        });
        chai_1.assert.doesNotThrow(function () {
            var a = 100;
            utils_1.Args.notNumber(a, "Argument");
        });
        chai_1.assert.throws(function () {
            var a = "test";
            utils_1.Args.notNumber(a, "Argument");
        });
        chai_1.assert.doesNotThrow(function () {
            var a = new Date();
            utils_1.Args.notNull(a, "Argument");
        });
        chai_1.assert.throws(function () {
            var a = undefined;
            utils_1.Args.notNull(a, "Argument");
        });
        chai_1.assert.doesNotThrow(function () {
            var a = 100;
            utils_1.Args.notPositive(a, "Argument");
        });
        chai_1.assert.throws(function () {
            var a = 0;
            utils_1.Args.notPositive(a, "Argument");
        });
    });
    it('should use Base26 numbers', function () {
        var x = utils_1.Base26Number.toBase26(100);
        chai_1.assert.equal("wdaaaaaa", x);
        var y = new utils_1.Base26Number(100);
        chai_1.assert.equal(y.toString(), "wdaaaaaa");
        chai_1.assert.equal(utils_1.Base26Number.fromBase26("wdaaaaaa"), 100);
    });
    it('should use TextUtils.toMD5', function () {
        var x = utils_1.TextUtils.toMD5("Hello");
        chai_1.assert.equal(x, "8b1a9953c4611296a827abf8c47804d7");
        console.log("MD5", "Hello", x);
    });
    it('should use TextUtils.toSHA1', function () {
        var x = utils_1.TextUtils.toSHA1("Hello");
        chai_1.assert.equal(x, "f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0");
        console.log("SHA1", "Hello", x);
    });
    it('should use TextUtils.toSHA256', function () {
        var x = utils_1.TextUtils.toSHA256("Hello");
        chai_1.assert.equal(x, "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969");
        console.log("SHA256", "Hello", x);
    });
    it('should use Guid class', function () {
        var x = new utils_1.Guid("71BE4D98-3873-4648-9154-C7F79D89E19D");
        chai_1.assert.equal(x.toString(), "71BE4D98-3873-4648-9154-C7F79D89E19D");
    });
    it('should get random Guids', function () {
        for (var i = 1; i <= 10; i++) {
            console.log("#" + i, utils_1.Guid.newGuid().toString());
        }
    });
    it('should use RandomUtils class', function () {
        var x = utils_1.RandomUtils.randomChars(12);
        chai_1.assert.equal(x.length, 12);
        console.log("Random characters", x);
        for (var i = 1; i <= 10; i++) {
            console.log("#" + i, utils_1.RandomUtils.randomChars(12));
        }
        var y = utils_1.RandomUtils.randomInt(0, 10);
        console.log("Random int", y);
        chai_1.assert.isOk((y >= 0) && (y <= 10), "Invalid random int");
        var z = utils_1.RandomUtils.randomHex(6);
        console.log("Random hex", z);
        for (var i = 1; i <= 10; i++) {
            console.log("#" + i, utils_1.RandomUtils.randomHex(6));
        }
        chai_1.assert.isOk(/^[0-9a-fA-F]+$/i.test(z), "Invalid random hex");
    });
    it('should use LangUtils.getFunctionParams', function () {
        var params = utils_1.LangUtils.getFunctionParams(function (a, b) {
            //
        });
        chai_1.assert.equal(params.length, 2);
        chai_1.assert.equal(params[0], "a");
        chai_1.assert.equal(params[1], "b");
    });
    it('should use LangUtils.convert', function () {
        var x = utils_1.LangUtils.parseValue("true");
        chai_1.assert.isOk(typeof x === 'boolean', "Expected boolean");
        x = utils_1.LangUtils.parseValue("12.4");
        chai_1.assert.isOk(typeof x === 'number', "Expected number");
        x = utils_1.LangUtils.parseValue("2017-12-22");
        chai_1.assert.isOk(x instanceof Date, "Expected date");
    });
    it('should use LangUtils.parseForm', function () {
        var x = utils_1.LangUtils.parseForm({
            "user[name]": "user1",
            "user[password]": "pass",
            "user[rememberMe]": "true"
        });
        chai_1.assert.isOk(x.hasOwnProperty("user"), "User property is missing");
        console.log("Data", x);
    });
    it('should use LangUtils.parseForm with options', function () {
        var x = utils_1.LangUtils.parseForm({
            "user[name]": "user1",
            "user[password]": "pass",
            "user[options][rememberMe]": "true"
        }, {
            convertValues: true
        });
        chai_1.assert.isOk(x.hasOwnProperty("user"), "User property is missing");
        chai_1.assert.isOk(typeof x["user"]["options"]["rememberMe"] === 'boolean', "Invalid property value");
        console.log("Data", x);
    });
    it('should use PathUtils.join', function () {
        var joined = utils_1.PathUtils.join(__dirname, 'test-utils.ts');
        console.log(joined);
        chai_1.assert.isOk(/test-utils.ts$/.test(joined));
    });
    it('should use TraceUtils', function () {
        utils_1.TraceUtils.logger.level("debug");
        utils_1.TraceUtils.log("GivenName:%s, FamilyName:%s", "Peter", "Thomas");
        utils_1.TraceUtils.info("GivenName:%s, FamilyName:%s", "Peter", "Thomas");
        utils_1.TraceUtils.warn("GivenName:%s, FamilyName:%s", "Peter", "Thomas");
        utils_1.TraceUtils.error("An internal server error occurred!");
        utils_1.TraceUtils.logger.level("debug");
        utils_1.TraceUtils.debug("Application is running in debug mode");
    });
});
//# sourceMappingURL=test-utils.js.map