@echo off
REM Migration script for Windows - set up Supabase database schema and seed data

echo 🔧 Setting up TheoLearner database...
echo.

REM Read .env file and extract values (simplified version for Windows)
echo 📋 Database migration instructions:
echo.
echo 1. Go to Supabase Dashboard https://supabase.com/dashboard/project/xrvgyixhnplxxhfctxia/sql/new
echo 2. Create a new SQL query
echo 3. Copy ALL contents from: backend\src\data\schema.sql
echo 4. Paste and RUN the query
echo 5. Wait for success message
echo.
echo 6. Create ANOTHER new SQL query
echo 7. Copy ALL contents from: backend\src\data\seed.sql
echo 8. Paste and RUN the query
echo 9. Wait for success message
echo.
echo ✅ After both queries run successfully, your database is ready!
echo.
