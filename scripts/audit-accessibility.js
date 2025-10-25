#!/usr/bin/env node

/**
 * Axe-Core Accessibility Audit Script
 *
 * Runs comprehensive accessibility audits using axe-core
 * Generates detailed reports for WCAG compliance verification
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import { AxePuppeteer } from '@axe-core/puppeteer'

const __filename = fileURLToPath(import.meta.url)

const AUDIT_URL = process.env.AUDIT_URL || 'http://localhost:3000'
const OUTPUT_DIR = path.join(process.cwd(), 'audit-reports', 'accessibility')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

console.log(`Running axe-core accessibility audit on: ${AUDIT_URL}`)

async function runAccessibilityAudit() {
  let browser = null

  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    })

    const page = await browser.newPage()

    // Set up viewport for consistent testing
    await page.setViewport({ width: 1280, height: 720 })

    console.log('Loading page...')
    await page.goto(AUDIT_URL, {
      waitUntil: 'networkidle0',
      timeout: 30000
    })

    // Wait for page to be fully loaded
    await page.waitForTimeout(2000)

    console.log('Running accessibility audit...')

    // Run axe-core audit
    const results = await new AxePuppeteer(page).analyze()

    // Process results
    const report = processResults(results)

    // Save detailed report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const reportPath = path.join(OUTPUT_DIR, `axe-report-${timestamp}.json`)
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))

    // Save summary report
    const summaryPath = path.join(OUTPUT_DIR, 'axe-summary.json')
    fs.writeFileSync(summaryPath, JSON.stringify(report, null, 2))

    // Generate human-readable report
    const humanReport = generateHumanReport(report, results)
    const humanReportPath = path.join(OUTPUT_DIR, 'axe-report.txt')
    fs.writeFileSync(humanReportPath, humanReport)

    // Output summary to console
    printSummary(report)

    console.log(`\nAccessibility audit complete!`)
    console.log(`Reports saved to: ${OUTPUT_DIR}`)

    return report

  } catch (error) {
    console.error('Accessibility audit failed:', error.message)

    // Save error report
    const errorReport = {
      timestamp: new Date().toISOString(),
      url: AUDIT_URL,
      error: error.message,
      passed: false,
      score: 0
    }

    const errorPath = path.join(OUTPUT_DIR, 'axe-error.json')
    fs.writeFileSync(errorPath, JSON.stringify(errorReport, null, 2))

    return errorReport

  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

function processResults(results) {
  const violations = results.violations || []
  const passes = results.passes || []
  const incomplete = results.incomplete || []

  // Calculate scores by impact
  const criticalCount = violations.filter(v => v.impact === 'critical').length
  const seriousCount = violations.filter(v => v.impact === 'serious').length
  const moderateCount = violations.filter(v => v.impact === 'moderate').length
  const minorCount = violations.filter(v => v.impact === 'minor').length

  // Calculate overall score (WCAG 2.1 AA compliance)
  const totalIssues = violations.length
  const maxScore = 100
  const penaltyPerCritical = 10
  const penaltyPerSerious = 5
  const penaltyPerModerate = 2
  const penaltyPerMinor = 1

  const penalty =
    (criticalCount * penaltyPerCritical) +
    (seriousCount * penaltyPerSerious) +
    (moderateCount * penaltyPerModerate) +
    (minorCount * penaltyPerMinor)

  const score = Math.max(0, maxScore - penalty)

  return {
    timestamp: new Date().toISOString(),
    url: AUDIT_URL,
    score: Math.round(score),
    passed: score >= 90, // 90% threshold for WCAG AA compliance
    violations: {
      total: totalIssues,
      critical: criticalCount,
      serious: seriousCount,
      moderate: moderateCount,
      minor: minorCount
    },
    passes: passes.length,
    incomplete: incomplete.length,
    rules: violations.map(v => ({
      rule: v.id,
      description: v.description,
      impact: v.impact,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes?.length || 0
    }))
  }
}

function generateHumanReport(summary, fullResults) {
  return `
AXE-CORE ACCESSIBILITY AUDIT REPORT
===================================

Timestamp: ${summary.timestamp}
URL: ${summary.url}
Overall Score: ${summary.score}%
WCAG 2.1 AA Compliance: ${summary.passed ? 'PASSING' : 'NEEDS IMPROVEMENT'}

VIOLATIONS SUMMARY
------------------

Total Violations: ${summary.violations.total}
Critical: ${summary.violations.critical}
Serious: ${summary.violations.serious}
Moderate: ${summary.violations.moderate}
Minor: ${summary.violations.minor}

${summary.violations.total > 0 ? `
VIOLATIONS BY RULE
------------------

${summary.rules.map(rule => `
Rule: ${rule.rule}
Description: ${rule.description}
Impact: ${rule.impact}
Affected Elements: ${rule.nodes}
Help: ${rule.help}
Documentation: ${rule.helpUrl}
`).join('\n')}
` : 'No violations found!'}

RECOMMENDATIONS
---------------

${summary.passed ? 'All accessibility checks passing! Maintain current standards.' : `
Address the following priority issues:

1. Critical violations (${summary.violations.critical}) - Fix immediately
2. Serious violations (${summary.violations.serious}) - Fix in next release
3. Moderate violations (${summary.violations.moderate}) - Address in upcoming sprints
4. Minor violations (${summary.violations.minor}) - Track and fix as time permits

Target WCAG 2.1 AA compliance score: 90%+
Current score: ${summary.score}%
`}

Run again with: npm run audit:accessibility
`
}

function printSummary(summary) {
  console.log(`\n📊 Axe-Core Audit Summary:`)
  console.log(`Overall Score: ${summary.score}%`)
  console.log(`WCAG 2.1 AA: ${summary.passed ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}`)
  console.log(`\nViolations:`)
  console.log(`  Critical: ${summary.violations.critical}`)
  console.log(`  Serious: ${summary.violations.serious}`)
  console.log(`  Moderate: ${summary.violations.moderate}`)
  console.log(`  Minor: ${summary.violations.minor}`)
}

// Run the audit
runAccessibilityAudit().catch(console.error)
