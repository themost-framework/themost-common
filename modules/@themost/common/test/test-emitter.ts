import {assert} from "chai";
import {Promise} from "q";
import {SequentialEventEmitter} from "../emitter";
import {TraceUtils} from "../utils";

describe("test sequential event emitter", () => {

    class Messenger extends SequentialEventEmitter {
        public send(to, message) {
            return Promise<any>((resolve, reject) => {
                this.emit("message.new", to, message, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    this.emit("message.sent", ()=> {
                        return resolve();
                    });
                });
            });
        }
    }
    it("should emit event", () => {
        const msg = new Messenger();
        msg.on("message.new",(to,message,cb)=> {
            TraceUtils.log(`Message Event #1 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb();
            }, 1000);
        });

        msg.prependListener("message.new", (to,message,cb)=> {
            TraceUtils.log(`Message Event #0 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb();
            }, 2000);
        });

        msg.on("message.new",(to,message,cb)=> {
            TraceUtils.log(`Message Event #2 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb();
            }, 2000);
        });
        msg.once("message.sent",(cb)=> {
            TraceUtils.log("Message was succesfully sent");
            setTimeout(()=> {
                return cb();
            }, 2000);
        });
        return msg.send("George","Hello!");
    });

    it("should add and remove listener", () => {
        const msg = new Messenger();
        msg.on("message.new",(to,message,cb)=> {
            TraceUtils.log(`Message Event #1 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb();
            }, 1000);
        });

        msg.on("message.new",(to,message,cb)=> {
            TraceUtils.log(`Message Event #2 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb();
            }, 2000);
        });

        const onMessageNew = (to,message,cb)=> {
            TraceUtils.log(`Message Event #3 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb();
            }, 2000);
        };

        msg.on("message.new",onMessageNew);
        msg.removeListener("message.new", onMessageNew);
        assert.equal(msg.listenerCount("message.new"),2, "Invalid number of event listeners");

        msg.once("message.sent",(cb)=> {
            TraceUtils.log("Message was succesfully sent");
            setTimeout(()=> {
                return cb();
            }, 2000);
        });

        return msg.send("George","Hello!");
    });

    it("should throw error on first emitter", () => {
        const msg = new Messenger();

        msg.on("message.new",(to,message,cb)=> {
            TraceUtils.log(`Message Event #1 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb(new Error("Operation cancelled"));
            }, 1000);
        });

        msg.on("message.new",(to,message,cb)=> {
            TraceUtils.log(`Message Event #2 (To:${to}): ${message}`);
            setTimeout(()=> {
                return cb();
            }, 2000);
        });
        assert.equal(msg.listenerCount("message.new"),2, "Invalid number of event listeners");
        msg.once("message.sent",(cb)=> {
            TraceUtils.log("Message was succesfully sent");
            setTimeout(()=> {
                return cb();
            }, 2000);
        });
        return msg.send("George","Hello!");
    });
});
