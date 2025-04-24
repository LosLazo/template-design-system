---
title: Card
description: 
---

# Card Component



## Example

```vue
<Card title="Card Title" text="Card description text" />
<Card headerText="Featured" title="Product Name" text="Product description" imageSrc="/images/product.jpg" />
<Card title="Spanning Card" width="span 2"> <template #actions> <Button>Action</Button> </template> </Card>
```

## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
| `cardStyle` |  | {Object} CSS style object |

## Component API Overview

```typescript
interface CardComponent {

  readonly cardStyle: /* computed */;

}
```

