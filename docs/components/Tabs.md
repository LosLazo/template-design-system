---
title: Tabs
description: 
---

# Tabs Component



## Example

```vue
<Tabs v-model="activeTab" :items="[{id: 'tab1', label: 'First Tab'}, {id: 'tab2', label: 'Second Tab'}]" />
<Tabs v-model="activeSection" :items="tabs" />
<Tabs v-model="view" :items="[{id: 1, label: 'Details'}, {id: 2, label: 'Reviews', disabled: true}]" />
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `indicatorStyle` | `any` | No | {
  width: '0px',
  transform: 'translateX(0px | Property indicatorStyle |

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `selectTab(id: string | number)` | {string|number} id - ID of the tab to select |  | - |

## Component API Overview

```typescript
interface TabsComponent {
  indicatorStyle?: any;

  selectTab(id: string | number): void;
}
```

