type HandDrawnPillProps = {
  fill?: string;
  stroke?: string;
  className?: string;
};

/** Hand-drawn pill SVG (used by `SketchyBadge` for label chips). */
export const HandDrawnPill = ({
  fill = "#090907",
  stroke = "#090907",
  className = "",
}: HandDrawnPillProps) => (
  <svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    viewBox="0 0 100 28"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M6,4 C20,2 40,5 55,3 C70,4 85,3 95,5
         C97,8 96,15 95,22 C97,25 96,26 94,25
         C80,27 60,24 45,26 C30,24 15,27 6,25
         C3,22 4,15 3,8 C4,5 5,4 6,4 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
