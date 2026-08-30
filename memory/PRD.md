# Pranav Writes - Portfolio Website PRD

## Original Problem Statement
Pull branch 1.0.1 from https://github.com/Pranav25308/pranavwrites.com.git and convert to Next.js App Router. Update folder structure and URL paths according to App Router. Remove unnecessary files. Keep URL paths same as current structure.

## Architecture
- **Framework**: Next.js 14.2.3 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React useState/useEffect hooks
- **Database**: MongoDB (services prepared but using dummy data)

## User Personas
1. **Visitors**: View portfolio, blogs, reviews, about info, and contact
2. **Admin**: Manage content, view analytics, update settings (admin/admin)

## Core Requirements (Static)
- Home page with typing animation and recent reviews
- Review pages (Blogs, Movies, Books, Products)
- About page with skills, work experience, domains
- Contact page with form
- Admin dashboard with authentication

## What's Been Implemented
### Jan 27, 2026
- Migrated from SPA-style routing to proper App Router
- Each route now has its own `page.js` file
- Cleaned up unnecessary files:
  - `app/data/dummyData.js` (duplicate data)
  - `backend_test.py`, `test_result.md`, `tests/` (test files)
  - `.cursor/`, `.gitconfig` (IDE/git config)
  - Agent logging code removed from all components
- Updated imports to match new jsconfig paths
- Footer now uses Next.js Link for navigation
- Admin section with proper layout and sub-pages

## URL Structure (App Router)
```
/                    → Home page
/blogs               → Blog reviews
/movies              → Movie reviews
/books               → Book reviews
/products            → Product reviews
/about               → About page
/contact             → Contact form
/admin               → Admin login/dashboard
/admin/analytics     → Analytics page
/admin/users         → User roles management
/admin/settings      → Site settings
```

## Folder Structure
```
/app/frontend/
├── app/
│   ├── page.js                 # Home page
│   ├── layout.js               # Root layout with nav/footer
│   ├── globals.css             # Global styles
│   ├── about/
│   │   ├── page.js             # About page
│   │   └── data.js             # About data
│   ├── admin/
│   │   ├── page.js             # Admin dashboard/login
│   │   ├── layout.js           # Admin layout with nav
│   │   ├── data.js             # Admin data
│   │   ├── analytics/page.js   # Analytics page
│   │   ├── users/page.js       # Users page
│   │   └── settings/page.js    # Settings page
│   ├── blogs/page.js           # Blogs page
│   ├── books/page.js           # Books page
│   ├── movies/page.js          # Movies page
│   ├── products/page.js        # Products page
│   ├── contact/page.js         # Contact page
│   ├── reviews/data.js         # Shared reviews data
│   ├── config/siteSettings.js  # Site settings
│   ├── components/             # Reusable components
│   │   ├── admin/              # Admin components
│   │   ├── shared/             # Nav, Footer
│   │   └── user/               # User-facing components
│   ├── services/               # API service functions
│   └── lib/db.js               # Database connection
├── components/ui/              # shadcn/ui components
├── hooks/                      # Custom hooks
├── lib/utils.js                # Utility functions
└── package.json
```

## Prioritized Backlog
### P0 (Must Have)
- ✅ App Router migration
- ✅ All routes working

### P1 (Should Have)
- Connect services to actual MongoDB
- Add real content management
- Implement proper admin authentication (JWT)

### P2 (Nice to Have)
- SEO optimization with metadata
- Image optimization
- Analytics tracking
- Email notifications for contact form

## Next Tasks
1. Consider adding SEO metadata to each page
2. Connect MongoDB services for persistent data
3. Add content management for blogs/reviews
4. Implement proper authentication system

### June 23, 2026 - Chatbot Widget & Env Fixes (prev session)
- Pulled branch 1.0.1; fixed `@/components/user/Home` path alias (tsconfig) and browserslist warning
- Added theme-aware floating ChatbotWidget (user pages only) with admin toggle (localStorage via `hooks/useSiteSettings.js`)
- Fixed preview Bad Gateway with supervisor wrappers: `/app/frontend/package.json` (Next.js on 3000) and `/app/backend/server.py` (FastAPI proxy on 8001). DO NOT DELETE these wrappers
- Fixed chatbot overlapping footer using IntersectionObserver

