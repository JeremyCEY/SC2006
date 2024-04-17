@echo off
cd \path\to\project\root
if %errorlevel% neq 0 exit /b %errorlevel%
concurrently "cd backend && npm run start" "cd frontend\client && npm start"