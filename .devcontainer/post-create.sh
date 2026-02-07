#!/usr/bin/env bash
set -euo pipefail

echo "📦 Installing dependencies..."
pnpm install

# Create .env files pointing to the container DB
DB_URL="postgresql://postgres:postgres@db:5432/boilerpautet"

echo "⚙️  Setting up environment files..."
cat > apps/api/.env <<EOF
PORT=4000
DATABASE_URL=${DB_URL}
CORS_ORIGIN=http://localhost:5173
EOF

cat > packages/db/.env <<EOF
DATABASE_URL=${DB_URL}
EOF

echo "🗄️  Running database migrations..."
pnpm db:up

echo "✅ Dev container ready! Run 'pnpm dev' to start."
