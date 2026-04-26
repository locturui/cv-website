# cv-website

Personal CV / portfolio site, **Next.js 15 + neo-brutalist redesign**.

Ported from Nuxt 3. Same database, same admin secret, same Vercel Blob bucket
— only the framework and the visual language changed.

## Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config in `app/globals.css`)
- **Type**: Archivo Black (display) + Space Grotesk (body) + JetBrains Mono — via `next/font`
- **i18n**: `next-intl` 3.x — `en` (default, no prefix), `ru`, `ko`
- **DB**: Drizzle ORM + `postgres` (same Postgres schema as before)
- **Storage**: Vercel Blob for project images
- **Icons**: `lucide-react`

## Layout

```
app/
  [locale]/                  # public site, prefix-as-needed
    layout.tsx               # site header + footer + NextIntl provider
    page.tsx                 # home
    experience/page.tsx
    projects/page.tsx        # server-rendered grid + client modal
    skills/page.tsx
    contact/page.tsx
  admin/                     # English-only, no locale prefix
    layout.tsx               # auth gate + sidebar
    page.tsx                 # projects CRUD
    experience/page.tsx
    skills/page.tsx
  api/
    projects/                # public read endpoints
    experience/
    skills/
    admin/                   # protected, Bearer token in Authorization header
      projects/   experience/   skills/   upload/

src/
  components/                # presentational + interactive components
    admin/                   # admin shell, modals, forms
  i18n/                      # next-intl routing/navigation/request config
  lib/
    db/                      # drizzle schema + client (`getDb()`)
    auth.ts                  # Bearer-token check helpers
    date-formatter.ts

messages/                    # en.json / ru.json / ko.json
middleware.ts                # next-intl middleware (excludes /api and /admin)
```

## Environment

Copy `.env.example` to `.env` and set:

```
DATABASE_URL=postgres://...
ADMIN_SECRET=...
BLOB_READ_WRITE_TOKEN=...
```

## Run it

```bash
pnpm install        # or: npm install
pnpm dev            # http://localhost:3000

pnpm db:push        # push schema to Postgres
pnpm db:studio      # drizzle studio
```

## Routes

Public:
- `/` · `/ru` · `/ko` — home
- `/experience` · `/ru/experience` · `/ko/experience`
- `/projects` · `/skills` · `/contact` (and locale-prefixed equivalents)

Admin (no locale prefix):
- `/admin` — projects CRUD
- `/admin/experience`
- `/admin/skills`

API:
- `GET /api/projects?locale=en` · `GET /api/projects/[key]?locale=en`
- `GET /api/experience?locale=en`
- `GET /api/skills`
- `GET|POST|PATCH|DELETE /api/admin/{projects,experience,skills}/...`
- `POST /api/admin/upload` (multipart, `file` field)
- `POST /api/admin/skills/reorder`

Admin endpoints require `Authorization: Bearer <ADMIN_SECRET>`. The list
endpoints (`GET`) also accept `?secret=<ADMIN_SECRET>` so the browser-side
auth check after login works without a custom fetch wrapper.

## Design system

Neo-brutalist with colour: chunky display sans, thick black borders, hard
drop shadows, bold flat colour blocks. The vocabulary lives in
`app/globals.css`:

- `brutal-border` / `brutal-border-2` — 4px / 2px solid black borders
- `brutal-shadow` / `brutal-shadow-sm` / `brutal-shadow-lg` — hard ink shadows
- `brutal-press` — pressable card/button (hover lifts, active sinks into shadow)
- `brutal-display` / `brutal-mono` / `brutal-marker` / `brutal-tag` —
  typographic primitives
- Tokens via Tailwind v4 `@theme`: `bg-brutal-yellow`, `bg-brutal-pink`,
  `bg-brutal-blue`, `bg-brutal-red`, `bg-brutal-green`, `bg-cream`, `bg-paper`,
  `text-ink`, `font-display`, `font-mono`, etc.

Reusable React primitives: `BrutalCard`, `BrutalButton`, `BrutalLink`,
`SectionHeader`.

## Notes on the port

- The original Nuxt server routes used `useState('adminSecret')` + a Nuxt
  middleware to gate `/admin`. Equivalent here: `<AdminProvider>` + an
  in-component auth gate (`AdminShell`) that reads `localStorage` and verifies
  the secret against `/api/admin/projects?secret=...` on mount.
- Drizzle schema is unchanged — your existing migrations, rows and
  `images`/`stack` JSON-encoded columns work as-is.
- Vercel Blob upload behaviour is preserved: tries `head(filename)` first
  to dedupe, otherwise `put`.
- AOS scroll-reveal was removed in favour of a single CSS `brutal-rise`
  animation on the hero and the `brutal-press` micro-interaction on every
  pressable element. Faster, no external dep, no JS observer churn.
- The fancy "Liquid Glass" navbar from the original is replaced by a flat,
  bordered nav. Mobile menu becomes a stack of bold colour blocks.
- The admin Skills page uses up/down arrow buttons for reordering instead of
  drag-and-drop (the original was a 1000-line single-file Vue component;
  this is a tighter, no-dep equivalent). The same `/api/admin/skills/reorder`
  endpoint is used.
