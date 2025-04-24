---
title: Badge
description: 
---

# Badge Component



## Example

```vue
<Badge value="5" />
<Badge value="100" max="99" />
<Badge isDot />
<Badge value="NEW" />
```

## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
| `formattedValue` |  | {String|Number} Formatted value with '+' suffix if it exceeds the max |

## Component API Overview

```typescript
interface BadgeComponent {

  readonly formattedValue: /* computed */;

}
```

