[@themost/common](../README.md) / [Modules](../modules.md) / DataError

# Class: DataError

**`classdesc`** Extends Error object for throwing exceptions on data operations

**`property`** {string} code - A string that represents an error code e.g. E_DATA

**`property`** {string} message -  The error message.

**`property`** {string} innerMessage - The error inner message.

**`property`** {number} status - A number that represents an error status. This error status may be used for throwing the appropriate HTTP error.

## Hierarchy

* *Error*

  ↳ **DataError**

  ↳↳ [*NotNullError*](notnullerror.md)

  ↳↳ [*DataNotFoundError*](datanotfounderror.md)

  ↳↳ [*UniqueConstraintError*](uniqueconstrainterror.md)

  ↳↳ [*AccessDeniedError*](accessdeniederror.md)

## Implements

* [*IStatusError*](../interfaces/istatuserror.md)
* [*ICodeError*](../interfaces/icodeerror.md)

## Constructors

### constructor

\+ **new DataError**(`code?`: *string*, `message?`: *string*, `innerMessage?`: *string*, `model?`: *string*, `field?`: *string*): [*DataError*](dataerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`code?` | *string* |
`message?` | *string* |
`innerMessage?` | *string* |
`model?` | *string* |
`field?` | *string* |

**Returns:** [*DataError*](dataerror.md)

Overrides: void

Defined in: [errors.d.ts:242](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L242)

## Properties

### code

• **code**: *string*

Gets or sets a string which may be used to identify this error e.g. E_DATA etc

Implementation of: [ICodeError](../interfaces/icodeerror.md).[code](../interfaces/icodeerror.md#code)

Defined in: [errors.d.ts:230](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L230)

___

### field

• **field**: *string*

Gets or sets a string which represents the target data field, if any

Defined in: [errors.d.ts:238](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L238)

___

### innerMessage

• **innerMessage**: *string*

Gets or sets an inner message for this error.

Defined in: [errors.d.ts:242](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L242)

___

### message

• **message**: *string*

Inherited from: void

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### model

• **model**: *string*

Gets or sets a string which represents the target data model, if any

Defined in: [errors.d.ts:234](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L234)

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

Gets or sets a string which may be used to identify this error e.g. E_DATA etc

Implementation of: [IStatusError](../interfaces/istatuserror.md).[statusCode](../interfaces/istatuserror.md#statuscode)

Defined in: [errors.d.ts:226](https://github.com/themost-framework/themost-common/blob/580db67/errors.d.ts#L226)

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
