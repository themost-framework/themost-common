import {assert} from "chai";
import "source-map-support/register";
import {AccessDeniedError, DataError, DataNotFoundError, HttpBadRequestError, HttpError} from "../errors";

describe("test common errors", () => {
    it("should use new HttpError", () => {

        const err =new HttpError(500);
        assert.isOk(err instanceof Error,"Expected HttpError");
        assert.isOk(err instanceof HttpError,"Expected HttpError");
        assert.equal(err.statusCode,500,"Expected Error 500");

    });

    it("should use new DataError", () => {

        const err =new DataError("EMSG","A data error occured");
        assert.isOk(err instanceof Error,"Expected Error");
        assert.isOk(err instanceof DataError,"Expected DataError");
        assert.equal(err.code,"EMSG","Expected EMSG code");

    });

    it("should use new HttpBadRequestError", () => {

        const err =new HttpBadRequestError();
        assert.isOk(err instanceof Error,"Expected HttpError");
        assert.isOk(err instanceof HttpError,"Expected HttpError");
        assert.isOk(err instanceof HttpBadRequestError,"Expected HttpError");

    });

    it("should use new AccessDeniedError", () => {

        const err =new AccessDeniedError();
        assert.isOk(err instanceof Error,"Expected Error");
        assert.isOk(err instanceof DataError,"Expected DataError");
        assert.isOk(err instanceof AccessDeniedError,"Expected DataError");
        assert.equal(err.code,"EACCESS","Expected EACCESS code");
        assert.equal(err.statusCode,401,"Expected statusCode 401");

    });

    it("should use new DataNotFoundError", () => {

        const err =new DataNotFoundError();
        assert.isOk(err instanceof Error,"Expected Error");
        assert.isOk(err instanceof DataError,"Expected DataError");
        assert.isOk(err instanceof DataNotFoundError,"Expected DataError");
        assert.equal(err.code,"EFOUND","Expected EFOUND code");
        assert.equal(err.statusCode,404,"Expected statusCode 404");

    });

});
