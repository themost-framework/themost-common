[@themost/common](../README.md) / [Modules](../modules.md) / ConfigurationBase

# Class: ConfigurationBase

## Constructors

### constructor

\+ **new ConfigurationBase**(`configPath?`: *string*): [*ConfigurationBase*](configurationbase.md)

#### Parameters:

Name | Type |
:------ | :------ |
`configPath?` | *string* |

**Returns:** [*ConfigurationBase*](configurationbase.md)

Defined in: [config.d.ts:18](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L18)

## Properties

### settings

• `Readonly` **settings**: *any*

Defined in: [config.d.ts:18](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L18)

## Methods

### getConfigurationPath

▸ **getConfigurationPath**(): *string*

Gets the current configuration path

**Returns:** *string*

Defined in: [config.d.ts:80](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L80)

___

### getExecutionPath

▸ **getExecutionPath**(): *string*

Gets the current execution path

**Returns:** *string*

Defined in: [config.d.ts:75](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L75)

___

### getSource

▸ **getSource**(): *any*

Returns the configuration source object

**Returns:** *any*

Defined in: [config.d.ts:46](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L46)

___

### getSourceAt

▸ **getSourceAt**(`p`: *string*): *any*

Returns the source configuration object based on the given path (e.g. settings.auth.cookieName or settings/auth/cookieName)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`p` | *string* | A string which represents an object path   |

**Returns:** *any*

Defined in: [config.d.ts:52](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L52)

___

### getStrategy

▸ **getStrategy**<T\>(`strategyBaseCtor`: [*StrategyConstructor*](../modules.md#strategyconstructor)<T\>): T

Gets a configuration strategy

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`strategyBaseCtor` | [*StrategyConstructor*](../modules.md#strategyconstructor)<T\> |

**Returns:** T

Defined in: [config.d.ts:36](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L36)

___

### hasSourceAt

▸ **hasSourceAt**(`p`: *string*): *boolean*

Returns a boolean which indicates whether the specified  object path exists or not (e.g. settings.auth.cookieName or settings/auth/cookieName)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`p` | *string* | A string which represents an object path   |

**Returns:** *boolean*

Defined in: [config.d.ts:58](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L58)

___

### hasStrategy

▸ **hasStrategy**<T\>(`strategyBaseCtor`: [*StrategyConstructor*](../modules.md#strategyconstructor)<T\>): *boolean*

Gets a configuration strategy

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`strategyBaseCtor` | [*StrategyConstructor*](../modules.md#strategyconstructor)<T\> |

**Returns:** *boolean*

Defined in: [config.d.ts:41](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L41)

___

### setExecutionPath

▸ **setExecutionPath**(`p`: *string*): [*ConfigurationBase*](configurationbase.md)

Sets the current execution path

#### Parameters:

Name | Type |
:------ | :------ |
`p` | *string* |

**Returns:** [*ConfigurationBase*](configurationbase.md)

Defined in: [config.d.ts:70](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L70)

___

### setSourceAt

▸ **setSourceAt**(`p`: *any*, `value`: *any*): *any*

Sets the config value to the specified object path (e.g. settings.auth.cookieName or settings/auth/cookieName)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`p` | *any* | A string which represents an object path   |
`value` | *any* |  |

**Returns:** *any*

Defined in: [config.d.ts:65](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L65)

___

### useStrategy

▸ **useStrategy**(`strategyBaseCtor`: *any*, `strategyCtor?`: *any*): [*ConfigurationBase*](configurationbase.md)

Register a configuration strategy

#### Parameters:

Name | Type |
:------ | :------ |
`strategyBaseCtor` | *any* |
`strategyCtor?` | *any* |

**Returns:** [*ConfigurationBase*](configurationbase.md)

ConfigurationBase

Defined in: [config.d.ts:30](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L30)

___

### getCurrent

▸ `Static`**getCurrent**(): [*ConfigurationBase*](configurationbase.md)

Gets the current configuration

**Returns:** [*ConfigurationBase*](configurationbase.md)

ConfigurationBase - An instance of DataConfiguration class which represents the current data configuration

Defined in: [config.d.ts:11](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L11)

___

### setCurrent

▸ `Static`**setCurrent**(`configuration`: [*ConfigurationBase*](configurationbase.md)): *any*

Sets the current configuration

#### Parameters:

Name | Type |
:------ | :------ |
`configuration` | [*ConfigurationBase*](configurationbase.md) |

**Returns:** *any*

ConfigurationBase - An instance of ApplicationConfiguration class which represents the current configuration

Defined in: [config.d.ts:17](https://github.com/themost-framework/themost-common/blob/580db67/config.d.ts#L17)
