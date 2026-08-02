# 🎮 Implementation Plan: ControllerTesting.com
## SEO-First Astro.js Gaming Tools Hub

---

## 1. Project Overview

| Attribute | Value |
|---|---|
| **Framework** | Astro 5.x (Static Site Generation) |
| **Rendering** | SSG (pre-rendered HTML) + Client Islands for interactive tools |
| **Styling** | Vanilla CSS with Custom Properties (dark/light mode) |
| **Hosting** | Cloudflare Pages (edge CDN, zero cold starts) |
| **Domain** | controllertesting.com |
| **Phase 1 Scope** | Controller testing suite (17 tools) + 15 controller profiles + 10 repair guides = ~45 pages |
| **Full Scope** | 54 tools + 800+ content pages |

---

## 2. Google Compliance Checklist — Point-by-Point

### ✅ Thin Content Prevention
| Requirement | Our Implementation |
|---|---|
| Original, helpful content | Every tool page has 700-1200 words of ORIGINAL explanatory content (what the test measures, how to interpret results, what to do next) |
| No auto-generated filler | All content is hand-written with genuine expertise. No AI-generated filler paragraphs. |
| No scraped content | All tool logic is original. Content is written from scratch with proper attribution for any referenced data. |
| Value-first | Every page answers a specific user question AND provides an interactive tool. The tool IS the value. |

**Implementation rule**: Every page template includes mandatory content sections with minimum word counts enforced during content review.

---

### ✅ No Keyword Stuffing
| Requirement | Our Implementation |
|---|---|
| Natural language | Entity-based SEO — write for humans, optimize for entities. |
| Keyword density | Target < 2% for any single keyword. Use semantic variations naturally. |
| Title tags | Primary keyword appears once, naturally. No repetition. |
| Headers | Keywords in H1 and 1-2 H2s maximum. Other headers use natural language. |
| Alt text | Descriptive of the actual image content, not keyword-loaded. |

**Implementation rule**: Content templates include notes for writers to use natural language. Review process checks for keyword density.

---

### ✅ Clean Link Practices
| Requirement | Our Implementation |
|---|---|
| No bought backlinks | All backlinks are earned through quality content and community value |
| No PBNs | Zero private blog network links |
| Outbound links | Link to authoritative sources (MDN, manufacturer sites, iFixit) with proper `rel` attributes |
| Internal links | Natural, contextual internal linking (5-8 per page) with descriptive anchor text |
| Affiliate links | All affiliate links use `rel="nofollow sponsored"` attribute |
| User-generated links | If community features are added, all user links get `rel="nofollow ugc"` |

```html
<!-- Affiliate link example -->
<a href="https://amazon.com/dp/..." rel="nofollow sponsored" target="_blank">
  PS5 DualSense Controller
</a>

<!-- Authoritative outbound link -->
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API" rel="noopener" target="_blank">
  Web Gamepad API documentation
</a>
```

---

### ✅ Excellent User Experience
| Requirement | Our Implementation |
|---|---|
| No intrusive interstitials | ZERO pop-ups, ZERO modals on page load, ZERO overlay ads |
| Mobile-friendly | Responsive design, touch-friendly controls, tested on real devices |
| Fast loading | < 2.0s LCP target, < 250KB total page weight |
| Accessible | WCAG 2.1 AA compliance, keyboard navigation, screen reader support |
| Clear navigation | Breadcrumbs, logical hierarchy, persistent header navigation |
| Ad placement | Ads are clearly labeled, never block content, never shift layout (CLS = 0) |

**Ad rules**:
- No ads above the fold on tool pages (tool must be first thing user sees)
- Ad slots have fixed dimensions (prevent CLS)
- Maximum 3 ad units per page
- No auto-playing video ads
- No interstitial ads between page navigations

---

### ✅ E-E-A-T Compliance

Since controller testing is **NOT a YMYL topic** (not health, finance, or safety), E-E-A-T requirements are moderate. However, we implement strong trust signals:

| E-E-A-T Signal | Implementation |
|---|---|
| **Experience** | "Tested with real controllers" — methodology page explains how tests work |
| **Expertise** | Technical explanations of Gamepad API, polling methodology, drift measurement |
| **Authoritativeness** | Community database with 50K+ tests, cited sources, linked to MDN docs |
| **Trustworthiness** | HTTPS, privacy policy, local-first processing, open methodology, honest limitations |

