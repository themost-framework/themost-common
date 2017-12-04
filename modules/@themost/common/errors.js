"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AccessDeniedError = exports.UniqueConstraintError = exports.DataNotFoundError = exports.NotNullError = exports.DataError = exports.HttpServerError = exports.HttpForbiddenError = exports.HttpUnauthorizedError = exports.HttpTokenRequiredError = exports.HttpTokenExpiredError = exports.HttpConflictError = exports.HttpRequestTimeoutError = exports.HttpNotAcceptableAllowedError = exports.HttpMethodNotAllowedError = exports.HttpNotFoundError = exports.HttpBadRequestError = exports.HttpError = exports.FileNotFoundError = exports.AbstractClassError = exports.AbstractMethodError = exports.ArgumentError = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _ = _interopRequireDefault(_lodash).default;

var _httpErrorCodes = require("./http-error-codes");

var Errors = _httpErrorCodes.Errors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extendableBuiltin5(cls) {
    function ExtendableBuiltin() {
        var instance = Reflect.construct(cls, Array.from(arguments));
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        return instance;
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

function _extendableBuiltin3(cls) {
    function ExtendableBuiltin() {
        var instance = Reflect.construct(cls, Array.from(arguments));
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        return instance;
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        var instance = Reflect.construct(cls, Array.from(arguments));
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        return instance;
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * MOST Web Framework 2.0 Codename Blueshift
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, THEMOST LP All rights reserved
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Use of this source code is governed by an BSD-3-Clause license that can be
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * found in the LICENSE file at https://themost.io/license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * @class
 * @augments TypeError
 */
var ArgumentError = exports.ArgumentError = function (_TypeError) {
    _inherits(ArgumentError, _TypeError);

    function ArgumentError(message, code) {
        _classCallCheck(this, ArgumentError);

        /**
         * Gets or sets a string which may be used to identify this error e.g. ECHECK, ENULL etc
         */
        var _this = _possibleConstructorReturn(this, (ArgumentError.__proto__ || Object.getPrototypeOf(ArgumentError)).call(this, message));

        _this.code = code || "EARG";
        return _this;
    }

    return ArgumentError;
}(TypeError);

/**
 * @class
 * @augments TypeError
 */


var AbstractMethodError = exports.AbstractMethodError = function (_TypeError2) {
    _inherits(AbstractMethodError, _TypeError2);

    function AbstractMethodError(message) {
        _classCallCheck(this, AbstractMethodError);

        return _possibleConstructorReturn(this, (AbstractMethodError.__proto__ || Object.getPrototypeOf(AbstractMethodError)).call(this, message || "Class does not implement inherited abstract method."));
    }

    return AbstractMethodError;
}(TypeError);

/**
 * @classdesc Abstract Class Exception
 * @class
 * @augments Error
 *
 */


var AbstractClassError = exports.AbstractClassError = function (_TypeError3) {
    _inherits(AbstractClassError, _TypeError3);

    function AbstractClassError(message) {
        _classCallCheck(this, AbstractClassError);

        return _possibleConstructorReturn(this, (AbstractClassError.__proto__ || Object.getPrototypeOf(AbstractClassError)).call(this, message || "An abstract class cannot be instantiated."));
    }

    return AbstractClassError;
}(TypeError);

/**
 * @class
 * @augments Error
 */


var FileNotFoundError = exports.FileNotFoundError = function (_extendableBuiltin2) {
    _inherits(FileNotFoundError, _extendableBuiltin2);

    function FileNotFoundError(message) {
        _classCallCheck(this, FileNotFoundError);

        return _possibleConstructorReturn(this, (FileNotFoundError.__proto__ || Object.getPrototypeOf(FileNotFoundError)).call(this, message || "File not found"));
    }

    return FileNotFoundError;
}(_extendableBuiltin(Error));

/**
 * @class
 * @augments Error
 */


var HttpError = exports.HttpError = function (_extendableBuiltin4) {
    _inherits(HttpError, _extendableBuiltin4);

    _createClass(HttpError, null, [{
        key: "create",

        /**
         * @param {Error} err
         * @returns {HttpError}
         */
        value: function create(err) {
            if (typeof err === "undefined" || err === null) {
                return new HttpError();
            } else {
                if (err.status) {
                    return new HttpError(err.status, err.message);
                } else {
                    return new HttpError(500, err.message);
                }
            }
        }

        /**
         * @constructor
         * @param {number=} status
         * @param {string=} message
         * @param {string=} innerMessage
         */

    }]);

    function HttpError(status, message, innerMessage) {
        _classCallCheck(this, HttpError);

        var _this5 = _possibleConstructorReturn(this, (HttpError.__proto__ || Object.getPrototypeOf(HttpError)).call(this, message));

        var finalStatus = typeof status === "undefined" || status === null ? 500 : status;
        var err = _.find(Errors, function (x) {
            return x.status === finalStatus;
        });
        if (err) {
            _this5.title = err.title;
            _this5.message = message || err.message;
            _this5.statusCode = err.status;
        } else {
            /**
             * Gets or sets a short title for this HTTP error (e.g. Not Found, Bad Request)
             */
            _this5.title = "Internal Server Error";
            _this5.message = message || "The server encountered an internal error and was unable to complete the request.";
            /**
             * Gets or sets the status code if this HTTP error
             */
            _this5.statusCode = finalStatus;
        }
        /**
         * Gets or sets an inner message for this HTTP error.
         */
        _this5.innerMessage = innerMessage;
        return _this5;
    }

    return HttpError;
}(_extendableBuiltin3(Error));

/**
 * @classdesc HTTP 400 Bad Request exception class
 * @class
 */


var HttpBadRequestError = exports.HttpBadRequestError = function (_HttpError) {
    _inherits(HttpBadRequestError, _HttpError);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpBadRequestError(message, innerMessage) {
        _classCallCheck(this, HttpBadRequestError);

        return _possibleConstructorReturn(this, (HttpBadRequestError.__proto__ || Object.getPrototypeOf(HttpBadRequestError)).call(this, 400, message, innerMessage));
    }

    return HttpBadRequestError;
}(HttpError);

/**
 * @classdesc HTTP 404 Not Found Exception class
 * @class
 * @augments HttpError
 */


var HttpNotFoundError = exports.HttpNotFoundError = function (_HttpError2) {
    _inherits(HttpNotFoundError, _HttpError2);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpNotFoundError(message, innerMessage) {
        _classCallCheck(this, HttpNotFoundError);

        return _possibleConstructorReturn(this, (HttpNotFoundError.__proto__ || Object.getPrototypeOf(HttpNotFoundError)).call(this, 404, message, innerMessage));
    }

    return HttpNotFoundError;
}(HttpError);

/**
 * @classdesc HTTP 405 Method Not Allowed exception class
 * @class
 * @augments HttpError
 */


var HttpMethodNotAllowedError = exports.HttpMethodNotAllowedError = function (_HttpError3) {
    _inherits(HttpMethodNotAllowedError, _HttpError3);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpMethodNotAllowedError(message, innerMessage) {
        _classCallCheck(this, HttpMethodNotAllowedError);

        return _possibleConstructorReturn(this, (HttpMethodNotAllowedError.__proto__ || Object.getPrototypeOf(HttpMethodNotAllowedError)).call(this, 405, message, innerMessage));
    }

    return HttpMethodNotAllowedError;
}(HttpError);

/**
 * @classdesc HTTP 406 Not Acceptable exception class
 * @class
 * @augments HttpError
 */


var HttpNotAcceptableAllowedError = exports.HttpNotAcceptableAllowedError = function (_HttpError4) {
    _inherits(HttpNotAcceptableAllowedError, _HttpError4);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpNotAcceptableAllowedError(message, innerMessage) {
        _classCallCheck(this, HttpNotAcceptableAllowedError);

        return _possibleConstructorReturn(this, (HttpNotAcceptableAllowedError.__proto__ || Object.getPrototypeOf(HttpNotAcceptableAllowedError)).call(this, 406, message, innerMessage));
    }

    return HttpNotAcceptableAllowedError;
}(HttpError);

/**
 * @classdesc HTTP 408 RequestTimeout exception class
 * @class
 * @augments HttpError
 */


var HttpRequestTimeoutError = exports.HttpRequestTimeoutError = function (_HttpError5) {
    _inherits(HttpRequestTimeoutError, _HttpError5);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpRequestTimeoutError(message, innerMessage) {
        _classCallCheck(this, HttpRequestTimeoutError);

        return _possibleConstructorReturn(this, (HttpRequestTimeoutError.__proto__ || Object.getPrototypeOf(HttpRequestTimeoutError)).call(this, 408, message, innerMessage));
    }

    return HttpRequestTimeoutError;
}(HttpError);

/**
 * @classdesc HTTP 409 Conflict exception class
 * @class
 * @augments HttpError
 */


var HttpConflictError = exports.HttpConflictError = function (_HttpError6) {
    _inherits(HttpConflictError, _HttpError6);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpConflictError(message, innerMessage) {
        _classCallCheck(this, HttpConflictError);

        return _possibleConstructorReturn(this, (HttpConflictError.__proto__ || Object.getPrototypeOf(HttpConflictError)).call(this, 409, message, innerMessage));
    }

    return HttpConflictError;
}(HttpError);

/**
 * @classdesc HTTP 498 Token Expired exception class
 * @class
 * @augments HttpError
 */


var HttpTokenExpiredError = exports.HttpTokenExpiredError = function (_HttpError7) {
    _inherits(HttpTokenExpiredError, _HttpError7);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpTokenExpiredError(message, innerMessage) {
        _classCallCheck(this, HttpTokenExpiredError);

        return _possibleConstructorReturn(this, (HttpTokenExpiredError.__proto__ || Object.getPrototypeOf(HttpTokenExpiredError)).call(this, 498, message, innerMessage));
    }

    return HttpTokenExpiredError;
}(HttpError);

/**
 * @classdesc HTTP 499 Token Required exception class
 * @class
 * @augments HttpError
 */


var HttpTokenRequiredError = exports.HttpTokenRequiredError = function (_HttpError8) {
    _inherits(HttpTokenRequiredError, _HttpError8);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpTokenRequiredError(message, innerMessage) {
        _classCallCheck(this, HttpTokenRequiredError);

        return _possibleConstructorReturn(this, (HttpTokenRequiredError.__proto__ || Object.getPrototypeOf(HttpTokenRequiredError)).call(this, 499, message, innerMessage));
    }

    return HttpTokenRequiredError;
}(HttpError);

/**
 * @classdesc HTTP 401 Unauthorized Exception class
 * @class
 * @augments HttpError
 */


var HttpUnauthorizedError = exports.HttpUnauthorizedError = function (_HttpError9) {
    _inherits(HttpUnauthorizedError, _HttpError9);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpUnauthorizedError(message, innerMessage) {
        _classCallCheck(this, HttpUnauthorizedError);

        return _possibleConstructorReturn(this, (HttpUnauthorizedError.__proto__ || Object.getPrototypeOf(HttpUnauthorizedError)).call(this, 401, message, innerMessage));
    }

    return HttpUnauthorizedError;
}(HttpError);

/**
 * HTTP 403 Forbidden Exception class
 * @class
 * @param {string=} message
 * @param {string=} innerMessage
 * @augments HttpError
 */


var HttpForbiddenError = exports.HttpForbiddenError = function (_HttpError10) {
    _inherits(HttpForbiddenError, _HttpError10);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpForbiddenError(message, innerMessage) {
        _classCallCheck(this, HttpForbiddenError);

        return _possibleConstructorReturn(this, (HttpForbiddenError.__proto__ || Object.getPrototypeOf(HttpForbiddenError)).call(this, 403, message, innerMessage));
    }

    return HttpForbiddenError;
}(HttpError);

/**
 * @classdesc HTTP 500 Internal Server Error Exception class
 * @class
 * @augments HttpError
 */


var HttpServerError = exports.HttpServerError = function (_HttpError11) {
    _inherits(HttpServerError, _HttpError11);

    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpServerError(message, innerMessage) {
        _classCallCheck(this, HttpServerError);

        return _possibleConstructorReturn(this, (HttpServerError.__proto__ || Object.getPrototypeOf(HttpServerError)).call(this, 500, message, innerMessage));
    }

    return HttpServerError;
}(HttpError);

/**
 * @classdesc Extends Error object for throwing exceptions on data operations
 * @class
 * @property {string} code - A string that represents an error code e.g. EDATA
 * @property {string} message -  The error message.
 * @property {string} innerMessage - The error inner message.
 * @property {number} status - A number that represents an error status. This error status may be used for throwing the appropriate HTTP error.
 * @augments Error
 */


var DataError = exports.DataError = function (_extendableBuiltin6) {
    _inherits(DataError, _extendableBuiltin6);

    /* @constructor
     * @param {string=} code - A string that represents an error code
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} field - The target field
     */
    function DataError(code, message, innerMessage, model, field) {
        _classCallCheck(this, DataError);

        var _this17 = _possibleConstructorReturn(this, (DataError.__proto__ || Object.getPrototypeOf(DataError)).call(this));

        _this17.code = code || "EDATA";
        if (model) {
            _this17.model = model;
        }
        if (field) {
            _this17.field = field;
        }
        _this17.message = message || "A general data error occured.";
        if (innerMessage) {
            _this17.innerMessage = innerMessage;
        }
        return _this17;
    }

    return DataError;
}(_extendableBuiltin5(Error));

/**
 * @classdesc Extends Error object for throwing not null exceptions.
 * @class
 * @property {string} code - A string that represents an error code. The default error code is ENULL.
 * @property {string} message -  The error message.
 * @property {string} innerMessage - The error inner message.
 * @property {number} status - A number that represents an error status. This error status may be used for throwing the appropriate HTTP error. The default status is 409 (Conflict)
 * @property {string} model - The target model name
 * @property {string} field - The target field name
 * @augments DataError
 */


var NotNullError = exports.NotNullError = function (_DataError) {
    _inherits(NotNullError, _DataError);

    /**
     * @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} field - The target field
     */
    function NotNullError(message, innerMessage, model, field) {
        _classCallCheck(this, NotNullError);

        var _this18 = _possibleConstructorReturn(this, (NotNullError.__proto__ || Object.getPrototypeOf(NotNullError)).call(this, "ENULL", message || "A value is required", innerMessage, model, field));

        _this18.statusCode = 409;
        return _this18;
    }

    return NotNullError;
}(DataError);

/**
 * @classdesc Extends Error object for throwing not found exceptions.
 * @class
 * @property {string} code - A string that represents an error code. The default error code is EFOUND.
 * @property {string} message -  The error message.
 * @property {string} innerMessage - The error inner message.
 * @property {number} status - A number that represents an error status. This error status may be used for throwing the appropriate HTTP error. The default status is 404 (Conflict)
 * @property {string} model - The target model name
 * @augments DataError
 */


var DataNotFoundError = exports.DataNotFoundError = function (_DataError2) {
    _inherits(DataNotFoundError, _DataError2);

    /**
     * @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     */
    function DataNotFoundError(message, innerMessage, model) {
        _classCallCheck(this, DataNotFoundError);

        var _this19 = _possibleConstructorReturn(this, (DataNotFoundError.__proto__ || Object.getPrototypeOf(DataNotFoundError)).call(this, "EFOUND", message || "The requested data was not found.", innerMessage, model));

        _this19.statusCode = 404;
        return _this19;
    }

    return DataNotFoundError;
}(DataError);

/**
 * @classdesc Extends Error object for throwing unique constraint exceptions.
 * @class
 * @property {string} code - A string that represents an error code. The default error code is ENULL.
 * @property {string} message -  The error message.
 * @property {string} innerMessage - The error inner message.
 * @property {number} status - A number that represents an error status. This error status may be used for throwing the appropriate HTTP error. The default status is 409 (Conflict)
 * @property {string} model - The target model name
 * @property {string} constraint - The target constraint name
 * @augments DataError
 */


var UniqueConstraintError = exports.UniqueConstraintError = function (_DataError3) {
    _inherits(UniqueConstraintError, _DataError3);

    /* @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} constraint - The target constraint
     */
    function UniqueConstraintError(message, innerMessage, model, constraint) {
        _classCallCheck(this, UniqueConstraintError);

        var _this20 = _possibleConstructorReturn(this, (UniqueConstraintError.__proto__ || Object.getPrototypeOf(UniqueConstraintError)).call(this, "EUNQ", message || "A unique constraint violated", innerMessage, model));

        if (constraint) {
            _this20.constraint = constraint;
        }
        _this20.statusCode = 409;
        return _this20;
    }

    return UniqueConstraintError;
}(DataError);

/**
 * @classdesc Represents an access denied data exception.
 * @class
 *
 * @param {string=} message - The error message
 * @param {string=} innerMessage - The error inner message
 * @property {string} code - A string that represents an error code. The error code is EACCESS.
 * @property {number} status - A number that represents an error status. The error status is 401.
 * @property {string} message -  The error message.
 * @property {string} innerMessage - The error inner message.
 * @augments DataError
 */


var AccessDeniedError = exports.AccessDeniedError = function (_DataError4) {
    _inherits(AccessDeniedError, _DataError4);

    /* @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     */
    function AccessDeniedError(message, innerMessage) {
        _classCallCheck(this, AccessDeniedError);

        var _this21 = _possibleConstructorReturn(this, (AccessDeniedError.__proto__ || Object.getPrototypeOf(AccessDeniedError)).call(this, "EACCESS", "Access Denied" || message, innerMessage));

        _this21.statusCode = 401;
        return _this21;
    }

    return AccessDeniedError;
}(DataError);
//# sourceMappingURL=errors.js.map
