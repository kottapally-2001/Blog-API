# Blog Platform Monorepo

- **Server:** Express + Prisma + PostgreSQL, JWT auth
- **Public UI:** vanilla HTML/JS + Tailwind CDN
- **Admin UI:** vanilla HTML/JS + Tailwind CDN

## Quick Start

### 1) PostgreSQL
Create database `blog_platform` in Postgres:
```sql
CREATE DATABASE blog_platform;
```

### 2) Server
```bash
cd server
cp .env.example .env   # edit DATABASE_URL & JWT_SECRET
npm i
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```
API at `http://localhost:4000/api`.

### 3) Static UIs
Serve locally so CORS origins match (adjust ports or server .env as needed):
```bash
npx serve -p 5173 public-client
npx serve -p 5174 admin-client
```

## Accounts
Seeded admin: `admin@example.com` / `admin123`

## Notes
- JWT sent via `Authorization: Bearer <token>` stored in `localStorage` in admin UI.
- Comments require `authorName` (email optional).
- Posts support `published` toggle; unpublished are hidden from public UI.
