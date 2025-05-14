#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations if in production
if [ "$NODE_ENV" = "production" ]; then
  npx prisma migrate deploy
fi

# Build the Next.js application
npm run build 