"use strict";
/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
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
var _ = require("lodash");
var http_error_codes_1 = require("./resources/http-error-codes");
function definePrototypeOf(obj, proto) {
    /* tslint:disable:no-string-literal */
    var setPrototypeOf = Object["setPrototypeOf"];
    /* tslint:enable:no-string-literal */
    if (typeof setPrototypeOf === "function") {
        return setPrototypeOf(obj, proto);
    }
    obj.__proto__ = proto;
}
/**
 * @class
 * @augments TypeError
 */
var ArgumentError = /** @class */ (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(message, code) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        _this.code = code || "EARG";
        return _this;
    }
    return ArgumentError;
}(TypeError));
exports.ArgumentError = ArgumentError;
/**
 * @class
 * @augments TypeError
 */
var AbstractMethodError = /** @class */ (function (_super) {
    __extends(AbstractMethodError, _super);
    function AbstractMethodError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message || "Class does not implement inherited abstract method.") || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return AbstractMethodError;
}(TypeError));
exports.AbstractMethodError = AbstractMethodError;
/**
 * @classdesc Abstract Class Exception
 * @class
 * @augments Error
 *
 */
var AbstractClassError = /** @class */ (function (_super) {
    __extends(AbstractClassError, _super);
    function AbstractClassError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message || "An abstract class cannot be instantiated.") || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return AbstractClassError;
}(TypeError));
exports.AbstractClassError = AbstractClassError;
/**
 * @class
 * @augments Error
 */
var FileNotFoundError = /** @class */ (function (_super) {
    __extends(FileNotFoundError, _super);
    function FileNotFoundError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message || "File not found") || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return FileNotFoundError;
}(Error));
exports.FileNotFoundError = FileNotFoundError;
/**
 * @class
 * @augments Error
 */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    /**
     * @constructor
     * @param {number=} status
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpError(status, message, innerMessage) {
        var _this = _super.call(this, message) || this;
        definePrototypeOf(_this, HttpError.prototype);
        var finalStatus = (typeof status === "undefined" || status === null) ? 500 : status;
        var err = _.find(http_error_codes_1.Errors, function (x) {
            return (x.status === finalStatus);
        });
        if (err) {
            _this.title = err.title;
            _this.message = message || err.message;
            _this.statusCode = err.status;
        }
        else {
            _this.title = "Internal Server Error";
            _this.message = message || "The server encountered an internal error and was unable to complete the request.";
            _this.statusCode = finalStatus;
        }
        _this.innerMessage = innerMessage;
        return _this;
    }
    /**
     * @param {Error} err
     * @returns {HttpError}
     */
    HttpError.create = function (err) {
        if (typeof err === "undefined" || err === null) {
            return new HttpError();
        }
        else {
            if (err.status) {
                return new HttpError(err.status, err.message);
            }
            else {
                return new HttpError(500, err.message);
            }
        }
    };
    return HttpError;
}(Error));
exports.HttpError = HttpError;
/**
 * @classdesc HTTP 400 Bad Request exception class
 * @class
 */
