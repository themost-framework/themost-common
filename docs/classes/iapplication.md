[@themost/common](../README.md) / [Exports](../modules.md) / IApplication

# Class: IApplication

## Table of contents

### Constructors

- [constructor](iapplication.md#constructor)

### Methods

- [getConfiguration](iapplication.md#getconfiguration)
- [getStrategy](iapplication.md#getstrategy)
- [hasStrategy](iapplication.md#hasstrategy)
- [useStrategy](iapplication.md#usestrategy)

## Constructors

### constructor

\+ **new IApplication**(): [*IApplication*](iapplication.md)

**Returns:** [*IApplication*](iapplication.md)

## Methods

### getConfiguration

▸ `Abstract`**getConfiguration**(): [*ConfigurationBase*](configurationbase.md)

Gets the configuration of this application

**Returns:** [*ConfigurationBase*](configurationbase.md)

Defined in: [app.d.ts:26](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L26)

___

### getStrategy

▸ `Abstract`**getStrategy**<T\>(`serviceCtor`: () => T): T

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`serviceCtor` | () => T |

**Returns:** T

Defined in: [app.d.ts:20](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L20)

___

### hasStrategy

▸ `Abstract`**hasStrategy**(`serviceCtor`: *void*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`serviceCtor` | *void* |

**Returns:** *boolean*

Defined in: [app.d.ts:15](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L15)

___

### useStrategy

▸ `Abstract`**useStrategy**(`serviceCtor`: *void*, `strategyCtor`: *void*): [*IApplication*](iapplication.md)

Registers an application strategy e.g. an singleton service which to be used in application context

#### Parameters:

Name | Type |
:------ | :------ |
`serviceCtor` | *void* |
`strategyCtor` | *void* |

**Returns:** [*IApplication*](iapplication.md)

IApplication

Defined in: [app.d.ts:10](https://github.com/themost-framework/themost-common/blob/917834f/app.d.ts#L10)
