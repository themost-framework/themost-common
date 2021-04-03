[@themost/common](../README.md) / [Exports](../modules.md) / AbstractClassError

# Class: AbstractClassError

**`classdesc`** Abstract Class Exception

## Hierarchy

* *TypeError*

  ↳ **AbstractClassError**

## Table of contents

### Constructors

- [constructor](abstractclasserror.md#constructor)

### Properties

- [message](abstractclasserror.md#message)
- [name](abstractclasserror.md#name)
- [stack](abstractclasserror.md#stack)
- [prepareStackTrace](abstractclasserror.md#preparestacktrace)
- [stackTraceLimit](abstractclasserror.md#stacktracelimit)

### Methods

- [captureStackTrace](abstractclasserror.md#capturestacktrace)

## Constructors

### constructor

\+ **new AbstractClassError**(`message?`: *string*): [*AbstractClassError*](abstractclasserror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *string* |

**Returns:** [*AbstractClassError*](abstractclasserror.md)

Overrides: void

Defined in: [errors.d.ts:25](https://github.com/themost-framework/themost-common/blob/917834f/errors.d.ts#L25)

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
