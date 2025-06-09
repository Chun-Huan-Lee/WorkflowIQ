# PowerShell script to load environment variables from .env file
# Run this before using Prisma commands: .\load-env.ps1

Write-Host "🔄 Loading environment variables from .env file..." -ForegroundColor Cyan

if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]*)\s*=\s*(.*)\s*$") {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            # Remove quotes if present
            if ($value -match '^"(.*)"$') {
                $value = $matches[1]
            }
            
            # Set the environment variable
            Set-Item -Path "env:$name" -Value $value
            Write-Host "✅ Set $name" -ForegroundColor Green
        }
    }
    Write-Host "🎉 Environment variables loaded successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run Prisma commands like:" -ForegroundColor Yellow
    Write-Host "  npm run db:migrate" -ForegroundColor White
    Write-Host "  npm run db:seed" -ForegroundColor White
    Write-Host "  npm run db:studio" -ForegroundColor White
} else {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    exit 1
} 