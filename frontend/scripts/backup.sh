#!/bin/bash

# Exit immediately if a command fails
set -e

echo "💾 Starting backup..."

# Variables
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FILENAME="backup_$TIMESTAMP.gz"

# Ensure backup directory exists
mkdir -p $BACKUP_DIR

# Run MongoDB dump
echo "📦 Dumping MongoDB database..."
mongodump --uri="$MONGO_URI" --archive="$BACKUP_DIR/$FILENAME" --gzip

# Verify backup
if [ -f "$BACKUP_DIR/$FILENAME" ]; then
  echo "✅ Backup successful: $BACKUP_DIR/$FILENAME"
else
  echo "❌ Backup failed!"
  exit 1
fi

# Optional: clean old backups (keep last 7)
echo "🧹 Cleaning old backups..."
ls -t $BACKUP_DIR/backup_*.gz | tail -n +8 | xargs rm -f || echo "No old backups to clean."

echo "🎉 Backup complete!"
