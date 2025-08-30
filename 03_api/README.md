# Aufgabe 03 – HonoJS API

## Ziel

Baue eine kleine **CRUD-API für Leads** mit [HonoJS](https://hono.dev/).

## Anforderungen

- Endpunkte unter `/leads`:
  - **POST /leads** → neuen Lead anlegen
  - **GET /leads** → alle Leads auflisten
  - **GET /leads/:id** → Lead nach ID abrufen
  - **PUT /leads/:id** → Lead aktualisieren
  - **DELETE /leads/:id** → Lead löschen
- **In-Memory-Storage** reicht (z. B. Map oder Array).
- **Validierung** der Eingaben mit [Zod](https://zod.dev/).
- Saubere HTTP-Statuscodes (201, 400, 404, …).

## Datenmodell (Vorschlag)

```ts
type Lead = {
  id: string;
  email: string;
  name?: string;
  pageSlug?: string;
  createdAt: string;
  updatedAt: string;
};
```

---

## Umsetzung in diesem Projekt

- Framework: HonoJS mit `@hono/node-server`
- Validierung: Zod
- Storage: In-Memory `Map<string, Lead>`
- Port: `8787` (via `PORT` überschreibbar)

### Starten

- Entwicklung: `pnpm dev`
- Direkt starten: `pnpm start`

### Endpunkte testen (Beispiele)

- POST anlegen:
  `curl -X POST http://localhost:8787/leads -H "Content-Type: application/json" -d '{"email":"foo@bar.com","name":"Foo"}'`
- GET alle: `curl http://localhost:8787/leads`
- GET eine ID: `curl http://localhost:8787/leads/<id>`
- PUT update: `curl -X PUT http://localhost:8787/leads/<id> -H "Content-Type: application/json" -d '{"name":"New"}'`
- DELETE: `curl -X DELETE http://localhost:8787/leads/<id>`
