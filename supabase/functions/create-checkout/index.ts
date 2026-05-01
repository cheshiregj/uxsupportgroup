import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import {
  getSummitTicketAvailability,
  SUMMIT_PRICE_IDS,
  type SummitTicketType,
} from "../_shared/summitEarlyBird.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

function ticketTypeFromPriceId(priceId: string): SummitTicketType | undefined {
  return Object.entries(SUMMIT_PRICE_IDS).find(([, id]) => id === priceId)?.[0] as
    | SummitTicketType
    | undefined;
}

function checkoutBaseUrl(req: Request): string {
  const origin = req.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      const u = new URL(referer);
      return `${u.protocol}//${u.host}`;
    } catch {
      /* fall through */
    }
  }

  return "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { priceId } = await req.json();

    const ticketType = typeof priceId === "string" ? ticketTypeFromPriceId(priceId) : undefined;
    if (!priceId || !ticketType) {
      throw new Error("Invalid or missing price ID");
    }

    logStep("Creating checkout session", { priceId });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const availability = await getSummitTicketAvailability(stripe, (step, d) =>
      logStep(step, d)
    );

    if (availability.truncated) {
      logStep("WARNING summit ticket count may be incomplete", {
        earlyBirdSold: availability.earlyBirdSold,
        regularSold: availability.regularSold,
      });
    }

    if (ticketType !== availability.activeTier) {
      const messages: Record<SummitTicketType, string> = {
        early_bird: "Early bird tickets are sold out",
        regular:
          availability.activeTier === "early_bird"
            ? "Regular tickets are available after early bird sells out"
            : "Regular tickets just sold out — late tickets are now available",
        late: "Late tickets are available after regular tickets sell out",
      };
      throw new Error(messages[ticketType]);
    }

    logStep("Checkout tier approved", {
      ticketType,
      activeTier: availability.activeTier,
      regularRemaining: availability.regularRemaining,
    });

    const base = checkoutBaseUrl(req);
    if (!base) {
      throw new Error("Could not determine site URL for checkout redirect");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        price_id: priceId,
        ticket_type: ticketType,
        product: "aixux_summit_2026",
      },
      success_url: `${base}/summit?checkout=success`,
      cancel_url: `${base}/summit?checkout=canceled`,
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
