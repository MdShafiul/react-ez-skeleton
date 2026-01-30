# react-ez-skeleton

**Simple. Accessible. Zero-config React skeletons.**

`react-ez-skeleton` is a lightweight React skeleton loader library focused on excellent developer experience (DX). It works out of the box, is SSR-safe, respects accessibility and motion preferences, and is easy to theme using CSS variables.

No CSS imports. No heavy dependencies. No surprises.

## Why react-ez-skeleton?

- **Zero configuration**: works immediately
- **SSR & hydration safe**: Next.js, Remix, etc.
- **Accessible by default**: `aria-hidden`
- **Reduced-motion friendly**: respects `prefers-reduced-motion`
- **Themeable**: via CSS variables
- **Test-friendly**: `dataTestId` -> `data-testid`
- **Tiny API**: no lock-in

## Installation

```bash
npm install react-ez-skeleton
```

or

```bash
yarn add react-ez-skeleton
```

## Quick Start

```tsx
import { Skeleton } from "react-ez-skeleton";

export function CardLoading() {
  return <Skeleton width={200} height={20} />;
}
```

That’s it.

- No CSS imports
- No providers
- No setup

## Components

### `Skeleton`

The base building block.

```tsx
<Skeleton width={120} height={16} />
<Skeleton width="100%" height={24} radius={8} />
```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number \| string` | `"100%"` | Width (px, %, etc.) |
| `height` | `number \| string` | `16` | Height |
| `radius` | `number \| string` | `4` | Border radius |
| `animate` | `boolean` | `true` | Enable shimmer animation |
| `respectReducedMotion` | `boolean` | `true` | Respects OS motion settings |
| `ariaHidden` | `boolean` | `true` | Decorative by default |
| `injectStyles` | `boolean` | `true` | Auto-inject required styles |
| `dataTestId` | `string` | `—` | Adds `data-testid` |
| `className` | `string` | `—` | Custom class |
| `style` | `React.CSSProperties` | `—` | Inline styles |

### `SkeletonText`

Perfect for paragraphs and content blocks.

```tsx
<SkeletonText lines={3} />
```

Advanced usage:

```tsx
<SkeletonText
  lines={4}
  randomizeLineWidths
  randomizeMin={60}
  randomizeMax={95}
  dataTestId="post-skeleton"
/>
```

#### Props (in addition to `SkeletonProps`)

| Prop | Type | Default |
| --- | --- | --- |
| `lines` | `number` | `3` |
| `lineHeight` | `number \| string` | `16` |
| `gap` | `number \| string` | `8` |
| `lineWidths` | `(number \| string)[]` | `—` |
| `randomizeLineWidths` | `boolean` | `false` |
| `randomizeMin` | `number` | `60` |
| `randomizeMax` | `number` | `100` |
| `randomizeSeed` | `number` | `—` |

Seeded randomness means deterministic layouts (nice for SSR and tests).

### `SkeletonCircle`

Ideal for avatars and icons.

```tsx
<SkeletonCircle size={40} />
```

## Theming (DX Highlight)

No theme providers. No props explosion.

Just CSS variables:

```css
:root {
  --ez-skeleton-color-start: #2a2a2a;
  --ez-skeleton-color-middle: #3a3a3a;
  --ez-skeleton-color-end: #2a2a2a;
}
```

Works automatically across your app.
Perfect for dark mode and design systems.

## Accessibility & Motion

- Skeletons are decorative by default
- Automatically hidden from screen readers
- Honors `prefers-reduced-motion`

```tsx
<Skeleton animate={false} />
```

## Testing Support

```tsx
<Skeleton dataTestId="profile-loading" />

expect(screen.getByTestId("profile-loading")).toBeInTheDocument();
```

`SkeletonText` automatically appends line indexes:

- `profile-loading-0`
- `profile-loading-1`

## SSR & Framework Support

Fully safe for:

- Next.js (App Router & Pages)
- Remix
- Vite SSR
- Astro
- CRA

Style injection is:

- Singleton-based
- Guarded
- Client-only
- No hydration mismatches

## Opt-out Style Injection

If you want full control:

```tsx
<Skeleton injectStyles={false} />
```

Then provide your own CSS:

```css
@keyframes react-ez-skeleton-pulse {
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0 50%;
  }
}
```

## Bundle Philosophy

- No runtime dependencies
- Tree-shakable
- Side-effect safe
- Dual ESM + CJS builds
- TypeScript first

## Contributing

PRs and issues are welcome on [GitHub](https://github.com/MdShafiul/react-ez-skeleton).
Please keep changes DX-focused and minimal.

## Documentation & Examples

View the full documentation and live examples at [react-ez-skeleton-docs.vercel.app](https://react-ez-skeleton-docs.vercel.app/).

## License

MIT © Md. Shafiul Alam

Final note: `react-ez-skeleton` is designed for developers who care about correctness, accessibility, and simplicity — without sacrificing control.