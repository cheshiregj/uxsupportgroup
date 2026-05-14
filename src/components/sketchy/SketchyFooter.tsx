import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PlaceholderPageLink } from "@/components/PlaceholderPageLink";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { SketchyHandDrawnInput } from "./SketchyHandDrawnInput";
import { SketchyIconButton } from "./SketchyIconButton";
import { SketchySocialLinks } from "./SketchySocialLinks";

const emailSchema = z.object({ email: z.string().email("Please enter a valid email address") });

const FOOTER_NAV_LINK_CLASS =
  "font-body text-uxsg-ink underline-offset-4 decoration-uxsg-ink/30 transition-colors duration-200 hover:underline hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uxsg-ink/30 focus-visible:rounded-sm active:opacity-80";

const FOOTER_LEGAL_LINK_CLASS =
  "font-body text-muted-foreground underline-offset-4 decoration-uxsg-ink/30 transition-colors duration-200 hover:underline hover:text-uxsg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uxsg-ink/30 focus-visible:rounded-sm active:opacity-80";

function FooterColumnHeading({ children, id }: { children: ReactNode; id: string }) {
  return (
    <div className="mb-4 text-center md:text-left">
      <h3 id={id} className="font-headline text-md text-uxsg-ink">
        {children}
      </h3>
    </div>
  );
}

export const SketchyFooter = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(emailSchema),
  });
  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    try {
      const { error } = await supabase.from("email_subscriptions").insert([{ email: data.email }]);
      if (error) {
        if (error.code === "23505") toast({ title: "Already subscribed", description: "This email is already subscribed." });
        else throw error;
      } else {
        setShowConfirmation(true);
        reset();
      }
    } catch {
      toast({ title: "Error", description: "Failed to subscribe.", variant: "destructive" });
    }
  };
  return (
    <footer className="paper-bg border-t border-uxsg-ink/15 py-10 font-body">
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-1 gap-10 justify-items-center text-center md:justify-items-stretch md:text-left md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(18rem,1.25fr)] lg:gap-x-10 lg:gap-y-0"
        >
          <nav className="min-w-0 w-full max-w-xs md:max-w-none" aria-labelledby="footer-about-heading">
            <FooterColumnHeading id="footer-about-heading">About</FooterColumnHeading>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              <li>
                <Link to="/about" className={FOOTER_NAV_LINK_CLASS}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className={FOOTER_NAV_LINK_CLASS}>
                  Contact
                </Link>
              </li>
              <li>
                <PlaceholderPageLink to="/media-kit" className={FOOTER_NAV_LINK_CLASS}>
                  Media Kit
                </PlaceholderPageLink>
              </li>
            </ul>
          </nav>

          <nav className="min-w-0 w-full max-w-xs md:max-w-none" aria-labelledby="footer-join-heading">
            <FooterColumnHeading id="footer-join-heading">Join</FooterColumnHeading>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              <li>
                <Link to="/membership" className={FOOTER_NAV_LINK_CLASS}>
                  Membership
                </Link>
              </li>
              <li>
                <PlaceholderPageLink to="/partner" className={FOOTER_NAV_LINK_CLASS}>
                  Partner
                </PlaceholderPageLink>
              </li>
              <li>
                <Link to="/sponsor" className={FOOTER_NAV_LINK_CLASS}>
                  Sponsor
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="min-w-0 w-full max-w-xs md:max-w-none" aria-labelledby="footer-summit-heading">
            <FooterColumnHeading id="footer-summit-heading">AIxUX Summit</FooterColumnHeading>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              <li>
                <Link to="/summit" className={FOOTER_NAV_LINK_CLASS}>
                  Summit 2026
                </Link>
              </li>
              <li>
                <Link to="/summit-2025" className={FOOTER_NAV_LINK_CLASS}>
                  Summit 2025
                </Link>
              </li>
            </ul>
          </nav>

          <div className="min-w-0 w-full max-w-md md:max-w-4xl lg:col-span-1 lg:col-start-4 lg:row-start-1">
            <p id="footer-stay-heading" className="mb-1 font-hand text-md text-uxsg-ink/70">
              Stay updated! Join the resistance.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto flex w-full max-w-md gap-2 md:mx-0 md:max-w-none"
              aria-labelledby="footer-stay-heading"
            >
              <div className="relative min-w-0 flex-1">
                <label htmlFor="sketchy-footer-email" className="sr-only">
                  Your email
                </label>
                <SketchyHandDrawnInput
                  id="sketchy-footer-email"
                  type="email"
                  placeholder="Your email"
                  {...register("email")}
                />
                {!!errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>
                )}
              </div>
              <SketchyIconButton type="submit" aria-label="Subscribe">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </SketchyIconButton>
            </form>
            <p className="mt-6 mb-1 font-hand text-md text-uxsg-ink/70">
              Follow us
            </p>
            <SketchySocialLinks align="center" className="mt-0 md:justify-start" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-uxsg-ink/15 pt-8 text-center text-xs text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:text-left sm:text-sm">
          <p className="font-body max-w-prose">
            UXSG · &copy; 2025–2026 UX Support Group. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-end sm:text-right">
            <Link to="/privacy" className={FOOTER_LEGAL_LINK_CLASS}>
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/50" aria-hidden>
              ·
            </span>
            <Link to="/terms" className={FOOTER_LEGAL_LINK_CLASS}>
              Terms of Service
            </Link>
            <span className="text-muted-foreground/50" aria-hidden>
              ·
            </span>
            <Link to="/code-of-conduct" className={FOOTER_LEGAL_LINK_CLASS}>
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Successfully subscribed!</DialogTitle>
            <DialogDescription>You&rsquo;ll receive the latest updates on future events and AI x UX insights.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default SketchyFooter;
