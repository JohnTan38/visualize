# 📸 App Screenshots & Visual Guide

This document describes the visual appearance and user interface of CSV Visualizer Pro.

---

## 🎨 Overall Design Theme

**Dark Mode Professional Theme**
- Deep navy blue gradient background (#0a0e27 to #151b3d)
- Glassmorphism cards (translucent with backdrop blur)
- Blue-to-purple gradient accents
- Smooth animations and transitions
- Modern, clean typography

---

## 🖼️ Main Interface Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌────────────┐ [📊 CSV Visualizer Pro]     [✨ AI Ready]         │
│  │  Sidebar   │                                                    │
│  │            │ ┌────────────────────────────────────────────────┐│
│  │ [🔑 API]   │ │  🌟 Transform Your Data Into Visual Insights   ││
│  │  Key       │ │                                                ││
│  │            │ │  Upload CSV files and let Claude AI create     ││
│  │ [📄 File]  │ │  stunning visualizations                       ││
│  │  Info      │ │                                                ││
│  │            │ │  [Real-time] [Multiple Charts] [AI-Optimized]  ││
│  │ [Status]   │ └────────────────────────────────────────────────┘│
│  │            │                                                    │
│  └────────────┘ ┌────────────────────────────────────────────────┐│
│                 │  📁 Upload CSV File                            ││
│                 │                                                ││
│                 │      ⬆️  Drag & drop or click to browse       ││
│                 │                                                ││
│                 │      Supports .csv files up to 10MB            ││
│                 │                                                ││
│                 │      [Choose File]                             ││
│                 └────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Component Breakdown

### 1. Sidebar (Left Panel)
**Background:** Gradient from #151b3d to #0a0e27
**Width:** 320px (80rem)

**API Key Section:**
- Label: "Anthropic API Key" with key icon 🔑
- Password input field (toggleable visibility)
- "Save API Key" button (gradient blue to purple)
- Info box with link to console.anthropic.com

**File Info Section:**
- Label: "Current File" with document icon 📄
- Shows uploaded filename in green highlight box
- File size display
- "No file uploaded" placeholder when empty

**Status Indicator:**
- Green pulsing dot when API key present
- Gray dot when not configured
- Text: "Ready" or "Setup Required"

### 2. Header
**Position:** Top of main content area

**Left Side:**
- App icon: Gradient box with bar chart icon
- App name: "CSV Visualizer Pro" (gradient text)
- Subtitle: "Powered by Claude AI"

**Right Side:**
- Status badge: "AI Ready" with sparkle icon

### 3. Hero Section (Before Upload)
**Background:** Glass card with gradient overlay

**Content:**
- Badge: "AI-Powered Analytics" with sparkle icon
- Headline: "Transform Your Data" (gradient)
- Subheadline: "Into Visual Insights"
- Description paragraph
- Feature pills: [Real-time] [Multiple Charts] [AI-Optimized]

### 4. File Upload Area
**Background:** Glass card

**Upload Zone:**
- Dashed border (changes to blue when dragging)
- Large upload icon (animated on hover)
- Headline: "Upload your CSV file"
- Instruction text
- File size limit info
- "Choose File" button (gradient)

**Success State:**
- Green checkmark icon
- Filename display
- "Upload Different File" button

**Error State:**
- Red alert icon
- Error message in red text
- "Please try again" message

### 5. Data Preview Section
**Background:** Glass card

**Header:** "Data Preview" with image icon

**Table:**
- Dark background (#slate-900/50)
- Column headers in #slate-800/50
- 5 rows shown
- Hover effect on rows
- "Showing 5 of X rows" footer

### 6. Visualization Panel
**Background:** Glass card

**Example Prompts:**
- Grid of 4 example buttons
- Dark background, hover highlights
- Arrow icons (→)

**Prompt Input:**
- Large textarea (4 rows)
- Placeholder text
- Dark background with border

**Submit Button:**
- Full-width gradient button
- "Generate Visualization" text
- Send icon
- Loading state with spinner

### 7. Results Display
**Background:** Glass card

**Code Section:**
- Header with "Python Code" label
- Copy button (blue)
- Code block with syntax highlighting (green text)
- Dark background

**Info Box:**
- Blue background (#blue-500/10)
- Lightbulb icon 💡
- Usage instructions

---

## 🎨 Color Specifications

### Backgrounds
```
Primary:     #0a0e27  (Deep navy)
Secondary:   #151b3d  (Dark slate)
Card:        #1a2142  (Muted blue)
Input:       #0f172a  (Slate 900)
```

### Accents
```
Blue:        #3b82f6  (Primary action)
Purple:      #a855f7  (Secondary action)
Cyan:        #06b6d4  (Highlights)
Green:       #10b981  (Success)
Red:         #ef4444  (Error)
```

### Text
```
Primary:     #f8fafc  (Near white)
Secondary:   #94a3b8  (Slate 400)
Muted:       #64748b  (Slate 500)
```

### Gradients
```
Primary:     linear-gradient(135deg, #3b82f6, #8b5cf6, #a855f7)
Button:      linear-gradient(to right, #2563eb, #9333ea)
Background:  linear-gradient(to bottom right, #0a0e27, #151b3d, #0a0e27)
```

---

## ✨ Animations & Effects

### Glassmorphism
- Background: rgba with opacity
- Backdrop blur: 12px
- Border: rgba white with 10% opacity
- Shadow: Dark shadows for depth

### Hover Effects
- Buttons: Scale 1.05, brightness 1.1
- Cards: Subtle lift with shadow increase
- Links: Color transition, underline
- Icons: Rotation or bounce

### Loading States
- Spinner: Smooth rotation
- Pulse: Opacity animation
- Progress: Gradient animation

### Transitions
- Fast: 150ms (hover states)
- Base: 250ms (most interactions)
- Slow: 400ms (complex animations)

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Sidebar: Hidden or overlay
- Single column layout
- Stacked components
- Touch-friendly buttons

### Tablet (768px - 1024px)
- Sidebar: Collapsible
- Two-column layout where appropriate
- Optimized spacing

### Desktop (> 1024px)
- Full sidebar visible
- Multi-column layouts
- Maximum features visible

---

## 🎯 Interactive Elements

### Buttons
**Primary (Gradient):**
- Background: Blue to purple gradient
- Text: White
- Shadow: Large glow
- Hover: Darker gradient, larger shadow

**Secondary (Outline):**
- Background: Transparent
- Border: Slate 700
- Text: White
- Hover: Slate 600 background

**Icon Buttons:**
- Circular or square
- Icon only
- Subtle hover effect

### Input Fields
**Text Inputs:**
- Background: Slate 900/50
- Border: Slate 700
- Focus: Blue ring
- Placeholder: Slate 500

**File Upload:**
- Dashed border
- Drag-active state (blue highlight)
- Drop zone indicator

### Cards
**Glass Cards:**
- Translucent background
- Backdrop blur
- Subtle border
- Shadow for depth

---

## 🌈 Visual Hierarchy

### Level 1 (Primary Focus)
- Main headline
- Call-to-action buttons
- Upload area (when no file)
- Submit button

### Level 2 (Secondary Focus)
- Section headings
- API key input
- Data preview
- Example prompts

### Level 3 (Supporting Info)
- Help text
- Status indicators
- Metadata
- Tooltips

---

## 💡 Visual Feedback

### Success States
- Green checkmark icons
- Green border/background tint
- Success message in green text
- Smooth transition from loading

### Error States
- Red alert icons
- Red border/background tint
- Error message in red text
- Clear action to resolve

### Loading States
- Animated spinner
- Pulsing elements
- Disabled state styling
- Progress indication

### Empty States
- Placeholder text
- Helpful icons
- Instructions
- Inviting call-to-action

---

## 🎨 Typography

### Font Family
```
System Fonts:
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
'Helvetica Neue', sans-serif

Code/Mono:
'Courier New', Courier, monospace
```

### Font Sizes
```
Display: 3rem (48px)
H1: 2.5rem (40px)
H2: 2rem (32px)
H3: 1.5rem (24px)
Body: 1rem (16px)
Small: 0.875rem (14px)
Tiny: 0.75rem (12px)
```

### Font Weights
```
Bold: 700
Semibold: 600
Medium: 500
Regular: 400
```

---

This visual guide helps developers and designers understand the app's appearance without screenshots.
