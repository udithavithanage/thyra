# Team Collaboration

Set up Thyra across your development team for consistent, efficient project access. Perfect for teams, agencies, and organizations.

---

## Why Team-Wide Thyra?

**Benefits:**

- ✅ Consistent project access across all developers
- ✅ Faster onboarding for new team members
- ✅ Standardized development workflows
- ✅ Reduced "where is that project?" questions
- ✅ Better collaboration and knowledge sharing

---

## Team Setup Strategies

### Strategy 1: Shared Naming Convention

Create a team standard for project names:

```bash
# Company naming standard
<project>-<component>

# Examples:
thyra config dashboard-frontend ~/company/dashboard/frontend
thyra config dashboard-backend ~/company/dashboard/backend
thyra config mobile-ios ~/company/mobile/ios-app
thyra config mobile-android ~/company/mobile/android-app
```

**Document it:**

```markdown
# Team Thyra Standards

## Naming Convention

- Format: `<project>-<component>`
- Use lowercase with hyphens
- Be descriptive but concise

## Examples

- `ecommerce-web` - E-commerce website
- `ecommerce-api` - E-commerce API
- `crm-frontend` - CRM frontend app
- `crm-backend` - CRM backend services
```

---

### Strategy 2: Shared Setup Script

Create an onboarding script for new team members:

```bash
#!/bin/bash
# setup-thyra-team.sh

echo "Setting up team projects in Thyra..."

# Install Thyra if not installed
if ! command -v thyra &> /dev/null; then
    echo "Installing Thyra..."
    npm install -g thyra
fi

# Add all team projects
thyra config dashboard-web ~/projects/dashboard/web-app
thyra config dashboard-api ~/projects/dashboard/api-server
thyra config mobile-ios ~/projects/mobile/ios
thyra config mobile-android ~/projects/mobile/android
thyra config design-system ~/projects/shared/design-system
thyra config documentation ~/projects/shared/docs

echo "✅ Team projects configured!"
echo "Run 'thyra list' to see all projects"
```

**Usage:**

```bash
# New team member runs:
chmod +x setup-thyra-team.sh
./setup-thyra-team.sh
```

---

### Strategy 3: Repository-Based Configuration

Keep setup scripts in your project repositories:

```
company-projects/
├── setup/
│   ├── thyra-setup.sh
│   ├── README.md
│   └── project-map.md
└── projects/
    ├── dashboard/
    ├── mobile/
    └── api/
```

**`thyra-setup.sh`:**

```bash
#!/bin/bash
# Run this after cloning repositories

BASE_DIR="$HOME/company-projects"

thyra config dashboard "$BASE_DIR/projects/dashboard"
thyra config mobile "$BASE_DIR/projects/mobile"
thyra config api "$BASE_DIR/projects/api"
thyra config shared "$BASE_DIR/projects/shared"

echo "✅ Thyra configured for company projects"
```

---

## Onboarding New Developers

### Day 1 Checklist

1. **Install Thyra**

   ```bash
   npm install -g thyra
   ```

2. **Clone team repositories**

   ```bash
   git clone <repo-url> ~/projects/dashboard
   git clone <repo-url> ~/projects/api
   ```

3. **Run team setup script**

   ```bash
   ./setup-thyra-team.sh
   ```

4. **Verify configuration**

   ```bash
   thyra list
   ```

5. **Test opening projects**
   ```bash
   thyra open dashboard
   thyra open api
   ```

---

### Onboarding Documentation Template

```markdown
# Thyra Setup Guide for New Developers

## Step 1: Install Thyra

\`\`\`bash
npm install -g thyra
\`\`\`

## Step 2: Configure Team Projects

### Main Application

\`\`\`bash
thyra config app-web ~/work/app/frontend
thyra config app-api ~/work/app/backend
\`\`\`

### Supporting Services

\`\`\`bash
thyra config auth-service ~/work/services/auth
thyra config payment-service ~/work/services/payment
\`\`\`

### Documentation

\`\`\`bash
thyra config docs ~/work/documentation
\`\`\`

## Step 3: Test Your Setup

\`\`\`bash
thyra list
thyra open app-web
\`\`\`

## Need Help?

Contact #dev-support on Slack
```

---

## Team Workflows

### Morning Standup Workflow

```bash
# Each developer opens their assigned projects
thyra open current-sprint-feature
thyra open shared-components

# Team lead opens overview projects
thyra open project-dashboard
thyra open team-docs
```

### Code Review Workflow

```bash
# Reviewer quickly accesses the project
thyra open feature-branch-project

# Check related services
thyra open api-service
thyra open shared-library
```

### Deployment Workflow

```bash
# DevOps opens staging and production configs
thyra open staging-config
thyra open prod-config
thyra open deployment-scripts
```

