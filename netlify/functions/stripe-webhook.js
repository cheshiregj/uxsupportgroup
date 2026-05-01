import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Verify Stripe signature (raw body required)
  const sig =
    event.headers['stripe-signature'] ||
    event.headers['Stripe-Signature'];
  let stripeEvent;

  const rawBody =
    event.isBase64Encoded && event.body
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Stripe signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Only handle checkout completions
  if (stripeEvent.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: 'Event ignored' };
  }

  const session = stripeEvent.data.object;
  const { name, email } = session.customer_details || {};
  const amountTotal = session.amount_total; // in cents
  const metadata = session.metadata || {};

  if (!email) {
    console.error('No email found in session');
    return { statusCode: 400, body: 'No email in session' };
  }

  // Prefer checkout metadata. Amount checks remain as a fallback for older sessions.
  const EARLY_BIRD_CENTS = 290;
  const REGULAR_CENTS = 2900;
  const LATE_CENTS = 29900;
  let ticketType;
  if (metadata.ticket_type === 'early_bird') {
    ticketType = 'Early Bird';
  } else if (metadata.ticket_type === 'regular') {
    ticketType = 'Regular';
  } else if (metadata.ticket_type === 'late') {
    ticketType = 'Late';
  } else if (amountTotal === EARLY_BIRD_CENTS) {
    ticketType = 'Early Bird';
  } else if (amountTotal === REGULAR_CENTS) {
    ticketType = 'Regular';
  } else if (amountTotal === LATE_CENTS) {
    ticketType = 'Late';
  } else {
    console.log(
      `Ignoring checkout: amount_total=${amountTotal} (only ${EARLY_BIRD_CENTS}, ${REGULAR_CENTS}, or ${LATE_CENTS} cents sync to Brevo)`
    );
    return {
      statusCode: 200,
      body: 'Event ignored: not a summit ticket price',
    };
  }

  const firstName = name ? name.split(' ')[0] : '';
  const lastName = name ? name.split(' ').slice(1).join(' ') : '';

  // Add/update contact in Brevo list #9
  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          TICKET_TYPE: ticketType,
        },
        listIds: [9],
        updateEnabled: true,
      }),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error('Brevo API error:', errText);
      return { statusCode: 500, body: `Brevo error: ${errText}` };
    }

    console.log(`Contact added to Brevo: ${email} (${ticketType})`);
    return { statusCode: 200, body: `Contact added: ${email}` };
  } catch (err) {
    console.error('Fetch to Brevo failed:', err.message);
    return { statusCode: 500, body: `Internal error: ${err.message}` };
  }
};
