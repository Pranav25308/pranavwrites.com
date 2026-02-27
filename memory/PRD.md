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
