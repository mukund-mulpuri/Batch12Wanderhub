# Start both frontend and backend servers
Write-Host "Starting backend server..."
cd .\backend
Start-Process powershell -ArgumentList "npm run dev"

Write-Host "Starting frontend server..."
cd ..\frontend
Start-Process powershell -ArgumentList "npm run dev"