# Deployment Checklist

Follow these steps to deploy your CV website to Vercel with database and admin panel.

## ✅ Pre-Deployment Checklist

### 1. Environment Variables

Make sure you have these set locally in `.env`:
- [ ] `DATABASE_URL` or `POSTGRES_URL` - PostgreSQL connection
- [ ] `ADMIN_SECRET` - Strong random string for admin access
- [ ] `BLOB_READ_WRITE_TOKEN` - For image uploads (optional initially)

### 2. Database

- [ ] Database schema is pushed: `pnpm db:push`
- [ ] Database is seeded with initial data: `pnpm db:seed`
- [ ] Test API works: `curl http://localhost:3000/api/health`

### 3. Test Locally

- [ ] `pnpm dev` runs without errors
- [ ] Projects page loads: `http://localhost:3000/projects`
- [ ] Admin panel accessible: `http://localhost:3000/admin`
- [ ] Can add/edit/delete projects in admin
- [ ] Images display correctly

## 🚀 Vercel Deployment Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add fullstack features and admin panel"
git push
```

### Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Nuxt 3 settings

### Step 3: Add Postgres Database

1. In Vercel project dashboard → **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose a name (e.g., `cv-database`)
5. Select region close to your users
6. Click **Create**

Vercel automatically adds these environment variables:
- `POSTGRES_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`, `POSTGRES_HOST`, etc.

### Step 4: Add Blob Storage (for image uploads)

1. In Vercel dashboard → **Storage** tab
2. Click **Create Database** → **Blob**
3. Name it (e.g., `cv-images`)
4. Click **Create**

Vercel automatically adds:
- `BLOB_READ_WRITE_TOKEN`

### Step 5: Set Admin Secret

1. Go to **Settings** → **Environment Variables**
2. Add:
   ```
   ADMIN_SECRET = your-super-secret-password-123
   ```
3. Select all environments (Production, Preview, Development)
4. Click **Save**

### Step 6: Initial Deployment

1. Click **Deploy**
2. Wait for build to complete (~2-3 minutes)
3. You'll get a URL like: `https://your-project.vercel.app`

### Step 7: Initialize Database

After first deployment, seed the database:

```bash
# Pull environment variables from Vercel
vercel env pull

# Run seed script
pnpm db:seed
```

Alternatively, use the admin panel:
1. Go to `https://your-project.vercel.app/admin`
2. Login with your `ADMIN_SECRET`
3. Add projects manually

### Step 8: Test Production

- [ ] Visit your site: `https://your-project.vercel.app`
- [ ] Projects page loads with data
- [ ] Modal works when clicking projects
- [ ] Language switching works
- [ ] Admin panel accessible at `/admin`
- [ ] Can add project through admin
- [ ] Image upload works

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel project → **Settings** → **Domains**
2. Add your domain (e.g., `yourname.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~5-60 minutes)

### Update Settings

After adding domain:
- [ ] Test site on custom domain
- [ ] Update any hardcoded URLs in code
- [ ] Test admin panel on custom domain

## 🔐 Security Checklist

- [ ] `ADMIN_SECRET` is strong and unique
- [ ] `.env` file is in `.gitignore`
- [ ] No secrets committed to Git
- [ ] Database only accessible via Vercel network
- [ ] HTTPS enforced (automatic with Vercel)

## 📊 Post-Deployment

### Monitor

- [ ] Check Vercel Analytics
- [ ] Monitor for errors in Vercel Logs
- [ ] Test performance with Lighthouse

### Optional Enhancements

- [ ] Add custom analytics (Google Analytics, Plausible)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure caching headers
- [ ] Add sitemap.xml
- [ ] Set up robots.txt

## 🆘 Troubleshooting

### Build Fails

- Check build logs in Vercel
- Ensure all dependencies in `package.json`
- Test build locally: `pnpm build`

### Database Connection Issues

- Verify `POSTGRES_URL` is set in Vercel
- Check database is in same region as functions
- Test with health endpoint: `/api/health`

### Admin Panel Not Working

- Verify `ADMIN_SECRET` is set
- Check browser console for errors
- Test API directly with curl

### Images Not Uploading

- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check Blob storage is created
- Test with small image first

## 📝 Maintenance

### Regular Tasks

- **Weekly**: Check Vercel logs for errors
- **Monthly**: Review database size and usage
- **Quarterly**: Update dependencies: `pnpm update`

### Backups

Consider setting up automated backups:
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Or use Vercel's backup features
```

---

## 🎉 You're Done!

Your CV website is now live with:
- ✅ Fullstack Nuxt 3 application
- ✅ PostgreSQL database
- ✅ Admin panel for content management
- ✅ Image upload with Vercel Blob
- ✅ Multi-language support
- ✅ Production-ready on Vercel

Visit your admin panel and start adding your projects!

