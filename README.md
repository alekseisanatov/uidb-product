# UIDB Product Browser

[Online Page Link](https://uidb-product.vercel.app/devices)

A device catalog browser built with React, powered by the [Ubiquiti UIDB](https://static.ui.com/fingerprint/ui/public.json) public API.

## Tech Stack

| Tool                         | Purpose                                   |
| ---------------------------- | ----------------------------------------- |
| Vite + React 19 + TypeScript | App framework                             |
| Zustand                      | Client state (search, filters, view mode) |
| TanStack Query               | Data fetching and caching                 |
| React Router v7              | Client-side routing                       |
| Zod                          | Runtime API response validation           |
| CSS Modules                  | Scoped component styles                   |
| Vitest + React Testing Library | Unit and component tests                |

## Getting Started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run ESLint
npm test         # run unit tests (Vitest)
```

## Project Structure

```
src/
├── components/          # Shared UI (Header, Spinner, ErrorBoundary, icons)
├── features/
│   ├── products/        # Device list feature
│   │   ├── components/  # SearchBar, FilterPanel, ViewToggle, ProductGrid, ProductList, ProductCard
│   │   └── hooks/       # useProducts, useDebounce
│   └── product-detail/  # Device detail feature
│       ├── components/  # ProductDetail
│       └── hooks/       # useProduct
├── pages/               # Route-level pages (HomePage, ProductPage, NotFoundPage)
├── store/               # useStore.ts — Zustand store
├── types/               # product.ts — Zod schemas and inferred types
├── lib/                 # api.ts, imageUrl.ts
├── App.tsx              # Router setup
└── main.tsx             # Entry point
```

## Data Flow

```
UIDB API (public.json)
  └── fetchDevices()           # lib/api.ts — fetch + Zod validation
        └── TanStack Query     # cached globally under key ["devices"]
              └── useProducts()    # features/products/hooks
                    ├── reads: Zustand (search, selectedLines)
                    ├── debounces search input (300ms)
                    ├── filters by product line and name/shortname
                    └── returns: devices, lines, counts, loading/error state
                          └── HomePage renders ProductGrid or ProductList
```

The same `["devices"]` query key is shared between `useProducts` and the `SearchBar` dropdown — TanStack Query deduplicates the request so only one network call is ever made.

## Features

### Search with Dropdown

- Typing filters the device list (debounced 300ms)
- A dropdown shows up to 5 live suggestions with the matching text underlined
- Full keyboard navigation: `Tab` / `↑` / `↓` to move between suggestions, `Enter` to navigate, `Escape` to close

### Filter Panel

- Opens as an overlay below the Filter button
- Checkboxes for each product line; multiple selections supported
- Active filters highlight items in blue
- Reset button at the bottom (dimmed when nothing is selected)

### View Toggle

- Switch between **Grid** (card layout) and **List** (table layout)
- Persisted in Zustand for the session
- List view has a sticky frosted-glass header row

### Product Detail Page

- Route: `/devices/:id`
- Shows device image (with skeleton loader), name, product line, and specs
- Previous / Next buttons navigate between devices in the current filtered list
- "See All Details as JSON" opens the raw device object in a new tab

### Pagination

- List starts at 30 items; "Load more" appends 30 more
- Resets automatically when search query or filters change

## State Management

Zustand store (`src/store/useStore.ts`) holds three pieces of state:

| State           | Type               | Description                        |
| --------------- | ------------------ | ---------------------------------- |
| `search`        | `string`           | Current search query               |
| `selectedLines` | `string[]`         | IDs of active product line filters |
| `viewMode`      | `"grid" \| "list"` | Current display mode               |

## API & Validation

- **Endpoint:** `https://static.ui.com/fingerprint/ui/public.json`
- **Validation:** Every response is parsed through a Zod schema (`UidbResponseSchema`). Invalid responses throw an error rather than silently failing.
- **Caching:** 5-minute stale time, 2 automatic retries, no refetch on window focus.

## Error Handling

- `ErrorBoundary` at the app root catches any render crash and shows a fallback UI
- `ErrorState` component is used for loading failures and empty search results
- API fetch errors and Zod validation failures surface as user-visible messages

## Tests

Run with `npm test`. Tests live next to the code they cover:

| File                                          | Covers                                                                       |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/lib/imageUrl.test.ts`                    | URL format matches the UIDB spec exactly; null fallback when `images.default` is missing |
| `src/types/product.test.ts`                   | Zod schema accepts minimal devices, preserves unknown future fields, and rejects malformed responses (the "schema may change tomorrow" requirement) |
| `src/components/Spinner/Spinner.test.tsx`     | Default and custom size rendering                                            |
| `src/components/ErrorState/ErrorState.test.tsx` | Default and custom message rendering                                       |

Vitest config lives in `vitest.config.ts` (jsdom environment, globals enabled). `src/test/setup.ts` wires up `@testing-library/jest-dom` matchers.
