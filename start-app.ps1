Write-Host "Starting URL Shortener App..." -ForegroundColor Green
Write-Host ""
Write-Host "Make sure MongoDB is running on your system!" -ForegroundColor Yellow
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Wait a moment
Start-Sleep -Seconds 2

# Start Frontend Server
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Frontend; npm run dev"

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor White
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
