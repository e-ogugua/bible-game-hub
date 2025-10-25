#!/bin/bash

# Professional Identity Cleanup Script
# Removes emojis, hype language, and updates author credits
# Usage: ./cleanup.sh

set -e

echo "🧹 Starting professional identity cleanup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Clean README.md - Remove emojis and hype, update author
print_status "Cleaning README.md..."
sed -i.bak -E '
# Remove emoji headers (🌟, ✨, 🚀, 🎯, 🎨, 🎮, 📱, 👥, 🔧, 🌐, 📚, 🔮, 🤝, 📄, 🙏)
s/^## 🌟 /## /g
s/^## ✨ /## /g
s/^## 🚀 /## /g
s/^## 🎯 /## /g
s/^## 🎨 /## /g
s/^## 🎮 /## /g
s/^## 📱 /## /g
s/^## 👥 /## /g
s/^## 🔧 /## /g
s/^## 🌐 /## /g
s/^## 📚 /## /g
s/^## 🔮 /## /g
s/^## 🤝 /## /g
s/^## 📄 /## /g
s/^## 🙏 /## /g

# Remove emoji from list items (- ✨, - 🎵, - 📚, - 🎮)
s/^(- )✨ /\1/g
s/^(- )🎵 /\1/g
s/^(- )📚 /\1/g
s/^(- )🎮 /\1/g

# Remove emoji from features section (### 🎮, ### 🎨, ### 👥)
s/^### 🎮 /### /g
s/^### 🎨 /### /g
s/^### 👥 /### /g

# Remove standalone emojis and emoji patterns
s/ 🌟//g
s/ ✨//g
s/ 🚀//g
s/ 💫//g
s/ 💪//g
s/ 🎯//g
s/ 🏆//g
s/ 📊//g
s/ 🔥//g
s/ 💎//g
s/ ⚡//g
s/ 🔧//g
s/ 🎨//g
s/ 🎮//g
s/ 📱//g
s/ 🌟//g
s/ 😊//g
s/ 🙏//g
s/ ⭐//g
s/ 💯//g
s/ ❤️//g
s/ 🎉//g

# Remove hype language patterns
s/ Built with love and faith//g
s/ Built with ❤️//g
s/This project represents my personal commitment//g
s/I envision Bible Game Hub becoming//g
s/I chose Next.js 15 for its excellent performance//g
s/I implemented React Context for global state management//g
s/Tailwind CSS provides the foundation with custom design tokens that maintain consistency. I created//g
s/I'"'"'m continually working to expand//g

# Update author credit format
s/Built with ❤️ by Emmanuel Chukwuka Ogugua/Developed by CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)/g
s/Email: emmachuka@gmail.com/Email: ceo@emmanuelos.dev/g
' README.md

# 2. Clean package.json - Update author and description
print_status "Cleaning package.json..."
sed -i.bak -E '
s/"author": "Emmanuel Chukwuka Ogugua <emmachuka@gmail.com>"/"author": "CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS) <ceo@emmanuelos.dev>"/g
s/Interactive Bible Games Hub - Scripture quiz games, biblical knowledge challenges, and faith-based learning platform/Interactive Bible Games Hub - Faith-based learning platform/g
' package.json

# 3. Clean layout.tsx - Update metadata
print_status "Cleaning layout.tsx..."
sed -i.bak -E '
s/authors: \[{ name: '"'"'Emmanuel Chukwuka Ogugua'"'"' }\]/authors: [{ name: '"'"'CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)'"'"' }]/g
s/creator: '"'"'Emmanuel Chukwuka Ogugua'"'"'/creator: '"'"'CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)'"'"'/g
s/Immerse yourself in faith-based gaming with Bible quizzes, scripture memory challenges, character stories, and biblical adventures. Strengthen your spiritual journey through interactive play./Interactive faith-based gaming platform featuring Bible quizzes, scripture memory challenges, character stories, and biblical adventures./g
' src/app/layout.tsx

# 4. Clean manifest.json - Update name if needed
print_status "Cleaning manifest.json..."
sed -i.bak -E '
s/"name": "Bible Game Hub"/"name": "Bible Game Hub"/g
s/"short_name": "Bible Games"/"short_name": "Bible Games"/g
s/"description": "Interactive Scripture Games & Biblical Knowledge"/"description": "Interactive Scripture Games & Biblical Knowledge"/g
' public/manifest.json

# 5. Clean all TypeScript/JavaScript files - Remove emojis and hype comments
print_status "Cleaning TypeScript/JavaScript files..."
find src -name "*.tsx" -o -name "*.ts" -o -name "*.js" | while read file; do
    if [ -f "$file" ]; then
        # Create backup
        cp "$file" "${file}.bak"

        # Remove emojis and hype language from comments
        sed -i -E '
        # Remove standalone emojis from comments
        s/[ ]*🌟//g
        s/[ ]*✨//g
        s/[ ]*🚀//g
        s/[ ]*💫//g
        s/[ ]*💪//g
        s/[ ]*🎯//g
        s/[ ]*🏆//g
        s/[ ]*📊//g
        s/[ ]*🔥//g
        s/[ ]*💎//g
        s/[ ]*⚡//g
        s/[ ]*🔧//g
        s/[ ]*🎨//g
        s/[ ]*🎮//g
        s/[ ]*📱//g
        s/[ ]*🌟//g
        s/[ ]*😊//g
        s/[ ]*🙏//g
        s/[ ]*⭐//g
        s/[ ]*💯//g
        s/[ ]*❤️//g
        s/[ ]*🎉//g

        # Remove hype language from comments
        s/Amazing!//g
        s/Excellent!//g
        s/Perfect!//g
        s/Beautiful!//g
        s/Outstanding!//g
        s/Brilliant!//g
        s/Awesome!//g
        s/Fantastic!//g
        s/Incredible!//g
        s/Super!//g

        # Professionalize TODO and FIXME comments
        s/TODO: /TODO: /g
        s/FIXME: /FIXME: /g
        s/NOTE: /NOTE: /g
        s/HACK: /HACK: /g
        s/BUG: /BUG: /g
        s/XXX: /XXX: /g
        ' "$file"
    fi
