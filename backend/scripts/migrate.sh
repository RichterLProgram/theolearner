#!/bin/bash
# Migration script to set up Supabase database schema and seed data

echo "🔧 Setting up TheoLearner database..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get Supabase credentials from .env
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found. Please create it first."
    exit 1
fi

# Extract SUPABASE_URL and SERVICE_ROLE_KEY
SUPABASE_URL=$(grep SUPABASE_URL .env | cut -d '=' -f2)
SERVICE_ROLE_KEY=$(grep SUPABASE_SERVICE_ROLE_KEY .env | cut -d '=' -f2)

if [ -z "$SUPABASE_URL" ] || [ -z "$SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env"
    exit 1
fi

echo -e "${BLUE}Supabase URL: $SUPABASE_URL${NC}"

# Create a TypeScript file to execute the migration
cat > /tmp/migrate.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function migrate() {
  try {
    // Read schema and seed files
    const schemaSQL = fs.readFileSync('src/data/schema.sql', 'utf-8')
    const seedSQL = fs.readFileSync('src/data/seed.sql', 'utf-8')

    // Execute schema
    console.log('📋 Executing schema...')
    const { error: schemaError } = await supabase.rpc('exec', { query: schemaSQL })
    if (schemaError) {
      console.error('❌ Schema error:', schemaError)
    } else {
      console.log('✅ Schema created')
    }

    // Execute seed
    console.log('🌱 Seeding data...')
    const { error: seedError } = await supabase.rpc('exec', { query: seedSQL })
    if (seedError) {
      console.error('❌ Seed error:', seedError)
    } else {
      console.log('✅ Data seeded')
    }

    console.log('✨ Migration complete!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

migrate()
EOF

echo -e "${GREEN}✅ Migration files created${NC}"
echo -e "${BLUE}📋 To apply migrations manually:${NC}"
echo "1. Go to Supabase Dashboard → SQL Editor"
echo "2. Create a new query and copy contents of: src/data/schema.sql"
echo "3. Run the query"
echo "4. Create another query and copy contents of: src/data/seed.sql"
echo "5. Run the query"
echo ""
echo -e "${GREEN}✨ Done!${NC}"
