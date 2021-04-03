[@themost/common](../README.md) / [Exports](../modules.md) / FileNotFoundError

# Class: FileNotFoundError

## Hierarchy

* *Error*

  ↳ **FileNotFoundError**

## Table of contents

### Constructors

- [constructor](filenotfounderror.md#constructor)

### Properties

- [message](filenotfounderror.md#message)
- [name](filenotfounderror.md#name)
- [stack](filenotfounderror.md#stack)
- [prepareStackTrace](filenotfounderror.md#preparestacktrace)
- [stackTraceLimit](filenotfounderror.md#stacktracelimit)

### Methods

- [captureStackTrace](filenotfounderror.md#capturestacktrace)

## Constructors

### constructor

\+ **new FileNotFoundError**(`message?`: *string*): [*FileNotFoundError*](filenotfounderror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *string* |

**Returns:** [*FileNotFoundError*](filenotfounderror.md)

Overrides: void

Defined in: [errors.d.ts:32](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L32)

## Properties

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