### June 23, 2026 - About Page Content Update
- Domain Expertise: removed "Gen AI", added "Streaming Media Pipeline" (ingest, transcoding, packaging, DRM, AWS Media Services)
- Skills updated to: Roku, Python, AWS Media Services, DRM, REST API, SQL, DSA, Kafka, Debugging
- Added Cloud/Lock/Bug icons to iconMaps (About.js, admin skills page) and ICON_OPTIONS
- Bumped skills localStorage key `pranav_skills_v1` → `pranav_skills_v2` so new defaults apply for all visitors
- Files: `app/about/data.js`, `app/services/aboutService.js`, `components/user/About.js`, `lib/skills-store.js`, `app/admin/manage/skills/page.js`
- Verified via screenshots on /about

### June 23, 2026 - SEO Metadata
- Root layout: metadataBase (pranavwrites.com), title template, keywords, OpenGraph, Twitter card, robots
- Per-route metadata via new layout.js: /about, /contact, /blogs, /movies, /books, /products
- Dynamic generateMetadata on all 4 [id] detail pages (title, description, canonical, OG image/article)
- Added app/sitemap.js (sitemap.xml) and app/robots.js (robots.txt, disallows /admin and /api)
- Verified titles/OG tags/sitemap/robots via curl on all routes

### June 23, 2026 - Projects Menu Item
- Added "Projects" nav link in PublicNav (between Recommendations and About)
- New /projects page with themed "Projects Coming Soon" placeholder card + SEO metadata layout
- Added /projects to sitemap; verified nav click + page render via screenshot

### June 23, 2026 - Monetization Prep (Ads + Privacy)
- New reusable `components/shared/AdSlot.js`: shows themed "Advertisement" placeholder until AdSense client ID is set in `app/config/siteSettings.js` (`ads.adsenseClientId`); auto-loads adsbygoogle script + real ad units once set
- Placed AdSlots on review listing pages (below grid) and review detail pages (below article)
- New /privacy page (10-section policy incl. cookies/AdSense disclosure, AdSense-approval ready) with SEO layout; linked from footer bottom bar next to Admin Access; added to sitemap
- Verified via screenshots: ad placeholders render on /blogs and /blogs/1, privacy page renders, footer link navigates correctly

### June 2026 - MongoDB Migration (MAJOR)
- All static/dummy content removed; site now fully DB-driven (MongoDB local: mongodb://localhost:27017, db `portfolio_db`, env in `/app/.env.local`)
- Collections: `reviews` (blogs/movies/books/products + likes/dislikes), `contacts` (real contact form messages), `settings` (navbar toggles incl. projects/contact, chatbot, adsenseClientId), `visits` (real page-visit events)
- API routes (Next.js route handlers): /api/reviews (CRUD + ?type/?limit), /api/reviews/[id], /api/reviews/[id]/reaction (like/dislike with vote-switch, clamped ≥0), /api/messages (+[id] PATCH read/DELETE), /api/settings (GET/PUT merged with defaults), /api/visits (POST track / GET aggregated stats)
- Admin panel: full CRUD Manage for Blogs/Movies/Books/Products (Skills REMOVED from menu + files deleted); real Messages (read/unread, delete); real Visits & Analysis dashboards; Settings persist to DB incl. AdSense ID field
- Public: listing pages fetch from DB (loading + empty states), detail pages are server components (DB fetch + dynamic SEO metadata), contact form saves to DB, visit tracking on route change (visitorId in localStorage), navbar/chatbot/ads driven by DB settings
- Like/Dislike ReactionBar on BLOG detail pages only (optimistic UI, localStorage dedup, animated pills)
- Roles remain static in code (user decision); About page skills/domains static in code (use-skills/skills-store deleted)
- Key server helper: `app/lib/reviews-server.js` (serializeReview, getReviewById)
- TESTED: testing agent iteration_1 — 15/15 backend pytest, all UI flows pass; 2 minor findings fixed (setState-in-render warning via queueMicrotask defer in useSiteSettings; DB_NAME fallback removed from db.js)
- Backend test suite: /app/backend/tests/backend_test.py

### Pending Backlog (from chatbot session)
- P1: Connect chatbot to real AI (Emergent LLM Key) — USER REQUIREMENT (Jun 2026): chatbot must answer ONLY from portfolio content (about/bio, skills, domains, work experience, blogs/reviews, projects). Out-of-scope questions get a polite refusal redirecting to portfolio topics. User said "we will get back to it later" — do NOT implement until user asks.
- P2: Persist site settings (chatbot visibility) server-side in MongoDB
- P2: Ctrl+K command palette for admin navigation

### Jan 27, 2026 - Admin Panel Fix
- Fixed admin navbar not showing after login
- Created NavigationWrapper component to conditionally show user/admin navigation
- Admin routes (`/admin/*`) now show only admin navbar
- User routes show public navbar and footer
- Login now properly reloads page to update layout state
- Admin dashboard shows quick overview with stats cards
