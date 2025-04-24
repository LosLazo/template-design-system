---
title: Slider
description: 
---

# Slider Component



## Example

```vue
<Slider v-model="volume" :min="0" :max="100" :step="5" />
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `modelValue` | `number` | Yes | - | Current value of the slider |
| `min` | `number` | No | 0 | Minimum allowed value |
| `max` | `number` | No | 100 | Maximum allowed value |
| `step` | `number` | No | 1 | Step increment value |
| `disabled` | `boolean` | No | false | Whether the slider is disabled |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| `update:modelValue` | `value: number` | Emitted continuously as the slider value changes |
| `change` | `value: number` | Emitted when the user stops dragging the slider |

## Component API Overview

```typescript
interface SliderComponent {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;


}
```

