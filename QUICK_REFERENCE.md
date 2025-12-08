# ⚡ Quick Reference Card

## 🚀 Getting Started (30 seconds)

```bash
cd csv-visualizer-app
npm install
npm run dev
```
→ Open http://localhost:3000

---

## 📝 Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Deployment
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production

# Utilities
./demo.sh            # Run demo script (Unix/Mac)
chmod +x demo.sh     # Make demo script executable
```

---

## 🎯 Example Prompts (Copy & Paste)

### Basic Charts
```
Create a bar chart showing quarterly revenue by product line

Plot a line chart of profit margins over time with a blue gradient

Generate a pie chart of revenue distribution by product
```

### Advanced Charts
```
Create a clustered bar chart of quarterly operating income for each product line with light-to-dark blue gradient and include a legend

Plot a dual-axis chart with net income as bars and net margin percentage as a line overlay, using purple colors

Generate a heatmap showing correlation between revenue, cost, profit, and margin metrics
```

### Styled Charts
```
Create a stacked area chart of revenue by product line over time with vibrant colors and smooth curves

Plot a scatter plot comparing customer acquisition cost vs customer lifetime value with trend line

Generate a box plot showing distribution of profit margins across all products
```

---

## 🎨 Customization Cheat Sheet

### Change Colors
**File:** `app/globals.css`
```css
:root {
  --color-accent-blue: #3b82f6;    /* Change this */
  --color-accent-purple: #a855f7;  /* Change this */
}
```

### Modify AI Prompt
**File:** `app/api/visualize/route.ts`
```typescript
const systemPrompt = `You are a data visualization expert...`
// Edit this to change AI behavior
```

### Add Component
**File:** `components/YourComponent.tsx`
```typescript
'use client'
export function YourComponent() {
  return <div>Your content</div>
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npx kill-port 3000` |
| Dependencies error | `rm -rf node_modules && npm install` |
| Build fails | `rm -rf .next && npm run build` |
| Type errors | Check `tsconfig.json` settings |
| CSS not updating | Clear browser cache (Ctrl+Shift+R) |
| API errors | Check API key in sidebar |

---

## 📂 File Structure (Key Files)

```
csv-visualizer-app/
├── app/
│   ├── page.tsx                 ← Main app
│   ├── layout.tsx               ← Root layout
│   ├── globals.css              ← Styles
│   └── api/visualize/route.ts   ← API
├── components/
│   ├── FileUpload.tsx           ← CSV upload
│   ├── Sidebar.tsx              ← Config panel
│   ├── VisualizationPanel.tsx   ← Results
│   └── Header.tsx               ← App header
└── package.json                 ← Dependencies
```

---

## 🔑 Environment Variables (Optional)

Create `.env.local`:
```bash
ANTHROPIC_API_KEY=sk-ant-api-your-key-here
NODE_ENV=development
```

---

## 📊 Supported File Formats

✅ CSV (.csv)
✅ UTF-8 encoding
✅ Headers required
✅ Max size: 10MB (recommended)

---

## 🎨 Color Palette Reference

```
Background Colors:
  Primary:   #0a0e27  (Deep navy)
  Secondary: #151b3d  (Dark slate)
  Card:      #1a2142  (Muted blue)

Accent Colors:
  Blue:      #3b82f6  (Primary)
  Purple:    #a855f7  (Secondary)
  Cyan:      #06b6d4  (Accent)

Text Colors:
  Primary:   #f8fafc  (Near white)
  Secondary: #94a3b8  (Slate gray)

State Colors:
  Success:   #10b981  (Green)
  Error:     #ef4444  (Red)
  Warning:   #f59e0b  (Orange)
```

---

## ⚡ Performance Tips

1. Keep CSV files < 5MB for best performance
2. Use `npm run build` before deploying
3. Enable compression in production
4. Use Vercel for automatic optimization
5. Clear cache if updates don't show

---

## 🔒 Security Checklist

- [ ] API key entered via UI (not hardcoded)
- [ ] HTTPS enabled in production
- [ ] No sensitive data in code
- [ ] Dependencies up to date
- [ ] `.env` files in `.gitignore`

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari | ✅ Latest 2 versions |
| Edge | ✅ Latest 2 versions |
| Mobile | ✅ iOS & Android |

---

## 💡 Pro Tips

1. **Save API Key**: Use browser autofill or password manager
2. **Example Prompts**: Click example buttons to auto-fill
3. **Copy Code**: Use the copy button, don't select manually
4. **Large Files**: Split into smaller CSVs for better performance
5. **Custom Charts**: Be specific in your prompts for best results

---

## 📞 Quick Links

- **Anthropic Console**: https://console.anthropic.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## 🎯 Keyboard Shortcuts

- `Ctrl/Cmd + K`: Focus search (browser)
- `Ctrl/Cmd + C`: Copy code
- `Ctrl/Cmd + V`: Paste
- `F5`: Refresh page
- `Ctrl/Cmd + Shift + R`: Hard refresh

---

**Print this card for quick reference!** 📄

*Last updated: December 2024*
