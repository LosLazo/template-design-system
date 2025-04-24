---
title: Component Documentation
description: Documentation for all design system components
---

# Component Documentation

This documentation is automatically generated from JSDoc comments in the component source code.

## Available Components

| Component | Description |
|-----------|-------------|
| [Avatar](Avatar.md) | User profile image component |
| [Badge](Badge.md) | Visual indicator for status or count |
| [Breadcrumb](Breadcrumb.md) | Navigation aid showing hierarchy |
| [Button](Button.md) | Interactive button control |
| [Card](Card.md) | Container for content display |
| [Carousel](Carousel.md) | Scrollable component for displaying items |
| [Checkbox](Checkbox.md) | Form input for boolean selections |
| [Divider](Divider.md) | Visual separator between content |
| [Dropdown](Dropdown.md) | Menu with selectable options |
| [Icon](Icon.md) | Visual symbols and indicators |
| [Image](Image.md) | Image display component |
| [Input](Input.md) | Text input field |
| [InputDropdown](InputDropdown.md) | Input with dropdown selection |
| [ProjectCard](ProjectCard.md) | Card for displaying project information |
| [SegmentedControls](SegmentedControls.md) | Button group for mutually exclusive options |
| [Slider](Slider.md) | Control for selecting a value from a range |
| [Spinner](Spinner.md) | Loading indicator |
| [Tabs](Tabs.md) | Content organization with tabbed interface |
| [Toggle](Toggle.md) | Switch control for boolean states |
| [Tooltip](Tooltip.md) | Contextual information on hover |

## Using the Components

Components can be imported from the `composables/components` directory:

```vue
<script setup>
import Button from '~/composables/components/Button.vue'
import Icon from '~/composables/components/Icon.vue'
</script>

<template>
  <Button 
    variant="primary" 
    prefixIcon="star"
  >
    Click me
  </Button>
</template>
``` 