# Valentine-Embrace

## Overview

Valentine-Embrace is a playful, romantic Valentine's Day web application. It presents the user with a "Will you be my Valentine?" question featuring two buttons: "Yes" and "No." The "No" button dodges away or shrinks while the "Yes" button grows larger with each "No" click, making it increasingly hard to refuse. Upon clicking "Yes," the app celebrates with confetti, floating hearts, and transitions to a celebration page with a photo gallery, animations, and background music. User responses (accepted/rejected, number of "No" clicks) are recorded in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project uses a single repository with three main directories:
- **`client/`** — React frontend (SPA)
- **`server/`** — Express backend (API server)
- **`shared/`** — Shared types, schemas, and route definitions used by both client and server

### Frontend (`client/src/`)
- **Framework:** React with TypeScript, bundled by Vite
- **Routing:** `wouter` for lightweight client-side routing (two pages: `/` Landing, `/valentine` Celebration)
- **Styling:** Tailwind CSS with CSS variables for a rose-pink romantic theme. Custom fonts: "Architects Daughter" (display) and "Nunito" (body)
- **UI Components:** shadcn/ui component library (new-york style) built on Radix UI primitives, stored in `client/src/components/ui/`
- **Animations:** Framer Motion for floating hearts, button scaling, and page transitions
- **Confetti:** `canvas-confetti` for celebration effects
- **State Management:** TanStack React Query for server state; local React state for UI interactions
- **Data Fetching:** Custom `apiRequest` helper and React Query mutations via `use-response.ts` hook
- **Path aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend (`server/`)
- **Framework:** Express.js running on Node with TypeScript (via `tsx`)
- **API Routes:** Minimal REST API defined in `server/routes.ts`:
  - `POST /api/response` — Record a valentine response (accepted, noClickCount, responderName)
  - `GET /api/response/stats` — Retrieve all responses
- **Route Contracts:** Shared route definitions with Zod validation in `shared/routes.ts` ensure type safety between client and server
- **Storage Layer:** `server/storage.ts` implements `IStorage` interface using `DatabaseStorage` class — abstraction layer over the database
- **Dev Server:** Vite dev middleware served through Express in development (`server/vite.ts`); static files served in production (`server/static.ts`)

### Database
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Schema:** Defined in `shared/schema.ts` — single table `responses` with columns: `id`, `responder_name`, `accepted`, `no_click_count`, `created_at`
- **Validation:** `drizzle-zod` generates Zod schemas from Drizzle table definitions
- **Connection:** `pg` Pool using `DATABASE_URL` environment variable
- **Migrations:** Drizzle Kit configured in `drizzle.config.ts`, migrations output to `./migrations`. Use `npm run db:push` to push schema changes

### Build Process
- **Development:** `npm run dev` runs `tsx server/index.ts` with Vite HMR middleware
- **Production Build:** `npm run build` runs `script/build.ts` which:
  1. Builds the client with Vite (outputs to `dist/public/`)
  2. Bundles the server with esbuild (outputs to `dist/index.cjs`), externalizing most deps but bundling commonly-used ones for faster cold starts
- **Production Start:** `npm run start` runs the bundled `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection via `DATABASE_URL` environment variable. Used through `pg` Pool and Drizzle ORM.

### Key NPM Packages
- **drizzle-orm / drizzle-kit / drizzle-zod** — ORM, migration tooling, and Zod schema generation
- **express** — HTTP server framework
- **@tanstack/react-query** — Server state management on the client
- **framer-motion** — Animation library for React
- **canvas-confetti** — Confetti celebration effects
- **wouter** — Lightweight client-side router
- **zod** — Runtime schema validation (shared between client and server)
- **shadcn/ui + Radix UI** — Component library primitives (numerous `@radix-ui/*` packages)
- **connect-pg-simple** — PostgreSQL session store (available but not actively used for sessions currently)

### External Services
- **Google Fonts** — "Architects Daughter" and "Nunito" fonts loaded via CDN
- **SoundHelix** — Background music loaded from `soundhelix.com` (placeholder instrumental track)

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (development only)
- `@replit/vite-plugin-dev-banner` — Dev banner (development only)