import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { getSummitTicketAvailability } from "../_shared/summitEarlyBird.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CHECK-AVAILABILITY] ${step}${detailsStr}`);
};

const AVAILABILITY_CACHE_TTL_MS = 15_000;

let cachedAvailability:
  | {
      expiresAt: number;
      body: string;
    }
  | undefined;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    if (cachedAvailability && Date.now() < cachedAvailability.expiresAt) {
      logStep("Serving cached availability");
      return new Response(cachedAvailability.body, {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const availability = await getSummitTicketAvailability(
      stripe,
      (step, d) => logStep(step, d)
    );

    logStep("Summit ticket availability complete", {
      activeTier: availability.activeTier,
      earlyBirdSold: availability.earlyBirdSold,
      regularSold: availability.regularSold,
      regularRemaining: availability.regularRemaining,
      sessionsExamined: availability.sessionsExamined,
      truncated: availability.truncated,
    });

    const body = JSON.stringify(availability);
    cachedAvailability = {
      expiresAt: Date.now() + AVAILABILITY_CACHE_TTL_MS,
      body,
    };

    return new Response(body, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-availability", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
