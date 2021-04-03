[@themost/common](../README.md) / [Exports](../modules.md) / ArgumentError

# Class: ArgumentError

## Hierarchy

* *TypeError*

  ↳ **ArgumentError**

## Table of contents

### Constructors

- [constructor](argumenterror.md#constructor)

### Properties

- [code](argumenterror.md#code)
- [message](argumenterror.md#message)
- [name](argumenterror.md#name)
- [stack](argumenterror.md#stack)
- [prepareStackTrace](argumenterror.md#preparestacktrace)
- [stackTraceLimit](argumenterror.md#stacktracelimit)

### Methods

- [captureStackTrace](argumenterror.md#capturestacktrace)

## Constructors

### constructor

\+ **new ArgumentError**(`message`: *any*, `code?`: *string*): [*ArgumentError*](argumenterror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *any* |
`code?` | *string* |

**Returns:** [*ArgumentError*](argumenterror.md)

Overrides: void

Defined in: [utils.d.ts:304](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L304)

## Properties

### code

• **code**: *string*

Gets or sets a string which may be used to identify this error e.g. ECHECK, ENULL etc

Defined in: [utils.d.ts:304](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L304)

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