**Specific trust implementations**:
```html
<!-- Every tool page includes a methodology disclosure -->
<section class="methodology-card">
  <h2>How This Test Works</h2>
  <p>This test uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API">
  Web Gamepad API</a> to read your controller's input data at up to 60Hz...</p>
  
  <h3>Limitations</h3>
  <p>Browser-based testing cannot measure true hardware input latency. 
  For hardware-level measurements, specialized equipment is required.
  Our polling rate readings reflect browser-side polling, not the 
  controller's native USB polling rate.</p>
</section>
```

---

## 3. YMYL Safety

### Classification
Controller testing is **NOT YMYL** — it's a utility/hobby tool, not health, finance, legal, or safety content.

### Where YMYL Caution Is Needed

| Content Area | YMYL Risk | Mitigation |
|---|---|---|
| Controller repair guides | Low — physical repair involves small screwdrivers, no electrical danger | Disclaimer: "Proceed at your own risk. Opening your controller may void warranty." |
| Warranty claims | Low — financial advice (spend vs save) | Disclaimer: "Warranty terms may vary by region. Always verify directly with manufacturer." |
| Fix vs Replace calculator | Low — financial recommendation | Disclaimer: "Prices are approximate and may vary. This is not financial advice." |
| Health claims about hearing | Medium — audio frequency test could relate to hearing health | Disclaimer: "This is not a medical hearing test. Consult an audiologist for hearing concerns." |

### Standard Disclaimer Template (Bottom of Every Page)
```html
<footer class="page-disclaimer">
  <p>ControllerTesting.com provides hardware diagnostic tools for informational 
  purposes only. Test results are estimates based on browser API data and may not 
  reflect exact hardware specifications. We are not affiliated with Sony, Microsoft, 
  Nintendo, or any controller manufacturer. All trademarks belong to their respective 
  owners.</p>
</footer>
```

### Repair Guide Disclaimer
```html
<aside class="repair-warning">
  <strong>⚠️ Important:</strong> Opening your controller may void your manufacturer 
  warranty. If your controller is still under warranty, we recommend contacting the 
  manufacturer for a free repair or replacement before attempting any self-repair. 
  <a href="/warranty">Check your warranty status →</a>
</aside>
```

---

## 4. Dark / Light Mode System

### Architecture: Zero-Flash, CSS Custom Properties

The mode toggle must be **instant, persistent, and flash-free**. This means:
1. Theme is detected BEFORE any content renders
2. No "flash of wrong theme" (FOWT) on page load
3. User preference persists across sessions via localStorage
4. Respects OS-level `prefers-color-scheme` as default

### Implementation

#### 4.1 Inline Head Script (Prevents Flash)
This script runs BEFORE any CSS or content loads:

```html
<!-- In BaseLayout.astro <head>, BEFORE any stylesheets -->
<script is:inline>
  (function() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

#### 4.2 CSS Custom Properties (Semantic Color Tokens)

```css
/* ===== BASE TOKENS ===== */

/* Dark Theme (Default — gaming aesthetic) */
:root,
[data-theme="dark"] {
  /* Surfaces */
  --color-bg-primary:       #0A0A0F;
  --color-bg-secondary:     #111128;
  --color-bg-tertiary:      #1A1A2E;
  --color-bg-card:          #0F0F1A;
  --color-bg-card-hover:    #16162B;
  --color-bg-elevated:      #1E1E3A;
  --color-bg-input:         #0D0D18;

  /* Borders */
  --color-border-primary:   #2A2A4A;
  --color-border-secondary: #1E1E38;
  --color-border-focus:     #0066FF;

  /* Text */
  --color-text-primary:     #F0F0F5;
  --color-text-secondary:   #A0A0B8;
  --color-text-tertiary:    #707088;
  --color-text-inverse:     #0A0A0F;
  --color-text-link:        #4D94FF;
  --color-text-link-hover:  #80B3FF;

  /* Brand */
  --color-brand-primary:    #0066FF;
  --color-brand-primary-hover: #0052CC;
  --color-brand-secondary:  #00FF88;

  /* Status */
  --color-status-success:   #00CC6A;
  --color-status-success-bg:#0A2A1A;
  --color-status-warning:   #FFB800;
  --color-status-warning-bg:#2A2200;
  --color-status-error:     #FF4444;
  --color-status-error-bg:  #2A0A0A;
  --color-status-info:      #4D94FF;
  --color-status-info-bg:   #0A1A2A;

  /* Shadows */
  --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md:  0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.6);
  --shadow-glow: 0 0 20px rgba(0, 102, 255, 0.15);

  /* Scrollbar */
  --color-scrollbar-track:  #0A0A0F;
  --color-scrollbar-thumb:  #2A2A4A;

  /* Code blocks */
  --color-code-bg:          #0D0D18;
  --color-code-text:        #E0E0F0;
  
  /* Focus ring */
  --focus-ring: 0 0 0 2px var(--color-bg-primary), 0 0 0 4px var(--color-brand-primary);
}