var HttpBadRequestError = /** @class */ (function (_super) {
    __extends(HttpBadRequestError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpBadRequestError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 400, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpBadRequestError;
}(HttpError));
exports.HttpBadRequestError = HttpBadRequestError;
/**
 * @classdesc HTTP 404 Not Found Exception class
 * @class
 * @augments HttpError
 */
var HttpNotFoundError = /** @class */ (function (_super) {
    __extends(HttpNotFoundError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpNotFoundError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 404, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpNotFoundError;
}(HttpError));
exports.HttpNotFoundError = HttpNotFoundError;
/**
 * @classdesc HTTP 405 Method Not Allowed exception class
 * @class
 * @augments HttpError
 */
var HttpMethodNotAllowedError = /** @class */ (function (_super) {
    __extends(HttpMethodNotAllowedError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpMethodNotAllowedError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 405, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpMethodNotAllowedError;
}(HttpError));
exports.HttpMethodNotAllowedError = HttpMethodNotAllowedError;
/**
 * @classdesc HTTP 406 Not Acceptable exception class
 * @class
 * @augments HttpError
 */
var HttpNotAcceptableAllowedError = /** @class */ (function (_super) {
    __extends(HttpNotAcceptableAllowedError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpNotAcceptableAllowedError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 406, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpNotAcceptableAllowedError;
}(HttpError));
exports.HttpNotAcceptableAllowedError = HttpNotAcceptableAllowedError;
/**
 * @classdesc HTTP 408 RequestTimeout exception class
 * @class
 * @augments HttpError
 */
var HttpRequestTimeoutError = /** @class */ (function (_super) {
    __extends(HttpRequestTimeoutError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpRequestTimeoutError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 408, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpRequestTimeoutError;
}(HttpError));
exports.HttpRequestTimeoutError = HttpRequestTimeoutError;
/**
 * @classdesc HTTP 409 Conflict exception class
 * @class
 * @augments HttpError
 */
var HttpConflictError = /** @class */ (function (_super) {
    __extends(HttpConflictError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpConflictError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 409, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpConflictError;
}(HttpError));
exports.HttpConflictError = HttpConflictError;
/**
 * @classdesc HTTP 498 Token Expired exception class
 * @class
 * @augments HttpError
 */
var HttpTokenExpiredError = /** @class */ (function (_super) {
    __extends(HttpTokenExpiredError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpTokenExpiredError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 498, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpTokenExpiredError;
}(HttpError));
exports.HttpTokenExpiredError = HttpTokenExpiredError;
/**
 * @classdesc HTTP 499 Token Required exception class
 * @class
 * @augments HttpError
 */
var HttpTokenRequiredError = /** @class */ (function (_super) {
    __extends(HttpTokenRequiredError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpTokenRequiredError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 499, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpTokenRequiredError;
}(HttpError));
exports.HttpTokenRequiredError = HttpTokenRequiredError;
/**
 * @classdesc HTTP 401 Unauthorized Exception class
 * @class
 * @augments HttpError
 */
var HttpUnauthorizedError = /** @class */ (function (_super) {
    __extends(HttpUnauthorizedError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpUnauthorizedError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 401, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpUnauthorizedError;
}(HttpError));
exports.HttpUnauthorizedError = HttpUnauthorizedError;
/**
 * HTTP 403 Forbidden Exception class
 * @class
 * @param {string=} message
 * @param {string=} innerMessage
 * @augments HttpError
 */
var HttpForbiddenError = /** @class */ (function (_super) {
    __extends(HttpForbiddenError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpForbiddenError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 403, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpForbiddenError;
}(HttpError));
exports.HttpForbiddenError = HttpForbiddenError;
/**
 * @classdesc HTTP 500 Internal Server Error Exception class
 * @class
 * @augments HttpError
 */
var HttpServerError = /** @class */ (function (_super) {
    __extends(HttpServerError, _super);
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    function HttpServerError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, 500, message, innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return HttpServerError;
}(HttpError));
exports.HttpServerError = HttpServerError;
/**
 * @classdesc Extends Error object for throwing exceptions on data operations
 * @class
 * @property {string} code - A string that represents an error code e.g. EDATA
 * @property {string} message -  The error message.
 * @property {string} innerMessage - The error inner message.
 * @property {number} status - A number that represents an error status. This error status may be used for throwing the appropriate HTTP error.
 * @augments Error
 */
var DataError = /** @class */ (function (_super) {
    __extends(DataError, _super);
    /* @constructor
     * @param {string=} code - A string that represents an error code
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} field - The target field
     */
    function DataError(code, message, innerMessage, model, field) {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        _this.code = code || "EDATA";
        if (model) {
            _this.model = model;
        }
        if (field) {
            _this.field = field;
        }
        _this.message = message || "A general data error occured.";
        if (innerMessage) {
            _this.innerMessage = innerMessage;
        }
        return _this;
    }
    return DataError;
}(Error));
exports.DataError = DataError;
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
var NotNullError = /** @class */ (function (_super) {
    __extends(NotNullError, _super);
    /**
     * @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} field - The target field
     */
    function NotNullError(message, innerMessage, model, field) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "ENULL", message || "A value is required", innerMessage, model, field) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        _this.statusCode = 409;
        return _this;
    }
    return NotNullError;
}(DataError));
exports.NotNullError = NotNullError;
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
var DataNotFoundError = /** @class */ (function (_super) {
    __extends(DataNotFoundError, _super);
    /**
     * @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     */
    function DataNotFoundError(message, innerMessage, model) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "EFOUND", message || "The requested data was not found.", innerMessage, model) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        _this.statusCode = 404;
        return _this;
    }
    return DataNotFoundError;
}(DataError));
exports.DataNotFoundError = DataNotFoundError;
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
var UniqueConstraintError = /** @class */ (function (_super) {
    __extends(UniqueConstraintError, _super);
    /* @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} constraint - The target constraint
     */
    function UniqueConstraintError(message, innerMessage, model, constraint) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "EUNQ", message || "A unique constraint violated", innerMessage, model) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        if (constraint) {
            _this.constraint = constraint;
        }
        _this.statusCode = 409;
        return _this;
    }
    return UniqueConstraintError;
}(DataError));
exports.UniqueConstraintError = UniqueConstraintError;
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
var AccessDeniedError = /** @class */ (function (_super) {
    __extends(AccessDeniedError, _super);
    /* @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     */
    function AccessDeniedError(message, innerMessage) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "EACCESS", ("Access Denied" || message), innerMessage) || this;
        definePrototypeOf(_this, _newTarget.prototype);
        _this.statusCode = 401;
        return _this;
    }
    return AccessDeniedError;
}(DataError));
exports.AccessDeniedError = AccessDeniedError;
//# sourceMappingURL=errors.js.map