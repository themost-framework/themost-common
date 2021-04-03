[@themost/common](../README.md) / [Exports](../modules.md) / TraceLogger

# Class: TraceLogger

## Implements

* [*ITraceLogger*](../interfaces/itracelogger.md)

## Table of contents

### Constructors

- [constructor](tracelogger.md#constructor)

### Properties

- [options](tracelogger.md#options)

### Methods

- [debug](tracelogger.md#debug)
- [error](tracelogger.md#error)
- [info](tracelogger.md#info)
- [level](tracelogger.md#level)
- [log](tracelogger.md#log)
- [timestamp](tracelogger.md#timestamp)
- [verbose](tracelogger.md#verbose)
- [warn](tracelogger.md#warn)
- [write](tracelogger.md#write)

## Constructors

### constructor

\+ **new TraceLogger**(`options?`: [*ITraceLoggerOptions*](../interfaces/itraceloggeroptions.md)): [*TraceLogger*](tracelogger.md)

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | [*ITraceLoggerOptions*](../interfaces/itraceloggeroptions.md) |

**Returns:** [*TraceLogger*](tracelogger.md)

Defined in: [utils.d.ts:249](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L249)

## Properties

### options

• `Private` **options**: *any*

Defined in: [utils.d.ts:249](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L249)

## Methods

### debug

▸ **debug**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:257](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L257)

___

### error

▸ **error**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:254](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L254)

___

### info

▸ **info**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:253](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L253)

___

### level

▸ **level**(`level`: *string*): [*TraceLogger*](tracelogger.md)

#### Parameters:

Name | Type |
:------ | :------ |
`level` | *string* |

**Returns:** [*TraceLogger*](tracelogger.md)

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:251](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L251)

___

### log

▸ **log**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:252](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L252)

___

### timestamp

▸ `Private`**timestamp**(): *any*

**Returns:** *any*

Defined in: [utils.d.ts:258](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L258)

___

### verbose

▸ **verbose**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Defined in: [utils.d.ts:256](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L256)

___

### warn

▸ **warn**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:255](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L255)

___

### write

▸ `Private`**write**(`level`: *any*, `text`: *any*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`level` | *any* |
`text` | *any* |

**Returns:** *any*

Defined in: [utils.d.ts:259](https://github.com/themost-framework/themost-common/blob/917834f/utils.d.ts#L259)
