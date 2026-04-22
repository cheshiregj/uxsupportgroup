import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HandDrawnHighlightProps = {
  children: ReactNode;
  /** Extra classes on the outer wrapper (e.g. slight rotation). */
  className?: string;
  /**
   * When set, controls whether the yellow marker is shown (after sweep).
   * Omit for always-visible marker (default).
   */
  markVisible?: boolean;
};

/**
 * Marker-style yellow highlight with irregular, hand-drawn edges.
 * Stretches horizontally to match the text width.
 */
export function HandDrawnHighlight({
  children,
  className = "",
  markVisible,
}: HandDrawnHighlightProps) {
  const filterId = `hhl-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const controlled = markVisible !== undefined;

  const svg = (
    <svg
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      viewBox="0 0 200 26"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter
          id={filterId}
          x="-15%"
          y="-25%"
          width="130%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        filter={`url(#${filterId})`}
        d="M 3,9
             C 18,4 38,11 58,6 C 78,1 102,10 128,5
             C 154,0 178,8 197,7
             C 200,7 201,11 200,14
             C 198,18 194,20 188,19
             C 158,24 122,20 92,22
             C 62,24 32,20 9,18
             C 4,17 1,13 2,9
             C 2,8 2,8 3,9 Z"
        fill="var(--uxsg-yellow)"
      />
    </svg>
  );

  return (
    <span
      className={`relative inline-block align-baseline box-decoration-clone ${className}`.trim()}
    >
      {controlled ? (
        <span className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <span
            className={cn(
              "relative block h-full w-full origin-left motion-safe:transition-transform motion-safe:duration-[420ms] motion-safe:ease-out motion-reduce:transition-none",
              markVisible ? "scale-x-100" : "scale-x-0"
            )}
          >
            {svg}
          </span>
        </span>
      ) : (
        svg
      )}
      <span className="relative z-[1] px-1.5 py-1 text-foreground">{children}</span>
    </span>
  );
}
