# JSS Innovative Solutions — Website + Employee Portal

A single Next.js application that serves both:

1. **The public marketing website** — Home, About, Services, Portfolio,
   Contact, Careers.
2. **The Employee Portal** (`/portal`, behind `/login`) — a real, database-backed
   attendance and task-management system with two roles: **Owner** and
   **Employee**.

Everything runs from one codebase and deploys as one app.

---

## Tech stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js 16 (App Router) + React 19 |
| Styling    | Tailwind CSS v4 |
| Database   | MySQL, via **Prisma ORM** |
| Auth       | Signed JWT session cookie (httpOnly), password hashing with **bcrypt** |
| Charts     | Recharts |
| Email      | Nodemailer (any SMTP provider) — optional, best-effort |

No plaintext passwords are ever stored or returned by any API — everything
goes through `bcryptjs`, and `passwordHash` is stripped before a user object
is ever sent to the browser (`lib/auth.ts` → `toSafeUser`).

---

## 1. Prerequisites

- Node.js 20+
- A MySQL 8+ database (MariaDB 10.3+ also works). Options:
  - MySQL installed on your own server/VPS (e.g. Contabo) — `sudo apt install mysql-server` on Ubuntu/Debian
  - A managed MySQL provider (Railway, Aiven, PlanetScale, etc.) if you'd rather not manage the server yourself
