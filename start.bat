@echo off
cd .\
if %errorlevel% neq 0 exit /b %errorlevel%
npx concurrently "cd backend && npm run start" "cd frontend\client && npm start"