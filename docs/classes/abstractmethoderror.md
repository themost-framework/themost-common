[@themost/common](../README.md) / [Exports](../modules.md) / AbstractMethodError

# Class: AbstractMethodError

## Hierarchy

* *TypeError*

  ↳ **AbstractMethodError**

## Table of contents

### Constructors

- [constructor](abstractmethoderror.md#constructor)

### Properties

- [message](abstractmethoderror.md#message)
- [name](abstractmethoderror.md#name)
- [stack](abstractmethoderror.md#stack)
- [prepareStackTrace](abstractmethoderror.md#preparestacktrace)
- [stackTraceLimit](abstractmethoderror.md#stacktracelimit)

### Methods

- [captureStackTrace](abstractmethoderror.md#capturestacktrace)

## Constructors

### constructor

\+ **new AbstractMethodError**(`message?`: *string*): [*AbstractMethodError*](abstractmethoderror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *string* |

**Returns:** [*AbstractMethodError*](abstractmethoderror.md)

Overrides: void

Defined in: [errors.d.ts:16](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L16)

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