/* Light Theme */
[data-theme="light"] {
  /* Surfaces */
  --color-bg-primary:       #FFFFFF;
  --color-bg-secondary:     #F8F8FC;
  --color-bg-tertiary:      #F0F0F5;
  --color-bg-card:          #FFFFFF;
  --color-bg-card-hover:    #F5F5FA;
  --color-bg-elevated:      #FFFFFF;
  --color-bg-input:         #F5F5FA;

  /* Borders */
  --color-border-primary:   #D0D0DD;
  --color-border-secondary: #E0E0EA;
  --color-border-focus:     #0052CC;

  /* Text */
  --color-text-primary:     #1A1A2E;
  --color-text-secondary:   #555570;
  --color-text-tertiary:    #888898;
  --color-text-inverse:     #FFFFFF;
  --color-text-link:        #0052CC;
  --color-text-link-hover:  #003D99;

  /* Brand */
  --color-brand-primary:    #0052CC;
  --color-brand-primary-hover: #003D99;
  --color-brand-secondary:  #00AA5A;

  /* Status */
  --color-status-success:   #00884A;
  --color-status-success-bg:#E6F7EE;
  --color-status-warning:   #CC8800;
  --color-status-warning-bg:#FFF8E6;
  --color-status-error:     #CC2222;
  --color-status-error-bg:  #FDE8E8;
  --color-status-info:      #0052CC;
  --color-status-info-bg:   #E6F0FF;

  /* Shadows */
  --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md:  0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 20px rgba(0, 82, 204, 0.08);

  /* Scrollbar */
  --color-scrollbar-track:  #F0F0F5;
  --color-scrollbar-thumb:  #C0C0D0;

  /* Code blocks */
  --color-code-bg:          #F5F5FA;
  --color-code-text:        #1A1A2E;

  /* Focus ring */
  --focus-ring: 0 0 0 2px var(--color-bg-primary), 0 0 0 4px var(--color-brand-primary);
}
```

#### 4.3 Usage Rules (Zero Color Mismatches)

> [!CAUTION]
> **NEVER use raw color values in component CSS.** ALWAYS use CSS custom properties. This is the ONLY way to guarantee zero color mismatches between themes.

```css
/* ✅ CORRECT — uses semantic tokens */
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}

.card:hover {
  background: var(--color-bg-card-hover);
  box-shadow: var(--shadow-glow);
}

/* ❌ WRONG — hardcoded colors will break in opposite theme */
.card {
  background: #0F0F1A;
  border: 1px solid #2A2A4A;
  color: #F0F0F5;
}
```

#### 4.4 Theme Toggle Component

```astro
<!-- ThemeToggle.astro -->
<button 
  id="theme-toggle" 
  class="theme-toggle" 
  aria-label="Toggle dark/light mode"
  title="Toggle theme"
>
  <svg class="icon-sun" aria-hidden="true"><!-- sun icon SVG --></svg>
  <svg class="icon-moon" aria-hidden="true"><!-- moon icon SVG --></svg>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  
  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
</script>

