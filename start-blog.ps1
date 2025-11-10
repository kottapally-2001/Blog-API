# 🚀 Blog Platform Auto Starter Script
Write-Host "Starting Blog Platform..."

# --- Start API Server ---
Start-Process powershell -ArgumentList "cd server; npm run dev" -NoNewWindow
Start-Sleep -Seconds 2

# --- Start Public Client ---
Start-Process powershell -ArgumentList "cd public-client; npx serve -p 5173 ." -NoNewWindow
Start-Sleep -Seconds 2

# --- Start Admin Client ---
Start-Process powershell -ArgumentList "cd admin-client; npx serve -p 5174 ." -NoNewWindow

Write-Host "`n✅ All servers launched!"
Write-Host "--------------------------------------"
Write-Host "API:     http://localhost:4000"
Write-Host "Public:  http://localhost:5173"
Write-Host "Admin:   http://localhost:5174"
Write-Host "--------------------------------------"
