#!/usr/bin/env bash
# Exit on error
set -o errexit

npm install
npm run build

# For Prisma, we need to generate the client and run migrations
npx prisma generate
# Note: In production, you may want to use `npx prisma migrate deploy` instead 