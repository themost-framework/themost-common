[@themost/common](../README.md) / [Exports](../modules.md) / HttpUnauthorizedError

# Class: HttpUnauthorizedError

**`classdesc`** HTTP 401 Unauthorized Exception class

## Hierarchy

* [*HttpError*](httperror.md)

  ↳ **HttpUnauthorizedError**

## Table of contents

### Constructors

- [constructor](httpunauthorizederror.md#constructor)

### Properties

- [innerMessage](httpunauthorizederror.md#innermessage)
- [message](httpunauthorizederror.md#message)
- [name](httpunauthorizederror.md#name)
- [stack](httpunauthorizederror.md#stack)
- [statusCode](httpunauthorizederror.md#statuscode)
- [title](httpunauthorizederror.md#title)
- [prepareStackTrace](httpunauthorizederror.md#preparestacktrace)
- [stackTraceLimit](httpunauthorizederror.md#stacktracelimit)

### Methods

- [captureStackTrace](httpunauthorizederror.md#capturestacktrace)
- [create](httpunauthorizederror.md#create)

## Constructors

### constructor

\+ **new HttpUnauthorizedError**(`message?`: *string*, `innerMessage?`: *string*): [*HttpUnauthorizedError*](httpunauthorizederror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *string* |
`innerMessage?` | *string* |

**Returns:** [*HttpUnauthorizedError*](httpunauthorizederror.md)

Overrides: [HttpError](httperror.md)

Defined in: [errors.d.ts:177](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L177)

## Properties

### innerMessage

• **innerMessage**: *string*

Gets or sets an inner message for this HTTP error.

Inherited from: [HttpError](httperror.md).[innerMessage](httperror.md#innermessage)

Defined in: [errors.d.ts:56](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L56)

___

### message

• **message**: *string*

Inherited from: [HttpError](httperror.md).[message](httperror.md#message)

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Inherited from: [HttpError](httperror.md).[name](httperror.md#name)

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Inherited from: [HttpError](httperror.md).[stack](httperror.md#stack)

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### statusCode

• **statusCode**: *number*

Gets or sets the status code if this HTTP error

Inherited from: [HttpError](httperror.md).[statusCode](httperror.md#statuscode)

Defined in: [errors.d.ts:52](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L52)

___

### title

• **title**: *string*

Gets or sets a short title for this HTTP error (e.g. Not Found, Bad Request)

Inherited from: [HttpError](httperror.md).[title](httperror.md#title)

Defined in: [errors.d.ts:48](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L48)

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

Inherited from: [HttpError](httperror.md).[prepareStackTrace](httperror.md#preparestacktrace)

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: [HttpError](httperror.md).[stackTraceLimit](httperror.md#stacktracelimit)

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

Inherited from: [HttpError](httperror.md)

Defined in: node_modules/@types/node/globals.d.ts:4

___

### create

▸ `Static`**create**(`err`: *any*): [*HttpError*](httperror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`err` | *any* |

**Returns:** [*HttpError*](httperror.md)

Inherited from: [HttpError](httperror.md)

Defined in: [errors.d.ts:44](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L44)