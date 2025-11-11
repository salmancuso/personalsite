# Publishing Your Hugo Site (salmancuso.com)

## Overview
This document explains how to properly build and publish your Hugo site to ensure correct URLs and production-ready content.

## Important: Development vs. Production

### Development (Local Preview)
```bash
hugo server
```
- Use this for local development and previewing changes
- Automatically uses `http://localhost:1313/` URLs
- Includes draft content by default
- Auto-refreshes when you make changes
- **DO NOT use this for publishing!**

### Production (Publishing)
```bash
hugo
```
- Use this to build the final site for publishing
- Uses the `baseURL` from your `hugo.toml` (`https://salmancuso.com`)
- Excludes draft content by default
- Generates static files in the `public/` directory

---

## Step-by-Step Publishing Instructions

### 1. Prepare Your Content
- Ensure all posts have `draft: false` in their front matter (or remove the draft parameter)
- Review your content in development mode: `hugo server`
- Test all links and images

### 2. Clean Previous Build (Optional but Recommended)
```bash
rm -rf public/
```
This removes the old `public/` directory to ensure a fresh build.

### 3. Build the Production Site
```bash
hugo
```

This command:
- Generates your complete static site in the `public/` directory
- Uses correct production URLs (`https://salmancuso.com`)
- Minifies and optimizes content
- Excludes draft posts

### 4. Verify the Build
Check the `public/` directory:
```bash
ls -la public/
```

You can also preview the production build locally:
```bash
cd public/
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your browser (note: some absolute URLs will point to your live site).

### 5. Deploy to Your Web Server

**Option A: Using rsync (if you have SSH access)**
```bash
rsync -avz --delete public/ user@salmancuso.com:/path/to/webroot/
```

**Option B: Using FTP/SFTP**
- Upload the entire contents of the `public/` directory to your web server's document root
- Use an FTP client like FileZilla, Cyberduck, or command-line FTP

**Option C: Using Git (GitHub Pages, Netlify, etc.)**
```bash
cd public/
git init
git add .
git commit -m "Deploy site"
git push origin main
```

**Option D: Automated Deployment Services**
- **Netlify**: Connect your Git repo, set build command to `hugo`, publish directory to `public/`
- **GitHub Pages**: Use GitHub Actions with Hugo build step
- **Cloudflare Pages**: Similar to Netlify

---

## Common Commands Reference

| Command | Purpose |
|---------|---------|
| `hugo` | Build production site |
| `hugo server` | Start development server |
| `hugo server -D` | Start server with drafts included |
| `hugo --minify` | Build with minification |
| `hugo new posts/my-post.md` | Create a new blog post |
| `rm -rf public/` | Clean build directory |

---

## Troubleshooting

### Problem: Images or links still show localhost URLs
**Solution:** You're probably viewing the `hugo server` output. Make sure to:
1. Stop the server
2. Run `hugo` (not `hugo server`)
3. Check files in `public/` directory

### Problem: Draft posts not appearing
**Solution:** 
- For development: Use `hugo server -D`
- For production: Remove `draft: true` from post front matter

### Problem: Old content still showing on live site
**Solution:** Clear the `public/` directory before rebuilding:
```bash
rm -rf public/ && hugo
```

---

## Checklist Before Publishing

- [ ] All content reviewed and ready
- [ ] Draft status removed from posts you want published
- [ ] Tested locally with `hugo server`
- [ ] Cleaned `public/` directory
- [ ] Built site with `hugo` command
- [ ] Verified URLs in `public/` directory files
- [ ] Uploaded `public/` contents to web server
- [ ] Checked live site after deployment

---

## Your Site Configuration

- **Site URL:** https://salmancuso.com
- **Build Command:** `hugo`
- **Output Directory:** `public/`
- **Theme:** Ananke

---

## Need Help?

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Deployment Docs](https://gohugo.io/hosting-and-deployment/)
- [Ananke Theme Docs](https://github.com/theNewDynamic/gohugo-theme-ananke)