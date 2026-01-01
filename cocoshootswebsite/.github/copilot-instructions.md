# CocoShoots Website - AI Coding Agent Instructions

## Project Overview
CocoShoots is a **Next.js 16 photography gallery web application** with MongoDB persistence, dark/light theme support, and multi-page content (Blog, Team, FAQ, Profile, etc.). It uses **App Router**, TypeScript, Tailwind CSS, and client-side theme switching via `next-themes`.

## Architecture & Key Patterns

### Tech Stack
- **Framework**: Next.js 16 (App Router with `(pages)` grouping)
- **Database**: MongoDB + Mongoose (single model: `Photo` schema with username, title, color, caption, createdAt)
- **Styling**: Tailwind CSS v4 + custom CSS (e.g., [app/ui/components/styles/](app/ui/components/styles/))
- **Theme**: `next-themes` for dark/light mode (configured in [app/theme-provider.tsx](app/theme-provider.tsx))
- **Icons**: Lucide React
- **HTTP Client**: Axios

### File Structure & Conventions
- **Pages**: All pages live in `app/(pages)/PageName/page.tsx` (Route Groups pattern)
- **API Routes**: `app/api/{endpoint}/route.ts` (POST to `/api/Photo` saves photo arrays)
- **Reusable Components**: `app/ui/components/` (e.g., calendar, menuicon, switch.tsx)
- **Server Utils**: [app/utils/server-utils.ts](app/utils/server-utils.ts)
- **Database**: [lib/database.ts](lib/database.ts) handles Mongoose connection with MONGODB_URI env var

### Client vs Server Components
- **Root Layout** ([app/layout.tsx](app/layout.tsx)): Marked `'use client'` (non-standard but intentional)
- **Provider Wrapper** ([app/theme-provider.tsx](app/theme-provider.tsx)): `'use client'` for theme context
- **Header** ([app/ui/header.tsx](app/ui/header.tsx)): `'use client'` with mobile menu, theme toggle, and user dropdown logic
- **Pages**: Generally `'use client'` for interactivity (e.g., [app/page.tsx](app/page.tsx), [app/(pages)/Feedback/page.tsx](app/(pages)/Feedback/page.tsx))

### Database & API Pattern
- **Connection**: [lib/database.ts](lib/database.ts) exports `connectDB()` and `connectToDatabase()`
- **Model**: [models/Photo.ts](models/Photo.ts) — Mongoose schema with `username`, `title`, `color`, `caption`, `createdAt`
- **API Endpoint** ([app/api/Photo/route.ts](app/api/Photo/route.ts)): `POST /api/Photo` accepts `{ username, photos[] }`, saves to MongoDB, returns `201` with saved data
- **Auth Endpoints**: `/api/auth` and `/api/users` exist but not documented—check implementation before modifying

### Theme System
- **Provider**: [app/theme-provider.tsx](app/theme-provider.tsx) wraps app with `next-themes` (class-based dark mode)
- **Toggle Component**: `InlineSwitch()` in [app/ui/header.tsx](app/ui/header.tsx) (switch role, accessible)
- **Colors**: Dark mode uses `#D2532B` (orange) for accent; light mode uses slate-700

## Development Workflows

### Local Development
```bash
pnpm install  # Install dependencies
npm run dev   # Start dev server on http://localhost:3000
npm run build # Production build
npm run start # Run production build
npm run lint  # Run ESLint
```

### Environment Variables
Create `.env.local`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
```

### Current Issues
- Terminal exit code 1 on `npm run dev` — likely missing `.env.local` or MONGODB_URI misconfiguration
- Check `mongoose.connect()` logs in [lib/database.ts](lib/database.ts) for connection errors

## Code Patterns & Examples

### Adding a New Page
1. Create `app/(pages)/NewPage/page.tsx` with `'use client'` directive
2. Use `Header` component for navigation (imported in [app/layout.tsx](app/layout.tsx))
3. Wrap content in `<main>` (layout handles max-width, padding, dark mode class)

### Form Submission with Photo Upload
- Reference [app/page.tsx](app/page.tsx) lines 70–150 (form state, validation)
- POST to `/api/Photo` with `{ username, photos: [{title, color, caption}] }`
- Handle response: `201` = success, `500` = error

### Mobile Menu Interaction
- [app/ui/header.tsx](app/ui/header.tsx) uses `useRef` + `useEffect` for click-outside detection
- States: `open`, `userOpen`, `navDropdownOpen`, `AboutusDropdownOpen`, `MoreDropdownOpen`
- Each dropdown is managed separately to prevent conflicts

### Component Styling Strategy
- **Tailwind Classes**: Primary approach (e.g., `bg-white dark:bg-black`, `text-black dark:text-white`)
- **Custom CSS**: [app/ui/components/styles/](app/ui/components/styles/) for complex layouts (e.g., blogcard.css, calendar.css)
- **Theme Variables**: Dark mode controlled by `html[class="dark"]` (next-themes convention)

## Integration Points

### Mongoose Connection Reliability
- Call `connectDB()` before querying in API routes (async)
- Connection state checked in [lib/database.ts](lib/database.ts) with `mongoose.connection.readyState`
- Database name: `cocoshootsdb`

### Axios Usage
- Imported in [app/page.tsx](app/page.tsx) but not shown in snippet—use for `/api/Photo` calls
- Standard usage: `axios.post('/api/Photo', { username, photos })`

## Critical Gotchas & Conventions

1. **Layout Marker**: Root layout is `'use client'` (usually not recommended)—maintain this for theme provider cascade
2. **Route Groups**: Pages use `(pages)/` directory to keep URL clean (no `/pages/` prefix in routes)
3. **Database Env**: MONGODB_URI must include `?retryWrites=true&w=majority` query params for Mongoose
4. **Photo Model**: No userId/auth yet—username is string field (not linked to users table)
5. **Tailwind Config**: Uses `@tailwindcss/postcss` v4 (newer syntax)—check TW docs for v4-specific behavior

## When Debugging or Adding Features

- **Network Issues**: Check `.env.local`, restart dev server (`npm run dev`)
- **Type Errors**: Run `npm run lint` to catch TypeScript issues
- **Database Errors**: Check MongoDB Atlas connection string and IP whitelist
- **Dark Mode Issues**: Verify `html` element has `class="dark"` attribute (next-themes handles this)
- **API 500 Errors**: Add try-catch logging in [app/api/Photo/route.ts](app/api/Photo/route.ts) to debug MongoDB insertMany failures