- If your app runs somewhere *other* than the MySQL server itself (e.g. temporarily
  on Vercel while your VPS is still MySQL's home), MySQL needs to accept remote
  connections — see the callout in section 5.

---

## 2. Local setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```bash
DATABASE_URL="mysql://user:password@host:3306/jss_web"
JWT_SECRET="<a long random string — e.g. `openssl rand -base64 48`>"

OWNER_NAME="Your Name"
OWNER_EMAIL="owner@yourcompany.in"
OWNER_PASSWORD="a-strong-first-password"

OFFICE_LAT="18.5793"      # used only as the seed default — editable later
OFFICE_LNG="73.8143"      # from the Owner's Settings → Office location page
OFFICE_RADIUS_METERS="200"

# Optional — contact-form email notifications. Leave blank to skip emails
# (the form still saves to the database either way).
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM="JSS Innovative Solutions <no-reply@yourcompany.in>"
CONTACT_NOTIFY_TO="sales@yourcompany.in"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Push the schema to your database and seed the first Owner account:

```bash
npx prisma db push      # creates all tables from prisma/schema.prisma
npm run db:seed         # creates the Owner account, default office settings,
                         # and the default website content (hero, services, etc.)
```

> `npm install` also runs `prisma generate` automatically (via the
> `postinstall` script) to generate the typed Prisma Client — this requires
> normal internet access to download Prisma's query engine, so run it on a
> machine/CI with unrestricted network access, not behind a strict firewall.

Run the dev server:

```bash
npm run dev
```

- Public site: `http://localhost:3000`
- Login: `http://localhost:3000/login` — sign in with the `OWNER_EMAIL` /
  `OWNER_PASSWORD` you set above.

For production-grade schema changes going forward, prefer migrations over
`db push`:

```bash
npx prisma migrate dev --name init
```

---

## 3. Project structure

```
app/
  (marketing)/          Public site — shares Navbar/Footer via its layout
    page.tsx            Home
    about/  services/  portfolio/  contact/  careers/
  login/                 Standalone login screen
  portal/                Employee Portal — protected by middleware.ts
    page.tsx             Dashboard (role-aware)
    employees/           Owner: manage employees
    employees/[id]/      Owner: one employee's attendance/tasks/leave history
    tasks/                Task list (owner: assign+manage; employee: update status)
    leaves/               Leave requests (owner: approve/reject; employee: request)
    attendance/           Clock in/out (employee) or browse+export (owner)
    settings/             Change own password
    settings/office/      Owner: office GPS + geofence radius
  api/                    All backend logic — every route re-checks auth+role
components/
  marketing/             Navbar, Footer, ContactForm, CareersApplyForm
  portal/                Sidebar shell, dashboard, all portal screens
  ui/                    Shared marketing UI primitives
lib/
  prisma.ts              Prisma Client singleton
  jwt.ts                 Edge-safe session signing/verification (used by middleware)
  auth.ts                Password hashing + session reading (Node-only, server-only)
  geo.ts                 Haversine distance for the geofence check
  site-sections.ts       Zod schema + defaults for every editable website section
  site-content-db.ts     Reads/writes those sections from the SiteContent table
  activity.ts / mailer.ts / date.ts / types.ts
middleware.ts            Blocks unauthenticated access to /portal/* at the edge
prisma/
  schema.prisma          Full data model
  seed.ts                Creates the first Owner account, default office settings,
                        and the default website content rows
```

---

## 4. How auth & the geofence actually work

- **Sessions**: on login, the server signs a JWT (HS256, `jose`) containing
  `{ sub, role, name, email }` and sets it as an httpOnly, `SameSite=Lax`
  cookie. `middleware.ts` verifies that JWT on every request to `/portal/*`
  and redirects to `/login` if it's missing or invalid — this runs on the
  server/edge, so it can't be bypassed by hiding a button in the UI.
- **Role checks**: every API route calls `getCurrentUser()` (which re-reads
  the user from the database, not just the JWT, so a deactivated account is
  locked out immediately) and explicitly checks `role === "OWNER"` where
  needed. The middleware also blocks a few owner-only page paths outright.
- **Geofenced clock-in**: the employee's browser calls the Geolocation API to
  get `{ lat, lng }`, which is sent to `POST /api/attendance/clock-in`. The
  server computes the great-circle distance to `OfficeSettings` (stored in
  the database, editable from **Settings → Office location**) and rejects
  the request if it's outside `radiusMeters`. The radius and coordinates are
  never hardcoded in application code.

---

## 5. Deploying to production

A key thing to understand: **the domain you point at your app, the server
that runs the app's code, and the database that holds your data are three
independent pieces.** Moving the running app from Vercel to your own VPS
later doesn't lose any data, as long as both point at the same
`DATABASE_URL` — the database doesn't know or care which server is asking.

### Option A — Vercel (what this project is currently running on)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add every variable from `.env` in **Project → Settings → Environment
   Variables** — paste each value into its own field individually. Copying
   multiple lines from `.env` at once into a single field is the most common
   way this breaks (a trailing comment or the next line's key gets stuck
   onto the end of the value).
4. Deploy. Vercel runs `npm install` (which runs `prisma generate`) and
   `npm run build` automatically.
5. Run the schema push/seed **once**, pointed at the production database,
   from your local machine:
   ```bash
   DATABASE_URL="<production-url>" npx prisma db push
   DATABASE_URL="<production-url>" OWNER_EMAIL=... OWNER_PASSWORD=... npm run db:seed
   ```

**If your MySQL server lives on a different machine than Vercel** (e.g. on
your Contabo VPS, while the app itself runs on Vercel), MySQL must accept
remote connections for this to work at all:
- In `/etc/mysql/mysql.conf.d/mysqld.cnf` (Ubuntu/Debian), make sure
  `bind-address` is not locked to `127.0.0.1`.
- The MySQL user in your `DATABASE_URL` needs host `'%'` (or Vercel's IP
  ranges) rather than only `'localhost'` — e.g.
  `CREATE USER 'jss_web'@'%' IDENTIFIED BY '...';` then grant it privileges
  on the `jss_web` database.
- Your VPS firewall (`ufw`, or Contabo's control-panel firewall) needs port
  `3306` open, at least to Vercel.
- Using the MySQL `root` user over the open internet (as in the earlier
  example) isn't a great idea long-term — create a dedicated user scoped to
  just the `jss_web` database once things are working.

### Option B — Your own VPS (e.g. Contabo), long-term

This runs the Next.js server directly with Node, behind Nginx for TLS and
the domain.

1. **SSH in and install Node 20+** (via [nvm](https://github.com/nvm-sh/nvm)
   or your distro's package manager) and MySQL if it's not already there.
2. **Get the code onto the server** — `git clone` your repo, or `scp`/upload
   it.
3. **Set up `.env`** on the server the same way as local setup (section 2),
   with `DATABASE_URL` pointing at MySQL. If MySQL is on the same machine,
   use `host: 127.0.0.1` or `localhost` in the connection string — no remote
   access or firewall changes needed in that case.
4. **Install, generate, build:**
   ```bash
   npm install
   npx prisma db push
   npm run db:seed      # skip if this VPS reuses a database you've already seeded
   npm run build
   ```
5. **Keep it running** with a process manager, so it survives SSH
   disconnects and restarts after a crash or reboot:
   ```bash
   npm install -g pm2
   pm2 start npm --name jss-web -- start
   pm2 save
   pm2 startup          # follow the printed instructions to enable on boot
   ```
   By default this listens on port 3000.
6. **Put Nginx in front of it** as a reverse proxy, so the public internet
   talks to port 80/443 and Nginx forwards to Node on port 3000:
   ```nginx
   server {
     listen 80;
     server_name www.jss.com jss.com;
     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```
7. **Get HTTPS** with Certbot (`sudo apt install certbot python3-certbot-nginx`,
   then `sudo certbot --nginx -d www.jss.com -d jss.com`). This is not
   optional — the browser's Geolocation API (used for clock-in/out) refuses
   to run at all on plain HTTP.
8. **Point your domain at the VPS**: at your domain registrar, set an `A`
   record for `www.jss.com` (and `jss.com`) to your VPS's IP address.

### Moving from Vercel to the VPS later
Deploy the same code to the VPS using Option B. If you keep using the exact
same `DATABASE_URL`, every Owner/employee account, attendance record, task,
and every edit made from **Website content** shows up immediately — nothing
to migrate. Only point `www.jss.com`'s DNS at the VPS once you've confirmed
it's working (visit it by IP address first), then it takes over from
Vercel as the live site.

---

## 6. First-login checklist for the Owner

1. Sign in at `/login` with the seeded `OWNER_EMAIL` / `OWNER_PASSWORD`.
2. Go to **Settings → Change password** and set a real password.
3. Go to **Settings → Office location** and set the real office GPS
   coordinates (use "Use my current location" while standing at the office)
   and the geofence radius.
4. Go to **Employees → Add employee** to create accounts — a temporary
   password is generated and shown once; hand it to the employee and ask
   them to change it from their own Settings page after first login.
5. Go to **Website content** to edit every piece of public-site copy —
   hero headline, stats, services, values, why-choose-us, industries,
   portfolio case studies, and careers listings — without touching code.
   Changes go live immediately (the public pages read fresh from the
   database on every request, no rebuild or redeploy needed).

---

## 6a. Editing the public website from the portal

The **Website content** section (Owner only) at `/portal/website` covers
every editable piece of marketing copy in one place:

- Company & contact details (name, tagline, phone, email, address, socials)
- Homepage hero (headline, subheadline, CTA button text, the stats banner)
- Homepage slider (slides with a title, text, optional background image and button)
- About page (who-we-are copy, vision, mission, leadership bio)
- Products & Solutions (the nav dropdown items and Services-page cards)
- Core services grid, Core values, Why choose us, Industries served
- Portfolio / case studies
- Careers / open positions (also feeds the position dropdown on the
  application form)
- The detailed module breakdown on the Services page

Under the hood, all of this lives in one `SiteContent` table — one row per
section, storing structured JSON validated against a zod schema (see
`lib/site-sections.ts`). That file is also the single place to add a new
editable section in the future: add a schema, a default, and an entry in
`SECTION_KEYS`, and both the admin UI and public pages pick it up. Every
public marketing page fetches its content directly from the database on
each request — there's no cache to bust and no rebuild step after an edit.

### Homepage slider & image uploads

**Portal → Website content → Homepage slider** controls the slider under the
hero. Each slide can have a title, text, a background image, and a button
(text + link) — all optional, but a slide needs at least one of title / text /
image. Reorder with the arrows, delete with the bin icon. Delete every slide
and the slider disappears from the homepage. It autoplays (pausing on
hover/focus and for visitors with "reduce motion" on), and supports arrows,
dots, swipe and the keyboard arrow keys.

Images can be **uploaded** (JPG/PNG/WebP/GIF, max 4 MB) or pasted as a link.
Uploads are shrunk in the browser first (max 1920px wide, re-encoded as WebP),
then stored in the database (`MediaAsset` table) and served from `/media/<id>`.
Keeping them in the database means uploads work the same on Vercel (read-only
filesystem) and on your own server, with nothing else to configure. Adding
this feature needs one extra table, so run `npx prisma db push` once against
your database after updating. If you ever raise the upload size limit, MySQL's
`max_allowed_packet` must be larger than the biggest image.

**Why this actually works:** every file under `app/(marketing)/` exports
`export const dynamic = "force-dynamic";`. Without that line, Next.js's App
Router treats a page with no per-request API calls (no `cookies()`,
`headers()`, etc.) as safe to statically render once at build time and
cache forever — which would mean content edited from the portal never
shows up until the next deploy, even though the database itself updated.
`force-dynamic` tells Next to re-render that page from scratch on every
request instead. If you ever add a new marketing page, copy that same line
into it.


---

## 7. Notes & honest caveats

- **SEO**: every marketing page has per-page metadata; `/sitemap.xml` and
  `/robots.txt` are generated automatically and exclude `/portal`, `/login`
  and `/api`.
- **Email**: the contact form and job-application form always save to the
  database regardless of SMTP configuration. Email notification is
  best-effort on top — if `SMTP_*` env vars are missing, the app simply
  skips sending and logs nothing broken.
- **CSV export**: `Settings → Attendance → Export CSV` (Owner) streams a CSV
  with per-day clock-in/out times and computed hours for any date range —
  ready to hand to payroll.
- This project was built and reviewed without a live MySQL connection
  available in the build environment, so while every route, schema
  relationship and query was written and reviewed carefully by hand, you
  should still run through the first-login checklist above end-to-end after
  your first deploy to confirm everything behaves as expected in your
  environment.
