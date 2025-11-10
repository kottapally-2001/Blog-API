# Blog API (Express + Prisma + PostgreSQL)

**Auth:** JWT in Authorization header (Bearer <token>)

**Roles:** USER, ADMIN (only ADMIN can manage posts/comments)

### Endpoints
- `POST /api/auth/login` -> { token, user }
- `POST /api/auth/register` (ADMIN only)
- `GET /api/posts` public published posts
- `GET /api/posts/:slug` public single post + comments
- `GET /api/posts/admin/all` (ADMIN)
- `POST /api/posts/admin` (ADMIN)
- `PUT /api/posts/admin/:id` (ADMIN)
- `PATCH /api/posts/admin/:id/publish` (ADMIN)
- `DELETE /api/posts/admin/:id` (ADMIN)
- `POST /api/comments/:slug` public create comment on a published post
- `DELETE /api/comments/admin/:id` (ADMIN)

### Setup
1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `JWT_SECRET`, origins.
2. Install deps: `npm i`
3. Generate client & migrate: `npx prisma generate && npx prisma migrate dev --name init`
4. Seed: `npm run seed`
5. Run: `npm run dev`

### Test with curl
Login (seeded admin):
```bash
curl -s -X POST http://localhost:4000/api/auth/login   -H 'Content-Type: application/json'   -d '{"email":"admin@example.com","password":"admin123"}'
```
Create post (replace TOKEN):
```bash
curl -s -X POST http://localhost:4000/api/posts/admin   -H 'Authorization: Bearer TOKEN' -H 'Content-Type: application/json'   -d '{"title":"Hello","content":"World","published":false}'
```
List public posts:
```bash
curl -s http://localhost:4000/api/posts
```
