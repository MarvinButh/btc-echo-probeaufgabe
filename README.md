# Fullstack Testaufgabe

Willkommen zur Testaufgabe für die Position als **Fullstack Entwickler:in**.

## Ziel

Du sollst in ca. **3–5 Stunden** anhand kleiner Teilaufgaben zeigen, wie du mit unserem Tech-Stack arbeitest:

- **01_frontend**: Next.js 15 (App Router, Typescript, Tailwind 4) - baue ein MVP einer Inhaltsseite mit Daten aus Sanity
- **02_studio**: Sanity CMS (Schemaerstellung) - erstelle das Content-Schema für Inhaltsseiten
- **03_api**: HonoJS (CRUD API) - baue eine kleine CRUD-API für Leads
- **04_docs**: Konzeptfragen - beantworte kurze Konzeptfragen (Migration, HubSpot, Mobile App)

👉 Bitte priorisiere ein lauffähiges **MVP**. Bonusaufgaben sind optional.

## Beispielseiten

Als Orientierung für Inhalte und Aufbau kannst du folgende Seiten ansehen, die in unserem Projekt migriert werden sollen:

- [Über Uns](https://www.btc-echo.de/ueber-btc-echo/)
- [Werbung bei BTC-ECHO](https://www.btc-echo.de/werbung/)
- [BTC-ECHO App](https://www.btc-echo.de/app/)
- [Presse](https://www.btc-echo.de/presse/)

(Nutze diese Seiten nur als Referenz für Felder, Inhalte und Layout. Es reicht, wenn du **eine Seite** als MVP umsetzt.)

## Abgabe

- Erstelle ein Git-Repo oder ein Zip-Archiv.
- Struktur wie vorgegeben beibehalten.
- Fülle die READMEs mit deiner Umsetzung / deinen Notizen und ergänze die notwendigen Dateien.
- Schicke uns den Link oder die Datei bis spätestens **[Datum, Uhrzeit]**.

## Rückfragen

Wenn während der Bearbeitung Fragen auftauchen, kannst du dich jederzeit per Mail an uns wenden.

## Monorepo Setup & Start

This repository contains three projects in a monorepo layout:

- `01_frontend` — Next.js 15 (App Router, TypeScript, Tailwind 4)
- `02_studio` — Sanity Studio for content schemas
- `03_api` — HonoJS CRUD API for leads

Recommended tooling:
- Node.js >= 18
- pnpm (preferred) — install: `npm i -g pnpm`

1) Install dependencies for all packages

```bash
cd /path/to/repo
pnpm install --recursive
```

2) Start services (dev)

- Frontend (Next.js):
  ```bash
  cd 01_frontend
  pnpm dev
  ```

- Sanity Studio:
  ```bash
  cd 02_studio/btcecho
  pnpm dev
  ```

- API (Hono):
  ```bash
  cd 03_api
  pnpm dev
  ```

Notes:
- Frontend runs on http://localhost:3000
- Sanity Studio usually runs on http://localhost:3333
- API runs on http://localhost:8787

If you prefer to run everything concurrently use tmux or your terminal multiplexing of choice.
