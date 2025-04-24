---
title: Avatar
description: A versatile avatar component for displaying user images with fallback icon support.
---

# Avatar Component

The Avatar component displays a user's profile image with graceful fallback to an icon when no image is available. It supports different shapes and sizes to fit various design contexts.

## Examples

```vue
<!-- Default avatar (shows fallback icon) -->
<Avatar />

<!-- Avatar with image -->
<Avatar src="/path/to/image.jpg" alt="User Name" />

<!-- Squircle avatar with custom size -->
<Avatar shape="squircle" :size="64" />

<!-- Different sizes -->
<Avatar :size="24" />
<Avatar :size="40" />
<Avatar :size="56" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `''` | Image source URL for the avatar. When not provided, falls back to a user icon. |
| `alt` | `string` | `'User avatar'` | Alternative text for the avatar image (for accessibility). |
| `size` | `number` | `40` | Size of the avatar in pixels (applied to both width and height). |
| `shape` | `'circle' \| 'squircle'` | `'circle'` | Shape of the avatar. |

## Component API

```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  shape?: 'circle' | 'squircle';
}
```

## Styling

The Avatar component automatically handles the following visual states:

- **With Image**: Displays the provided image scaled to fit the avatar container.
- **Without Image**: Shows a user icon as a fallback.
- **Circle**: Standard circular avatar (default).
- **Squircle**: Rounded square avatar with an 8px border radius.

The size is controlled through the `size` prop and applies to both width and height.
