---
title: InputDropdown
description: 
---

# InputDropdown Component



## Example

```vue
<InputDropdown id="dropdown1" v-model="selectedOption" :items="[{label: 'Option 1'}, {label: 'Option 2'}]" label="Select an option" />
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `modelValue` | `string
  
  /**
   * Label text for the input field
   */
  label?: string
  
  /**
   * Placeholder text for the input field
   */
  placeholder?: string
  
  /**
   * Size of the input field
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Success message to display
   */
  success?: string
  
  /**
   * Icon to display before the input text
   */
  prefixIcon?: string
  
  /**
   * Unique identifier for the input field
   */
  id: string
  
  /**
   * Array of items to display in the dropdown
   */
  items: Array<{ label: string` | Yes | - | Current value of the input field |
| `value` | `string` | No | - |  |

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `handleInputChange(value: string)` | value - The new input value | Handle input field value changes | - |
| `handleItemClick(item: { label: string; value?: string })` | item - The selected item | Handle item selection from the dropdown | - |

## Component API Overview

```typescript
interface InputDropdownComponent {
  modelValue: string
  
  /**
   * Label text for the input field
   */
  label?: string
  
  /**
   * Placeholder text for the input field
   */
  placeholder?: string
  
  /**
   * Size of the input field
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Success message to display
   */
  success?: string
  
  /**
   * Icon to display before the input text
   */
  prefixIcon?: string
  
  /**
   * Unique identifier for the input field
   */
  id: string
  
  /**
   * Array of items to display in the dropdown
   */
  items: Array<{ label: string;
  value?: string;

  handleInputChange(value: string): void;
  handleItemClick(item: { label: string; value?: string }): void;
}
```

