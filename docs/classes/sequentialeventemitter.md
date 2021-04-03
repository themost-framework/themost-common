[@themost/common](../README.md) / [Modules](../modules.md) / SequentialEventEmitter

# Class: SequentialEventEmitter

## Hierarchy

* *EventEmitter*

  ↳ **SequentialEventEmitter**

## Constructors

### constructor

\+ **new SequentialEventEmitter**(): [*SequentialEventEmitter*](sequentialeventemitter.md)

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:7](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L7)

## Properties

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: *number*

Inherited from: void

Defined in: node_modules/@types/node/events.d.ts:45

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: *typeof* [*errorMonitor*](sequentialeventemitter.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

Inherited from: void

Defined in: node_modules/@types/node/events.d.ts:55

## Methods

### addListener

▸ **addListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:19](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L19)

___

### emit

▸ **emit**(`event`: *string* \| *symbol*, ...`args`: *any*[]): *any*

Emits an event by specifying additional arguments where the last argument is a callback function

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`...args` | *any*[] |

**Returns:** *any*

Overrides: void

Defined in: [emitter.d.ts:18](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L18)

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: void

Defined in: node_modules/@types/node/events.d.ts:77

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Overrides: void

Defined in: [emitter.d.ts:26](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L26)

___

### listenerCount

▸ **listenerCount**(`type`: *string* \| *symbol*): *number*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *string* \| *symbol* |

**Returns:** *number*

Overrides: void

Defined in: [emitter.d.ts:27](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L27)

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: void

Defined in: node_modules/@types/node/events.d.ts:70

___

### next

▸ **next**(`event`: *string* \| *symbol*, ...`args`: *any*[]): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`...args` | *any*[] |

**Returns:** *Promise*<void\>

Defined in: [emitter.d.ts:32](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L32)

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Inherited from: void

Defined in: node_modules/@types/node/events.d.ts:66

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:20](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L20)

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:28](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L28)

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:21](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L21)

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:22](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L22)

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: void

Defined in: node_modules/@types/node/events.d.ts:71

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event?` | *string* \| *symbol* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:24](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L24)

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:23](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L23)

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *number* |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Overrides: void

Defined in: [emitter.d.ts:25](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L25)

___

### subscribe

▸ **subscribe**(`event`: *string* \| *symbol*, `asyncListener`: (...`args`: *any*[]) => *Promise*<void\>): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`asyncListener` | (...`args`: *any*[]) => *Promise*<void\> |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Defined in: [emitter.d.ts:29](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L29)

___

### subscribeOnce

▸ **subscribeOnce**(`event`: *string* \| *symbol*, `asyncListener`: (...`args`: *any*[]) => *Promise*<void\>): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`asyncListener` | (...`args`: *any*[]) => *Promise*<void\> |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Defined in: [emitter.d.ts:31](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L31)

___

### unsubscribe

▸ **unsubscribe**(`event`: *string* \| *symbol*, `asyncListener`: (...`args`: *any*[]) => *Promise*<void\>): [*SequentialEventEmitter*](sequentialeventemitter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* \| *symbol* |
`asyncListener` | (...`args`: *any*[]) => *Promise*<void\> |

**Returns:** [*SequentialEventEmitter*](sequentialeventemitter.md)

Defined in: [emitter.d.ts:30](https://github.com/themost-framework/themost-common/blob/580db67/emitter.d.ts#L30)

___

### listenerCount

▸ `Static`**listenerCount**(`emitter`: *EventEmitter*, `event`: *string* \| *symbol*): *number*

**`deprecated`** since v4.0.0

#### Parameters:

Name | Type |
:------ | :------ |
`emitter` | *EventEmitter* |
`event` | *string* \| *symbol* |

**Returns:** *number*

Inherited from: void

Defined in: node_modules/@types/node/events.d.ts:44
