@echo off
echo Starting URL Shortener App...
echo.
echo Make sure MongoDB is running on your system!
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"
echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd Frontend && npm run dev"
echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173
echo.
pause
