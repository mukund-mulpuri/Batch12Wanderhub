# Convert TypeScript files to JavaScript
Get-ChildItem -Path . -Filter "*.tsx" -Recurse | ForEach-Object {
    $jsxPath = $_.FullName -replace '\.tsx$', '.jsx'
    Move-Item $_.FullName $jsxPath -Force
}

Get-ChildItem -Path . -Filter "*.ts" -Recurse | ForEach-Object {
    $jsPath = $_.FullName -replace '\.ts$', '.js'
    Move-Item $_.FullName $jsPath -Force
}