# Herizon MVP

Herizon is a hackathon prototype for economic empowerment and financial inclusion. It connects practical financial learning, money management, proof of work, and personalised next-step opportunities in one mobile-friendly experience.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Mock/local data (no database required for the MVP)
- Vercel-ready

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verify before pushing

```bash
npm run typecheck
npm run build
```

## GitHub

Do not commit `node_modules`, `.next`, environment files, or secrets. The included `.gitignore` already excludes these.

```bash
git init
git add .
git commit -m "Initial Herizon MVP"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Project structure

```text
app/                  Next.js app routes and global styles
components/           Herizon UI and feature components
lib/                  Mock product data
```

The MVP intentionally avoids a backend/database so the team can focus on the hackathon experience and demo flow.
