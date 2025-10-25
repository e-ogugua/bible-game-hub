#!/usr/bin/env node

/**
 * Lighthouse Audit Script
 *
 * Runs Lighthouse performance, accessibility, and SEO audits
 * Generates formatted reports for production monitoring
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const AUDIT_URL = process.env.AUDIT_URL || 'http://localhost:3000'
const OUTPUT_DIR = path.join(process.cwd(), 'audit-reports')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

console.log(`Running Lighthouse audits on: ${AUDIT_URL}`)

const audits = [
  {
    name: 'performance',
    config: 'lighthouse-config/performance.js'
  },
  {
    name: 'accessibility',
    config: 'lighthouse-config/accessibility.js'
  },
  {
    name: 'seo',
    config: 'lighthouse-config/seo.js'
  },
  {
    name: 'best-practices',
    config: 'lighthouse-config/best-practices.js'
  }
]

const results = {}

for (const audit of audits) {
  try {
    console.log(`\nRunning ${audit.name} audit...`)

    const outputPath = path.join(OUTPUT_DIR, `${audit.name}-report.json`)

    const command = `npx lighthouse ${AUDIT_URL} --output=json --output-path=${outputPath} --config-path=${audit.config} --chrome-flags="--headless --disable-gpu --no-sandbox"`

    execSync(command, {
      stdio: 'pipe',
      env: { ...process.env, LHCI_BUILD_CONTEXT__CURRENT_HASH: 'local' }
    })

    // Read and parse the report
    const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'))

    // Extract key metrics
    const score = report.categories[audit.name]?.score || 0
    const scorePercent = Math.round(score * 100)

    results[audit.name] = {
      score: scorePercent,
      passed: score >= 0.9, // 90% threshold for passing
      metrics: extractMetrics(report, audit.name)
    }

    console.log(`✓ ${audit.name}: ${scorePercent}%`)

  } catch (error) {
    console.error(`✗ ${audit.name} audit failed:`, error.message)
    results[audit.name] = {
      score: 0,
      passed: false,
      error: error.message
    }
  }
}

// Generate summary report
generateSummaryReport(results)

function extractMetrics(report, category) {
  const metrics = {}

  if (category === 'performance') {
    metrics.fcp = report.audits['first-contentful-paint']?.numericValue
    metrics.lcp = report.audits['largest-contentful-paint']?.numericValue
    metrics.cls = report.audits['cumulative-layout-shift']?.numericValue
    metrics.fid = report.audits['max-potential-fid']?.numericValue
  }

  if (category === 'accessibility') {
    metrics.ariaLabels = report.audits['aria-hidden-on-focus']?.score
    metrics.colorContrast = report.audits['color-contrast']?.score
    metrics.headingOrder = report.audits['heading-order']?.score
    metrics.keyboardNavigation = report.audits['keyboard']?.score
  }

  return metrics
}

function generateSummaryReport(results) {
  const timestamp = new Date().toISOString()
  const summary = {
    timestamp,
    url: AUDIT_URL,
    overall: {
      passed: Object.values(results).every(r => r.passed),
      totalScore: Math.round(
        Object.values(results).reduce((sum, r) => sum + r.score, 0) / Object.keys(results).length
      )
    },
    audits: results
  }

  // Save summary report
  const summaryPath = path.join(OUTPUT_DIR, 'audit-summary.json')
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))

  // Generate human-readable report
  const reportPath = path.join(OUTPUT_DIR, 'audit-report.txt')
  const report = generateHumanReport(summary)
  fs.writeFileSync(reportPath, report)

  console.log(`\n📊 Audit Summary:`)
  console.log(`Overall Score: ${summary.overall.totalScore}%`)
  console.log(`Status: ${summary.overall.passed ? '✅ PASS' : '❌ FAIL'}`)

  Object.entries(results).forEach(([name, result]) => {
    console.log(`${name}: ${result.score}% ${result.passed ? '✅' : '❌'}`)
  })

  console.log(`\n📄 Detailed reports saved to: ${OUTPUT_DIR}`)
}

function generateHumanReport(summary) {
  return `
LIGHTHOUSE AUDIT REPORT
======================

Timestamp: ${summary.timestamp}
URL: ${summary.url}
Overall Score: ${summary.overall.totalScore}%
Status: ${summary.overall.passed ? 'PASSING' : 'NEEDS IMPROVEMENT'}

AUDIT RESULTS
-------------

${Object.entries(summary.audits).map(([name, result]) => `
${name.toUpperCase()}: ${result.score}%
Status: ${result.passed ? 'PASS' : 'FAIL'}
${result.error ? `Error: ${result.error}` : ''}

Metrics:
${Object.entries(result.metrics || {}).map(([key, value]) => `  - ${key}: ${value}`).join('\n')}
`).join('\n')}

RECOMMENDATIONS
---------------

${!summary.overall.passed ? 'Address failing audits to improve scores.' : 'All audits passing! Maintain current standards.'}

Run again with: npm run audit
`
}
