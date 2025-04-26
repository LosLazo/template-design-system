---
title: Divider
description: 
---

# Divider Component



## Example

```vue
<Divider /> <Divider orientation="vertical" color="strong" margin="16" />
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `orientation` | `'horizontal' | 'vertical'` | No | 'horizontal' | The orientation of the divider |
| `color` | `'strong' | 'defined' | 'soft' | 'subtle' | 'discrete' | 'disabled'` | No | 'defined' | The color strength of the divider |
| `margin` | `string | number` | No | 'var(--ei-dimension-space-medium)' | Margin around the divider in pixels or CSS value |

## Component API Overview

```typescript
interface DividerComponent {
  orientation?: 'horizontal' | 'vertical';
  color?: 'strong' | 'defined' | 'soft' | 'subtle' | 'discrete' | 'disabled';
  margin?: string | number;


}
```

