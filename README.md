# react-ez-skeleton

Simple, flexible skeleton components for React applications.

## Installation

```bash
npm install react-ez-skeleton
```

Peer deps (must already be in your app):

- react
- react-dom

## Usage

```tsx
import React from "react";
import Skeleton, { SkeletonText, SkeletonCircle } from "react-ez-skeleton";

export const Example = () => {
  return (
    <div>
      <Skeleton width={200} height={24} />

      <SkeletonText lines={3} width="80%" style={{ marginTop: 16 }} />

      <SkeletonCircle size={48} style={{ marginTop: 16 }} />
    </div>
  );
};
```

## Scripts

- `npm run build` – build the library into `dist/` using tsup.
- `npm run dev` – watch mode while developing.

## License

MIT