---

## Standardizing Editor Configuration

### Team Editor Settings

Add to your team docs:

```markdown
## Default Editor Setup

### VS Code Users

\`\`\`bash

# Open projects in VS Code

thyra open <project> # Will use system default

# Or configure Thyra for VS Code

export EDITOR="code"
\`\`\`

### WebStorm Users

\`\`\`bash
export EDITOR="webstorm"
\`\`\`

### Vim Users

\`\`\`bash
export EDITOR="vim"
\`\`\`
```

---

## Best Practices for Teams

### 1. Document Everything

Create a team wiki page:

```markdown
# Team Thyra Guide

## Project Names

- `main-web` - Main website
- `main-api` - REST API
- `admin-panel` - Admin dashboard
- `mobile-ios` - iOS app
- `mobile-android` - Android app

## Quick Commands

\`\`\`bash
thyra open main-web # Open main website
thyra open main-api # Open API server
\`\`\`

## Troubleshooting

If a project doesn't open, verify the path with \`thyra list\`.
```

### 2. Version Control Your Setup

Keep setup scripts in Git:

```bash
team-resources/
├── thyra/
│   ├── setup.sh
│   ├── README.md
│   └── update.sh
└── docs/
    └── thyra-guide.md
```

### 3. Regular Audits

Monthly team check:

```bash
# Everyone runs:
thyra list

# Team lead reviews:
# - Are all projects still relevant?
# - Do paths need updating?
# - Are naming conventions followed?
```

### 4. Create Helper Scripts

**`team-open.sh`:**

```bash
#!/bin/bash
# Quick access to common project combinations

case $1 in
    "fullstack")
        thyra open frontend
        thyra open backend
        ;;
    "mobile")
        thyra open ios
        thyra open android
        ;;
    "docs")
        thyra open documentation
        thyra open wiki
        ;;
    *)
        echo "Usage: ./team-open.sh [fullstack|mobile|docs]"
        ;;
esac
```

---

## Communication Templates

### Slack Message Template

```
📢 **New Project Added to Thyra**

Project: `customer-portal`
Path: `~/projects/customer-portal`

**Setup:**
\`\`\`
thyra config customer-portal ~/projects/customer-portal
\`\`\`

**Open:**
\`\`\`
thyra open customer-portal
\`\`\`
```

### Email Template

```
Subject: Team Setup - Thyra Configuration Update

Hi Team,

We've added a new project to our Thyra configuration.

Project Name: analytics-dashboard
Command: thyra config analytics-dashboard ~/projects/analytics

Please update your local Thyra configuration by running:
$ thyra config analytics-dashboard ~/projects/analytics

If you need help, check our Thyra guide: [link to team docs]

Thanks!
```

---

## Multi-Team Organizations

### Team-Specific Prefixes

```bash
# Frontend team
thyra config fe-webapp ~/frontend/webapp
thyra config fe-components ~/frontend/components

# Backend team
thyra config be-api ~/backend/api
thyra config be-services ~/backend/microservices

# DevOps team
thyra config ops-infra ~/devops/infrastructure
thyra config ops-scripts ~/devops/automation
```

---

## Troubleshooting Team Issues

### Issue: Inconsistent Paths

**Problem:** Team members have projects in different locations.

**Solution:** Provide flexible setup script:

```bash
#!/bin/bash
echo "Where are your projects located?"
read -p "Base directory (default: ~/projects): " BASE_DIR
BASE_DIR=${BASE_DIR:-~/projects}

thyra config app "$BASE_DIR/app"
thyra config api "$BASE_DIR/api"
```

### Issue: Different Operating Systems

**Problem:** Mac, Linux, and Windows users have different path formats.

**Solution:** Provide OS-specific instructions:

```markdown
## macOS/Linux

\`\`\`bash
thyra config app ~/projects/app
\`\`\`

## Windows (PowerShell)

\`\`\`powershell
thyra config app C:\\Users\\YourName\\projects\\app
\`\`\`

## Windows (Git Bash)

\`\`\`bash
thyra config app /c/Users/YourName/projects/app
\`\`\`
```

---

## Measuring Success

Track team adoption:

- **Adoption Rate:** How many team members use Thyra?
- **Time Saved:** Average time saved per day/week
- **Onboarding Speed:** How quickly new members get productive
- **Support Tickets:** Reduction in "where is X?" questions

---

## Next Steps

- **[Editor Integration](/guides/editor-integration)** - Set up team's preferred editors
- **[Advanced Workflows](/advanced/custom-workflows)** - Automate team processes
- **[Configuration](/reference/configuration)** - Learn advanced configuration options

---

**Empower your entire team with Thyra!**

[Learn Editor Integration →](/guides/editor-integration)
