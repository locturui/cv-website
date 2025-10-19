# 📄 CV Website

A clean, responsive portfolio site built with **Nuxt 3**, **Vue 3**, **Tailwind CSS 4** and **DaisyUI 5**.
It comes pre‑wired with scroll animations (AOS), crisp SVG icons from lucide‑vue‑next, and a REST API powered by Nuxt Nitro.

![screenshot of home page](https://github.com/user-attachments/assets/d6c414dd-60d6-40e8-9b8e-8f88dc06c81b)

---

## 🛠 Tech Stack

* **Frontend:** Nuxt 3, Vue 3, TypeScript
* **Styling:** Tailwind CSS 4, DaisyUI 5
* **Backend:** Nuxt Nitro (server API)
* **Database:** PostgreSQL, Drizzle ORM
* **Animation:** AOS
* **Icons:** lucide‑vue‑next 
* **Tooling:** pnpm, Vite
* **Deployment:** Vercel (with Vercel Postgres)

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/locturui/cv-website.git
cd cv-website

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env

# 4. Set up database
pnpm db:push
pnpm db:seed

# 5. Start the dev server
pnpm dev           
```
Open **[http://localhost:3000](http://localhost:3000)** 

### Production build

```bash
pnpm build
pnpm preview
```

### Database Management

```bash
pnpm db:push       # Sync schema to database
pnpm db:seed       # Seed database with data
pnpm db:studio     # Open Drizzle Studio GUI
pnpm db:generate   # Generate migrations
```

For detailed database setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)

---

## ☁️ Deployment

[Here is the deployed website](https://locturui-cv.vercel.app)

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Nuxt 3

3. **Add Database**
   - In Vercel dashboard, go to "Storage" tab
   - Create a new Postgres database
   - Vercel automatically adds `POSTGRES_URL` to environment variables

4. **Initialize Database** (after first deployment)
   ```bash
   # Pull environment variables locally
   vercel env pull
   
   # Run seed script
   pnpm db:seed
   ```

5. **Done!** Your site is live with a fully functional database.

### Environment Variables

Required environment variables in Vercel:
- `POSTGRES_URL` - Automatically set by Vercel Postgres
- Or `DATABASE_URL` - If using another PostgreSQL provider

---

## 📁 Project Structure

```
cv-website/
├── components/          # Vue components
├── pages/              # Nuxt pages/routes
├── server/
│   ├── api/           # API endpoints
│   └── database/      # Database schema & client
├── i18n/              # Internationalization
├── public/            # Static assets
└── drizzle.config.ts  # Database configuration
```

---

## 🔌 API Endpoints

- `GET /api/projects` - Get all projects (supports `?locale=en|ru`)
- `GET /api/projects/:key` - Get single project by key

Example:
```bash
curl http://localhost:3000/api/projects?locale=en
```

---

## 💬 Acknowledgements

* [Nuxt 3](https://nuxt.com/)
* [Vue 3](https://vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [DaisyUI](https://daisyui.com/)
* [Drizzle ORM](https://orm.drizzle.team/)
* [PostgreSQL](https://www.postgresql.org/)
* [lucide‑icons](https://lucide.dev/)
* [AOS](https://michalsnik.github.io/aos/)

---

> Built with ♥ and Nuxt in 2025.
