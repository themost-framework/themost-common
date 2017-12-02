window.assert = chai.assert;
window.expect = chai.expect;
var SequentialEventEnitter = require("./../../emitter").SequentialEventEmitter;
describe('common module tests', function() {
    //set timeout
    this.timeout(45000);
    /**
     * @class
     * @constructor
     * @augments {EventEmitter}
     */
    function MessengerA() {
        //
    }
    Object.setPrototypeOf(MessengerA.prototype,SequentialEventEnitter.prototype);

    MessengerA.prototype.send = function(to, message, callback) {
        var self = this;
        self.emit('message.new', to, message, function(err) {
            if (err) {
                return callback(err);
            }
            self.emit('message.sent', function(err) {
                return callback(err);
            });
        });
    };

    it('should use event emitter', function(done) {
        var msg = new MessengerA();
        msg.on('message.new', function(to,message,cb) {
           console.log('Message Event #1 (To:' + to + '): ' + message);
           return cb();
        });
        msg.on('message.sent', function(cb) {
            console.log('Message was succesfully sent');
            return cb();
        });
        msg.send('Peter','Hello', function(err) {
            return done(err);
        });
    });

});