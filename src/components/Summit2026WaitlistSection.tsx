import { FormEvent, useState } from "react";
import { SketchyHandDrawnInput } from "@/components/sketchy/SketchyHandDrawnInput";
import { SketchyIconButton } from "@/components/sketchy/SketchyIconButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";

/**
 * Summit 2026 waitlist signup (Supabase `join-summit-waitlist` edge function).
 * Extracted from Summit2026V1 for optional reuse; not currently mounted on the summit page.
 */
export function Summit2026WaitlistSection() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || trimmedName.length > 100) {
      toast({
        title: "Name required",
        description: "Please enter your name (max 100 characters).",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || trimmedEmail.length > 255 || !emailRegex.test(trimmedEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("join-summit-waitlist", {
        body: {
          name: trimmedName,
          email: trimmedEmail,
        },
      });

      if (error || !data?.success) {
        console.error("[WAITLIST] Error response", error || data);
        let apiError = "";
        if (data && typeof data === "object" && "error" in data) {
          const raw = (data as { error: unknown }).error;
          if (raw != null && raw !== "") {
            apiError = typeof raw === "string" ? raw.trim() : String(raw);
          }
        }
        throw new Error(apiError || "Failed to join waitlist. Please try again.");
      }

      toast({
        title: "You're on the waitlist!",
        description:
          "Thank you. We'll email you as soon as AIxUX Summit 2026 dates and tickets are announced.",
      });

      setFormData({ name: "", email: "" });
    } catch (err: unknown) {
      console.error("[WAITLIST] Submission error", err);
      const fallback = "Something went wrong. Please try again or email us directly.";
      const message = err instanceof Error ? err.message.trim() || fallback : fallback;
      toast({
        title: "Submission failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mb-10 md:mb-12">
      <section className="w-full rounded-3xl border border-uxsg-ink/10 bg-muted/50 px-6 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 lg:px-9 lg:py-9">
        <p className="text-sm font-body text-uxsg-ink mb-2">
          Join the waitlist to be in the loop for speaker announcements, agenda updates, and reminders.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex-1 min-w-0 sm:max-w-xl">
            <label htmlFor="waitlist-name" className="sr-only">
              Your name
            </label>
            <SketchyHandDrawnInput
              id="waitlist-name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              disabled={isSubmitting}
              autoComplete="name"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="waitlist-email" className="sr-only">
              Your email
            </label>
            <SketchyHandDrawnInput
              id="waitlist-email"
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              disabled={isSubmitting}
              autoComplete="email"
            />
          </div>
          <SketchyIconButton
            type="submit"
            aria-label={isSubmitting ? "Joining waitlist" : "Join waitlist"}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Mail className="h-4 w-4" aria-hidden />
            )}
          </SketchyIconButton>
        </form>
      </section>
    </div>
  );
}
