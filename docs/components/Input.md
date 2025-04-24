---
title: Input
description: 
---

# Input Component



## Example

```vue
<Input v-model="value" label="Username" placeholder="Enter username" />
<Input v-model="email" type="email" prefixIcon="mail" error="Invalid email format" />
<Input v-model="search" suffixIcon="search" showClearButton />
```

## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
| `iconSize` |  | {number} Size of icon in pixels |
| `buttonSize` | Computed property for button size based on input size | {string} Button size variant |

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `clearInput()` | - |  | - |

## Component API Overview

```typescript
interface InputComponent {

  readonly iconSize: /* computed */;
  readonly buttonSize: /* computed */;
  clearInput(): void;
}
```

