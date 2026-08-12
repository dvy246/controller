# Attack Surface Map - ControllerTesting.com

## Routes & Pages
- `/` (Home)
- `/test/controller/*` (30+ tools, WebHID/Gamepad API, Heavy Client-Side Logic)
- `/test/mouse/*` (10 tools)
- `/test/keyboard`, `/test/midi`
- `/games/*` (5 canvas arcade games)
- `/embed/*` (15 embeddable widget iFrames)
- `/warranty`, `/fix-or-replace`, `/fit`, `/suggest`, `/contact`
- `/verify` (Passport Verification)

## Forms & Input Surfaces
- `/contact` (`mailto:` intent form)
- `/suggest` (`mailto:` intent form)
- `WaitlistForm` (submits to Formspree endpoint via `fetch`)
- Global Search (Cmd+K) Modal Input Field
- Filters (OS, Browser, Connection) in `/compatibility`
- Hardware API Inputs (Gamepad axes/buttons, WebHID input reports, WebMIDI inputs)

## Serverless API Routes (Cloudflare Workers/Pages Functions)
- `POST /api/telemetry` (Stores metrics in KV)
- `GET /api/telemetry/count` (Reads counts from KV)
- `POST /api/verify` (Signs diagnostic payloads using HMAC-SHA256 and stores in KV)

## Third-Party Scripts & Embeds
- Cloudflare Web Analytics (Beacon Token in Header)
- Google Analytics / AdSense (CSP allows `www.gstatic.com`, `analytics.google.com`, `*.google-analytics.com`)

## Environment Variables & Secrets
- `PUBLIC_CF_ANALYTICS_TOKEN` (Client-side, intentionally public)
- `PUBLIC_WAITLIST_ENDPOINT` (Client-side, intentionally public Formspree URL)
- `PASSPORT_SIGNING_SECRET` (Server-side, used for HMAC-SHA256 signature in `/api/verify`)
- Cloudflare KV bindings: `TELEMETRY_KV`, `PASSPORT_KV`

## Deployment & Hosting
- Cloudflare Pages (Configuration via `wrangler.toml` and GitHub integration)
- DNS/Domain registrar (controllertesting.com - currently not live yet)
