---
title: SegmentedControls
description: 
---

# SegmentedControls Component



## Example

```vue
<SegmentedControls v-model="selectedOption" :items="[ { id: 'day', label: 'Day' }, { id: 'week', label: 'Week' }, { id: 'month', label: 'Month', disabled: true } ]" size="default" />
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string | number` | Required | The selected value, should match an item's id |
| `items` | `Array<{
    /**
     * Unique identifier for the segment
     */
    id: string | number` | Required | Array of items to display as segments |
| `label` | `string` | Required | Display text for the segment |
| `disabled` | `boolean` | Required | Whether the segment is disabled |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| `update:modelValue` | `value: string | number` | Emitted when the selected segment changes |

