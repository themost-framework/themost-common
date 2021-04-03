[@themost/common](../README.md) / [Modules](../modules.md) / HtmlWriter

# Class: HtmlWriter

## Constructors

### constructor

\+ **new HtmlWriter**(): [*HtmlWriter*](htmlwriter.md)

**Returns:** [*HtmlWriter*](htmlwriter.md)

## Properties

### buffer

• **buffer**: *string*

and clear buffer

Defined in: [html.d.ts:20](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L20)

___

### bufferedAttributes

• `Private` **bufferedAttributes**: *any*[]

Defined in: [html.d.ts:9](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L9)

___

### bufferedTags

• `Private` **bufferedTags**: *string*[]

Defined in: [html.d.ts:15](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L15)

## Methods

### write

▸ **write**(`s`: *string*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`s` | *string* |

**Returns:** *any*

Defined in: [html.d.ts:79](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L79)

___

### writeAttribute

▸ **writeAttribute**(`name`: *string*, `value`: *string*): *any*

Writes an attribute to an array of attributes that is going to be used in writeBeginTag function

#### Parameters:

Name | Type |
:------ | :------ |
`name` | *string* |
`value` | *string* |

**Returns:** *any*

Defined in: [html.d.ts:30](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L30)

___

### writeAttributes

▸ **writeAttributes**(`obj`: {} \| *any*[]): *any*

Writes an array of attributes to the output buffer. This attributes are going to be rendered after writeBeginTag or WriteFullBeginTag function call.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`obj` | {} \| *any*[] | An array of attributes or an object that represents an array of attributes   |

**Returns:** *any*

Defined in: [html.d.ts:39](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L39)

___

### writeBeginTag

▸ **writeBeginTag**(`tag`: *string*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`tag` | *string* |

**Returns:** *any*

Defined in: [html.d.ts:47](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L47)

___

### writeEndTag

▸ **writeEndTag**(): *any*

Writes an end HTML tag (e.g </div>) based on the current buffered tags.

**Returns:** *any*

Defined in: [html.d.ts:63](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L63)

___

### writeFullBeginTag

▸ **writeFullBeginTag**(`tag`: *string*): *any*

Writes a full begin HTML tag (e.g <div/>).

#### Parameters:

Name | Type |
:------ | :------ |
`tag` | *string* |

**Returns:** *any*

Defined in: [html.d.ts:56](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L56)

___

### writeText

▸ **writeText**(`s`: *string*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`s` | *string* |

**Returns:** *any*

Defined in: [html.d.ts:71](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L71)

___

### writeTo

▸ **writeTo**(`fn`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`fn` | *any* |

**Returns:** *void*

Defined in: [html.d.ts:85](https://github.com/themost-framework/themost-common/blob/580db67/html.d.ts#L85)
