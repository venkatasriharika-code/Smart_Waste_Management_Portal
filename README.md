# Smart Waste Management Portal

A full-stack web application for smart waste management, tracking, and education.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4
- **Backend**: Node.js, Express, Prisma, MongoDB

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string

## Project Structure

- `client/wastmanagemet/` — React frontend
- `server/` — Express API and Prisma models

## Setup

### 1. Backend

```bash
cd server
npm install
```

Copy the example env file and edit it:

```bash
cp .env.example .env
```

Set `DATABASE_URL` to your MongoDB connection string and choose a value for `JWT_SECRET_TOKEN`.

Push the Prisma schema to MongoDB:

```bash
npm run db:push
```

Start the API (default port **8060**):

```bash
npm run dev
```

Verify: open `http://localhost:8060/api/health` — you should see `{"ok":true,...}`.

### 2. Frontend

In a second terminal:

```bash
cd client/wastmanagemet
npm install
cp .env.example .env
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

`VITE_API_URL` in `.env` must match your backend (default `http://localhost:8060`).

## Common Issues

| Problem | Fix |
|--------|-----|
| `JWT_SECRET_TOKEN is not set` | Create `server/.env` from `.env.example` |
| `DB connected` never appears / Prisma errors | Check MongoDB is running and `DATABASE_URL` is correct; run `npm run db:push` |
| Login returns network error | Start the backend; confirm port 8060 matches `VITE_API_URL` |
| Blank page on GitHub Pages | Build with `VITE_BASE_PATH=/smart_waste_management_portal/` (see deploy workflow) |

## Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| `server/` | `npm run dev` | API with nodemon |
| `server/` | `npm run db:push` | Sync Prisma schema to MongoDB |
| `client/wastmanagemet/` | `npm run dev` | Vite dev server |
| `client/wastmanagemet/` | `npm run build` | Production build |
