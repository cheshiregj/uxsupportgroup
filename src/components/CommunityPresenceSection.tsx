import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";

const COMMUNITY_PRESENCE_PACKAGE = "Community Presence — $2,500";

const CommunityPresenceSection = () => {
  const scrollToContact = (packageName: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("package", packageName);
    window.history.replaceState({}, "", url);

    document.querySelector("#contact")?.scrollIntoView({
      behavior: "smooth",
    });

    window.dispatchEvent(
      new CustomEvent("packageSelected", { detail: packageName }),
    );
  };

  const features = [
    "Featured sponsor mention in UXSG newsletter (one issue)",
    "60-minute Slack AMA in the community channel (you pick the topic)",
    "Logo placement on uxsupportgroup.com for 30 days",
    "Custom promo code for tracking",
    "Option to upgrade to Quarterly Partnership — we'll credit $2,500 toward your first quarter",
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 relative overflow-hidden border-2 border-border shadow-xl">
            <div className="mb-6 pb-6 border-b-2 border-dashed border-border">
              <h3 className="text-2xl font-bold mb-3 uppercase">
                Community Presence
              </h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-bold text-foreground">
                  $2,500
                </span>
                <span className="text-lg text-muted-foreground">/ one-time</span>
              </div>
              <p className="text-muted-foreground">
                A low-risk entry point to reach 9,000+ UX professionals
              </p>
            </div>

            <p className="font-semibold mb-4 text-lg">What's included:</p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm border-b border-border/50 pb-3 last:border-0"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full h-12 text-base font-bold bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl transition-all group uppercase"
              onClick={() => scrollToContact(COMMUNITY_PRESENCE_PACKAGE)}
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-center text-sm text-muted-foreground italic mt-4">
              Perfect for teams who want to test the community before committing
              to a full partnership.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityPresenceSection;
