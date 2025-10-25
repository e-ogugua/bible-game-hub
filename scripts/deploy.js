#!/usr/bin/env node

/**
 * Manual Vercel Deployment Script
 *
 * This script provides manual deployment options when automatic
 * GitHub integration isn't working.
 */

import { execSync } from 'child_process'
import fs from 'fs'

const isProduction = process.env.NODE_ENV === 'production'
const projectName = 'bible-game-hub'

console.log('🚀 Bible Game Hub - Manual Deployment Script')
console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`)
console.log(`Project: ${projectName}\n`)

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'pipe' })
  console.log('✅ Vercel CLI detected')
} catch {
  console.log('❌ Vercel CLI not found. Installing...')
  execSync('npm install -g vercel', { stdio: 'inherit' })
}

console.log('\n📋 Deployment Options:')
console.log('1. Deploy to existing Vercel project')
console.log('2. Create new Vercel project')
console.log('3. Deploy with custom configuration')
console.log('4. Check deployment status')

const option = process.argv[2] || '1'

switch (option) {
  case '1':
    console.log('\n🔗 Deploying to existing Vercel project...')
    try {
      execSync(`vercel --prod`, { stdio: 'inherit' })
      console.log('\n✅ Deployment completed successfully!')
    } catch (deployError) {
      console.error('\n❌ Deployment failed:', deployError.message)
      console.log('\n🔧 Troubleshooting:')
      console.log('1. Make sure you\'re logged in: vercel login')
      console.log('2. Check project connection: vercel link')
      console.log('3. Verify build settings: vercel --version')
    }
    break

  case '2':
    console.log('\n🆕 Creating new Vercel project...')
    try {
      execSync(`vercel --yes`, { stdio: 'inherit' })
      console.log('\n✅ New project created successfully!')
      console.log('📝 Note: Update vercel.json and push to enable auto-deployment')
    } catch (createError) {
      console.error('\n❌ Project creation failed:', createError.message)
    }
    break

  case '3':
    console.log('\n⚙️  Custom deployment configuration...')
    console.log('Current vercel.json configuration:')
    try {
      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'))
      console.log(JSON.stringify(config, null, 2))

      console.log('\n🔄 Deploying with custom config...')
      execSync(`vercel --prod --yes`, { stdio: 'inherit' })
    } catch (configError) {
      console.error('\n❌ Configuration error:', configError.message)
    }
    break

  case '4':
    console.log('\n📊 Checking deployment status...')
    try {
      execSync(`vercel ls`, { stdio: 'inherit' })
      execSync(`vercel logs bible-game-hub --follow`, { stdio: 'inherit' })
    } catch (statusError) {
      console.error('\n❌ Status check failed:', statusError.message)
    }
    break

  default:
    console.log('\n❓ Usage: node deploy.js [option]')
    console.log('Options: 1 (default), 2, 3, 4')
    console.log('\nExample: node deploy.js 1')
}

console.log('\n📚 Additional Commands:')
console.log('vercel login                    # Login to Vercel')
console.log('vercel link                     # Link to existing project')
console.log('vercel --version                # Check CLI version')
console.log('vercel logs [deployment]        # View deployment logs')
console.log('vercel ls                       # List all deployments')

if (isProduction) {
  console.log('\n🚨 PRODUCTION DEPLOYMENT COMPLETE')
  console.log('Monitor your site at: https://bible-game-hub.vercel.app')
} else {
  console.log('\n🧪 DEVELOPMENT DEPLOYMENT COMPLETE')
  console.log('Test your changes before production deployment')
}
