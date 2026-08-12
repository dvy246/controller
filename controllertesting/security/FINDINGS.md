# PRE-DEPLOYMENT SECURITY AUDIT — ControllerTesting.com — 2026-08-12

## GO / NO-GO VERDICT
**NOT SAFE TO DEPLOY** (Requires fixing HIGH severity items).

## Severity taxonomy used
CRITICAL — Remotely exploitable, no auth required, leads to credential/data exposure, code execution, or full compromise. BLOCKS DEPLOY.
HIGH — Real exploitable risk with meaningful impact (e.g. stored XSS, exposed sensitive key, open redirect used for phishing). BLOCKS DEPLOY unless explicitly risk-accepted in writing.
MEDIUM — Real but limited-impact or harder-to-exploit issue, or a significant best-practice gap (e.g. missing CSP with real third-party script exposure). Should fix before or shortly after deploy.
LOW — Best-practice gap with minimal realistic impact for this project's actual risk profile.
INFORMATIONAL — Worth knowing, not a real risk currently.

## Findings (grouped by severity)

### [HIGH] DOM-Based Cross-Site Scripting (XSS) in Global Search
- **Location**: `src/components/global/GlobalSearch.astro` (Line 165)
- **Reproduction**: Type `<img src=x onerror=alert(1)>` into the Cmd+K search modal.
- **Evidence**: 
  ```javascript
  listContainer.innerHTML = '<div class="search-no-results">No diagnostic tools found for "' + query + '"</div>';
  ```
  The user-controlled `query` is concatenated directly into an `innerHTML` assignment without any escaping or sanitization.
- **Real-world impact**: Any malicious payload typed or pasted into the search bar will execute immediately. While there is no URL parameter to easily trigger this remotely, it remains a dangerous XSS sink that can be exploited via social engineering (convincing a user to paste a payload) or by tampering with the DOM's quick-tags.
- **Fix**: Escape the `query` string before injecting it, or securely use `textContent` to set the text of the `<div class="search-no-results">` element.
- **Status**: New

### [HIGH] Vulnerable Astro Dependency (CVE-2026-54298 and others)
- **Location**: `package.json` and `package-lock.json`
- **Reproduction**: Run `npm audit`.
- **Evidence**: The project uses an outdated version of Astro that suffers from multiple High-severity vulnerabilities, including SSRF and XSS via unescaped attribute names and `<script>` tag sanitization bypasses.
- **Real-world impact**: Attackers can exploit these framework-level vulnerabilities to execute XSS attacks on statically generated pages or SSR pages, potentially stealing analytics tokens or deceiving users.
- **Fix**: Run `npm audit fix --force` or manually upgrade Astro to `>=7.2.1` in `package.json`. Note that this might require migrating breaking changes.
- **Status**: New

### [LOW] Permissive Content-Security-Policy (unsafe-inline)
- **Location**: `public/_headers` (Line 50)
- **Reproduction**: Inspect the `Content-Security-Policy` header configuration.
- **Evidence**: `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'`
- **Real-world impact**: Allowing `'unsafe-inline'` completely bypasses the primary XSS protection of CSP. The DOM-based XSS identified above is fully executable because of this policy. 
- **Fix**: Refactor inline `<script>` tags to use external files or apply cryptographic nonces/hashes, and remove `'unsafe-inline'` from the `script-src` directive.
- **Status**: New

### [INFORMATIONAL] Leftover Scaffolding Code
- **Location**: `src/pages/course-cards-demo.astro`
- **Reproduction**: Navigate to `/course-cards-demo`.
- **Evidence**: The page exists in the `pages` directory and is publicly routable, exposing a development testing component.
- **Real-world impact**: None, but pollutes the sitemap and reveals development artifacts.
- **Fix**: Remove the file or move it outside of the `pages` directory.
- **Status**: New

## Unconfirmed / needs deeper testing
- None

## Explicitly checked and clean
- **6.1 Secrets & credential hygiene**: Checked, clean. Verified via codebase inspection that only public analytics tokens are hardcoded. The sensitive `PASSPORT_SIGNING_SECRET` is securely read from Cloudflare Worker environment variables.
- **6.4 Input validation & injection (serverless)**: Checked, clean. The previously identified Critical DoS and IDOR vulnerabilities in `/api/telemetry` and `/api/verify` were successfully patched and verified.
- **6.5 Authentication & authorization**: Checked, clean. N/A (no authenticated areas).
- **6.7 Third-party script & embed risk**: Checked, clean. Third-party scripts are restricted appropriately via CSP (e.g. `www.gstatic.com`).
- **6.10 Data handling & privacy**: Checked, clean. Waitlists use Formspree or secure `mailto:` fallbacks. Telemetry is fully anonymized with cryptographic UUIDs.

## Manual actions required (cannot be verified by the agent)
- Confirm 2FA is enabled on the Cloudflare and domain registrar accounts before setting DNS records.
