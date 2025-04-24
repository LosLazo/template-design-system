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

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `modelValue` | `string | number` | Yes | - | The selected value, should match an item's id |
| `items` | `Array<{
    /**
     * Unique identifier for the segment
     */
    id: string | number` | Yes | - | Array of items to display as segments |
| `label` | `string` | Yes | - | Display text for the segment |
| `disabled` | `boolean` | No | - | Whether the segment is disabled |

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `selectSegment(id: string | number)` | value - The id of the selected segment / 'update:modelValue': [value: string | number]; }>(); /** Select a segment by its id, id - The id of the segment to select |  | - |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| `update:modelValue` | `value: string | number` | Emitted when the selected segment changes |

## Component API Overview

```typescript
interface SegmentedControlsComponent {
  modelValue: string | number;
  items: Array<{
    /**
     * Unique identifier for the segment
     */
    id: string | number;
  label: string;
  disabled?: boolean;

  selectSegment(id: string | number): void;
}
```

