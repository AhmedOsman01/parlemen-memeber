This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment & CI/CD

This repository includes two GitHub Actions workflows to help you deploy:

- `.github/workflows/deploy-vercel.yml` — builds and deploys the site to Vercel on pushes to `main`. Configure these repository secrets in GitHub:
	- `VERCEL_TOKEN` — your Vercel personal token
	- `VERCEL_ORG_ID` — the Vercel organization id
	- `VERCEL_PROJECT_ID` — the Vercel project id

- `.github/workflows/deploy-docker.yml` — builds a Docker image and pushes it to GitHub Container Registry (GHCR) on pushes to `main`. The workflow uses the repository `GITHUB_TOKEN` to authenticate with GHCR.

If you prefer Netlify, or a different host, I can add a separate workflow — tell me which provider you want.

### Required environment variables (recommended)

Set the following environment variables in your deployment environment or in a `.env` file (do NOT commit secrets to the repo):

- `MONGODB_URI` — MongoDB connection string (if using MongoDB storage)
- `MONGODB_DB` — optional DB name
- `ADMIN_TOKEN` — token used by admin endpoints (fallback admin auth)
- `BASIC_AUTH_USER` / `BASIC_AUTH_PASS` — optional HTTP Basic credentials for admin UI
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — optional SMTP settings for email notifications
- `EMAIL_FROM`, `EMAIL_TO` — optional email addresses used by the mailer

### Docker (build and run locally)

Build and run the production image locally:

```bash
docker build -t parlemen:latest .
docker run -p 3000:3000 --env-file .env -e NODE_ENV=production parlemen:latest
```

The Dockerfile uses a multi-stage build and runs the app as a non-root `app` user.

## Backend API (local development)

## Backend API (local development)

The project includes simple App Router API endpoints to serve data and accept contact form submissions. The endpoints are added under `src/app/api` and are intended for local development / small deployments. Consider replacing file storage with a DB or email provider for production.

- GET /api/news — returns news articles (from `src/data/news.js`)
- GET /api/slides — returns hero slides (from `src/data/slides.js`)
- GET /api/timeline — returns timeline data (from `src/data/timeline.js`)
- POST /api/contact — accepts JSON { name, email, phone?, subject, message } and appends to `src/data/contacts.json`.

How to test quickly:

```bash
# start dev server
npm run dev

# GET news
curl http://localhost:3000/api/news

# POST a contact (example)
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","subject":"Hi","message":"Hello from curl"}'
```

Migration to MongoDB
--------------------

If you enabled `MONGODB_URI` and want to migrate existing `src/data/contacts.json` records into MongoDB, run:

```bash
# set MONGODB_URI and other env vars (or use .env.local)
node ./scripts/migrate-contacts-to-mongo.js
```

Admin endpoint
--------------
List saved contacts (dev-only). Protects access with `ADMIN_TOKEN`.

- GET /api/contact?token=<admin token>&page=1&limit=50&q=search

Mailer (optional)
-----------------
If you want to receive email notifications on new contact submissions, set SMTP variables in `.env.local` matching `.env.example` (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO). The server will attempt to send a notification after creating a contact; mail failures are non-blocking.

# parlemen-memeber
