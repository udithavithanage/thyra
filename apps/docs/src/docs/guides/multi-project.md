# Multi-Project Management

Learn how to efficiently manage dozens of projects without losing your sanity. This guide is perfect for developers, freelancers, and agencies juggling multiple codebases.

---

## Prerequisites

- Thyra installed and configured
- Multiple projects to manage
- Understanding of [Basic Workflows](/guides/basic-workflows)

---

## The Challenge

As developers, we often work on:

- Multiple client projects simultaneously
- Personal projects alongside work projects
- Open-source contributions
- Learning/tutorial projects
- Legacy maintenance projects

**The Problem:** Keeping track of all these projects, their locations, and switching between them efficiently.

**The Solution:** Thyra + smart organization strategies.

---

## Organization Strategies

### Strategy 1: Prefix-Based Naming

Use prefixes to group related projects:

```bash
# Client projects
thyra config client-acme-web ~/clients/acme/website
thyra config client-acme-api ~/clients/acme/backend
thyra config client-techcorp ~/clients/techcorp/app

# Personal projects
thyra config personal-blog ~/personal/blog
thyra config personal-portfolio ~/personal/portfolio

# Work projects
thyra config work-dashboard ~/work/admin-dashboard
thyra config work-api ~/work/company-api

# Open source
thyra config oss-thyra ~/opensource/thyra
thyra config oss-contribution ~/opensource/react
```

**Benefits:**

- Easy to remember
- Groups projects logically
- Simple to filter when listing

**Quick Access:**

```bash
# List all client projects
thyra list | grep "client-"

# List all personal projects
thyra list | grep "personal-"
```

---

### Strategy 2: Hierarchical Naming

Use dot notation for nested organization:

```bash
# Company → Team → Project
thyra config acme.frontend.web ~/acme/frontend/web-app
thyra config acme.frontend.mobile ~/acme/frontend/mobile-app
thyra config acme.backend.api ~/acme/backend/rest-api
thyra config acme.backend.workers ~/acme/backend/workers

# Access them
thyra open acme.frontend.web
thyra open acme.backend.api
```

---

### Strategy 3: Status-Based Organization

Organize by project status:

```bash
# Active projects (currently working on)
thyra config active-dashboard ~/current/dashboard
thyra config active-mobile ~/current/mobile-app

# Maintenance projects (occasional updates)
thyra config maintain-legacy ~/maintenance/old-system
thyra config maintain-client-x ~/maintenance/client-x

# Archived projects (reference only)
thyra config archive-2023-project ~/archives/2023/project
```

---

## Real-World Scenarios

### Scenario 1: Freelance Developer

**Situation:** You manage 5 active client projects, 3 in maintenance, and 2 personal projects.

```bash
# Active clients
thyra config acme-web ~/clients/acme/website
thyra config techcorp-api ~/clients/techcorp/api
thyra config startup-mvp ~/clients/startup/mvp
thyra config agency-dashboard ~/clients/agency/dashboard
thyra config ecom-shop ~/clients/ecommerce/shop

# Maintenance
thyra config maintain-old-client ~/maintenance/old-client
thyra config maintain-legacy-api ~/maintenance/legacy-api
thyra config maintain-wordpress ~/maintenance/wp-site

# Personal
thyra config blog ~/personal/coding-blog
thyra config portfolio ~/personal/portfolio-2024
```

**Morning Routine:**

```bash
# Check active projects
thyra list | grep -E "acme|techcorp|startup|agency|ecom"

# Open today's priority
thyra open acme-web
```

---

### Scenario 2: Agency Developer

**Situation:** You work on different projects each day based on team assignments.

```bash
# Organize by client and project type
thyra config nike-web ~/agency/nike/website
thyra config nike-api ~/agency/nike/api
thyra config adidas-mobile ~/agency/adidas/mobile
thyra config adidas-cms ~/agency/adidas/cms
thyra config puma-ecom ~/agency/puma/ecommerce

# Internal projects
thyra config internal-crm ~/agency/internal/crm
thyra config internal-tools ~/agency/internal/dev-tools
```

**Daily workflow:**

```bash
# Monday: Nike project
thyra open nike-web

# Tuesday: Adidas mobile
thyra open adidas-mobile

# Friday: Internal tools
thyra open internal-tools
```

---

### Scenario 3: Full-Stack Developer

**Situation:** Each project has multiple repositories (frontend, backend, mobile, docs).

```bash
# Project Alpha
thyra config alpha-frontend ~/projects/alpha/frontend
thyra config alpha-backend ~/projects/alpha/backend
thyra config alpha-mobile ~/projects/alpha/mobile
thyra config alpha-docs ~/projects/alpha/documentation

# Project Beta
thyra config beta-web ~/projects/beta/web-app
thyra config beta-api ~/projects/beta/api-server
thyra config beta-admin ~/projects/beta/admin-panel
```

**Working across stacks:**

```bash
# Frontend work
thyra open alpha-frontend

# Need to update API
thyra open alpha-backend

# Check documentation
thyra open alpha-docs
```

---

## Advanced Techniques

### Technique 1: Bulk Operations with Scripts

Create shell scripts for common operations:

