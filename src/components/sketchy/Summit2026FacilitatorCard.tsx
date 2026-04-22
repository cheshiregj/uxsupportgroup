import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Summit2026FacilitatorCardProps = {
  name: string;
  /** Shown below the name, uppercase (e.g. title @ company). */
  roleLine: string;
  bio: string;
  /** Avatar URL; omit for placeholder initials. */
  imageSrc?: string;
  imageAlt?: string;
  linkedinUrl: string;
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function avatarInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Summit2026FacilitatorCard({
  name,
  roleLine,
  bio,
  imageSrc,
  imageAlt,
  linkedinUrl,
}: Summit2026FacilitatorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);

  const showLinkedin = linkedinUrl !== "#" && linkedinUrl.trim() !== "";

  useEffect(() => {
    if (bioRef.current) {
      const lineHeight = parseFloat(getComputedStyle(bioRef.current).lineHeight);
      const maxHeight = lineHeight * 4;
      const isOverflowing = bioRef.current.scrollHeight > maxHeight;
      setShowToggle(isOverflowing);
    }
  }, [bio]);

  return (
    <div className="summit-facilitator-card-frame relative group transform hover:-translate-y-1">
      <div
        className="summit-pushpin summit-pushpin--tilt pointer-events-none"
        aria-hidden
      >
        <div className="summit-pushpin-head" />
        <div className="summit-pushpin-base" />
        <div className="summit-pushpin-shaft" />
        <span className="summit-pushpin-point" />
      </div>
      <div className="relative z-0 bg-card p-8 pb-10 summit-facilitator-paper">
        <div className="flex items-start justify-between mb-6 gap-3">
          <div
            className="w-20 h-20 rounded-full border-2 border-uxsg-rsvp p-1 shrink-0 overflow-hidden bg-muted flex items-center justify-center"
            role={imageSrc ? undefined : "img"}
            aria-label={imageSrc ? undefined : `${name} — placeholder avatar`}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt ?? name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="font-body text-lg font-semibold text-muted-foreground" aria-hidden>
                {avatarInitials(name)}
              </span>
            )}
          </div>
          {showLinkedin ? (
            <a
              className="inline-flex shrink-0 text-[#0A66C2] transition-all duration-200 ease-in-out hover:scale-112"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${name}'s LinkedIn profile`}
            >
              <LinkedInIcon className="h-6 w-6 fill-current" />
            </a>
          ) : null}
        </div>
        <h3 className="font-headline text-2xl mb-1 text-foreground">{name}</h3>
        <p className="font-body font-semibold text-sm text-uxsg-rsvp uppercase tracking-wider mb-4">{roleLine}</p>
        <div>
          <p
            ref={bioRef}
            className={cn(
              "font-body text-sm text-muted-foreground leading-relaxed transition-all duration-300 inline",
              !isExpanded && "line-clamp-4",
            )}
          >
            {bio}
          </p>
          {showToggle ? (
            <button
              type="button"
              className="ml-1 text-sm text-uxsg-rsvp hover:text-uxsg-rsvp/80 transition-colors font-medium inline-block"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? " Less" : " More"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
