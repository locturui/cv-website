# Admin Panel Guide

Your CV website now has a powerful admin panel for managing projects!

## 🔐 Setup

### 1. Set Admin Secret

Edit `.env` and set a secure admin secret:

```bash
ADMIN_SECRET=your-super-secret-password-here
```

**Important:** Use a strong, random string. This protects your admin panel.

### 2. Setup Image Upload (Optional but Recommended)

For image uploads to work, you need Vercel Blob:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database** → **Blob**
5. Copy the `BLOB_READ_WRITE_TOKEN`
6. Add to `.env`:
   ```bash
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   ```

## 📝 Accessing Admin Panel

### Local Development

1. Start your dev server:
   ```bash
   pnpm dev
   ```

2. Navigate to:
   ```
   http://localhost:3000/admin
   ```

3. Enter your `ADMIN_SECRET` when prompted

### Production (Vercel)

1. Set environment variables in Vercel dashboard:
   - `ADMIN_SECRET` - Your secret password
   - `BLOB_READ_WRITE_TOKEN` - For image uploads (auto-set if you use Vercel Blob)

2. Access:
   ```
   https://your-domain.com/admin
   ```

## 🎨 Features

### View Projects
- See all projects in a card grid
- View thumbnails and tech stack
- See project keys and IDs

### Add New Project
1. Click **"+ Add New Project"**
2. Fill in the form:
   - **Key**: Unique identifier (e.g., `my-portfolio`)
   - **English fields**: Title, short desc, full description
   - **Russian fields**: Same for Russian language
   - **Link**: Optional GitHub/demo link
   - **Main Image**: Upload or paste URL
   - **Gallery Images**: Upload multiple or paste URLs (one per line)
   - **Tech Stack**: Comma-separated (e.g., `Vue, Nuxt, Tailwind CSS`)
3. Click **Create**

### Edit Project
1. Click **Edit** on any project card
2. Modify fields as needed
3. Click **Update**

### Delete Project
1. Click **Delete** on any project card
2. Confirm deletion
3. Project is permanently removed

### Upload Images
- **Main Image**: Click "Choose File" next to main image field
- **Gallery**: Click "Choose File" below gallery textarea (supports multiple)
- Images are uploaded to Vercel Blob and URLs are auto-filled

## 🔌 API Endpoints

The admin panel uses these API endpoints:

### Authentication
All admin endpoints require authentication via:
- **Header**: `Authorization: Bearer YOUR_ADMIN_SECRET`
- **Or Query**: `?secret=YOUR_ADMIN_SECRET` (for GET requests)

### Endpoints

```bash
# Get all projects (full data)
GET /api/admin/projects?secret=YOUR_SECRET

# Create project
POST /api/admin/projects
Headers: Authorization: Bearer YOUR_SECRET
Body: { key, titleEn, titleRu, descEn, descRu, ... }

# Update project
PATCH /api/admin/projects/:id
Headers: Authorization: Bearer YOUR_SECRET
Body: { titleEn, descEn, ... } (partial updates supported)

# Delete project
DELETE /api/admin/projects/:id
Headers: Authorization: Bearer YOUR_SECRET

# Upload image
POST /api/admin/upload
Headers: Authorization: Bearer YOUR_SECRET
Body: multipart/form-data with file
```

### Example CURL Requests

```bash
# List projects
curl "http://localhost:3000/api/admin/projects?secret=your-secret"

# Create project
curl -X POST http://localhost:3000/api/admin/projects \
  -H "Authorization: Bearer your-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "new-project",
    "titleEn": "My Project",
    "titleRu": "Мой проект",
    "descEn": "Short description",
    "descRu": "Краткое описание",
    "descriptionEn": "Full description here",
    "descriptionRu": "Полное описание здесь",
    "link": "https://github.com/user/repo",
    "image": "https://example.com/image.jpg",
    "images": ["url1", "url2"],
    "stack": ["Vue", "Nuxt"]
  }'

# Upload image
curl -X POST http://localhost:3000/api/admin/upload \
  -H "Authorization: Bearer your-secret" \
  -F "file=@/path/to/image.jpg"
```

## 🔒 Security Best Practices

1. **Strong Secret**: Use a long, random string for `ADMIN_SECRET`
2. **HTTPS Only**: Never access admin panel over HTTP in production
3. **Private Tokens**: Keep `ADMIN_SECRET` and `BLOB_READ_WRITE_TOKEN` private
4. **Environment Variables**: Never commit secrets to Git
5. **Regular Updates**: Change your admin secret periodically

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check that `ADMIN_SECRET` is set in `.env`
- Verify you're entering the correct secret
- Restart dev server after changing `.env`

### Image Upload Fails
- Ensure `BLOB_READ_WRITE_TOKEN` is set
- Check that file is an image (jpg, png, gif, webp)
- Verify file size is reasonable (<10MB recommended)

### Projects Not Showing
- Check database connection (see health endpoint: `/api/health`)
- Verify projects exist: `pnpm db:seed`
- Check browser console for errors

### Can't Access /admin
- Clear browser cache
- Check that page exists: `/pages/admin/index.vue`
- Verify no Nuxt routing errors in console

## 📚 Advanced Usage

### Programmatic Access

You can manage projects programmatically using the API:

```javascript
// In your scripts or other applications
const ADMIN_SECRET = process.env.ADMIN_SECRET

async function addProject(projectData) {
  const response = await fetch('https://your-site.com/api/admin/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ADMIN_SECRET}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  })
  
  return await response.json()
}
```

### Bulk Import

You can create a script to bulk import projects from JSON:

```bash
# Create a import-projects.ts script
# Load your projects JSON
# Loop through and POST to /api/admin/projects
```

## 🚀 Next Steps

Consider adding:
- User authentication system (multiple users)
- Activity logging
- Draft/published status for projects
- Categories/tags system
- Analytics integration
- Automatic image optimization
- Backup/export functionality

---

**Admin panel is ready to use!** Visit `/admin` to start managing your projects.

