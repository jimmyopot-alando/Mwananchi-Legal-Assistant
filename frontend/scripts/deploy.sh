#!/bin/bash

# Exit immediately if a command fails
set -e

echo "🚀 Starting deployment..."

# Step 1: Pull latest code
echo "📥 Pulling latest changes from Git..."
git pull origin main

# Step 2: Install dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "📦 Installing mobile dependencies..."
cd ../mobile
npm install

# Step 3: Build frontend
echo "🛠️ Building frontend..."
npm run build

# Step 4: Restart backend server
echo "🔄 Restarting backend server..."
cd ../backend
pm2 restart server || pm2 start server.js --name "legal-assistant"

# Step 5: Run migrations/seed if needed
echo "📊 Running database migrations..."
npm run migrate || echo "⚠️ No migrations found."

echo "🌱 Seeding initial data..."
node ../scripts/seedData.js || echo "⚠️ No seed data script found."

# Step 6: Backup before finishing
echo "💾 Running backup..."
bash ../scripts/backup.sh

echo "✅ Deployment complete!"
