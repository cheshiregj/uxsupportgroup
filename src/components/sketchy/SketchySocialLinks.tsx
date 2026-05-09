import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

const SOCIALS = [
  {
    name: "Meetup",
    href: "https://www.meetup.com/ux-support-group/",
    Icon: SketchyMeetupIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/uxsg/posts/?feedView=all",
    Icon: SketchyLinkedInIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ux_supportgroup?igsh=bXVzM3FsMThna2to",
    Icon: SketchyInstagramIcon,
  },
] as const;

type SketchySocialLinksProps = {
  className?: string;
  iconClassName?: string;
  align?: "start" | "center";
};

export const SketchySocialLinks = ({
  className,
  iconClassName,
  align = "start",
}: SketchySocialLinksProps) => (
  <ul
    className={cn(
      "mt-4 flex items-center gap-4",
      align === "center" ? "justify-center md:justify-start" : "justify-start",
      className,
    )}
  >
    {SOCIALS.map(({ name, href, Icon }) => (
      <li key={name}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-sm text-uxsg-ink transition-transform duration-200 hover:scale-110 hover:-rotate-3 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uxsg-ink/40 focus-visible:ring-offset-2",
          )}
        >
          <Icon className={cn("h-7 w-7", iconClassName)} aria-hidden />
        </a>
      </li>
    ))}
  </ul>
);

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const sketchyStrokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function SketchyLinkedInIcon({ className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      {...rest}
    >
      {/* hand-drawn rounded square */}
      <path
        d="M4,6 C5,4 8,3 12,3 C18,2.5 24,3 27,4 C28.5,5 29,9 29,15 C29.2,21 29,26 28,28 C26,29 21,29.2 16,29 C10,29.2 6,29 4,28 C3,26 2.8,21 3,15 C2.8,10 3,7 4,6 Z"
        {...sketchyStrokeProps}
      />
      {/* "in" lettering, hand-drawn */}
      {/* dot of i */}
      <path d="M9,9.5 C9.5,9 10.2,9 10.6,9.5 C10.8,10 10.4,10.6 9.8,10.6 C9.2,10.6 8.8,10.1 9,9.5 Z" {...sketchyStrokeProps} />
      {/* stem of i */}
      <path d="M9.6,13 C9.7,16 9.7,20 9.6,23" {...sketchyStrokeProps} />
      {/* n */}
      <path d="M14,23 C13.9,20 14,16.5 14,13 C14.4,13 15,13 15.4,13 C15.5,13.6 15.4,14.2 15.5,14.6 C16.4,13.4 18.2,12.6 20,13.2 C21.8,13.8 22.4,15.6 22.4,17.6 C22.4,19.8 22.4,21.8 22.4,23" {...sketchyStrokeProps} />
    </svg>
  );
}

function SketchyInstagramIcon({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...rest}>
      {/* outer wobbly rounded square */}
      <path
        d="M9,4 C13,3.5 19,3.5 23,4 C26,4.5 27.6,6.4 28,9 C28.4,13 28.4,19 28,23 C27.5,26 25.6,27.6 23,28 C19,28.5 13,28.5 9,28 C6,27.5 4.4,25.6 4,23 C3.5,19 3.5,13 4,9 C4.5,6 6.2,4.5 9,4 Z"
        {...sketchyStrokeProps}
      />
      {/* camera lens (rough circle) */}
      <path
        d="M16,10.5 C19.2,10.4 21.7,12.9 21.5,16 C21.6,19.1 19.1,21.6 16,21.5 C12.9,21.6 10.4,19.1 10.5,16 C10.4,12.9 12.9,10.4 16,10.5 Z"
        {...sketchyStrokeProps}
      />
      {/* small dot */}
      <path
        d="M23.4,7.6 C24.2,7.4 24.9,8.1 24.7,8.9 C24.5,9.6 23.6,9.8 23,9.3 C22.5,8.8 22.7,7.9 23.4,7.6 Z"
        {...sketchyStrokeProps}
      />
    </svg>
  );
}

function SketchyMeetupIcon({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...rest}>
      {/* "M" letter, hand-drawn */}
      <path
        d="M4,25 C4.5,20 5.5,12 6.5,7 C7.4,7.2 8.2,7.6 9,8.2 C10.4,11.6 12,15.2 13.6,18.4 C15.2,15 17,11.4 18.6,8 C19.4,7.5 20.4,7.4 21.2,7.6 C22.2,12.2 23.2,20 24,25"
        {...sketchyStrokeProps}
      />
      {/* underline swoop, signature "swoosh" feel of Meetup */}
      <path
        d="M3,27.5 C8,28.6 14,28.8 19,28.4 C22.4,28.1 25.5,27.4 28.6,26.2"
        {...sketchyStrokeProps}
      />
      {/* small extra flourish dot */}
      <path
        d="M27,21 C27.6,20.6 28.4,20.8 28.6,21.5 C28.7,22.2 28,22.8 27.3,22.5 C26.7,22.2 26.6,21.4 27,21 Z"
        {...sketchyStrokeProps}
      />
    </svg>
  );
}

export default SketchySocialLinks;
