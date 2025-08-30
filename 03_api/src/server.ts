import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { z } from 'zod'
import { nanoid } from 'nanoid'

// Simple in-memory storage
export type Lead = {
  id: string
  email: string
  name?: string
  pageSlug?: string
  createdAt: string
  updatedAt: string
}

const leads = new Map<string, Lead>()

// Zod schemas
const leadCreateSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  pageSlug: z.string().min(1).optional(),
})

const leadUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  pageSlug: z.string().min(1).optional(),
}).refine((data) => Object.keys(data).length > 0, { message: 'At least one field must be provided' })

const app = new Hono()

// Simple CORS middleware for local development
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Accept')
  return next()
})

// Handle preflight requests
app.options('/*', (c) => {
  return new Response(null, { status: 204 })
})

app.get('/', (c) => c.json({ ok: true, service: 'BTC-ECHO Leads API' }))

// POST /leads -> create
app.post('/leads', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = leadCreateSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ error: 'Invalid payload', details: parsed.error.flatten() }, 400)
  }

  const now = new Date().toISOString()
  const id = nanoid()
  const lead: Lead = { id, createdAt: now, updatedAt: now, ...parsed.data }
  leads.set(id, lead)
  return c.json(lead, 201)
})

// GET /leads -> list
app.get('/leads', (c) => {
  return c.json(Array.from(leads.values()))
})

// GET /leads/:id -> get by id
app.get('/leads/:id', (c) => {
  const id = c.req.param('id')
  const lead = leads.get(id)
  if (!lead) return c.json({ error: 'Not found' }, 404)
  return c.json(lead)
})

// PUT /leads/:id -> update
app.put('/leads/:id', async (c) => {
  const id = c.req.param('id')
  const existing = leads.get(id)
  if (!existing) return c.json({ error: 'Not found' }, 404)

  const body = await c.req.json().catch(() => ({}))
  const parsed = leadUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ error: 'Invalid payload', details: parsed.error.flatten() }, 400)
  }

  const updated: Lead = { ...existing, ...parsed.data, updatedAt: new Date().toISOString() }
  leads.set(id, updated)
  return c.json(updated)
})

// DELETE /leads/:id -> delete
app.delete('/leads/:id', (c) => {
  const id = c.req.param('id')
  const existed = leads.delete(id)
  if (!existed) return c.json({ error: 'Not found' }, 404)
  return c.body(null, 204)
})

const port = Number(process.env.PORT ?? 8787)
console.log(`Leads API listening on http://localhost:${port}`)
serve({ fetch: app.fetch, port })
