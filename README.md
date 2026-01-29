# Resume Builder

A modern, minimalistic resume builder — create, customize, and export professional resumes with ease.

## Features

- 💯&nbsp;Free & open-source.
- 🎨&nbsp;Multiple resume templates (not yet)
- ⚡&nbsp;Real-time preview
- 🖼️&nbsp;Resume photo support
- 🎨&nbsp;Template & color customization
- 📋&nbsp;Duplicate resumes
- 📄&nbsp;Export to PDF

## Quick start

### Clone the repo

```bash
git clone https://github.com/stray4x/resume-builder.git
```

### Install the dependencies

```bash
yarn
```

### Setup environment

Create a local .env from the example file:

```bash
cp .env.example .env
```

Fill in the variables:

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"

BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_GITHUB_CLIENT_ID="your-client-id"
BETTER_AUTH_GITHUB_CLIENT_SECRET="your-client-secret"

# Main database URL
# If you are using Docker locally, make sure this matches your Docker credentials
DATABASE_URL="postgresql://user:password@host:port/database"

# Direct database URL for running migrations in production / serverless environments
# When running locally via Docker, this can be the same as DATABASE_URL
DATABASE_DIRECT_URL="postgresql://user:password@host:port/database"

# Local Docker database configuration
DOCKER_DB_NAME="database"
DOCKER_DB_USER="user"
DOCKER_DB_PASSWORD="password"
DOCKER_DB_HOST="host"
DOCKER_DB_PORT=port
```

### Start a local PostgreSQL database with Docker

```bash
docker-compose up -d
```

### Apply Prisma migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Start the dev server

```bash
yarn dev
```
