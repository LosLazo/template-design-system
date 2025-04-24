---
title: Slider
description: 
---

# Slider Component



## Example

```vue
<Slider v-model="volume" :min="0" :max="100" :step="5" />
```

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| `update:modelValue` | `value: number` | Emitted continuously as the slider value changes |
| `change` | `value: number` | Emitted when the user stops dragging the slider |

