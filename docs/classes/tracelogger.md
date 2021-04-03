[@themost/common](../README.md) / [Modules](../modules.md) / TraceLogger

# Class: TraceLogger

## Implements

* [*ITraceLogger*](../interfaces/itracelogger.md)

## Constructors

### constructor

\+ **new TraceLogger**(`options?`: [*ITraceLoggerOptions*](../interfaces/itraceloggeroptions.md)): [*TraceLogger*](tracelogger.md)

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | [*ITraceLoggerOptions*](../interfaces/itraceloggeroptions.md) |

**Returns:** [*TraceLogger*](tracelogger.md)

Defined in: [utils.d.ts:262](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L262)

## Properties

### options

• `Private` **options**: *any*

Defined in: [utils.d.ts:262](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L262)

## Methods

### debug

▸ **debug**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:270](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L270)

___

### error

▸ **error**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:267](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L267)

___

### info

▸ **info**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:266](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L266)

___

### level

▸ **level**(`level`: *string*): [*TraceLogger*](tracelogger.md)

#### Parameters:

Name | Type |
:------ | :------ |
`level` | *string* |

**Returns:** [*TraceLogger*](tracelogger.md)

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:264](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L264)

___

### log

▸ **log**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:265](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L265)

___

### timestamp

▸ `Private`**timestamp**(): *any*

**Returns:** *any*

Defined in: [utils.d.ts:271](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L271)

___

### verbose

▸ **verbose**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Defined in: [utils.d.ts:269](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L269)

___

### warn

▸ **warn**(...`data`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`...data` | *any*[] |

**Returns:** *void*

Implementation of: [ITraceLogger](../interfaces/itracelogger.md)

Defined in: [utils.d.ts:268](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L268)

___

### write

▸ `Private`**write**(`level`: *any*, `text`: *any*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`level` | *any* |
`text` | *any* |

**Returns:** *any*

Defined in: [utils.d.ts:272](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L272)
