# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (Next.js config)
```

No test suite is configured.

## Architecture

**Next.js 14 App Router** blog powered by **Hygraph (GraphCMS)** as a headless CMS. All content comes from Hygraph via GraphQL — there is no local database, no auth, and no admin UI in this repo.

### Data Flow

1. **`service/`** — raw GraphQL queries using `graphql-request`. Each file exports async functions (e.g., `getBlogs()`, `getDetailedBlog(slug)`). Queries hit `NEXT_PUBLIC_GRAPHCMS_ENDPOINT`. Use React's `cache()` for deduplication within a request.
2. **`actions/`** — Next.js Server Actions wrapping service calls (e.g., `searchBlogsAction`). Import with `"use server"`.
3. **Route pages** — call service functions directly (RSC) or call server actions from client components.

### Routing

Uses a route group `app/(root)/` with a shared layout (Navbar + Footer). All public pages live inside this group:

- `/` → `(home)/page.tsx` — last 4 posts
- `/blogs` → listing (grid)
- `/blogs/[slug]` → single post, HTML content rendered via `@tailwindcss/typography` (`prose` class)
- `/blogs/archive` — posts grouped by year
- `/author/[id]`, `/category/[slug]`, `/tags/[slug]` — filtered listings
- `/contact` — form that POSTs to Telegram Bot API
- `/about` — static page

### Component Layers

- **`components/ui/`** — shadcn/ui primitives (Radix-based). Do not edit these manually; use the shadcn CLI.
- **`components/cards/`** — blog, author, category, search result cards.
- **`components/forms/`** — contact and email forms (React Hook Form + Zod).
- **`app/(root)/_components/`** — layout-scoped components: Navbar, Footer, search dialog, mobile drawer.
- **`components/providers/`** — ThemeProvider (next-themes).

### Styling

Tailwind CSS with dark mode via `class` strategy. Colors are HSL CSS variables (`--background`, `--foreground`, etc.) defined in `globals.css`. The `@tailwindcss/typography` plugin renders blog HTML content — wrap content in `<article className="prose dark:prose-invert">`.

### External Integrations

| Service | Env var | Purpose |
|---|---|---|
| Hygraph GraphQL | `NEXT_PUBLIC_GRAPHCMS_ENDPOINT`, `HYGRAPH_ASSET_TOKEN` | All blog content |
| Telegram Bot | `NEXT_PUBLIC_TELEGRAM_BOT_API`, `NEXT_PUBLIC_TELEGRAM_CHAT_ID` | Contact form submissions |

Images from Hygraph CDN (`us-west-2.graphassets.com`) are whitelisted in `next.config.js`.

### Types

Shared TypeScript interfaces are in `types/index.ts`: `IBlog`, `IAuthor`, `IArchivedBlogs`, `ICategoryAndTags`, `ChildProps`. Import from `@/types`.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).
