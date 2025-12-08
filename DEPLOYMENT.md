# 🚀 Deployment Guide for CSV Visualizer Pro

This guide will help you deploy your CSV Visualizer Pro application to production.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the recommended platform for deploying Next.js applications. It's free for personal projects and provides excellent performance.

#### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))

#### Steps

1. **Push your code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your app will be live in ~2 minutes

#### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

### Option 2: Docker Deployment

If you prefer containerized deployment:

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

2. **Build and run**
```bash
docker build -t csv-visualizer .
docker run -p 3000:3000 csv-visualizer
```

---

### Option 3: Traditional Hosting (VPS, AWS, etc.)

1. **Build the application**
```bash
npm run build
```

2. **Set up a process manager (PM2)**
```bash
npm install -g pm2
pm2 start npm --name "csv-visualizer" -- start
pm2 save
pm2 startup
```

3. **Configure Nginx (reverse proxy)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Set up SSL with Let's Encrypt**
```bash
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables

No server-side environment variables are required! The app accepts API keys via the UI.

Optional: If you want to pre-configure an API key on the server:
```bash
# Create .env.local file
ANTHROPIC_API_KEY=sk-ant-api-your-key-here
```

---

## Performance Optimization

### Enable Next.js optimizations

In `next.config.js`:
```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  compress: true,
}
```

### Enable caching

Add these headers in your hosting configuration:
```
Cache-Control: public, max-age=31536000, immutable (for static assets)
Cache-Control: public, max-age=0, must-revalidate (for HTML pages)
```

---

## Monitoring & Analytics

### Add Vercel Analytics (if using Vercel)

```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Troubleshooting

### Build fails
- Check Node.js version: `node -v` (should be 18.x or higher)
- Clear cache: `rm -rf .next node_modules && npm install`

### API errors
- Verify API key is correct
- Check network connectivity
- Ensure CORS is properly configured

### Performance issues
- Enable Next.js Image Optimization
- Add CDN for static assets
- Use edge caching where possible

---

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set up CORS properly
- [ ] Add rate limiting (if handling many users)
- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data
- [ ] Enable security headers

---

## Cost Estimates

### Vercel (Free Tier)
- ✅ Free for personal projects
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Edge network CDN

### Anthropic API Usage
- Claude Sonnet 4: ~$3 per million input tokens
- Average visualization: ~1-2K tokens
- Estimated cost: $0.003-0.006 per visualization

---

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)

---

**Ready to deploy! 🚀**