<style>
  .theme-toggle {
    background: var(--color-bg-tertiary);
    border: 1px solid var(--color-border-primary);
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: background 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle:hover {
    background: var(--color-bg-card-hover);
    color: var(--color-text-primary);
  }

  [data-theme="dark"] .icon-sun { display: block; }
  [data-theme="dark"] .icon-moon { display: none; }
  [data-theme="light"] .icon-sun { display: none; }
  [data-theme="light"] .icon-moon { display: block; }
</style>
```

#### 4.5 Theme Testing Checklist

Before launching, EVERY page must pass this checklist in BOTH themes:

- [ ] All text is readable against its background (min 4.5:1 contrast ratio for AA)
- [ ] No hardcoded colors exist anywhere in CSS (only CSS custom properties)
- [ ] Cards, borders, and dividers are visible in both themes
- [ ] SVG icons/illustrations use `currentColor` or CSS custom properties
- [ ] Canvas/chart visualizations respond to theme changes
- [ ] Status colors (success/warning/error) have sufficient contrast in both themes
- [ ] Focus rings are visible in both themes
- [ ] Scrollbars match the theme
- [ ] Code blocks have appropriate contrast in both themes
- [ ] Form inputs (sliders, buttons, checkboxes) match the theme
- [ ] No "flash of wrong theme" on page load
- [ ] Theme persists after page navigation
- [ ] Theme persists after browser restart

---

## 5. Pre-Launch Technical SEO Audit

### 5.1 Sitemap & Canonical URL Alignment

**Astro sitemap integration**:
```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://controllertesting.com',
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude non-canonical pages
        const excludePaths = ['/404', '/api/', '/admin/'];
        return !excludePaths.some(p => page.includes(p));
      },
      serialize: (item) => {
        // Set priority and changefreq based on path
        if (item.url.includes('/test/')) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/controllers/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ],
  trailingSlash: 'never'  // Consistent URL format
});
```

**Audit checklist**:
- [ ] Run `grep -r 'rel="canonical"' dist/` — verify every HTML file has exactly ONE canonical tag
- [ ] Compare every URL in `sitemap-index.xml` against canonical tags — they must match
- [ ] Verify no URL in sitemap has a canonical pointing elsewhere
- [ ] Verify no duplicate URLs exist (with/without trailing slash)
- [ ] Verify sitemap is accessible at `https://controllertesting.com/sitemap-index.xml`

**Automated verification script** (`scripts/audit-sitemap.sh`):
```bash
#!/bin/bash
# Verify sitemap-canonical alignment
echo "🔍 Checking sitemap-canonical alignment..."

# Extract all URLs from sitemap
grep -oP '<loc>\K[^<]+' dist/sitemap-*.xml | sort > /tmp/sitemap-urls.txt

# Extract all canonical URLs from HTML files
grep -rh 'rel="canonical"' dist/ | grep -oP 'href="\K[^"]+' | sort > /tmp/canonical-urls.txt

# Find mismatches
diff /tmp/sitemap-urls.txt /tmp/canonical-urls.txt > /tmp/seo-mismatches.txt

if [ -s /tmp/seo-mismatches.txt ]; then
  echo "❌ MISMATCHES FOUND:"
  cat /tmp/seo-mismatches.txt
  exit 1
else
  echo "✅ All sitemap URLs match their canonical tags"
fi
```

### 5.2 Redirects vs Active Routes

**Redirect configuration** (`public/_redirects` for Cloudflare Pages):
```
# Only redirect legacy/deleted paths — NEVER redirect active pages
# Format: source destination statusCode

# Example legacy redirects (if needed in future)
# /old-tool-name  /test/controller/drift  301
```

**Audit checklist**:
- [ ] `_redirects` file contains ZERO redirects that target active sitemap URLs
- [ ] No `astro.config.mjs` redirects point to sitemap-listed pages
- [ ] Run: `for url in $(grep -oP '<loc>\K[^<]+' dist/sitemap-*.xml); do curl -sI "$url" | head -1; done` — ALL must return `200 OK`, never `301` or `302`
- [ ] No JavaScript-based redirects exist in any page (`window.location`, `meta refresh`)

### 5.3 Canonical Tag Verification

**BaseLayout.astro canonical implementation**:
```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description: string;
  canonicalPath?: string;  // Override if needed
  ogImage?: string;
}

const { title, description, canonicalPath, ogImage } = Astro.props;
const siteUrl = 'https://controllertesting.com';
const canonicalUrl = canonicalPath 
  ? `${siteUrl}${canonicalPath}` 
  : `${siteUrl}${Astro.url.pathname.replace(/\/$/, '')}`;
---
<html lang="en" data-theme="dark">
<head>
  <!-- Theme detection (MUST be first script) -->
  <script is:inline>
    (function(){var t=localStorage.getItem('theme'),d=matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',t||(d?'dark':'light'))})();
  </script>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Canonical (CRITICAL - must match sitemap exactly) -->
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- SEO Meta -->
  <title>{title}</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage || `${siteUrl}/og-default.png`} />
  <meta property="og:site_name" content="ControllerTesting.com" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage || `${siteUrl}/og-default.png`} />

  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

  <!-- Main CSS -->
  <link rel="stylesheet" href="/styles/global.css" />
</head>
```

