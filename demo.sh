#!/bin/bash

# CSV Visualizer Pro - Demo Script
# This script helps you quickly test the application

echo "🎨 CSV Visualizer Pro - Demo Script"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.x or higher."
    echo "   Visit: https://nodejs.org"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the csv-visualizer-app directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create sample CSV if it doesn't exist
if [ ! -f "sample-data.csv" ]; then
    echo "📊 Creating sample CSV file..."
    cat > sample-data.csv << 'EOF'
quarter,product_line,revenue,cost,profit,margin_pct
Q1,SaaS Platform,450000,230000,220000,48.9
Q1,Enterprise Solutions,280000,135000,145000,51.8
Q1,Professional Services,125000,57000,68000,54.4
Q2,SaaS Platform,555000,277000,278000,50.1
Q2,Enterprise Solutions,340000,168000,172000,50.6
Q2,Professional Services,158000,72000,86000,54.4
Q3,SaaS Platform,665000,323000,342000,51.4
Q3,Enterprise Solutions,410000,197000,213000,52.0
Q3,Professional Services,198000,89000,109000,55.1
Q4,SaaS Platform,795000,380000,415000,52.2
Q4,Enterprise Solutions,490000,229000,261000,53.3
Q4,Professional Services,238000,106000,132000,55.5
EOF
    echo "✅ Sample CSV created: sample-data.csv"
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "📌 Next Steps:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Enter your Anthropic API key in the sidebar"
echo "   3. Upload the sample-data.csv file (or your own)"
echo "   4. Try these example prompts:"
echo ""
echo "      • 'Create a bar chart showing quarterly revenue by product line'"
echo "      • 'Plot profit margins over time with a line chart'"
echo "      • 'Generate a stacked bar chart of revenue vs cost'"
echo ""
echo "🔑 Get your API key at: https://console.anthropic.com"
echo ""
echo "Press Ctrl+C to stop the server"
echo "===================================="
echo ""

# Start the development server
npm run dev