```bash
#!/bin/bash
# open-acme-stack.sh - Open all Acme Corp projects

thyra open acme-frontend
thyra open acme-backend
thyra open acme-database
thyra open acme-docs
```

Usage:

```bash
chmod +x open-acme-stack.sh
./open-acme-stack.sh
```

---

### Technique 2: Contextual Aliases

Create aliases for different contexts:

```bash
# In your ~/.bashrc or ~/.zshrc

# Morning routine
alias morning="thyra open main-project && thyra open api && thyra open docs"

# Client meetings
alias acme="thyra open acme-web"
alias techcorp="thyra open techcorp-api"

# End of day
alias eod="thyra list | grep active"
```

---

### Technique 3: Project Templates

Standardize how you save new projects:

```bash
# Template for new client projects
new_client() {
    client=$1
    thyra config "${client}-web" ~/clients/${client}/website
    thyra config "${client}-api" ~/clients/${client}/api
    thyra config "${client}-docs" ~/clients/${client}/documentation
    echo "Created Thyra bookmarks for ${client}"
}

# Usage
new_client acme
```

---

### Technique 4: Search and Filter

Use grep to filter your project list:

```bash
# Find all frontend projects
thyra list | grep "frontend"

# Find all active projects
thyra list | grep "active-"

# Find all client projects
thyra list | grep "client-"

# Count total projects
thyra list | grep "→" | wc -l
```

---

## Best Practices

### ✅ Do's

1. **Use consistent naming conventions**

   ```bash
   ✅ client-acme-web, client-techcorp-api
   ❌ acme_website, TechCorpAPI
   ```

2. **Remove old projects regularly**

   ```bash
   # Monthly cleanup
   thyra list  # Review
   thyra delete old-project
   thyra delete completed-project
   ```

3. **Document your naming scheme**

   ```bash
   # Keep a note somewhere
   # Naming: <category>-<client>-<type>
   # Examples: client-acme-web, personal-blog, work-api
   ```

4. **Use descriptive but short names**
   ```bash
   ✅ acme-dashboard
   ❌ acme-corporation-admin-dashboard-2024-redesign
   ```

### ❌ Don'ts

1. **Don't use spaces in names**

   ```bash
   ❌ thyra config "my project" ~/path
   ✅ thyra config my-project ~/path
   ```

2. **Don't save temporary locations**

   ```bash
   ❌ thyra config temp ~/Downloads/temp
   ✅ Only save actual project directories
   ```

3. **Don't use special characters**
   ```bash
   ❌ project@2024, my_proj#1
   ✅ project-2024, my-proj-1
   ```

---

## Maintaining Your Project List

### Weekly Review

Every Friday, review your bookmarks:

```bash
# List all projects
thyra list

# Remove completed/archived projects
thyra delete completed-project-1
thyra delete old-client-site

# Add new projects from the week
thyra config new-client ~/path/to/new/client
```

### Monthly Audit

Once a month, do a deep clean:

```bash
# Export your list to a file
thyra list > ~/thyra-projects-$(date +%Y-%m).txt

# Review each project
# - Is the path still valid?
# - Do you still need quick access?
# - Should it be archived?

# Remove obsolete entries
thyra delete project1
thyra delete project2
```

---

## Scaling to 50+ Projects

Managing many projects requires extra organization:

### Use a Spreadsheet

Track your projects externally:

| Name     | Category | Client    | Status   | Thyra Command         |
| -------- | -------- | --------- | -------- | --------------------- |
| acme-web | Client   | Acme Corp | Active   | `thyra open acme-web` |
| blog     | Personal | Self      | Active   | `thyra open blog`     |
| old-api  | Client   | TechCorp  | Archived | N/A                   |

### Create Master Scripts

```bash
#!/bin/bash
# list-by-category.sh

echo "=== CLIENT PROJECTS ==="
thyra list | grep "client-"

echo -e "\n=== PERSONAL PROJECTS ==="
thyra list | grep "personal-"

echo -e "\n=== WORK PROJECTS ==="
thyra list | grep "work-"
```

---

## Troubleshooting

### Too Many Projects

**Problem:** Your list is overwhelming.

**Solution:**

```bash
# Archive old projects
thyra delete old-project-1
thyra delete old-project-2

# Use more specific naming
thyra config client-acme-web-2024 ~/path  # Include year
```

### Can't Remember Names

**Problem:** Forgot what you called a project.

**Solution:**

```bash
# Search your list
thyra list | grep "keyword"

# Or use partial matching (if supported)
thyra open acme<TAB>  # Tab completion
```

### Projects in Multiple Locations

**Problem:** Projects spread across different drives/folders.

**Solution:**

```bash
# That's fine! Thyra handles any path
thyra config project-d ~/Documents/projects/app
thyra config project-e /mnt/external/work/api
thyra config project-f /c/Users/You/Desktop/code
```

---

## Next Steps

- **[Team Collaboration](/guides/team-setup)** - Share your organization strategy with your team
- **[Editor Integration](/guides/editor-integration)** - Customize how projects open
- **[Advanced Workflows](/advanced/custom-workflows)** - Automate complex scenarios

---

**You're now a multi-project management pro!**

[Set Up Team Collaboration →](/guides/team-setup)
