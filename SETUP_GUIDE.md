# 🎯 CSV Visualizer Pro - Complete Setup Guide

## 📋 What You've Got

A production-ready, AI-powered data visualization web application with:

### ✨ Core Features
- **AI-Powered Visualizations**: Use natural language to describe charts
- **CSV File Upload**: Drag-and-drop with real-time validation
- **Smart Code Generation**: Get production-ready Python visualization code
- **Beautiful UI**: Modern dark theme with glassmorphism effects
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🛠️ Tech Stack
- **Framework**: Next.js 14.2 (React 18.3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI**: Anthropic Claude Sonnet 4 API
- **Deployment**: Vercel-ready

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd csv-visualizer-app
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: http://localhost:3000

### Step 4: Use the App
1. Enter your Anthropic API key in the sidebar
2. Upload a CSV file
3. Describe your visualization in natural language
4. Get Python code to generate stunning charts!

---

## 📁 Project Structure

```
csv-visualizer-app/
│
├── 📱 app/                         # Next.js App Router
│   ├── api/visualize/route.ts     # Claude API endpoint
│   ├── globals.css                # Design system & styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main application
│
├── 🎨 components/                  # React Components
│   ├── FileUpload.tsx             # CSV upload with drag-drop
│   ├── Header.tsx                 # App header
│   ├── Sidebar.tsx                # Configuration panel
│   └── VisualizationPanel.tsx     # Results display
│
├── ⚙️ Configuration Files
│   ├── package.json               # Dependencies
│   ├── tsconfig.json              # TypeScript config
│   ├── tailwind.config.js         # Tailwind config
│   ├── next.config.js             # Next.js config
│   └── vercel.json                # Deployment config
│
└── 📚 Documentation
    ├── README.md                  # Project overview
    └── DEPLOYMENT.md              # Deployment guide
```

---

## 🎨 Design System Highlights

### Color Palette
```
Primary Background: #0a0e27 (Deep navy)
Secondary Background: #151b3d (Dark slate)
Card Background: #1a2142 (Muted blue)
Accent Blue: #3b82f6
Accent Purple: #a855f7
Text Primary: #f8fafc (Near white)
Text Secondary: #94a3b8 (Slate gray)
```

### Key Components
- **Glass Cards**: Translucent backgrounds with blur effects
- **Gradient Buttons**: Blue-to-purple animated gradients
- **Smooth Animations**: Pulse, float, and shimmer effects
- **Custom Scrollbars**: Styled for consistency

---

## 💡 Example Prompts to Try

Once you've uploaded a CSV:

1. **"Create a clustered bar chart showing quarterly operating income for each product line with a light-to-dark blue gradient"**

2. **"Plot a dual-axis chart with net income as bars and net margin percentage as a line overlay, using purple colors"**

3. **"Generate a heatmap showing the correlation between revenue, cost, and profit metrics"**

4. **"Create a stacked area chart of total revenue by product line over time with vibrant colors"**

5. **"Plot a scatter plot comparing customer acquisition cost vs customer lifetime value"**

---

## 🔧 Customization Guide

### Changing Colors

Edit `app/globals.css`:
```css
:root {
  --color-accent-blue: #your-color;
  --color-accent-purple: #your-color;
  --gradient-primary: linear-gradient(...);
}
```

### Adding New Features

1. Create component in `components/`
2. Import in `app/page.tsx`
3. Style with Tailwind classes

### Modifying AI Behavior

Edit `app/api/visualize/route.ts`:
```typescript
const systemPrompt = `Your custom instructions...`
```

---

## 🚢 Deployment Options

### Option 1: Vercel (Easiest - 2 minutes)
```bash
npm i -g vercel
vercel
```

### Option 2: Docker
```bash
docker build -t csv-visualizer .
docker run -p 3000:3000 csv-visualizer
```

### Option 3: Traditional Hosting
```bash
npm run build
npm start
```

See `DEPLOYMENT.md` for detailed instructions.

---

## 📊 How It Works

### Architecture Flow

```
1. User uploads CSV file
   ↓
2. PapaParse validates and parses CSV
   ↓
3. User enters natural language prompt
   ↓
4. Frontend sends to /api/visualize
   ↓
5. API calls Claude with CSV data + prompt
   ↓
6. Claude generates Python visualization code
   ↓
7. Code displayed to user for execution
```

### API Endpoint

**POST** `/api/visualize`

**Request:**
```json
{
  "apiKey": "sk-ant-api...",
  "csvData": [...],
  "prompt": "Create a bar chart...",
  "fileName": "data.csv"
}
```

**Response:**
```json
{
  "code": "import matplotlib...",
  "prompt": "Create a bar chart...",
  "timestamp": "2024-01-01T12:00:00Z",
  "model": "claude-sonnet-4-20250514"
}
```

---

## 🎯 Use Cases

### Business Analytics
- Quarterly financial reports
- Sales performance dashboards
- Revenue trend analysis
- Profit margin tracking

### Data Science
- Exploratory data analysis
- Statistical visualizations
- Correlation studies
- Time series analysis

### Research
- Scientific data plots
- Survey result visualizations
- Experimental data charts
- Publication-ready figures

---

## 🔐 Security Best Practices

✅ **API keys stored client-side only** (not persisted)
✅ **No server-side data storage**
✅ **CSV processing happens in browser**
✅ **HTTPS enforced in production**
✅ **No third-party tracking**

---

## 🐛 Troubleshooting

### Issue: "API key required"
**Solution**: Enter your Anthropic API key in the sidebar

### Issue: "Error parsing CSV"
**Solution**: Ensure CSV has headers and is UTF-8 encoded

### Issue: Build fails
**Solution**: 
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Port 3000 in use
**Solution**:
```bash
npx kill-port 3000
npm run dev
```

---

## 📈 Performance Tips

1. **Optimize CSV Size**: Keep files under 5MB for best performance
2. **Clear Browser Cache**: If UI doesn't update
3. **Use Latest Node**: v18.x or higher
4. **Enable Production Mode**: `npm run build && npm start`

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🤝 Contributing

Want to improve this app? Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this for personal or commercial projects!

---

## 🎉 You're All Set!

Your CSV Visualizer Pro is ready to transform data into insights. 

**Next Steps:**
1. ✅ Run `npm run dev`
2. ✅ Get your API key from https://console.anthropic.com
3. ✅ Upload a CSV file
4. ✅ Start creating visualizations!

**Questions?** Check the README.md and DEPLOYMENT.md files.

---

**Built with ❤️ using Claude AI, Next.js, and React**
