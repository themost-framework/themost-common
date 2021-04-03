[@themost/common](../README.md) / [Exports](../modules.md) / ApplicationBase

# Interface: ApplicationBase

## Table of contents

### Properties

- [configuration](applicationbase.md#configuration)

### Methods

- [getConfiguration](applicationbase.md#getconfiguration)
- [getService](applicationbase.md#getservice)
- [hasService](applicationbase.md#hasservice)
- [useService](applicationbase.md#useservice)
- [useStrategy](applicationbase.md#usestrategy)

## Properties

### configuration

• `Readonly` **configuration**: [*ConfigurationBase*](../classes/configurationbase.md)

Defined in: [app.d.ts:43](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L43)

## Methods

### getConfiguration

▸ **getConfiguration**(): [*ConfigurationBase*](../classes/configurationbase.md)

**Returns:** [*ConfigurationBase*](../classes/configurationbase.md)

Defined in: [app.d.ts:53](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L53)

___

### getService

▸ **getService**<T\>(`serviceCtor`: [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<T\>): T

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`serviceCtor` | [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<T\> |

**Returns:** T

Defined in: [app.d.ts:51](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L51)

___

### hasService

▸ **hasService**<T\>(`serviceCtor`: [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<T\>): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`serviceCtor` | [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<T\> |

**Returns:** *boolean*

Defined in: [app.d.ts:49](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L49)

___

### useService

▸ **useService**(`serviceCtor`: [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<any\>): [*ApplicationBase*](applicationbase.md)

#### Parameters:

Name | Type |
:------ | :------ |
`serviceCtor` | [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<any\> |

**Returns:** [*ApplicationBase*](applicationbase.md)

Defined in: [app.d.ts:47](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L47)

___

### useStrategy

▸ **useStrategy**(`serviceCtor`: [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<any\>, `strategyCtor`: [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<any\>): [*ApplicationBase*](applicationbase.md)

#### Parameters:

Name | Type |
:------ | :------ |
`serviceCtor` | [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<any\> |
`strategyCtor` | [*ApplicationServiceConstructor*](../modules.md#applicationserviceconstructor)<any\> |

**Returns:** [*ApplicationBase*](applicationbase.md)

Defined in: [app.d.ts:45](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L45)
