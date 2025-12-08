# 📊 CSV Visualizer Pro

An AI-powered data visualization application that transforms CSV files into stunning charts using Claude AI. Built with Next.js, React, and the Anthropic API.

![CSV Visualizer Pro](https://img.shields.io/badge/Powered%20by-Claude%20AI-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

- **🤖 AI-Powered Visualizations**: Natural language prompts to generate custom charts
- **📁 CSV File Upload**: Drag-and-drop or browse to upload CSV files
- **🎨 Multiple Chart Types**: Bar charts, line charts, heatmaps, and more
- **💻 Python Code Generation**: Get production-ready Python code for your visualizations
- **🎯 Smart Data Analysis**: Claude AI analyzes your data structure automatically
- **🚀 Real-time Processing**: Fast visualization generation
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🌙 Dark Mode UI**: Beautiful, modern interface with glassmorphism effects

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Anthropic API key ([Get one here](https://console.anthropic.com))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd csv-visualizer-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Step 1: Configure API Key
1. Enter your Anthropic API key in the sidebar
2. Click "Save API Key" to store it for the session

### Step 2: Upload CSV File
1. Drag and drop a CSV file onto the upload area, or click to browse
2. Wait for the file to be parsed and validated
3. View the data preview to confirm successful upload

### Step 3: Create Visualizations
1. Enter a natural language prompt describing your desired visualization
2. Try the example prompts for inspiration
3. Click "Generate Visualization" to let Claude create Python code
4. Copy the generated code to run in your Python environment

### Example Prompts

```
"Create a bar chart showing quarterly operating income for each product line"

"Plot a line chart comparing net income trends across all quarters with a purple gradient"

"Generate a clustered bar chart of revenue by product with light-to-dark blue colors"

"Create a heatmap showing correlation between financial metrics"
```

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14.2 (App Router)
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS 3.4
- **API**: Anthropic Claude Sonnet 4
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React
- **Language**: TypeScript

## 📂 Project Structure

```
csv-visualizer-app/
├── app/
│   ├── api/
│   │   └── visualize/
│   │       └── route.ts          # API endpoint for Claude
│   ├── globals.css               # Global styles & design system
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── components/
│   ├── FileUpload.tsx            # CSV file upload component
│   ├── Header.tsx                # App header with branding
│   ├── Sidebar.tsx               # Configuration sidebar
│   └── VisualizationPanel.tsx    # Visualization display & controls
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🎨 Design System

The app features a custom design system with:
- **Color Palette**: Blue to purple gradient theme
- **Typography**: System fonts with smooth scaling
- **Spacing**: 8px base grid system
- **Components**: Glassmorphism cards, gradient buttons, smooth animations
- **Responsive**: Mobile-first design with breakpoints at 768px, 1024px, 1280px

## 🔒 Security Notes

- API keys are stored only in client-side memory (not persisted)
- All API calls are made from the browser to Anthropic's servers
- No data is stored on the server
- CSV files are processed client-side only

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow the prompts** to configure your deployment

### Manual Deployment

1. **Build the application**
```bash
npm run build
```

2. **Start the production server**
```bash
npm start
```

## 📊 Example Use Cases

1. **Financial Analysis**: Visualize quarterly earnings, revenue trends, profit margins
2. **Sales Data**: Compare product performance, regional sales, growth metrics
3. **Analytics**: User engagement, conversion rates, traffic patterns
4. **Research**: Scientific data, survey results, experimental findings
5. **Business Intelligence**: KPIs, dashboards, executive reports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com) for Claude AI
- [Vercel](https://vercel.com) for Next.js
- [Tailwind Labs](https://tailwindcss.com) for Tailwind CSS

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Claude AI**
