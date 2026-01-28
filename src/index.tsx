import * as React from "react";

let stylesInjected = false;

export type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  respectReducedMotion?: boolean;
  ariaHidden?: boolean;
  injectStyles?: boolean;
  dataTestId?: string;
};

const toCssSize = (value?: number | string): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}px`;
  return value;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  radius = 4,
  className = "",
  style,
  animate = true,
  respectReducedMotion = true,
  ariaHidden = true,
  injectStyles = true,
  dataTestId,
}) => {
  if (injectStyles) injectSkeletonStyles();

  const prefersReducedMotion =
    respectReducedMotion &&
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const inlineStyle: React.CSSProperties = {
    display: "inline-block",
    background:
      "linear-gradient(90deg, var(--ez-skeleton-color-start, #f2f2f2) 25%, var(--ez-skeleton-color-middle, #e6e6e6) 37%, var(--ez-skeleton-color-end, #f2f2f2) 63%)",
    backgroundSize: "400% 100%",
    animation:
      animate && !prefersReducedMotion
        ? "var(--ez-skeleton-animation, react-ez-skeleton-pulse 1.4s ease-in-out infinite)"
        : "none",
    borderRadius: toCssSize(radius),
    width: toCssSize(width),
    height: toCssSize(height),
    ...style,
  };

  return (
    <span
      className={className}
      style={inlineStyle}
      aria-hidden={ariaHidden}
      data-testid={dataTestId}
    />
  );
};

export const injectSkeletonStyles = () => {
  if (stylesInjected) return;
  if (typeof document === "undefined") return;
  const id = "react-ez-skeleton-keyframes";
  if (document.getElementById(id)) {
    stylesInjected = true;
    return;
  }

  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = `:root{--ez-skeleton-color-start:#f2f2f2;--ez-skeleton-color-middle:#e6e6e6;--ez-skeleton-color-end:#f2f2f2;--ez-skeleton-animation:react-ez-skeleton-pulse 1.4s ease-in-out infinite;}@media (prefers-reduced-motion: reduce){:root{--ez-skeleton-animation:none;}}@keyframes react-ez-skeleton-pulse{0%{background-position:100% 50%;}100%{background-position:0 50%;}}`;
  document.head.appendChild(style);
  stylesInjected = true;
};

export const SkeletonText: React.FC<
  Omit<SkeletonProps, "height"> & {
    lines?: number;
    lineHeight?: number | string;
    gap?: number | string;
    lineWidths?: Array<number | string>;
    randomizeLineWidths?: boolean;
    randomizeMin?: number;
    randomizeMax?: number;
    randomizeSeed?: number;
  }
> = ({
  lines = 3,
  lineHeight = 16,
  gap = 8,
  width = "100%",
  radius = 4,
  className = "",
  style,
  lineWidths,
  randomizeLineWidths = false,
  randomizeMin = 60,
  randomizeMax = 100,
  randomizeSeed,
  animate,
  respectReducedMotion,
  ariaHidden,
  injectStyles,
  dataTestId,
}) => {
  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

  const createRng = (seed: number) => {
    let s = seed >>> 0;
    return () => {
      s = (1664525 * s + 1013904223) >>> 0;
      return s / 4294967296;
    };
  };

  const rng = randomizeLineWidths ? createRng(randomizeSeed ?? lines) : null;
  const min = clamp(randomizeMin, 0, 100);
  const max = clamp(randomizeMax, min, 100);

  const getLineWidth = (index: number): number | string => {
    if (lineWidths && lineWidths[index] !== undefined) return lineWidths[index]!;
    if (randomizeLineWidths && rng) {
      const p = min + (max - min) * rng();
      return `${Math.round(p)}%`;
    }
    if (index === lines - 1) return width;
    return "100%";
  };

  const items = Array.from({ length: lines });

  return (
    <div className={className} style={style}>
      {items.map((_, index) => (
        <Skeleton
          key={index}
          width={getLineWidth(index)}
          height={lineHeight}
          radius={radius}
          animate={animate}
          respectReducedMotion={respectReducedMotion}
          ariaHidden={ariaHidden}
          injectStyles={injectStyles}
          dataTestId={dataTestId ? `${dataTestId}-${index}` : undefined}
          style={{ marginBottom: index === lines - 1 ? 0 : toCssSize(gap) }}
        />
      ))}
    </div>
  );
};

export const SkeletonCircle: React.FC<
  Omit<SkeletonProps, "radius" | "height" | "width"> & { size?: number | string }
> = ({ size = 40, className = "", style, animate, respectReducedMotion, ariaHidden, injectStyles, dataTestId }) => {
  return (
    <Skeleton
      width={size}
      height={size}
      radius={"50%"}
      className={className}
      style={style}
      animate={animate}
      respectReducedMotion={respectReducedMotion}
      ariaHidden={ariaHidden}
      injectStyles={injectStyles}
      dataTestId={dataTestId}
    />
  );
};

// Keyframes as global CSS string for minimal setup.
// Consumers can copy these styles into their own CSS if they prefer.

export default Skeleton;
