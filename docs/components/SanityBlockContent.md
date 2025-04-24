---
title: SanityBlockContent
description: 
---

# SanityBlockContent Component



## Example

```vue
<SanityBlockContent :blocks="pageContent.blocks" />
<SanityBlockContent :blocks="article.content" />
```

## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
| `getComponentType(block)` | {Object} block - Sanity content block |  | {Component|null} Vue component for the block type or null if not found |

## Component API Overview

```typescript
interface SanityBlockContentComponent {


  getComponentType(block): void;
}
```

