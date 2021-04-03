[@themost/common](../README.md) / [Modules](../modules.md) / HttpError

# Class: HttpError

## Hierarchy

* *Error*

  ↳ **HttpError**

  ↳↳ [*HttpBadRequestError*](httpbadrequesterror.md)

  ↳↳ [*HttpNotFoundError*](httpnotfounderror.md)

  ↳↳ [*HttpMethodNotAllowedError*](httpmethodnotallowederror.md)

  ↳↳ [*HttpNotAcceptableError*](httpnotacceptableerror.md)

  ↳↳ [*HttpRequestTimeoutError*](httprequesttimeouterror.md)

  ↳↳ [*HttpConflictError*](httpconflicterror.md)

  ↳↳ [*HttpTokenExpiredError*](httptokenexpirederror.md)

  ↳↳ [*HttpTokenRequiredError*](httptokenrequirederror.md)

  ↳↳ [*HttpUnauthorizedError*](httpunauthorizederror.md)

  ↳↳ [*HttpForbiddenError*](httpforbiddenerror.md)

  ↳↳ [*HttpServerError*](httpservererror.md)

## Implements

* [*IStatusError*](../interfaces/istatuserror.md)

## Constructors

### constructor

\+ **new HttpError**(`status?`: *number*, `message?`: *string*, `innerMessage?`: *string*): [*HttpError*](httperror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`status?` | *number* |
`message?` | *string* |
`innerMessage?` | *string* |

**Returns:** [*HttpError*](httperror.md)

Overrides: void

Defined in: [errors.d.ts:56](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L56)

## Properties

### innerMessage

• **innerMessage**: *string*

Gets or sets an inner message for this HTTP error.

Defined in: [errors.d.ts:56](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L56)

___

### message

• **message**: *string*

Inherited from: void

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Inherited from: void

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Inherited from: void

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### statusCode

• **statusCode**: *number*

Gets or sets the status code if this HTTP error

Implementation of: [IStatusError](../interfaces/istatuserror.md).[statusCode](../interfaces/istatuserror.md#statuscode)

Defined in: [errors.d.ts:52](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L52)

___

### title

• **title**: *string*

Gets or sets a short title for this HTTP error (e.g. Not Found, Bad Request)

Defined in: [errors.d.ts:48](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L48)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`err` | Error |
`stackTraces` | CallSite[] |

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:11

Inherited from: void

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: void

Defined in: node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
:------ | :------ |
`targetObject` | *object* |
`constructorOpt?` | Function |

**Returns:** *void*

Inherited from: void

Defined in: node_modules/@types/node/globals.d.ts:4

___

### create

▸ `Static`**create**(`err`: *any*): [*HttpError*](httperror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`err` | *any* |

**Returns:** [*HttpError*](httperror.md)

Defined in: [errors.d.ts:44](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L44)
