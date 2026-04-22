import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const SummitAnnouncementBar = () => (
  <div
    role="region"
    aria-label="AIxUX Summit 2026 announcement"
    className="w-full border-b border-white/15 bg-uxsg-ink text-white"
  >
    <div className="container mx-auto px-4 py-1.5 sm:py-2">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-body text-[0.7rem] leading-snug sm:text-xs md:gap-x-3">
        <span className="text-white/95">
          AIxUX Summit 2026 <span aria-hidden>—</span> June 18–19  <span aria-hidden>|</span> Regular $29 <span aria-hidden>·</span> Spots are limited   </span>
        <Link
          to="/summit"
          className={cn(
            "inline-flex shrink-0 items-center gap-1 font-medium text-uxsg-yellow underline-offset-4",
            "transition-colors hover:text-white hover:underline focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-uxsg-ink rounded-sm"
          )}
        >
          Get My Ticket <span aria-hidden>→</span>
        </Link>
      </p>
    </div>
  </div>
);
