---
title: Image
description: 
---

# Image Component



## Example

```vue
<Image src="/images/photo.jpg" alt="A beautiful landscape" />
<Image src="/images/portrait.jpg" aspectRatio="4x5" orientation="portrait" />
<Image backgroundColor="#f0f0f0" aspectRatio="1x1" />
```

## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
| `isPortrait` |  | {boolean} True if orientation is 'portrait' |

## Component API Overview

```typescript
interface ImageComponent {

  readonly isPortrait: /* computed */;

}
```

