# BoilerPautet

A production-ready **TypeScript Monorepo** boilerplate.

## Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Monorepo   | Turborepo + pnpm Workspaces                      |
| Language   | TypeScript (strict mode)                         |
| Backend    | Express 5 + Helmet + CORS (run with tsx)         |
| Frontend   | React 19 + Vite + React Router + Tailwind CSS v4 |
| UI         | Shadcn UI (local install in apps/web)            |
| Data       | TanStack Query v5                                |
| Database   | Drizzle ORM + PostgreSQL                         |
| Validation | Zod (shared between frontend and backend)        |
| Linting    | ESLint 9 (flat config) + Prettier                |

## Project Structure

```text
/
├── apps/
│   ├── web/              # Vite + React + React Router + Tailwind + TanStack Query
│   └── api/              # Express + Zod, linked to @repo/db and @repo/shared
├── packages/
│   ├── db/               # Drizzle ORM setup, schema, migrations
│   ├── shared/           # Shared Zod schemas and inferred TS types
│   ├── config-ts/        # Shared tsconfig (base, react, node)
│   ├── config-eslint/    # Shared ESLint configs (base, react, node)
│   └── config-tailwind/  # Shared Tailwind config
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9
- **PostgreSQL** running locally (or via Docker)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env with your PostgreSQL connection string
```

### 3. Push the database schema

```bash
pnpm db:push
```

### 4. Start development

```bash
# Start both API (port 4000) and Web (port 5173) concurrently
pnpm dev

# Or start them individually
pnpm dev:api
pnpm dev:web
```

## Scripts

| Command          | Description                       |
| ---------------- | --------------------------------- |
| pnpm dev         | Start all apps in dev mode        |
| pnpm dev:web     | Start only the web app            |
| pnpm dev:api     | Start only the API                |
| pnpm build       | Build all apps and packages       |
| pnpm lint        | Lint all packages                 |
| pnpm check-types | Type-check all packages           |
| pnpm format      | Format all files with Prettier    |
| pnpm db:generate | Generate Drizzle migrations       |
| pnpm db:migrate  | Run Drizzle migrations            |
| pnpm db:push     | Push schema directly (dev)        |
| pnpm db:studio   | Open Drizzle Studio               |
| pnpm clean       | Remove all build outputs and deps |

## Adding Shadcn UI Components

Components are installed locally inside apps/web:

```bash
cd apps/web
npx shadcn@latest add <component-name>
```
