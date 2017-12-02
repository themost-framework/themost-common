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
var chai_1 = require("chai");
var q_1 = require("q");
var emitter_1 = require("../emitter");
var utils_1 = require("../utils");
describe("test sequential event emitter", function () {
    var Messenger = /** @class */ (function (_super) {
        __extends(Messenger, _super);
        function Messenger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Messenger.prototype.send = function (to, message) {
            var _this = this;
            return q_1.Promise(function (resolve, reject) {
                _this.emit("message.new", to, message, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    _this.emit("message.sent", function () {
                        return resolve();
                    });
                });
            });
        };
        return Messenger;
    }(emitter_1.SequentialEventEmitter));
    it("should emit event", function () {
        var msg = new Messenger();
        msg.on("message.new", function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #1 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb();
            }, 1000);
        });
        msg.prependListener("message.new", function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #0 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb();
            }, 2000);
        });
        msg.on("message.new", function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #2 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb();
            }, 2000);
        });
        msg.once("message.sent", function (cb) {
            utils_1.TraceUtils.log("Message was succesfully sent");
            setTimeout(function () {
                return cb();
            }, 2000);
        });
        return msg.send("George", "Hello!");
    });
    it("should add and remove listener", function () {
        var msg = new Messenger();
        msg.on("message.new", function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #1 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb();
            }, 1000);
        });
        msg.on("message.new", function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #2 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb();
            }, 2000);
        });
        var onMessageNew = function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #3 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb();
            }, 2000);
        };
        msg.on("message.new", onMessageNew);
        msg.removeListener("message.new", onMessageNew);
        chai_1.assert.equal(msg.listenerCount("message.new"), 2, "Invalid number of event listeners");
        msg.once("message.sent", function (cb) {
            utils_1.TraceUtils.log("Message was succesfully sent");
            setTimeout(function () {
                return cb();
            }, 2000);
        });
        return msg.send("George", "Hello!");
    });
    it("should throw error on first emitter", function () {
        var msg = new Messenger();
        msg.on("message.new", function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #1 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb(new Error("Operation cancelled"));
            }, 1000);
        });
        msg.on("message.new", function (to, message, cb) {
            utils_1.TraceUtils.log("Message Event #2 (To:" + to + "): " + message);
            setTimeout(function () {
                return cb();
            }, 2000);
        });
        chai_1.assert.equal(msg.listenerCount("message.new"), 2, "Invalid number of event listeners");
        msg.once("message.sent", function (cb) {
            utils_1.TraceUtils.log("Message was succesfully sent");
            setTimeout(function () {
                return cb();
            }, 2000);
        });
        return msg.send("George", "Hello!");
    });
});
//# sourceMappingURL=test-emitter.js.map