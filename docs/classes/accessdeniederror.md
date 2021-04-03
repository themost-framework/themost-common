[@themost/common](../README.md) / [Exports](../modules.md) / AccessDeniedError

# Class: AccessDeniedError

**`classdesc`** Represents an access denied data exception.

**`param`** The error message

**`param`** The error inner message

**`property`** {string} code - A string that represents an error code. The error code is E_ACCESS.

**`property`** {number} status - A number that represents an error status. The error status is 401.

**`property`** {string} message -  The error message.

**`property`** {string} innerMessage - The error inner message.

## Hierarchy

* [*DataError*](dataerror.md)

  ↳ **AccessDeniedError**

## Table of contents

### Constructors

- [constructor](accessdeniederror.md#constructor)

### Properties

- [code](accessdeniederror.md#code)
- [field](accessdeniederror.md#field)
- [innerMessage](accessdeniederror.md#innermessage)
- [message](accessdeniederror.md#message)
- [model](accessdeniederror.md#model)
- [name](accessdeniederror.md#name)
- [stack](accessdeniederror.md#stack)
- [statusCode](accessdeniederror.md#statuscode)
- [prepareStackTrace](accessdeniederror.md#preparestacktrace)
- [stackTraceLimit](accessdeniederror.md#stacktracelimit)

### Methods

- [captureStackTrace](accessdeniederror.md#capturestacktrace)

## Constructors

### constructor

\+ **new AccessDeniedError**(`message?`: *string*, `innerMessage?`: *string*): [*AccessDeniedError*](accessdeniederror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *string* |
`innerMessage?` | *string* |

**Returns:** [*AccessDeniedError*](accessdeniederror.md)

Overrides: [DataError](dataerror.md)

Defined in: [errors.d.ts:315](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L315)

## Properties

### code

• **code**: *string*

Gets or sets a string which may be used to identify this error e.g. E_DATA etc

Inherited from: [DataError](dataerror.md).[code](dataerror.md#code)

Defined in: [errors.d.ts:230](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L230)

___

### field

• **field**: *string*

Gets or sets a string which represents the target data field, if any

Inherited from: [DataError](dataerror.md).[field](dataerror.md#field)

Defined in: [errors.d.ts:238](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L238)

___

### innerMessage

• **innerMessage**: *string*

Gets or sets an inner message for this error.

Inherited from: [DataError](dataerror.md).[innerMessage](dataerror.md#innermessage)

Defined in: [errors.d.ts:242](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L242)

___

### message

• **message**: *string*

Inherited from: [DataError](dataerror.md).[message](dataerror.md#message)

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### model

• **model**: *string*

Gets or sets a string which represents the target data model, if any

Inherited from: [DataError](dataerror.md).[model](dataerror.md#model)

Defined in: [errors.d.ts:234](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L234)

___

### name

• **name**: *string*

Inherited from: [DataError](dataerror.md).[name](dataerror.md#name)

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Inherited from: [DataError](dataerror.md).[stack](dataerror.md#stack)

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### statusCode

• **statusCode**: *number*

Gets or sets a string which may be used to identify this error e.g. E_DATA etc

Inherited from: [DataError](dataerror.md).[statusCode](dataerror.md#statuscode)

Defined in: [errors.d.ts:226](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L226)

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

Inherited from: [DataError](dataerror.md).[prepareStackTrace](dataerror.md#preparestacktrace)

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: [DataError](dataerror.md).[stackTraceLimit](dataerror.md#stacktracelimit)

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

Inherited from: [DataError](dataerror.md)

Defined in: node_modules/@types/node/globals.d.ts:4
