import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CONTACT_INBOX = "info@uxsupportgroup.com";
const INTERNAL_CC = "dnystwn@gmail.com";

type ContactInquiry = {
  name: string;
  email: string;
  message: string;
};

type ResendEmailOptions = {
  from: string;
  to: string[];
  cc?: string[];
  reply_to?: string;
  subject: string;
  html: string;
};

type ResendSendResult = {
  data?: { id?: string } | null;
  error?: { message?: string; name?: string } | string | null;
};

const isRecord = (data: unknown): data is Record<string, unknown> =>
  typeof data === "object" && data !== null && !Array.isArray(data);

const getStringField = (data: Record<string, unknown>, key: string) => {
  const value = data[key];
  return typeof value === "string" ? value : "";
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char] ?? char;
  });

const formatMultilineHtml = (value: string) =>
  escapeHtml(value).replace(/\r?\n/g, "<br>");

const formatResendError = (error: ResendSendResult["error"]) => {
  if (!error) return "Unknown Resend error";
  if (typeof error === "string") return error;
  return error.message || error.name || "Unknown Resend error";
};

const sendEmail = async (
  resend: Resend,
  options: ResendEmailOptions,
): Promise<string | undefined> => {
  const result = await resend.emails.send(options) as ResendSendResult;

  if (result.error) {
    throw new Error(formatResendError(result.error));
  }

  return result.data?.id;
};

// Simple validation helper
const validateInquiry = (data: unknown) => {
  const errors: string[] = [];
  const fields = isRecord(data) ? data : {};
  const inquiry: ContactInquiry = {
    name: getStringField(fields, "name"),
    email: getStringField(fields, "email"),
    message: getStringField(fields, "message"),
  };
  
  if (!inquiry.name.trim() || inquiry.name.length > 100) {
    errors.push("Name must be between 1 and 100 characters");
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inquiry.email) || inquiry.email.length > 255) {
    errors.push("Valid email address required (max 255 characters)");
  }
  
  if (inquiry.message.trim().length < 10 || inquiry.message.length > 2000) {
    errors.push("Message must be between 10 and 2000 characters");
  }
  
  return { inquiry, errors };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CONTACT-INQUIRY] Function started");
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const emailFrom = Deno.env.get("EMAIL_FROM") || "UX Support Group <info@uxsupportgroup.com>";

    // Parse request body
    const parsedBody = await req.json();
    const { inquiry: body, errors: validationErrors } = validateInquiry(parsedBody);
    console.log("[CONTACT-INQUIRY] Request received:", { 
      name: body.name, 
      email: body.email
    });

    // Validate input
    if (validationErrors.length > 0) {
      console.error("[CONTACT-INQUIRY] Validation failed:", validationErrors);
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validationErrors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Store in database
    const { data: inquiry, error: dbError } = await supabase
      .from("contact_inquiries")
      .insert({
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        message: body.message.trim(),
      })
      .select()
      .single();

    if (dbError) {
      console.error("[CONTACT-INQUIRY] Database error:", dbError);
      throw new Error("Failed to save inquiry");
    }

    console.log("[CONTACT-INQUIRY] Inquiry saved:", inquiry.id);

    const safeName = escapeHtml(body.name.trim());
    const safeEmail = escapeHtml(body.email.trim().toLowerCase());
    const safeMessage = formatMultilineHtml(body.message.trim());

    const notificationEmailId = await sendEmail(resend, {
      from: emailFrom,
      to: [CONTACT_INBOX],
      cc: [INTERNAL_CC],
      reply_to: body.email.trim().toLowerCase(),
      subject: `New Contact Inquiry from ${body.name.trim()}`,
      html: `
        <h1>New Contact Inquiry Received</h1>
        
        <h2>Contact Information:</h2>
        <ul>
          <li><strong>Name:</strong> ${safeName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
        </ul>
        
        <h2>Message:</h2>
        <p>${safeMessage}</p>
        
        <hr>
        <p><small>Inquiry ID: ${inquiry.id}</small></p>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `,
    });

    console.log("[CONTACT-INQUIRY] Notification email sent to team", {
      to: CONTACT_INBOX,
      emailId: notificationEmailId,
    });

    // Send confirmation email to user
    try {
      const confirmationEmailId = await sendEmail(resend, {
        from: emailFrom,
        to: [body.email],
        subject: "We received your message!",
        html: `
          <h1>Thank you for reaching out, ${safeName}!</h1>
          <p>We've received your message and will get back to you as soon as possible.</p>
          
          <h2>Your Message:</h2>
          <p>${safeMessage}</p>
          
          <p>If you have any urgent questions, feel free to reach out to us at ${CONTACT_INBOX}</p>
          
          <p>Best regards,<br>The UXSG Team</p>
        `,
      });
      console.log("[CONTACT-INQUIRY] Confirmation email sent to user", {
        emailId: confirmationEmailId,
      });
    } catch (emailError) {
      console.error("[CONTACT-INQUIRY] Failed to send confirmation email:", emailError);
      // Don't fail the request if confirmation email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message sent successfully",
        inquiryId: inquiry.id,
        notificationEmailId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("[CONTACT-INQUIRY] Error:", error);
    const message = error instanceof Error
      ? error.message
      : "An unexpected error occurred";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
