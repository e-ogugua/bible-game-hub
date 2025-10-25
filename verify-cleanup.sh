#!/bin/bash

# Professional Identity Verification Script
# Verifies that cleanup was successful and didn't break functionality
# Usage: ./verify-cleanup.sh

set -e

echo "🔍 Verifying professional identity cleanup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Check for remaining emojis
print_status "Checking for remaining emojis..."
EMOJI_COUNT=$(grep -r "🌟\|✨\|🚀\|💫\|💪\|🎯\|🏆\|📊\|🔥\|💎\|⚡\|🔧\|🎨\|🎮\|📱\|😊\|🙏\|⭐\|💯\|❤️\|🎉" . --include="*.md" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules | wc -l)
if [ "$EMOJI_COUNT" -gt 0 ]; then
    print_error "Found $EMOJI_COUNT remaining emojis in source files"
    grep -r "🌟\|✨\|🚀\|💫\|💪\|🎯\|🏆\|📊\|🔥\|💎\|⚡\|🔧\|🎨\|🎮\|📱\|😊\|🙏\|⭐\|💯\|❤️\|🎉" . --include="*.md" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules
else
    print_status "No emojis found in source files ✓"
fi

# 2. Check for hype language
print_status "Checking for hype language..."
HYPE_COUNT=$(grep -ri "amazing\|excellent\|perfect\|beautiful\|outstanding\|brilliant\|awesome\|fantastic\|incredible\|super\|love and faith\|personal commitment" . --include="*.md" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules | wc -l)
if [ "$HYPE_COUNT" -gt 0 ]; then
    print_error "Found $HYPE_COUNT instances of hype language"
    grep -ri "amazing\|excellent\|perfect\|beautiful\|outstanding\|brilliant\|awesome\|fantastic\|incredible\|super\|love and faith\|personal commitment" . --include="*.md" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules
else
    print_status "No hype language found ✓"
fi

# 3. Verify author credit format
print_status "Verifying author credit format..."
AUTHOR_COUNT=$(grep -r "CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)" . --include="*.json" --include="*.tsx" --include="*.ts" --include="*.js" --include="*.md" --exclude-dir=node_modules | wc -l)
if [ "$AUTHOR_COUNT" -gt 0 ]; then
    print_status "Found $AUTHOR_COUNT instances of new author format ✓"
else
    print_error "No instances of new author format found"
fi

# 4. Check old author format still exists
OLD_AUTHOR_COUNT=$(grep -r "Emmanuel Chukwuka Ogugua" . --include="*.json" --include="*.tsx" --include="*.ts" --include="*.js" --include="*.md" --exclude-dir=node_modules | wc -l)
if [ "$OLD_AUTHOR_COUNT" -gt 0 ]; then
    print_warning "Found $OLD_AUTHOR_COUNT instances of old author format (may be in comments or documentation)"
    grep -r "Emmanuel Chukwuka Ogugua" . --include="*.json" --include="*.tsx" --include="*.ts" --include="*.js" --include="*.md" --exclude-dir=node_modules
else
    print_status "Old author format successfully removed ✓"
fi

# 5. Run TypeScript check
print_status "Running TypeScript type check..."
if command -v tsc &> /dev/null; then
    npx tsc --noEmit
    if [ $? -eq 0 ]; then
        print_status "TypeScript compilation successful ✓"
    else
        print_error "TypeScript compilation failed"
        exit 1
    fi
else
    print_warning "TypeScript compiler not available, skipping type check"
fi

# 6. Run linting
print_status "Running ESLint..."
npm run lint
if [ $? -eq 0 ]; then
    print_status "ESLint passed ✓"
else
    print_error "ESLint failed"
    exit 1
fi

# 7. Try building the project
print_status "Testing build..."
npm run build > build.log 2>&1
if [ $? -eq 0 ]; then
    print_status "Build successful ✓"
    rm build.log
else
    print_error "Build failed"
    cat build.log
    rm build.log
    exit 1
fi

# 8. Check for backup files
print_status "Checking backup files..."
BACKUP_COUNT=$(find . -name "*.bak" | wc -l)
if [ "$BACKUP_COUNT" -gt 0 ]; then
    print_warning "Found $BACKUP_COUNT backup files (.bak)"
    find . -name "*.bak"
else
    print_status "No backup files found ✓"
fi

echo ""
echo "📊 Verification Summary:"
echo "=========================="
echo "Emojis removed: $(grep -r "🌟\|✨\|🚀\|💫\|💪\|🎯\|🏆\|📊\|🔥\|💎\|⚡\|🔧\|🎨\|🎮\|📱\|😊\|🙏\|⭐\|💯\|❤️\|🎉" . --include="*.md" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules | wc -l)"
echo "Hype language removed: $(grep -ri "amazing\|excellent\|perfect\|beautiful\|outstanding\|brilliant\|awesome\|fantastic\|incredible\|super\|love and faith\|personal commitment" . --include="*.md" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules | wc -l)"
echo "New author format: $(grep -r "CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)" . --include="*.json" --include="*.tsx" --include="*.ts" --include="*.js" --include="*.md" --exclude-dir=node_modules | wc -l)"
echo "Old author format remaining: $(grep -r "Emmanuel Chukwuka Ogugua" . --include="*.json" --include="*.tsx" --include="*.ts" --include="*.js" --include="*.md" --exclude-dir=node_modules | wc -l)"
echo "Build status: ✓"
echo "Lint status: ✓"
echo "TypeScript status: ✓"

if [ "$EMOJI_COUNT" -eq 0 ] && [ "$HYPE_COUNT" -eq 0 ]; then
    print_status "✅ Professional identity cleanup completed successfully!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Review the changes in your IDE"
    echo "2. Remove backup files: find . -name '*.bak' -delete"
    echo "3. Commit changes: git add . && git commit -m 'chore: phase-1-professional-identity'"
    echo "4. Push to repository"
else
    print_error "❌ Cleanup incomplete. Please review the issues above."
    exit 1
fi
