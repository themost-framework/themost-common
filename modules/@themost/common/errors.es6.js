/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */

import _ from "lodash";
import {Errors} from "./resources/http-error-codes";

/**
 * @class
 * @augments TypeError
 */
export class ArgumentError extends TypeError {

    constructor(message, code) {
        super(message);
        /**
         * Gets or sets a string which may be used to identify this error e.g. ECHECK, ENULL etc
         */
        this.code = code || "EARG";
    }
}

/**
 * @class
 * @augments TypeError
 */
export class AbstractMethodError extends TypeError {
    constructor(message) {
        super(message || "Class does not implement inherited abstract method.");
    }
}

/**
 * @classdesc Abstract Class Exception
 * @class
 * @augments Error
 *
 */
export class AbstractClassError extends TypeError {
    constructor(message) {
        super(message || "An abstract class cannot be instantiated.");
    }
}

/**
 * @class
 * @augments Error
 */
export class FileNotFoundError extends Error {
    constructor(message) {
        super(message || "File not found");
    }
}

/**
 * @class
 * @augments Error
 */
export class HttpError extends Error {
    /**
     * @param {Error} err
     * @returns {HttpError}
     */
    static create(err) {
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
    constructor(status, message, innerMessage) {
        super(message);
        const finalStatus = (typeof status === "undefined" || status === null) ? 500 : status;
        const err = _.find(Errors, (x) => {
            return (x.status === finalStatus);
        });
        if (err) {
            this.title = err.title;
            this.message = message || err.message;
            this.statusCode = err.status;
        } else {
            /**
             * Gets or sets a short title for this HTTP error (e.g. Not Found, Bad Request)
             */
            this.title = "Internal Server Error";
            this.message = message || "The server encountered an internal error and was unable to complete the request.";
            /**
             * Gets or sets the status code if this HTTP error
             */
            this.statusCode = finalStatus;
        }
        /**
         * Gets or sets an inner message for this HTTP error.
         */
        this.innerMessage = innerMessage;
    }
}

/**
 * @classdesc HTTP 400 Bad Request exception class
 * @class
 */
export class HttpBadRequestError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(400, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 404 Not Found Exception class
 * @class
 * @augments HttpError
 */
export class HttpNotFoundError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(404, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 405 Method Not Allowed exception class
 * @class
 * @augments HttpError
 */
export class HttpMethodNotAllowedError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(405, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 406 Not Acceptable exception class
 * @class
 * @augments HttpError
 */
export class HttpNotAcceptableAllowedError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(406, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 408 RequestTimeout exception class
 * @class
 * @augments HttpError
 */
export class HttpRequestTimeoutError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(408, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 409 Conflict exception class
 * @class
 * @augments HttpError
 */
export class HttpConflictError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(409, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 498 Token Expired exception class
 * @class
 * @augments HttpError
 */
export class HttpTokenExpiredError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(498, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 499 Token Required exception class
 * @class
 * @augments HttpError
 */
export class HttpTokenRequiredError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(499, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 401 Unauthorized Exception class
 * @class
 * @augments HttpError
 */
export class HttpUnauthorizedError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(401, message, innerMessage);
    }
}

/**
 * HTTP 403 Forbidden Exception class
 * @class
 * @param {string=} message
 * @param {string=} innerMessage
 * @augments HttpError
 */
export class HttpForbiddenError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(403, message, innerMessage);
    }
}

/**
 * @classdesc HTTP 500 Internal Server Error Exception class
 * @class
 * @augments HttpError
 */
export class HttpServerError extends HttpError {
    /**
     * @constructor
     * @param {string=} message
     * @param {string=} innerMessage
     */
    constructor(message, innerMessage) {
        super(500, message, innerMessage);
    }
}

/**
 * @classdesc Extends Error object for throwing exceptions on data operations
 * @class
 * @property {string} code - A string that represents an error code e.g. EDATA
 * @property {string} message -  The error message.
 * @property {string} innerMessage - The error inner message.
 * @property {number} status - A number that represents an error status. This error status may be used for throwing the appropriate HTTP error.
 * @augments Error
 */
export class DataError extends Error {
    /* @constructor
     * @param {string=} code - A string that represents an error code
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} field - The target field
     */
    constructor(code, message, innerMessage, model, field) {
        super();
        this.code = code || "EDATA";
        if (model) {
            this.model = model;
        }
        if (field) {
            this.field = field;
        }
        this.message = message || "A general data error occured.";
        if (innerMessage) {
            this.innerMessage = innerMessage;
        }
    }
}

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
export class NotNullError extends DataError {
    /**
     * @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} field - The target field
     */
    constructor(message, innerMessage, model, field) {
        super("ENULL", message || "A value is required", innerMessage, model, field);
        this.statusCode = 409;
    }
}

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
export class DataNotFoundError extends DataError {
    /**
     * @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     */
    constructor(message, innerMessage, model) {
        super("EFOUND", message || "The requested data was not found.", innerMessage, model);
        this.statusCode = 404;
    }
}

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
export class UniqueConstraintError extends DataError {

    /* @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     * @param {string=} model - The target model
     * @param {string=} constraint - The target constraint
     */
    constructor(message, innerMessage, model, constraint) {
        super("EUNQ", message || "A unique constraint violated", innerMessage, model);
        if (constraint) {
            this.constraint = constraint;
        }
        this.statusCode = 409;
    }
}

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
export class AccessDeniedError extends DataError {
    /* @constructor
     * @param {string=} message - The error message
     * @param {string=} innerMessage - The error inner message
     */
    constructor(message, innerMessage) {
        super("EACCESS", ("Access Denied" || message), innerMessage);
        this.statusCode = 401;
    }
}
