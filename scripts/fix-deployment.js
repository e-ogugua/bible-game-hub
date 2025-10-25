#!/usr/bin/env node

/**
 * Vercel Integration Fix Script
 *
 * This script helps troubleshoot and fix Vercel deployment issues
 * when automatic integration isn't working.
 */

import { execSync } from 'child_process'

console.log('🔧 Bible Game Hub - Vercel Integration Fix')
console.log('Diagnosing deployment issues...\n')

// Check current git status
try {
  console.log('📊 Checking Git status...')
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' })
  if (gitStatus.trim()) {
    console.log('⚠️  You have uncommitted changes. Commit them first:')
    console.log('   git add . && git commit -m "fix: deployment preparation"')
    console.log('   git push origin main')
  } else {
    console.log('✅ Git working tree is clean')
  }
} catch (gitError) {
  console.error('❌ Git check failed:', gitError.message)
}

console.log('\n🔗 Checking Vercel integration...')

// Check if Vercel CLI is available
try {
  execSync('vercel --version', { stdio: 'pipe' })
  console.log('✅ Vercel CLI is installed')

  console.log('\n📋 Available Vercel commands:')
  console.log('1. Check if logged in: vercel whoami')
  console.log('2. Link to project: vercel link')
  console.log('3. Deploy manually: vercel --prod')
  console.log('4. Check deployments: vercel ls')
  console.log('5. View logs: vercel logs bible-game-hub')

  console.log('\n🚀 Manual deployment:')
  console.log('npm run deploy        # Interactive deployment script')
  console.log('npm run vercel:deploy # Direct Vercel deployment')

} catch {
  console.log('❌ Vercel CLI not found. Installing...')
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' })
    console.log('✅ Vercel CLI installed successfully')
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI:', installError.message)
  }
}

// Check package.json for deployment scripts
console.log('\n📦 Checking deployment scripts...')
console.log('Available scripts:')
console.log('- npm run build        # Test build locally')
console.log('- npm run deploy       # Interactive deployment')
console.log('- npm run vercel:deploy # Direct Vercel deploy')

console.log('\n🔍 Manual Troubleshooting Steps:')

console.log('\n1️⃣  Check Vercel Dashboard:')
console.log('   - Go to https://vercel.com/dashboard')
console.log('   - Find your Bible Game Hub project')
console.log('   - Check if GitHub integration is active')
console.log('   - Verify branch settings (should be "main")')

console.log('\n2️⃣  Reconnect GitHub Integration:')
console.log('   - In Vercel dashboard, go to project settings')
console.log('   - Click "GitHub Integration"')
console.log('   - Disconnect and reconnect repository')
console.log('   - Ensure main branch is selected for production')

console.log('\n3️⃣  Manual Deployment via CLI:')
console.log('   - Run: vercel login')
console.log('   - Run: vercel link (to connect project)')
console.log('   - Run: npm run vercel:deploy')

console.log('\n4️⃣  Check Build Configuration:')
console.log('   - Verify vercel.json is correct')
console.log('   - Check if all dependencies are in package.json')
console.log('   - Ensure build command is "npm run build"')

console.log('\n5️⃣  Force New Deployment:')
console.log('   - Push empty commit: git commit --allow-empty -m "trigger deploy"')
console.log('   - Or use manual deployment script')

console.log('\n⚡ Quick Fix Commands:')
console.log('vercel login                           # Login to Vercel')
console.log('vercel link                            # Link to project')
console.log('vercel --prod                          # Deploy to production')
console.log('vercel logs bible-game-hub --follow    # View live logs')

console.log('\n📞 If still failing:')
console.log('- Check Vercel status: https://status.vercel.com')
console.log('- Contact Vercel support with deployment logs')
console.log('- Use manual deployment as fallback')

console.log('\n🎯 Next Steps:')
console.log('1. Try manual deployment first: npm run deploy')
console.log('2. Check Vercel dashboard for integration status')
console.log('3. Reconnect GitHub integration if needed')
console.log('4. Monitor deployment logs for errors')