**Audit checklist**:
- [ ] `grep -r 'localhost' dist/` returns ZERO results
- [ ] `grep -r '\[DOMAIN\]' dist/` returns ZERO results
- [ ] `grep -r 'example.com' dist/` returns ZERO results
- [ ] `grep -r 'placeholder' dist/` returns ZERO results in `<meta>` or `<link>` tags
- [ ] Every page's canonical URL uses `https://controllertesting.com` (not http, not www)
- [ ] Every canonical URL has no trailing slash (matches `trailingSlash: 'never'` config)

### 5.4 Indexation Blocker Checks

**robots.txt** (`public/robots.txt`):
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_astro/  

Sitemap: https://controllertesting.com/sitemap-index.xml
```

**Headers configuration** (`public/_headers` for Cloudflare Pages):
```
# Production domain — DO NOT add noindex
https://controllertesting.com/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(self), geolocation=()

# Preview/staging domain — block indexing
https://*.pages.dev/*
  X-Robots-Tag: noindex, nofollow
```

**Audit checklist**:
- [ ] `robots.txt` does NOT contain `Disallow: /` (would block everything)
- [ ] `robots.txt` `Sitemap:` URL is exact and accessible (returns 200)
- [ ] `_headers` does NOT apply `X-Robots-Tag: noindex` to production domain
- [ ] `_headers` DOES apply `X-Robots-Tag: noindex` to `*.pages.dev` preview domain
- [ ] No `<meta name="robots" content="noindex">` exists in any production page template
- [ ] Run: `grep -r 'noindex' dist/` — should return ZERO results in HTML files
- [ ] Run: `grep -r 'nofollow' dist/` — should only appear on affiliate links (`rel="nofollow sponsored"`)

---

## 6. Astro.js Project Architecture

### File Structure

```
controllertesting.com/
├── public/
│   ├── robots.txt
│   ├── _redirects
│   ├── _headers
│   ├── favicon.svg
│   ├── og-default.png
│   ├── icons/                        # SVG icons
│   └── controllers/                  # Controller SVG illustrations
│       ├── ps5-dualsense.svg
│       ├── xbox-series.svg
│       ├── switch-pro.svg
│       └── ...
│
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro          # HTML skeleton, meta, theme script
│   │   ├── ToolLayout.astro          # Tool page card layout system
│   │   ├── ContentLayout.astro       # Article/guide layout
│   │   └── CompareLayout.astro       # Side-by-side comparison layout
│   │
│   ├── components/
│   │   ├── global/
│   │   │   ├── Header.astro          # Site header + nav + theme toggle
│   │   │   ├── Footer.astro          # Footer + disclaimer + trust signals
│   │   │   ├── Breadcrumbs.astro     # BreadcrumbList schema
│   │   │   ├── ThemeToggle.astro     # Dark/light toggle
│   │   │   ├── SEOHead.astro         # Meta tags, OG, Twitter, schema
│   │   │   └── FAQSection.astro      # FAQPage schema accordion
│   │   │
│   │   ├── cards/
│   │   │   ├── ToolCard.astro        # Reusable tool link card
│   │   │   ├── ResultCard.astro      # Test result display card
│   │   │   ├── ActionCard.astro      # Fix/Optimize/Upgrade CTA card
│   │   │   ├── ContentCard.astro     # Article preview card
│   │   │   ├── ControllerCard.astro  # Controller profile card
│   │   │   ├── ExportCard.astro      # Download/share/save card
│   │   │   └── TrustCard.astro       # Trust signals card
│   │   │
│   │   ├── tools/                    # Interactive tool islands (client-side JS)
│   │   │   ├── controller/
│   │   │   │   ├── DriftTester.astro         # client:visible island
│   │   │   │   ├── ButtonTester.astro
│   │   │   │   ├── TriggerTester.astro
│   │   │   │   ├── VibrationTester.astro
│   │   │   │   ├── CircularityTester.astro
│   │   │   │   ├── DeadzoneTester.astro
│   │   │   │   ├── PollingRateTester.astro
│   │   │   │   ├── LatencyTester.astro
│   │   │   │   ├── DpadTester.astro
│   │   │   │   ├── FullDiagnostic.astro      # Flagship wizard
│   │   │   │   ├── HealthScore.astro
│   │   │   │   ├── DriftTimeline.astro
│   │   │   │   ├── GyroscopeTester.astro
│   │   │   │   ├── TouchpadTester.astro
│   │   │   │   ├── MicrophoneTester.astro
│   │   │   │   ├── MultiController.astro
│   │   │   │   └── CompetitiveReadiness.astro
│   │   │   │
│   │   │   ├── mouse/
│   │   │   │   ├── CPSTest.astro
│   │   │   │   ├── MousePollingRate.astro
│   │   │   │   ├── DPIAnalyzer.astro
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── keyboard/
│   │   │   │   ├── KeyTester.astro
│   │   │   │   ├── RolloverTest.astro
│   │   │   │   ├── TypingSpeed.astro
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── audio/
│   │   │       ├── MicTest.astro
│   │   │       ├── SpeakerTest.astro
│   │   │       └── ...
│   │   │
│   │   ├── schema/                    # JSON-LD schema generators
│   │   │   ├── WebAppSchema.astro
│   │   │   ├── HowToSchema.astro
│   │   │   ├── ProductSchema.astro
│   │   │   ├── FAQSchema.astro
│   │   │   └── BreadcrumbSchema.astro
│   │   │
│   │   └── ui/                        # Reusable UI primitives
│   │       ├── Button.astro
│   │       ├── Badge.astro
│   │       ├── ProgressBar.astro
│   │       ├── Gauge.astro
│   │       ├── Slider.astro
│   │       └── Accordion.astro
│   │
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── 404.astro                 # Custom 404
│   │   │
│   │   ├── test/
│   │   │   ├── controller/
│   │   │   │   ├── index.astro       # Controller tools hub
│   │   │   │   ├── drift.astro
│   │   │   │   ├── buttons.astro
│   │   │   │   ├── triggers.astro
│   │   │   │   ├── vibration.astro
│   │   │   │   ├── circularity.astro
│   │   │   │   ├── deadzone.astro
│   │   │   │   ├── polling-rate.astro
│   │   │   │   ├── latency.astro
│   │   │   │   ├── dpad.astro
│   │   │   │   ├── full-diagnostic.astro
│   │   │   │   ├── health-score.astro
│   │   │   │   ├── timeline.astro
│   │   │   │   ├── gyroscope.astro
│   │   │   │   ├── touchpad.astro
│   │   │   │   ├── microphone.astro
│   │   │   │   ├── multi.astro
│   │   │   │   └── competitive-readiness.astro
│   │   │   ├── mouse/
│   │   │   │   ├── index.astro
│   │   │   │   ├── cps.astro
│   │   │   │   └── ...
│   │   │   ├── keyboard/
│   │   │   │   ├── index.astro
│   │   │   │   └── ...
│   │   │   ├── audio/
│   │   │   │   ├── index.astro
│   │   │   │   └── ...
│   │   │   └── performance/
│   │   │       ├── index.astro
│   │   │       └── ...
│   │   │
│   │   ├── controllers/              # Controller profiles
│   │   │   ├── index.astro
│   │   │   ├── [slug].astro          # Dynamic route from content collection
│   │   │   └── ...
│   │   │
│   │   ├── fix/                      # Repair guides
│   │   │   └── [category]/[slug].astro
│   │   │
│   │   ├── settings/                 # Game settings
│   │   │   └── [game]/[controller].astro
│   │   │
│   │   ├── compare/                  # Comparisons
│   │   │   └── [slug].astro
│   │   │
│   │   ├── connect/                  # Connection guides
│   │   │   └── [controller]/[platform].astro
│   │   │
│   │   ├── best/                     # Buying guides
│   │   │   └── [slug].astro
│   │   │
│   │   ├── warranty.astro            # Warranty assistant
│   │   ├── fix-or-replace.astro      # Fix vs Replace calculator
│   │   │
│   │   ├── data/                     # Community data
│   │   │   └── ...
│   │   │
│   │   ├── learn/                    # Educational content
│   │   │   └── [slug].astro
│   │   │
│   │   ├── privacy.astro             # Privacy policy
│   │   ├── terms.astro               # Terms of service
│   │   └── about.astro               # About / methodology
│   │
│   ├── content/                      # Astro content collections (Markdown)
│   │   ├── controllers/              # Controller profile data
│   │   │   ├── ps5-dualsense.md
│   │   │   ├── xbox-series.md
│   │   │   └── ...
│   │   ├── fix/                      # Repair guide articles
│   │   ├── settings/                 # Game settings data
│   │   ├── compare/                  # Comparison data
│   │   ├── connect/                  # Connection guide data
│   │   ├── best/                     # Buying guide articles
│   │   └── learn/                    # Educational articles
│   │
│   ├── data/                         # Static data files
│   │   ├── controllers.json          # Controller specs database
│   │   ├── games.json                # Game settings database
│   │   ├── warranty-policies.json    # Manufacturer warranty info
│   │   └── repair-costs.json         # Repair cost estimates
│   │
│   ├── lib/                          # Shared utilities
│   │   ├── gamepad.ts                # Gamepad API wrapper
│   │   ├── scoring.ts                # Health Score algorithm
│   │   ├── timeline.ts               # localStorage timeline logic
│   │   ├── report.ts                 # PDF report generation
│   │   └── seo.ts                    # SEO helpers (schema generators)
│   │
│   └── styles/
│       ├── global.css                # Reset + tokens + theme + typography
│       ├── cards.css                 # Card system styles
│       ├── tools.css                 # Tool-specific styles
│       └── content.css               # Article/prose styles
│
├── scripts/
│   ├── audit-sitemap.sh              # Sitemap-canonical verification
│   ├── audit-seo.sh                  # Full SEO audit script
│   ├── check-colors.sh               # Verify no hardcoded colors
│   └── build-check.sh               # Pre-deploy verification
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 7. Implementation Phases

