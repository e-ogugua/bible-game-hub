# GitHub Actions CI/CD Pipeline

This directory contains GitHub Actions workflows for automated testing, building, and deployment of the Bible Game Hub.

## Workflows Overview

### CI Pipeline (`.github/workflows/ci.yml`)
Automated testing and quality checks for pull requests and main branch pushes.

### CD Pipeline (`.github/workflows/cd.yml`)
Automated deployment to production environments.

### Security Audit (`.github/workflows/security.yml`)
Regular security vulnerability scanning and dependency auditing.

## CI Pipeline Jobs

### Lint Job
```yaml
name: Lint
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Run ESLint
    run: npm run lint

  - name: Run Prettier check
    run: npx prettier --check .

  - name: TypeScript type check
    run: npx tsc --noEmit
```

### Test Job
```yaml
name: Test
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Run tests
    run: npm run test

  - name: Upload coverage to Codecov
    uses: codecov/codecov-action@v3
    with:
      file: ./coverage/lcov.info
      flags: unittests
      name: codecov-umbrella
```

### Build Job
```yaml
name: Build
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Build application
    run: npm run build

  - name: Upload build artifacts
    uses: actions/upload-artifact@v3
    with:
      name: build-artifacts
      path: .next/
      retention-days: 7
```

### Bundle Analysis Job
```yaml
name: Bundle Analysis
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Analyze bundle
    run: ANALYZE=true npm run build

  - name: Upload bundle analysis
    uses: actions/upload-artifact@v3
    with:
      name: bundle-analysis
      path: .next/analyze/
```

## Security Audit Jobs

### Dependency Audit
```yaml
name: Security Audit
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4

  - name: Run npm audit
    run: npm audit --audit-level=moderate

  - name: Run security scan
    uses: github/super-linter/slim@v4
    env:
      DEFAULT_BRANCH: main
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      VALIDATE_ALL_CODEBASE: false
      VALIDATE_JAVASCRIPT_ES: true
      VALIDATE_TYPESCRIPT_ES: true
```

### Vulnerability Scanning
```yaml
name: Vulnerability Scan
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Run security scan
    uses: securecodewarrior/github-action-sast@v1
    with:
      scanner: 'semgrep'
      config: 'auto'

  - name: Upload security report
    uses: actions/upload-artifact@v3
    if: always()
    with:
      name: security-report
      path: security-report/
```

## CD Pipeline Jobs

### Deploy to Staging
```yaml
name: Deploy to Staging
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Build for staging
    run: npm run build
    env:
      NODE_ENV: staging

  - name: Deploy to Vercel
    uses: vercel/action@v25
    with:
      vercel-token: ${{ secrets.VERCEL_TOKEN }}
      vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
      vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
      vercel-args: '--prod=false'
```

### Deploy to Production
```yaml
name: Deploy to Production
runs-on: ubuntu-latest
if: github.ref == 'refs/heads/main' && github.event_name == 'push'
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Run tests
    run: npm run test

  - name: Build for production
    run: npm run build
    env:
      NODE_ENV: production

  - name: Deploy to Vercel
    uses: vercel/action@v25
    with:
      vercel-token: ${{ secrets.VERCEL_TOKEN }}
      vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
      vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
      vercel-args: '--prod'
```

## Monitoring & Alerting

### Performance Monitoring
```yaml
name: Performance Monitoring
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Build and analyze
    run: npm run build && npm run lighthouse

  - name: Upload performance metrics
    uses: actions/upload-artifact@v3
    with:
      name: performance-metrics
      path: .lighthouse/
```

### Error Tracking
```yaml
name: Error Tracking Setup
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4

  - name: Setup error tracking
    run: |
      echo "SENTRY_DSN=${{ secrets.SENTRY_DSN }}" >> .env.local
      echo "SENTRY_ORG=${{ secrets.SENTRY_ORG }}" >> .env.local
      echo "SENTRY_PROJECT=${{ secrets.SENTRY_PROJECT }}" >> .env.local
```

## Quality Gates

### Pull Request Requirements
```yaml
# .github/workflows/quality-gate.yml
name: Quality Gate
on:
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Check linting
        run: npm run lint

      - name: Build check
        run: npm run build

      - name: Bundle size check
        run: |
          npm run analyze
          # Check if bundle size exceeds threshold
          if [ $(du -sb .next/static/chunks/*.js | cut -f1) -gt 52428800 ]; then
            echo "Bundle size too large"
            exit 1
          fi

      - name: Accessibility check
        run: npm run accessibility-audit

      - name: Performance check
        run: npm run lighthouse
```

## Workflow Triggers

### Pull Request
```yaml
on:
  pull_request:
    branches: [main]
    paths:
      - 'src/**'
      - 'public/**'
      - 'package.json'
      - 'next.config.js'
```

### Main Branch Push
```yaml
on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'public/**'
      - 'package.json'
      - 'next.config.js'
```

### Scheduled Security Audit
```yaml
on:
  schedule:
    - cron: '0 6 * * 1'  # Weekly on Monday at 6 AM UTC
```

## Environment Variables

```yaml
env:
  NODE_ENV: test
  NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  # Add other environment variables as needed
```

## Deployment Environments

### Development
- Trigger: Pull request creation
- Environment: Staging environment
- Database: Development database
- Features: All features enabled for testing

### Production
- Trigger: Main branch merge
- Environment: Production environment
- Database: Production database
- Features: Production-ready features only

### Hotfix
- Trigger: Hotfix branch merge
- Environment: Production environment
- Database: Production database
- Features: Critical fixes only

## Monitoring Integration

### GitHub Integration
```yaml
# .github/workflows/monitoring.yml
name: Application Monitoring
on:
  push:
    branches: [main]

jobs:
  monitoring:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup monitoring
        run: |
          # Setup error tracking
          # Setup performance monitoring
          # Setup uptime monitoring

      - name: Health check
        run: curl -f https://biblegamehub.com/api/health
```

This CI/CD pipeline ensures code quality, security, and reliable deployments for the Bible Game Hub application.
