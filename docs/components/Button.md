# Button Component

A versatile button component with multiple variants, sizes, and states.  
Supports icons and loading state.

---

## Usage

```vue
<!-- Basic usage -->
<Button>Click me</Button>

<!-- Secondary variant, medium size -->
<Button variant="secondary" size="medium">Secondary Button</Button>

<!-- With a prefix icon -->
<Button prefixIcon="arrow-right">With Icon</Button>

<!-- Loading state -->
<Button state="loading">Loading</Button>
```

---

## Props

| Name        | Type                                               | Default    | Description                                 |
|-------------|----------------------------------------------------|------------|---------------------------------------------|
| `disabled`  | `boolean`                                          | `false`    | Disables the button when true               |
| `prefixIcon`| `string`                                           | `undefined`| Icon to display before the button text      |
| `suffixIcon`| `string`                                           | `undefined`| Icon to display after the button text       |
| `size`      | `'large'` \| `'medium'` \| `'small'` \| `'tiny'`   | `'large'`  | Size of the button                          |
| `state`     | `'default'` \| `'loading'`                         | `'default'`| Current state of the button                 |
| `variant`   | `'primary'` \| `'secondary'` \| `'ghost'` \| `'danger'` | `'primary'`| Visual style variant of the button          |

---

## Slots

| Name      | Description                        |
|-----------|------------------------------------|
| default   | Content of the button (button text)|

---

## Events

| Event   | Description                        |
|---------|------------------------------------|
| `click` | Emitted when the button is clicked |

---

## States & Variants

- **Variants:** `primary`, `secondary`, `ghost`, `danger`
- **Sizes:** `large`, `medium`, `small`, `tiny`
- **States:** `default`, `loading`
- **Icon Support:** Add icons before (`prefixIcon`) or after (`suffixIcon`) the button text.

---

## Accessibility

- The button is disabled when `disabled` is true.
- Loading state is visually indicated and disables interaction.

---

## Example

```vue
<Button
  :variant="'danger'"
  :size="'small'"
  :state="'loading'"
  prefixIcon="refresh"
  suffixIcon="arrow-right"
>
  Loading Danger
</Button>
```

---

## Styling

The component uses CSS classes for variants, sizes, and states.  
You can customize the styles using CSS variables or by overriding the classes.

---

## Icon Size Mapping

| Button Size | Icon Size (px) |
|-------------|---------------|
| large       | 20            |
| medium      | 16            |
| small       | 14            |
| tiny        | 12            |

---

## License

MIT

---

**Tip:**  
For more advanced usage, refer to the source code and customize as needed.

---

Let me know if you want this tailored for a specific documentation tool (like Storybook MDX, VuePress, etc.)!