### Phase 1: Foundation + Controller Suite (Month 1-2)

**Week 1-2: Project Setup & Design System**
- [ ] Initialize Astro project with TypeScript
- [ ] Configure `astro.config.mjs` (sitemap, site URL, trailing slash)
- [ ] Create `global.css` with complete dark/light theme tokens
- [ ] Create `BaseLayout.astro` with SEO head, theme script, canonical tags
- [ ] Create `Header.astro` with navigation and `ThemeToggle.astro`
- [ ] Create `Footer.astro` with disclaimer and trust signals
- [ ] Create `Breadcrumbs.astro` with BreadcrumbList schema
- [ ] Create card component library (ToolCard, ResultCard, ActionCard, etc.)
- [ ] Create `ToolLayout.astro` (standard tool page card layout)
- [ ] Setup `robots.txt`, `_headers`, `_redirects`
- [ ] Create schema generator components

**Week 3-6: Controller Testing Tools (17 tools)**
- [ ] `gamepad.ts` — Gamepad API wrapper with controller identification
- [ ] `scoring.ts` — Health Score algorithm
- [ ] Build tools in priority order:
  1. Stick Drift Detector (highest search demand)
  2. Full Diagnostic Wizard (flagship)
  3. Button Tester
  4. Trigger Pressure Tester
  5. Vibration Tester
  6. Circularity Test
  7. Deadzone Visualizer
  8. Polling Rate Checker
  9. D-Pad Tester
  10. Health Score Generator
  11. Latency Estimator
  12. Multi-Controller Tester
  13. Drift Timeline Tracker
  14. Competitive Readiness Score
  15. PDF Report Generator
  16. Gyroscope Tester (WebHID — Chrome only)
  17. Touchpad Tester (WebHID — Chrome only)

