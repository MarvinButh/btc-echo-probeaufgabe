# 01_frontend - Next.js frontend

This Next.js 15 app renders content pages sourced from Sanity and styled with Tailwind CSS 4.

## Requirements

- Node.js >= 18
- pnpm

## Install & Run

```bash
cd 01_frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

- Uses Roboto via `next/font/google`
- Images use `unoptimized` in dev to avoid external CDN timeouts
- To run tests: `pnpm test` (Vitest + Testing Library)
