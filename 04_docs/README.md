# Aufgabe 04 – Konzeptfragen

Bitte beantworte die folgenden Fragen jeweils kurz (max. 1 Seite pro Thema):

## 1. Migrationsplan

Wie würdest du die Migration von WordPress (Elementor) zu Sanity planen?

- Mapping Elementor Widgets → Sanity Felder
- Export/Import von Inhalten & Medien
- Übernahme SEO-Daten
- Redirects von alten zu neuen URLs
- QA & Rollout

## 2. HubSpot-Integration

Wie würdest du HubSpot sinnvoll in die Seite einbinden, sodass **Marketing eigenständig Landingpages bauen** kann?

- Content-Modellierung in Sanity (z. B. FormBlock)
- Varianten (Embed vs API)
- DSGVO/Consent, Tracking, A/B-Tests

## 3. Bonus – Mobile App

Was wäre notwendig, damit die neuen Inhalte auch in unserer **Mobile App** genutzt werden können?

- API/Projection
- Caching & Offline
- Bildoptimierung
- Navigation/Index

---

# Aufgabe 04 – Konzeptfragen

## 1) Migrationsplan: WordPress (Elementor) → Sanity

![Migration: Elementor → Sanity](sandbox:/mnt/data/migration_elementor_to_sanity.png)

**Zielbild:** Schlankes, wiederverwendbares Content-Modell, saubere Medienverwaltung, SEO-Parität, stabile Redirects, verifizierte Inhalte.

**A) Content-Mapping (Elementor → Sanity)**

* **Hero** → `heroBlock { title, subtitle, image, cta }`
* **Text/Headings** → `richText[]` (Portable Text, Marks, Anker)
* **Image/Carousel** → `imageBlock { images[], caption, alt }`
* **CTA/Buttons** → `ctaBlock { label, url, variant }`
* **FAQ/Accordion** → `faqBlock { items[]{question, answer} }`
* **Formular** → `formBlock { variant, formId, successPage, … }`
* **SEO** → `seo { title, description, ogImage, noindex }`
* **Hinweis:** Spacer/Divider sind Rendering/Styles, kein Schemafeld.

**B) Export/Transform/Import**

* **Export:** WP XML *oder* REST API (inkl. Upload-Pfade).
* **Transform (Node-Script):** HTML → Portable Text; Headings → TOC; interne Links → Ziel-Slugs; Widgets → Blocks; Medien → Sanity Assets (Alt-Texte erhalten).
* **Import:** Sanity Import in `staging` → Drafts; Duplikate via Datei-Hash umgehen.

**C) SEO-Parität**

* Titel/Description/Canonical/Robots übernehmen.
* OG/Twitter Cards mappen → `seo`.
* `noindex`/`nofollow` respektieren.

**D) Redirects**

* Slug-Konvention festlegen (Locale/Region).
* Alte URL → neue URL (CSV → Edge/Next-Middleware).
* **301**, Query-Strings/Anker erhalten, Trailing-Slash konsistent.

**E) QA & Rollout**

* **Preview:** Next.js Preview Mode pro Doc.
* **Checks:** Broken Links, Bildgrößen/LCP, a11y (Heading-Hierarchie), Tracking/Consent.
* **Content-Freeze** in WP → Delta-Import → DNS-Umschaltung + Redirects.
* **Rollback:** WP read-only, Feature Flag für neue Routen.

---

## 2) HubSpot-Integration: Marketing baut Landingpages selbst

![HubSpot-Integration](sandbox:/mnt/data/hubspot_integration.png)

**Zielbild:** Marketing erstellt/klont LPs in Sanity, wählt pro Seite Form-Variante, steuert Tracking & Tests – ohne Dev-Eingriff.

**A) Content-Modell (Sanity)**

* `landingPage` mit `title`, `slug`, `seo`, `layout`, `blocks[]`.
* **`formBlock`**:

  * `variant`: `'embed' | 'api'`
  * `hubspotFormId`, `portalId`
  * `successBehavior`: Redirect/Inline
  * `consentRequired` (bool)
  * **Hidden/Utm-Fields** (Array)
* Weitere Blöcke: `heroBlock`, `richText`, `features`, `testimonialBlock`, `ctaBlock`, …

**B) Varianten**

* **Embed** (schnell): HubSpot-Snippet/iframe.
  *Pro:* sehr wenig Aufwand. *Contra:* Third-party Script, weniger Kontrolle → Consent-Gate nötig.
* **API** (robust): Server-Route postet an HubSpot Forms API; UI first-party.
  *Pro:* a11y/Design/Validation/Performance. *Contra:* etwas mehr Dev-Aufwand.
* Umschaltbar **pro Seite** via `formBlock.variant`.

**C) DSGVO/Consent/Tracking/A/B**

* **CMP** gate’t HubSpot-Scripts (nur nach Einwilligung).
* Bei **API-Variante**: bevorzugt serverseitige Events (First-Party Cookies).
* **A/B-Tests:**

  * Leichtgewichtig per Feature-Flags/Experiment-Key in `landingPage`,
  * oder HubSpot-Experiments bei Embed.
* Datensparsamkeit, IP-Anonymisierung, klare Aufklärung im Form-Block.

**D) Operatives Setup**

* Sanity-**Presets** für schnell klonbare LP-Vorlagen.
* Schema-Validierungen (required, max length, erlaubte Varianten).
* Webhooks/Workflows: Submit → Slack/CRM; Fehler → Logging/Alerting.

---

## 3) Bonus – Mobile App: CMS-Inhalte in der App

![Mobile-App Content Flow](sandbox:/mnt/data/mobile_app_content_flow.png)

**Zielbild:** Schlanke Read-API mit stabilen Projektionen, Offline-First, optimierte Bilder.

**A) API/Projection**

* Edge-Function (Next/Hono) vor Sanity:

  * GROQ-Projektionen → **flache, versionierte** JSONs (resolved refs, nur benötigte Felder).
  * Params: `locale`, `preview`, `since` (Delta), `fields` (Whitelist).
  * ETags + Cache-Header für SWR.

**B) Caching & Offline**

* App-Cache mit **SQLite/Realm** (`documents`, `index`, `assets`).
* **Delta-Updates:** Start-Snapshot, danach `since`-Abrufe (UpdatedAt/Cursors).
* Background-Sync bei WLAN/Strom; read-only Content → keine Konflikte.
* Fallback: letztes gültiges JSON, UI kennzeichnet „offline“.

**C) Bildoptimierung**

* Sanity Image CDN (`w/h/fit/dpr`), moderne Formate automatisch.
* Größenvorlagen (thumb/card/hero/full) zentral definieren.
* Lazy/Priority Loading, LQIP/blurhash-Platzhalter.

**D) Navigation/Index**

* Leichter **Index-Endpoint**: Slugs, Route-Typ, Locale, UpdatedAt.
* App baut Menüs/Sitemaps daraus; Deep-Links + Feature-Flags.

**E) Qualität & Observability**

* Monitoring (API p95, Cache-Hit-Rate, Fehlerquoten).
* Contract-Tests: Schema → Projektion → App-DTO (Brüche früh erkennen).