**Week 7-8: Initial Content + Launch**
- [ ] Write 15 controller profile pages (top controllers)
- [ ] Write 10 repair guides (stick drift for top 5 controllers + 5 common issues)
- [ ] Write homepage
- [ ] Create 404 page
- [ ] Write privacy policy, terms, about/methodology pages
- [ ] Run full SEO audit (sitemap, canonical, robots, headers)
- [ ] Dark/light mode testing checklist (every page, both themes)
- [ ] Deploy to Cloudflare Pages
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools

**Deliverables**: ~45 pages, 17 tools, full SEO infrastructure

### Phase 2: Hub Expansion (Month 3-4)
- [ ] 10 mouse testing tools
- [ ] 8 keyboard testing tools
- [ ] 6 audio testing tools
- [ ] 8 gaming utilities
- [ ] 20 more controller profiles
- [ ] 30 game settings pages
- [ ] 20 connection guides
- [ ] Warranty Assistant page
- [ ] Fix vs Replace Calculator
- [ ] Community database MVP (anonymous submissions)

**Deliverables**: ~200 pages cumulative

### Phase 3: Content Moat (Month 5-8)
- [ ] 50+ additional repair guides
- [ ] 50+ comparison pages
- [ ] 50+ more game settings
- [ ] 30 buying guides
- [ ] 5 performance tools
- [ ] Community data pages
- [ ] Educational content (20+ articles)

