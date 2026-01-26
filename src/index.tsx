import * as React from "react";

export type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
  style?: React.CSSProperties;
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
}) => {
  const inlineStyle: React.CSSProperties = {
    display: "inline-block",
    background: "linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)",
    backgroundSize: "400% 100%",
    animation: "react-ez-skeleton-pulse 1.4s ease-in-out infinite",
    borderRadius: toCssSize(radius),
    width: toCssSize(width),
    height: toCssSize(height),
    ...style,
  };

  return <span className={className} style={inlineStyle} />;
};

export const SkeletonText: React.FC<
  Omit<SkeletonProps, "height"> & { lines?: number; lineHeight?: number | string; gap?: number | string }
> = ({
  lines = 3,
  lineHeight = 16,
  gap = 8,
  width = "100%",
  radius = 4,
  className = "",
  style,
}) => {
  const items = Array.from({ length: lines });

  return (
    <div className={className} style={style}>
      {items.map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? (typeof width === "string" ? width : width) : "100%"}
          height={lineHeight}
          radius={radius}
          style={{ marginBottom: index === lines - 1 ? 0 : toCssSize(gap) }}
        />
      ))}
    </div>
  );
};

export const SkeletonCircle: React.FC<
  Omit<SkeletonProps, "radius" | "height" | "width"> & { size?: number | string }
> = ({ size = 40, className = "", style }) => {
  return (
    <Skeleton
      width={size}
      height={size}
      radius={"50%"}
      className={className}
      style={style}
    />
  );
};

// Keyframes as global CSS string for minimal setup.
// Consumers can copy these styles into their own CSS if they prefer.
if (typeof document !== "undefined") {
  const id = "react-ez-skeleton-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `@keyframes react-ez-skeleton-pulse { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }`;
    document.head.appendChild(style);
  }
}

export default Skeleton;
