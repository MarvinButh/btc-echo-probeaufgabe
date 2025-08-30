# Aufgabe 02 – Sanity Studio

## Ziel

Erstelle im Sanity Studio ein **Schema für Inhaltsseiten**.

## Pflichtfelder

- **title** (string, required)  
  Seitenüberschrift, die im Frontend als H1 angezeigt werden kann und für SEO wichtig ist.

- **slug** (slug, required, maxLength 96)  
  URL-Slug der Seite, eindeutig pro Dokument.

- **hero** (object)

  - `image` (image, required) → Hero-/Header-Bild oben auf der Seite
  - `alt` (string, required) → Alternativtext für Barrierefreiheit und SEO

- **content** (array)

  - Portable Text (Absätze, Überschriften, Listen)
  - Bilder mit Alt-Text
  - ggf. weitere Blöcke (z. B. Zitate, Features)

- **seo** (object)
  - `title` (string) → Meta Title (kann vom sichtbaren Titel abweichen)
  - `description` (text) → Meta Description für Suchmaschinen

## Optionale Felder

- **cta** (object)

  - `text` (string) → Call-to-Action Label (z. B. „Kontakt aufnehmen“)
  - `url` (url) → Ziel-URL

- **hubspotForm** (object, optional – für Konzeptaufgabe)

  - `portalId`, `formId` oder `embedCode` → um Formulare einbinden zu können

- **faq** (array, optional)

  - z. B. { question: string, answer: PortableText }

- **banner** (object, optional)
  - z. B. { text: string, link: url, variant: string }

## Dev & Run

```bash
cd 02_studio/btcecho
pnpm install
pnpm dev
```

Sanity Studio is available at http://localhost:3333 by default.

Schema files are located in `02_studio/btcecho/schemaTypes`.

## Aufgabe

- Erstelle dieses Schema in deinem Sanity Studio.
- Sorge dafür, dass die Pflichtfelder validiert werden (z. B. `required()`).
- Du kannst weitere Felder oder Blöcke ergänzen, wenn du meinst, dass sie für **realistische Landingpages**, wie aus den Beispielseiten, sinnvoll sind (z. B. Testimonials, Video, Features).
- Verwende `defineType` und `defineField`.
