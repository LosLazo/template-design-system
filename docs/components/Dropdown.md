---
title: Dropdown
description: 
---

# Dropdown Component



## Example

```vue
<Dropdown :items="[{title: 'Section 1', content: 'This is the content for section 1'}]" />
<Dropdown :items="dropdownItems" maxWidth="600px" />
<Dropdown :items="faqItems" maxWidth="span 6" />
```

## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
| `dropdownStyles` |  | - |

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `startExpand(index: number)` | {number} index - Index of the item being expanded |  | - |
| `endExpand()` | - | End the expand animation | - |
| `startCollapse(index: number)` | {number} index - Index of the item being collapsed | Start the collapse animation for a dropdown item | - |
| `endCollapse()` | - | End the collapse animation | - |
| `toggleItem(index: number)` | {number} index - Index of the item to toggle | Toggle expansion state of a dropdown item | - |

## Component API Overview

```typescript
interface DropdownComponent {

  readonly dropdownStyles: /* computed */;
  startExpand(index: number): void;
  endExpand(): void;
  startCollapse(index: number): void;
  endCollapse(): void;
  toggleItem(index: number): void;
}
```

