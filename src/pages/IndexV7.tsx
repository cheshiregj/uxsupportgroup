import { Check, Zap, Lock, Ticket } from "lucide-react";
import miroBoard from "@/assets/miro-collaboration.png";
import { SketchyBadge } from "@/components/sketchy/SketchyBadge";
import { RoughWavyUnderline } from "@/components/sketchy/RoughWavyUnderline";
import { SketchyCTA } from "@/components/sketchy/SketchyCTA";
import { SketchyIconListItem } from "@/components/sketchy/SketchyIconListItem";
import { SketchySectionTitle } from "@/components/sketchy/SketchySectionTitle";
import { SketchyStickyNote } from "@/components/sketchy/SketchyStickyNote";
import { SketchyTallCard } from "@/components/sketchy/SketchyTallCard";

/* ══════════════════════════════════════════════════════════════════
   HOME PAGE CONTENT (used by Index and IndexV7; hero, Two Ways, Lecture Hall)
   ══════════════════════════════════════════════════════════════════ */
export function IndexV7Content() {
  return (
    <main id="main">
        {/* ─── HERO ─── */}
        <section className="relative px-4 pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          {/* Top-left: tight spiral/loopy scribbles (Stitch: 3-4 overlapping loose loops) */}
          <svg className="absolute top-14 -left-2 md:left-2 w-28 h-36 md:w-40 md:h-48" viewBox="0 0 90 110" fill="none" stroke="#090907" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
            <path d="M25 12 Q38 5 45 18 Q52 31 38 35 Q24 39 20 26 Q16 13 30 8" />
            <path d="M18 40 Q35 32 44 45 Q53 58 38 60 Q23 62 18 50 Q13 38 22 35" />
            <path d="M28 65 Q42 58 50 70 Q58 82 42 85 Q26 88 22 76 Q18 64 32 60" />
            <path d="M12 88 Q28 82 38 92 Q48 102 32 105" />
          </svg>
          {/* Top-left: small scratch marks overlaid */}
          <svg className="absolute top-10 left-14 md:left-24 w-14 h-14 md:w-18 md:h-18" viewBox="0 0 35 35" fill="none" stroke="#090907" strokeWidth="0.9" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4 L10 10 M10 4 L4 10" />
            <path d="M18 6 L24 12 M24 6 L18 12" />
            <path d="M8 20 L14 26 M14 20 L8 26" />
          </svg>
          {/* Left edge: yellow curved arrow sweeping into hero (Stitch) */}
          <svg className="absolute top-28 -left-1 md:left-2 w-16 h-20 text-[#FCDD2A]" viewBox="0 0 40 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M2 40 Q8 20 20 10 Q32 0 38 12 M32 6 L38 12 L32 18" />
          </svg>
          {/* Top-right: angular yellow zigzag lines — large & prominent (Stitch) */}
          <svg className="absolute top-6 right-0 md:right-4 w-32 h-36 md:w-44 md:h-48" viewBox="0 0 100 110" fill="none" stroke="#FCDD2A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 22 L28 8 L48 28 L68 12 L88 26" />
            <path d="M4 50 L24 36 L44 56 L64 40 L84 54" />
            <path d="M12 78 L32 64 L52 82 L72 68 L92 80" />
            <path d="M20 100 L40 88 L60 105" />
          </svg>
          {/* Teal accent strokes over yellow zigzags (Stitch: small marks in teal) */}
          <svg className="absolute top-12 right-6 md:right-14 w-12 h-16 md:w-16 md:h-20 text-[#61C4D8]" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M8 8 Q15 5 22 10" />
            <path d="M5 22 Q14 18 25 24" />
            <path d="M10 35 Q18 32 25 38" />
          </svg>
          {/* Small teal sparkle/star marks scattered in hero (Stitch) */}
          <svg className="absolute top-28 right-[32%] w-7 h-7 text-[#61C4D8]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M10 2 L10 18 M2 10 L18 10 M5 5 L15 15 M15 5 L5 15" />
          </svg>
          <svg className="absolute top-36 right-[26%] w-5 h-5 text-[#61C4D8]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M10 3 L10 17 M3 10 L17 10" />
          </svg>
          <svg className="absolute top-20 right-[40%] w-4 h-4 text-[#61C4D8]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10 4 L10 16 M4 10 L16 10" />
          </svg>
          {/* Yellow horizontal wavy lines left side */}
          <svg className="absolute bottom-32 left-2 md:left-6 w-20 h-8 text-[#FCDD2A]" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M0 5 Q15 2 30 5 T60 5" />
            <path d="M0 10 Q15 7 30 10 T60 10" />
            <path d="M0 15 Q15 12 30 15 T60 15" />
          </svg>
          {/* Right-side: additional small black scribble (Stitch has scattered marks) */}
          <svg className="absolute bottom-28 right-4 md:right-12 w-10 h-12" viewBox="0 0 25 30" fill="none" stroke="#090907" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5 Q15 2 20 10 Q25 18 15 22 Q5 26 3 18" />
          </svg>

          {/* Hero content — Stitch: heading full width; then one row = sub-heading left, CTAs right; black wavy under "Human."; arrows from body toward CTAs */}
          <div className="max-w-5xl mx-auto relative">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-uxsg-ink leading-[1.05] mb-0 tracking-tight text-left font-headline">
              The Future of UX
              <br />
              <span className="inline-block pl-4 md:pl-8 relative">
                is Human.
                <span className="absolute left-4 md:left-8 right-0 -bottom-2 block text-uxsg-ink">
                  <RoughWavyUnderline className="w-full h-5" strokeW={4} />
                </span>
              </span>
            </h1>

            {/* One row: sub-heading left, CTAs right (Stitch layout) */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8 relative">
              <p className="text-lg text-uxsg-ink/80 leading-snug text-left max-w-xl relative z-10 font-body">
                Don&rsquo;t let AI define you.{" "}
                <span className="relative inline-block">
                  Define it.
                  <span className="absolute -bottom-1 left-0 right-0 text-uxsg-ink">
                    <RoughWavyUnderline className="w-full h-2" strokeW={1.5} />
                  </span>
                </span>
                {" "}Join{" "}
                <span className="relative inline-block">
                  <strong className="text-uxsg-ink">9,000+ designers</strong>
                  <span className="absolute -bottom-1 left-0 w-full text-uxsg-yellow">
                    <RoughWavyUnderline className="w-full h-2" strokeW={1.5} />
                  </span>
                </span>{" "}
                building the{" "}
                <span className="relative inline-block">
                  future&mdash;together.
                  <span className="absolute -bottom-0.5 left-0 right-0 border-b-2 border-dashed border-uxsg-ink/40" aria-hidden />
                </span>
              </p>
              <div className="flex flex-row flex-wrap gap-4 shrink-0 relative z-10">
                <SketchyCTA href="https://www.meetup.com/ux-support-group/" variant="light-bg">Browse Events</SketchyCTA>
                <SketchyCTA href="https://www.skool.com/ux-support-group-6932/about" variant="dark-bg">Join Accelerator</SketchyCTA>
              </div>
            </div>

            {/* Blue arrow: from near body text ("designers building the future") → Browse Events */}
            <svg className="absolute hidden sm:block w-36 h-24 text-[#61C4D8] pointer-events-none z-0" style={{ left: '28%', top: '52%' }} viewBox="0 0 100 65" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 8 Q35 25 70 45 Q92 58 98 62 M92 56 L98 62 L94 68" />
            </svg>
            {/* Yellow arrow: from slightly below blue origin → Join Accelerator */}
            <svg className="absolute hidden sm:block w-40 h-28 text-[#FCDD2A] pointer-events-none z-0" style={{ left: '32%', top: '58%' }} viewBox="0 0 100 75" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 10 Q40 35 78 55 Q95 68 99 72 M93 66 L99 72 L95 78" />
            </svg>
          </div>
        </section>

        {/* ─── TWO WAYS TO GROW ─── */}
        <section className="py-12 md:py-20 px-4 paper-bg">
          <div className="max-w-5xl mx-auto">
            <SketchySectionTitle>Two Ways to Grow</SketchySectionTitle>
            <div className="grid md:grid-cols-2 gap-6">
              {/* ── Sandbox ── */}
              <SketchyTallCard
                variant="light"
                tapes={[{ position: "topLeft" }, { position: "bottomRight" }]}
              >
                  <SketchyBadge rotation="none" labelClassName="text-white" className="mb-2">
                    Open to all
                  </SketchyBadge>
                  <h3 className="text-3xl font-black text-uxsg-ink mb-3 font-headline">The Sandbox</h3>
                  <p className="text-uxsg-ink/80 italic mb-4 leading-snug">&ldquo;I want to explore, play, and see what&rsquo;s possible.&rdquo;</p>
                  <ul className="space-y-3 mb-6">
                    <SketchyIconListItem icon={<Check className="w-5 h-5 text-uxsg-teal flex-shrink-0 mt-0.5" />} tone="light">
                      <><strong>For the Curious:</strong> Low-stakes sessions to test new tools and bold ideas.</>
                    </SketchyIconListItem>
                    <SketchyIconListItem icon={<Check className="w-5 h-5 text-uxsg-teal flex-shrink-0 mt-0.5" />} tone="light">
                      <><strong>Permission to Play:</strong> Ask &ldquo;what if?&rdquo; without fear of failure.</>
                    </SketchyIconListItem>
                    <SketchyIconListItem icon={<Ticket className="w-5 h-5 text-uxsg-teal flex-shrink-0 mt-0.5" />} tone="light">
                      <><strong>Pay Per Event:</strong> A small ticket price ensures everyone is present and engaged.</>
                    </SketchyIconListItem>
                  </ul>
                  <SketchyCTA
                    href="https://www.meetup.com/ux-support-group/"
                    variant="light-bg"
                    fullWidth
                  >
                    Browse Events
                  </SketchyCTA>
              </SketchyTallCard>
              {/* ── Accelerator ── */}
              <SketchyTallCard
                variant="dark"
                tapes={[{ position: "topRight" }, { position: "bottomLeft" }]}
                innerClassName="text-white"
              >
                  <SketchyBadge
                    rotation="none"
                    fill="white"
                    stroke="white"
                    labelClassName="text-uxsg-ink"
                    className="mb-2"
                  >
                    Members only
                  </SketchyBadge>
                  <h3 className="text-3xl font-black mb-3 font-headline">The Accelerator</h3>
                  <p className="text-white/80 italic mb-4 leading-snug">&ldquo;I want to stop watching and start leading.&rdquo;</p>
                  <ul className="space-y-3 mb-6">
                    <SketchyIconListItem icon={<Zap className="w-5 h-5 text-uxsg-yellow flex-shrink-0 mt-0.5" />} tone="dark">
                      <><strong>For the Builders:</strong> 20+ monthly labs, masterminds, and implementation sprints.</>
                    </SketchyIconListItem>
                    <SketchyIconListItem icon={<Zap className="w-5 h-5 text-uxsg-yellow flex-shrink-0 mt-0.5" />} tone="dark">
                      <><strong>The Leadership Track:</strong> Don&rsquo;t just attend sessions&mdash;facilitate them.</>
                    </SketchyIconListItem>
                    <SketchyIconListItem icon={<Lock className="w-5 h-5 text-uxsg-yellow flex-shrink-0 mt-0.5" />} tone="dark">
                      <><strong>Membership Commitment:</strong> For professionals with skin in the game.</>
                    </SketchyIconListItem>
                  </ul>
                  <SketchyCTA
                    href="https://www.skool.com/ux-support-group-6932/about"
                    variant="light-on-dark"
                    fullWidth
                  >
                    Join Accelerator
                  </SketchyCTA>
              </SketchyTallCard>
            </div>
          </div>
        </section>

        {/* ─── WE ARE NOT A LECTURE HALL ─── */}
        <section className="py-14 md:py-20 px-4 paper-bg">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-black text-uxsg-ink mb-4 leading-tight font-headline">We Are Not a Lecture Hall.</h2>
                <p className="text-base md:text-lg text-uxsg-ink/90 leading-snug font-body">
                  Most communities are places to passively consume content. You watch a webinar, take notes, and go back to work. <strong className="text-uxsg-ink">UXSG is a workspace.</strong>
                </p>
                {/* Blue arrow from text toward collage (Stitch) */}
                <svg className="mt-6 w-20 h-14 text-[#61C4D8]" viewBox="0 0 50 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M0 17 Q25 17 45 17 L50 17 M42 12 L50 17 L42 22" />
                </svg>
              </div>
              <div className="relative min-h-[320px] md:min-h-[380px]">
                {/* Overlapping photo collage — Stitch: B&W photos, thin borders */}
                <div className="absolute top-2 left-[5%] w-[58%] h-[60%] bg-white p-[3px] border border-[#c8c8c8] shadow transform -rotate-3 z-[1] overflow-hidden">
                  <img src={miroBoard} alt="" className="w-full h-full object-cover grayscale" style={{ objectPosition: "0% 20%" }} />
                </div>
                <div className="absolute top-[8%] right-[2%] w-[55%] h-[52%] bg-white p-[3px] border border-[#c8c8c8] shadow transform rotate-2 z-[2] overflow-hidden">
                  <img src={miroBoard} alt="" className="w-full h-full object-cover grayscale" style={{ objectPosition: "60% 40%" }} />
                </div>
                <div className="absolute bottom-[5%] left-[15%] w-[52%] h-[48%] bg-white p-[3px] border border-[#c8c8c8] shadow transform rotate-1 z-[3] overflow-hidden">
                  <img src={miroBoard} alt="UXSG community collaboration" className="w-full h-full object-cover grayscale" style={{ objectPosition: "100% 80%" }} />
                </div>

                <SketchyStickyNote
                  className="-left-2 top-2 md:left-0 md:top-4"
                  rotateClassName="-rotate-3"
                  variant="blue"
                  title="1. Human First, AI-Empowered"
                >
                  We don&rsquo;t fear AI. We use tools to amplify empathy.
                </SketchyStickyNote>
                <SketchyStickyNote
                  className="-right-1 top-[30%] md:right-0"
                  rotateClassName="rotate-2"
                  variant="blue"
                  title="2. Native Construction"
                >
                  We open our laptops and build it. Every session ends with output.
                </SketchyStickyNote>
                <SketchyStickyNote
                  className="right-2 -bottom-2 md:right-4"
                  rotateClassName="rotate-1"
                  variant="yellow"
                  title="3. Community Intelligence"
                >
                  The breakthroughs come from you. We are smarter together.
                </SketchyStickyNote>

                {/* Yellow loop arrow + wavy line below collage (Stitch) */}
                <svg className="absolute left-[30%] bottom-[25%] w-20 h-16 text-[#FCDD2A] z-[4]" viewBox="0 0 60 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M10 45 Q5 25 20 15 Q35 5 50 15 M44 9 L50 15 L44 21" />
                </svg>
                <svg className="absolute left-[5%] top-[55%] w-10 h-12 text-[#61C4D8] z-[4]" viewBox="0 0 30 35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M15 5 Q5 15 10 25 L12 30 M8 25 L12 30 L16 25" />
                </svg>
                <div className="absolute -bottom-6 left-0 right-0 z-[4] text-uxsg-yellow">
                  <RoughWavyUnderline className="w-full h-2" strokeW={2} />
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}

export default function IndexV7() {
  return <IndexV7Content />;
}
