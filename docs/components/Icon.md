---
title: Icon
description: 
---

# Icon Component



## Example

```vue
<Icon name="user" />
<Icon name="heart" size="16" color="red" />
<Icon name="star" size="32" />
```

## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
| `svgContent` |  | {string} Raw SVG HTML string or empty string if icon not found |

## Component API Overview

```typescript
interface IconComponent {

  readonly svgContent: /* computed */;

}
```

