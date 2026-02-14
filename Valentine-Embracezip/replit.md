# Valentine-Embrace

## Overview

Valentine-Embrace is a playful, romantic Valentine's Day web application. It presents the user with a "Will you be my Valentine?" question featuring two buttons: "Yes" and "No." The "No" button dodges or changes position when clicked, while the "Yes" button grows larger with each "No" click, making it increasingly hard to refuse. Once the user clicks "Yes," confetti celebrates the moment and they're taken to a Valentine celebration page with floating hearts, a photo gallery, and background music. Responses (accepted/rejected, number of "No" clicks) are recorded in a PostgreSQL database.

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
- **Production Start:** `npm start` runs `node dist/index.cjs`

### Key Design Decisions
- **Shared route contracts** between frontend and backend ensure API type safety without code generation
- **Storage interface pattern** (`IStorage`) in the backend allows swapping storage implementations
- **SPA with server-side fallback** — all unmatched routes serve `index.html` for client-side routing
- **Background music** auto-plays on first user interaction with a toggle button

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection string must be set in `DATABASE_URL` environment variable
- **Drizzle ORM** — Query builder and schema management
- **`connect-pg-simple`** — Available for session storage (currently unused but in dependencies)

### Key Frontend Libraries
- **React 18** with **Vite** bundler
- **TanStack React Query** — Server state management
- **Framer Motion** — Animations
- **canvas-confetti** — Confetti effects
- **shadcn/ui + Radix UI** — Component library
- **wouter** — Client-side routing
- **Tailwind CSS** — Utility-first styling
- **Zod** — Runtime validation (shared between client and server)

### Key Backend Libraries
- **Express.js** — HTTP server
- **Drizzle ORM + pg** — Database access
- **drizzle-zod** — Schema-to-validation bridge
- **tsx** — TypeScript execution for development

### External Services
- **Google Fonts** — "Architects Daughter" and "Nunito" fonts loaded via CDN
- **SoundHelix** — Background music loaded from `soundhelix.com` (placeholder instrumental track)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` — Dev tools (loaded only in Replit dev environment)