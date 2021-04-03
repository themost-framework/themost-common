[@themost/common](../README.md) / [Modules](../modules.md) / Args

# Class: Args

## Constructors

### constructor

\+ **new Args**(): [*Args*](args.md)

**Returns:** [*Args*](args.md)

## Methods

### check

▸ `Static`**check**(`expr`: *any*, `err`: *string* \| Error): *void*

Checks the expression and throws an exception if the condition is not met.

```typescript
const value = 1;
Args.check(value > 0, new Error('Value must be greater than 0.');
```

#### Parameters:

Name | Type |
:------ | :------ |
`expr` | *any* |
`err` | *string* \| Error |

**Returns:** *void*

Defined in: [utils.d.ts:15](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L15)

___

### notEmpty

▸ `Static`**notEmpty**(`arg`: *any*, `name`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *any* |
`name` | *any* |

**Returns:** *void*

Defined in: [utils.d.ts:49](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L49)

___

### notFunction

▸ `Static`**notFunction**(`arg`: *any*, `name`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *any* |
`name` | *string* |

**Returns:** *void*

Defined in: [utils.d.ts:39](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L39)

___

### notNegative

▸ `Static`**notNegative**(`arg`: *any*, `name`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *any* |
`name` | *any* |

**Returns:** *void*

Defined in: [utils.d.ts:54](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L54)

___

### notNull

▸ `Static`**notNull**(`arg`: *any*, `name`: *string*): *void*

Returns an error if the given value is null
```typescript
validate(value: any) {
    Args.notNull(value, 'Value');
    if (value === 'export') {
        //
    }
}
```

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *any* |
`name` | *string* |

**Returns:** *void*

Defined in: [utils.d.ts:29](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L29)

___

### notNumber

▸ `Static`**notNumber**(`arg`: *any*, `name`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *any* |
`name` | *string* |

**Returns:** *void*

Defined in: [utils.d.ts:44](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L44)

___

### notPositive

▸ `Static`**notPositive**(`arg`: *any*, `name`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *any* |
`name` | *any* |

**Returns:** *void*

Defined in: [utils.d.ts:59](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L59)

___

### notString

▸ `Static`**notString**(`arg`: *any*, `name`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *any* |
`name` | *string* |

**Returns:** *void*

Defined in: [utils.d.ts:34](https://github.com/themost-framework/themost-common/blob/580db67/utils.d.ts#L34)
