/**
 * site.ts — Central runtime configuration for zero-backend features.
 *
 * Two knobs, both safely inert until filled in:
 *
 * 1. WAITLIST_ENDPOINT — a Formspree (or any Formspree-compatible) form URL.
 *    When empty, the waitlist forms gracefully fall back to a prefilled
 *    mailto: intent message to CONTACT_EMAIL so signups are still captured
 *    (no broken UX) until the operator creates a form at formspree.io and
 *    pastes the endpoint here.
 *
 * 2. CF_WEB_ANALYTICS_TOKEN — Cloudflare Web Analytics beacon token. When
 *    empty, the beacon script is not emitted. Get a free token from
 *    dash.cloudflare.com → Web Analytics → Add a site, then paste it here.
 *
 * 3. CONTACT_EMAIL — used by the mailto fallback and public copy.
 */

export const WAITLIST_ENDPOINT = ""; // e.g. "https://formspree.io/f/yourformid"

export const CONTACT_EMAIL = "hello@controllertesting.com";

export const CF_WEB_ANALYTICS_TOKEN = ""; // e.g. "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

export const formspreeEnabled = (): boolean => WAITLIST_ENDPOINT.length > 10;
