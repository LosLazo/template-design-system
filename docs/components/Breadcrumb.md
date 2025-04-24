---
title: Breadcrumb
description: 
---

# Breadcrumb Component



## Example

```vue
<Breadcrumb />
<Breadcrumb :items="[{label: 'Home', path: '/'}, {label: 'Components', path: '/components'}]" />
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `loading` | `any` | No | true | Property loading |

## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
| `breadcrumbItems` |  | {BreadcrumbItem[]} Array of breadcrumb items to display |

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `generateBreadcrumbs()` | - |  | {BreadcrumbItem[]} Array of breadcrumb items to display / const breadcrumbItems = computed(() => { if (props.items && props.items.length > 0) { // If items are explicitly provided, use those return props.items; } // Otherwise use the dynamically generated breadcrumbs return generatedItems.value; }); /** Generates breadcrumb items based on the current route Fetches page titles from Sanity when available |

## Component API Overview

```typescript
interface BreadcrumbComponent {
  loading?: any;
  readonly breadcrumbItems: /* computed */;
  generateBreadcrumbs(): void;
}
```