**Deliverables**: ~500 pages cumulative

### Phase 4: Authority & Scale (Month 9-12)
- [ ] Remaining content pages to reach 800+
- [ ] Monthly content refreshes
- [ ] Community reports and rankings
- [ ] Data-driven articles from community database
- [ ] Outreach and link building

**Deliverables**: ~800+ pages cumulative

---

## 8. Pre-Deploy Verification Script

```bash
#!/bin/bash
# scripts/build-check.sh — Run before EVERY deployment

echo "🔍 Running pre-deploy SEO & quality checks..."

# 1. Build the site
npm run build

# 2. Check for placeholder domains
echo "Checking for placeholder domains..."
if grep -r 'localhost\|example\.com\|\[DOMAIN\]\|placeholder' dist/ --include="*.html"; then
  echo "❌ FAIL: Placeholder domains found in output"
  exit 1
fi
echo "✅ No placeholder domains"

# 3. Check for noindex in HTML
echo "Checking for noindex tags..."
if grep -r 'noindex' dist/ --include="*.html"; then
  echo "❌ FAIL: noindex found in HTML files"
  exit 1
fi
echo "✅ No noindex in HTML"

# 4. Check all pages have canonical tags
echo "Checking canonical tags..."
for file in $(find dist -name "*.html"); do
  if ! grep -q 'rel="canonical"' "$file"; then
    echo "❌ FAIL: Missing canonical tag in $file"
    exit 1
  fi
done
echo "✅ All pages have canonical tags"

# 5. Check all pages have meta description
echo "Checking meta descriptions..."
for file in $(find dist -name "*.html"); do
  if ! grep -q 'name="description"' "$file"; then
    echo "❌ FAIL: Missing meta description in $file"
    exit 1
  fi
done
echo "✅ All pages have meta descriptions"

# 6. Check sitemap exists and is valid
echo "Checking sitemap..."
if [ ! -f dist/sitemap-index.xml ]; then
  echo "❌ FAIL: sitemap-index.xml not found"
  exit 1
fi
echo "✅ Sitemap exists"

# 7. Check robots.txt
echo "Checking robots.txt..."
if ! grep -q 'Sitemap:' dist/robots.txt; then
  echo "❌ FAIL: robots.txt missing Sitemap directive"
  exit 1
fi
echo "✅ robots.txt is valid"

# 8. Check for hardcoded colors in CSS (should use custom properties)
echo "Checking for hardcoded colors..."
HARDCODED=$(grep -rn '#[0-9a-fA-F]\{6\}' src/styles/ src/components/ --include="*.css" --include="*.astro" | grep -v 'global.css' | grep -v '\/\*' | grep -v 'comment' | head -20)
if [ -n "$HARDCODED" ]; then
  echo "⚠️ WARNING: Potential hardcoded colors found (should use CSS custom properties):"
  echo "$HARDCODED"
fi

echo ""
echo "🎉 All pre-deploy checks passed!"
```

---

## 9. Verification Plan

### Automated Tests
```bash
# Build verification
npm run build
bash scripts/build-check.sh

# Lighthouse audit (every page should score 90+)
npx lighthouse https://controllertesting.com --output=json

# HTML validation
npx html-validate dist/**/*.html

# Accessibility check
npx pa11y-ci
```

### Manual Verification
- [ ] Test every tool with real PS5, Xbox, and Switch controllers
- [ ] Verify dark/light mode on every page (Chrome, Firefox, Safari, Edge)
- [ ] Verify mobile responsiveness on real iOS + Android devices
- [ ] Submit sitemap to Google Search Console and verify indexing
- [ ] Run Google PageSpeed Insights on 5 key pages
- [ ] Run Google Rich Results Test on schema markup
- [ ] Verify all affiliate links have `rel="nofollow sponsored"`
- [ ] Verify all outbound links open in new tab with `rel="noopener"`
