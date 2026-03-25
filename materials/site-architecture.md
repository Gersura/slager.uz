# Site Architecture

## Purpose

This website is not a duplicate of my resume.

The resume is the compact and formal version of my professional background.  
The website is an additional layer that helps explain who I am, how I think, and what I have worked on in more depth.

The website should do three things:
1. Quickly explain who I am and what I focus on
2. Lead visitors to selected projects and deeper case studies
3. Show my career track from Product Design to Product Management

---

## Main Structure

The website consists of the following core parts:

1. Home
2. Project Pages
3. Career Track
4. Resume Download
5. External Links / Contact Actions

---

## Home

### Purpose
The homepage is the main entry point of the site.

It should:
- introduce me briefly
- explain my current focus
- provide access to selected projects
- provide access to career track, resume, and contact links

### Content
The homepage includes:
- Name
- Role / positioning
- Introductory text
- List of selected projects
- Quick links

### Content source
- `homepage-content-ru.md`
- `homepage-content-en.md`

### Behavior
Each project title in the selected project list is clickable.

Clicking a project title opens a separate project page with a detailed breakdown.

After the project list, the homepage includes quick links:
- Career Track
- Resume
- LinkedIn
- Telegram
- Email

These quick links should follow the rules from:
- `site-settings.md`

---

## Project Pages

### Purpose
Project pages provide detailed case studies for selected work.

They should expand on the homepage and resume, not repeat them line by line.

### Planned project pages
- Click MiniApps
- Click Admins
- Smart Bank — Retention & User Activation
- Smart Bank — Kartoteka
- Cheil Kazakhstan — Marketplace MVP

### Content sources
- `project-click-admins-ru.md`
- `project-click-admins-en.md`
- `project-click-miniapps-ru.md`
- `project-click-miniapps-en.md`
- `project-smartbank-retention-activation-ru.md`
- `project-smartbank-retention-activation-en.md`
- `project-smartbank-kartoteka-ru.md`
- `project-smartbank-kartoteka-en.md`
- `project-cheil-marketplace-mvp-ru.md`
- `project-cheil-marketplace-mvp-en.md`

### Recommended project page structure
Each project page should include:
- Project title
- Company and year
- Context
- Problem / opportunity
- My role
- What I did
- Outcome / impact
- Key takeaways

### Navigation
Each project page should allow the user to:
- return to Home
- open other project pages
- open Career Track
- download Resume
- use contact links

Contact links and resume behavior should follow:
- `site-settings.md`

---

## Career Track

### Purpose
Career Track is a separate page that shows the professional path across time.

It should:
- show the transition from Product Design to Product Management
- add chronological context
- complement the homepage without overloading it

### Content source
- `career-track-ru.md`
- `career-track-en.md`

### Structure
The page should be organized by years / roles.

Each role should include:
- title
- company
- dates
- short bullet points

### Interaction
Career Track should work as a clear timeline or structured list.

Preferred implementation:
- simple vertical list / timeline
- no hover-dependent behavior
- no complex interactive logic by default

### Content style
The page should not become a full resume dump.
It should show progression, focus shifts, and important milestones.

---

## Resume Download

### Purpose
Provide direct access to the formal CV.

### Source of truth
Resume file and related behavior should be taken from:
- `site-settings.md`

### Current behavior
Clicking `Resume` should immediately download the current resume file.

Resume should be treated as a downloadable file, not as a dedicated page that repeats website content.

---

## External Links and Contact Actions

### Purpose
Provide clear and direct utility actions from the site.

### Source of truth
All contact links and their behavior should be taken from:
- `site-settings.md`

### Current actions
- `LinkedIn` opens an external profile in a new browser tab
- `Telegram` opens an external Telegram link in a new browser tab
- `Email` copies the email address to clipboard
- optional fallback for email: `mailto:`

Do not hardcode or guess these values outside `site-settings.md` if that file exists.

---

## Navigation Model

### Homepage quick links
The homepage should include these quick links:

- Career Track
- Resume
- LinkedIn
- Telegram
- Email

### Navigation logic
- Project titles lead to internal project pages
- Career Track leads to a separate internal page
- Resume triggers file download
- LinkedIn opens an external page in a new tab
- Telegram opens an external chat link in a new tab
- Email copies the address

All quick link actions should use values from:
- `site-settings.md`

---

## Suggested Routes

These routes are recommended for the website structure:

- `/` → Home
- `/projects/click-admins`
- `/projects/click-miniapps`
- `/projects/smartbank-retention-activation`
- `/projects/smartbank-kartoteka`
- `/projects/cheil-marketplace-mvp`
- `/career-track`

Resume should be served as a downloadable file rather than a dedicated route.

---

## Content Rules

1. The homepage should stay short and editorial in tone
2. The homepage should not duplicate the full resume
3. Project pages should contain depth, context, and outcomes
4. Career Track should show progression, not become another resume page
5. Resume should remain the formal version of my background
6. External links and contact actions should remain simple and clear
7. Contact values and download settings should be controlled through `site-settings.md`

---

## Language

The website will exist in two languages:
- Russian
- English

Russian is the primary approval language.
English should follow the approved Russian source.

---

## Source of Truth

Approved content files inside `materials/` are the source of truth.

Key files:
- `homepage-content-ru.md`
- `homepage-content-en.md`
- `career-track-ru.md`
- `career-track-en.md`
- `site-settings.md`
- all project-specific content files

Do not use outdated drafts if a newer approved file exists.

---

## Final Principle

This website should complement the resume, not repeat it.

Home explains who I am now.  
Project pages show selected work in depth.  
Career Track shows how I got here.  
Resume remains the formal summary.  
`site-settings.md` defines contact actions, external links, and resume download behavior.