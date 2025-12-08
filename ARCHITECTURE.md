# 🏗️ CSV Visualizer Pro - Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
│  ┌───────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   Sidebar     │  │   Header     │  │  Main Content Area │   │
│  │  - API Key    │  │  - Branding  │  │  - File Upload     │   │
│  │  - File Info  │  │  - Status    │  │  - Data Preview    │   │
│  │  - Settings   │  └──────────────┘  │  - Prompt Input    │   │
│  └───────────────┘                    │  - Results Display │   │
│                                       └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      REACT COMPONENTS                           │
│                                                                 │
│  FileUpload.tsx  →  Handles CSV file upload & parsing          │
│  VisualizationPanel.tsx  →  Manages prompts & displays results │
│  Sidebar.tsx  →  Configuration & API key management            │
│  Header.tsx  →  App branding & status                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT-SIDE LOGIC                          │
│                                                                 │
│  • CSV Parsing (PapaParse)                                      │
│  • Form Validation                                              │
│  • State Management (React Hooks)                               │
│  • UI Interactions                                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER (Edge)                           │
│                                                                 │
│  POST /api/visualize                                            │
│  • Receives: CSV data + prompt + API key                        │
│  • Validates input                                              │
│  • Calls Anthropic API                                          │
│  • Returns: Python visualization code                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ANTHROPIC API                                │
│                                                                 │
│  Claude Sonnet 4 Model                                          │
│  • Analyzes CSV structure                                       │
│  • Interprets user prompt                                       │
│  • Generates Python code                                        │
│  • Optimizes for visualization libraries                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────┐     ┌──────────────┐     ┌────────────┐     ┌──────────┐
│   User   │ ──> │ Upload CSV   │ ──> │  PapaParse │ ──> │  State   │
└──────────┘     └──────────────┘     └────────────┘     └──────────┘
                                                               │
                                                               ↓
┌──────────┐     ┌──────────────┐     ┌────────────┐     ┌──────────┐
│ Results  │ <── │ API Response │ <── │ Claude API │ <── │  Prompt  │
└──────────┘     └──────────────┘     └────────────┘     └──────────┘
```

---

## Component Hierarchy

```
App (page.tsx)
├── Header
│   └── Logo + Status
│
├── Sidebar
│   ├── API Key Input
│   ├── File Info Display
│   └── Status Indicator
│
└── Main Content
    ├── FileUpload
    │   ├── Drag & Drop Zone
    │   ├── File Input
    │   └── Validation Logic
    │
    └── VisualizationPanel
        ├── Data Preview Table
        ├── Prompt Input Form
        ├── Example Prompts
        └── Results Display
            ├── Generated Code
            └── Copy Button
```

---

## Technology Stack Details

### Frontend Framework
```
Next.js 14.2 (App Router)
├── Server Components (default)
├── Client Components ('use client')
├── API Routes (Edge Runtime)
└── TypeScript Integration
```

### Styling Architecture
```
Tailwind CSS 3.4
├── Custom Design System (globals.css)
│   ├── CSS Variables (colors, spacing, etc.)
│   ├── Custom Components (@layer components)
│   └── Utility Classes (@layer utilities)
│
├── Responsive Breakpoints
│   ├── Mobile: < 768px
│   ├── Tablet: 768px - 1024px
│   └── Desktop: > 1024px
│
└── Dark Mode (Default)
```

### State Management
```
React 18.3 Hooks
├── useState (local component state)
├── useCallback (memoized functions)
└── Form state (controlled components)
```

---

## API Architecture

### Endpoint: `/api/visualize`

**Method:** POST  
**Runtime:** Edge (for low latency)

**Request Schema:**
```typescript
{
  apiKey: string,           // Anthropic API key
  csvData: any[],           // Parsed CSV data
  prompt: string,           // User's visualization request
  fileName: string          // Original filename
}
```

**Response Schema:**
```typescript
{
  code: string,             // Python visualization code
  prompt: string,           // Echo of user's prompt
  timestamp: string,        // ISO 8601 timestamp
  model: string            // Claude model used
}
```

**Error Handling:**
```typescript
{
  error: string,            // Error message
  status: number           // HTTP status code
}
```

---

## Security Architecture

### Client-Side Security
- ✅ API keys stored in memory only (useState)
- ✅ No localStorage or sessionStorage persistence
- ✅ Input validation on all forms
- ✅ CSV file type validation
- ✅ File size limits (client-side)

### Server-Side Security
- ✅ Edge runtime (isolated execution)
- ✅ No data persistence
- ✅ API key passed per-request (not stored)
- ✅ CORS enabled for same-origin only
- ✅ Rate limiting (via Anthropic API)

### Production Security
- ✅ HTTPS enforced (via Vercel)
- ✅ Security headers (Next.js defaults)
- ✅ No sensitive data in logs
- ✅ Environment variables for secrets (optional)

---

## Performance Optimizations

### Frontend
```
• React.memo for component memoization
• useCallback for function memoization
• Code splitting (Next.js automatic)
• Image optimization (next/image)
• Font optimization (next/font)
```

### Backend
```
• Edge runtime (low latency)
• Streaming responses (future enhancement)
• Efficient JSON parsing
• Minimal middleware
```

### Deployment
```
• Vercel Edge Network (CDN)
• Automatic caching
• Compression enabled
• Image optimization
```

---

## Scalability Considerations

### Horizontal Scaling
- Edge functions scale automatically
- No database = no bottlenecks
- Stateless design
- CDN distribution

### Vertical Scaling
- Efficient React rendering
- Minimal re-renders
- Lazy loading potential
- Code splitting

### Cost Scaling
- Free hosting (Vercel hobby tier)
- Pay-per-use API (Anthropic)
- No server costs
- CDN included

---

## Development Workflow

```
1. Local Development
   ├── npm run dev
   ├── Hot Module Replacement
   └── TypeScript type checking

