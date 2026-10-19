"use client";

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type RevealProps = {
  children: ReactNode;
  /** Which element to render. Keeps the markup semantic. */
  as?: ElementType;
  /** Stagger step — each step is 90ms. */
  delay?: number;
  variant?: "up" | "fade" | "rise" | "tilt";
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * Reveals its children when they scroll into view. Content is
 * always in the document and always readable; the animation only
 * adds movement, and CSS drops it entirely for reduced motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
  style,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${className}`.trim()}
      data-revealed={inView ? "true" : "false"}
      style={{ ...style, "--reveal-delay": `${delay * 90}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