done

# 6. Clean markdown files
print_status "Cleaning markdown files..."
find . -name "*.md" -not -path "./node_modules/*" | while read file; do
    if [ -f "$file" ]; then
        # Create backup
        cp "$file" "${file}.bak"

        # Remove emojis from markdown
        sed -i -E '
        # Remove emoji headers
        s/^# 🌟 /# /g
        s/^# ✨ /# /g
        s/^# 🚀 /# /g
        s/^# 💫 /# /g
        s/^# 💪 /# /g
        s/^# 🎯 /# /g
        s/^# 🏆 /# /g
        s/^# 📊 /# /g
        s/^# 🔥 /# /g
        s/^# 💎 /# /g
        s/^# ⚡ /# /g
        s/^# 🔧 /# /g
        s/^# 🎨 /# /g
        s/^# 🎮 /# /g
        s/^# 📱 /# /g
        s/^# 🌟 /# /g
        s/^# 😊 /# /g
        s/^# 🙏 /# /g
        s/^# ⭐ /# /g
        s/^# 💯 /# /g
        s/^# ❤️ /# /g
        s/^# 🎉 /# /g

        # Remove emoji from any headers
        s/^## 🌟 /## /g
        s/^## ✨ /## /g
        s/^## 🚀 /## /g
        s/^## 💫 /## /g
        s/^## 💪 /## /g
        s/^## 🎯 /## /g
        s/^## 🏆 /## /g
        s/^## 📊 /## /g
        s/^## 🔥 /## /g
        s/^## 💎 /## /g
        s/^## ⚡ /## /g
        s/^## 🔧 /## /g
        s/^## 🎨 /## /g
        s/^## 🎮 /## /g
        s/^## 📱 /## /g
        s/^## 🌟 /## /g
        s/^## 😊 /## /g
        s/^## 🙏 /## /g
        s/^## ⭐ /## /g
        s/^## 💯 /## /g
        s/^## ❤️ /## /g
        s/^## 🎉 /## /g

        # Remove emoji from any subheaders
        s/^### 🌟 /### /g
        s/^### ✨ /### /g
        s/^### 🚀 /### /g
        s/^### 💫 /### /g
        s/^### 💪 /### /g
        s/^### 🎯 /### /g
        s/^### 🏆 /### /g
        s/^### 📊 /### /g
        s/^### 🔥 /### /g
        s/^### 💎 /### /g
        s/^### ⚡ /### /g
        s/^### 🔧 /### /g
        s/^### 🎨 /### /g
        s/^### 🎮 /### /g
        s/^### 📱 /### /g
        s/^### 🌟 /### /g
        s/^### 😊 /### /g
        s/^### 🙏 /### /g
        s/^### ⭐ /### /g
        s/^### 💯 /### /g
        s/^### ❤️ /### /g
        s/^### 🎉 /### /g

        # Remove standalone emojis
        s/ 🌟//g
        s/ ✨//g
        s/ 🚀//g
        s/ 💫//g
        s/ 💪//g
        s/ 🎯//g
        s/ 🏆//g
        s/ 📊//g
        s/ 🔥//g
        s/ 💎//g
        s/ ⚡//g
        s/ 🔧//g
        s/ 🎨//g
        s/ 🎮//g
        s/ 📱//g
        s/ 🌟//g
        s/ 😊//g
        s/ 🙏//g
        s/ ⭐//g
        s/ 💯//g
        s/ ❤️//g
        s/ 🎉//g

        # Remove hype language
        s/Built with love and faith//g
        s/Built with ❤️//g
        s/This project represents my personal commitment//g
        s/I envision Bible Game Hub becoming//g
        s/Amazing!//g
        s/Excellent!//g
        s/Perfect!//g
        s/Beautiful!//g
        s/Outstanding!//g
        s/Brilliant!//g
        s/Awesome!//g
        s/Fantastic!//g
        s/Incredible!//g
        s/Super!//g
        ' "$file"
    fi
done

# 7. Update author in all relevant files
print_status "Updating author credits..."
find . -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | grep -v node_modules | grep -v ".bak" | while read file; do
    if [ -f "$file" ]; then
        # Update author references
        sed -i -E '
        s/Emmanuel Chukwuka Ogugua/CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)/g
        s/emmachuka@gmail.com/ceo@emmanuelos.dev/g
        ' "$file"
    fi
done

print_status "Cleanup complete!"
print_warning "Backup files created with .bak extension"
print_status "Review changes before committing"

echo ""
echo "Next steps:"
echo "1. Review the .bak files to see what was changed"
echo "2. Run 'npm run build' to ensure no functionality was broken"
echo "3. Run 'npm run lint' to check code quality"
echo "4. Commit the changes with the professional commit message"