2. Code Quality
   ├── TypeScript strict mode
   ├── ESLint (Next.js config)
   └── Prettier (optional)

3. Build Process
   ├── npm run build
   ├── TypeScript compilation
   ├── CSS processing (Tailwind)
   └── Bundle optimization

4. Deployment
   ├── Git push to main
   ├── Vercel auto-deploy
   └── Preview deployments
```

---

## File Size Budget

```
Total Bundle Size: ~500 KB (estimated)

JavaScript:
  - React + Next.js: ~200 KB
  - Components: ~50 KB
  - Dependencies: ~150 KB

CSS:
  - Tailwind (purged): ~20 KB
  - Custom styles: ~5 KB

Images/Fonts:
  - Minimal (system fonts used)
```

---

## Browser Support

```
Modern Browsers (Last 2 versions):
  ✅ Chrome/Edge (Chromium)
  ✅ Firefox
  ✅ Safari
  ✅ Opera

Mobile Browsers:
  ✅ iOS Safari
  ✅ Chrome Mobile
  ✅ Samsung Internet
```

---

## Future Enhancements

### Potential Features
- [ ] Real-time chart preview (in-browser rendering)
- [ ] Support for Excel files (.xlsx)
- [ ] Saved visualizations gallery
- [ ] Collaborative sharing
- [ ] Chart templates library
- [ ] Export to PDF
- [ ] Multi-file uploads
- [ ] Advanced chart customization
- [ ] Data transformation tools
- [ ] API key encryption

### Technical Improvements
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright)
- [ ] Implement error boundaries
- [ ] Add loading skeletons
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] WebSocket for real-time updates
- [ ] Server-side caching

---

## Monitoring & Analytics

### Recommended Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **PostHog**: Product analytics

### Key Metrics to Track
- API response times
- Error rates
- User engagement
- Conversion (upload → visualization)
- File upload success rate

---

## Dependencies

### Production
```json
{
  "@anthropic-ai/sdk": "^0.32.1",  // Claude API client
  "next": "^14.2.0",                // Framework
  "react": "^18.3.0",               // UI library
  "papaparse": "^5.4.1",            // CSV parsing
  "lucide-react": "^0.263.1",       // Icons
  "clsx": "^2.1.0"                  // Classname utility
}
```

### Development
```json
{
  "typescript": "^5.3.0",           // Type safety
  "tailwindcss": "^3.4.1",          // Styling
  "autoprefixer": "^10.4.18",       // CSS compatibility
  "postcss": "^8.4.35"              // CSS processing
}
```

---

**Architecture designed for:**
- ⚡ Speed
- 🔒 Security
- 📈 Scalability
- 🎨 Maintainability
- 💰 Cost-effectiveness
