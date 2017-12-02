"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("source-map-support/register");
var errors_1 = require("../errors");
describe("test common errors", function () {
    it("should use new HttpError", function () {
        var err = new errors_1.HttpError(500);
        chai_1.assert.isOk(err instanceof Error, "Expected HttpError");
        chai_1.assert.isOk(err instanceof errors_1.HttpError, "Expected HttpError");
        chai_1.assert.equal(err.statusCode, 500, "Expected Error 500");
    });
    it("should use new DataError", function () {
        var err = new errors_1.DataError("EMSG", "A data error occured");
        chai_1.assert.isOk(err instanceof Error, "Expected Error");
        chai_1.assert.isOk(err instanceof errors_1.DataError, "Expected DataError");
        chai_1.assert.equal(err.code, "EMSG", "Expected EMSG code");
    });
    it("should use new HttpBadRequestError", function () {
        var err = new errors_1.HttpBadRequestError();
        chai_1.assert.isOk(err instanceof Error, "Expected HttpError");
        chai_1.assert.isOk(err instanceof errors_1.HttpError, "Expected HttpError");
        chai_1.assert.isOk(err instanceof errors_1.HttpBadRequestError, "Expected HttpError");
    });
    it("should use new AccessDeniedError", function () {
        var err = new errors_1.AccessDeniedError();
        chai_1.assert.isOk(err instanceof Error, "Expected Error");
        chai_1.assert.isOk(err instanceof errors_1.DataError, "Expected DataError");
        chai_1.assert.isOk(err instanceof errors_1.AccessDeniedError, "Expected DataError");
        chai_1.assert.equal(err.code, "EACCESS", "Expected EACCESS code");
        chai_1.assert.equal(err.statusCode, 401, "Expected statusCode 401");
    });
    it("should use new DataNotFoundError", function () {
        var err = new errors_1.DataNotFoundError();
        chai_1.assert.isOk(err instanceof Error, "Expected Error");
        chai_1.assert.isOk(err instanceof errors_1.DataError, "Expected DataError");
        chai_1.assert.isOk(err instanceof errors_1.DataNotFoundError, "Expected DataError");
        chai_1.assert.equal(err.code, "EFOUND", "Expected EFOUND code");
        chai_1.assert.equal(err.statusCode, 404, "Expected statusCode 404");
    });
});
//# sourceMappingURL=test-errors.js.map