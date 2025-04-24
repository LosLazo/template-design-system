---
title: Carousel
description: 
---

# Carousel Component



## Example

```vue
<Carousel title="Featured Products"> <div class="carousel-item">Item 1</div> <div class="carousel-item">Item 2</div> <div class="carousel-item">Item 3</div> </Carousel>
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `undefined` | Optional title to display above the carousel |
| `itemSelector` | `string` | No | `'.carousel-item'` | CSS selector to identify carousel items |

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `next()` | - | Move to the next item | - |
| `prev()` | - | Move to the previous item | - |

## Slots

| Name | Description |
|------|-------------|
| `default` | Place carousel items here, preferably with the .carousel-item class |

## Component API Overview

```typescript
interface CarouselComponent {
  title?: string;
  itemSelector?: string;

  next(): void;
  prev(): void;
}
```

