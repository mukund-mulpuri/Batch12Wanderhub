# TypeScript to JavaScript Conversion Guide

## Automatic Conversion Steps

1. **Rename all .tsx files to .jsx**
2. **Rename all .ts files to .js**
3. **Remove TypeScript type annotations**
4. **Update imports**
5. **Update configuration files**

## Run This Script in PowerShell

```powershell
# Navigate to frontend directory
cd C:\Users\banda\Desktop\andhra-wander-hub\frontend

# Backup first (optional)
# Copy-Item -Path "src" -Destination "src_backup" -Recurse

# Convert all .tsx to .jsx
Get-ChildItem -Path "src" -Recurse -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Remove type annotations
    $content = $content -replace ': React\.FC<.*?>', ''
    $content = $content -replace ': React\.FC', ''
    $content = $content -replace ': string', ''
    $content = $content -replace ': number', ''
    $content = $content -replace ': boolean', ''
    $content = $content -replace ': any(\[\])?', ''
    $content = $content -replace ': void', ''
    $content = $content -replace 'interface .*?\{[\s\S]*?\}\n', ''
    $content = $content -replace 'type .*? = .*?;', ''
    $content = $content -replace 'React\.ChangeEvent<HTMLInputElement>', ''
    $content = $content -replace 'React\.FormEvent<.*?>', ''
    $content = $content -replace 'React\.MouseEvent<.*?>', ''
    $content = $content -replace '<.*?>\s*\(', '('
    $content = $content -replace 'e:\s*React\.\w+', 'e'
    
    # Save and rename
    $newPath = $_.FullName -replace '\.tsx$', '.jsx'
    Set-Content -Path $_.FullName -Value $content -NoNewline
    Rename-Item -Path $_.FullName -NewName $newPath
    Write-Host "Converted: $($_.Name) -> $([System.IO.Path]::GetFileName($newPath))"
}

# Convert all .ts to .js (except .d.ts files)
Get-ChildItem -Path "src" -Recurse -Filter "*.ts" -Exclude "*.d.ts" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Remove type annotations
    $content = $content -replace ': string', ''
    $content = $content -replace ': number', ''
    $content = $content -replace ': boolean', ''
    $content = $content -replace ': any(\[\])?', ''
    $content = $content -replace 'interface .*?\{[\s\S]*?\}\n', ''
    $content = $content -replace 'type .*? = .*?;', ''
    $content = $content -replace 'export interface .*?\{[\s\S]*?\}', ''
    
    # Save and rename
    $newPath = $_.FullName -replace '\.ts$', '.js'
    Set-Content -Path $_.FullName -Value $content -NoNewline
    Rename-Item -Path $_.FullName -NewName $newPath
    Write-Host "Converted: $($_.Name) -> $([System.IO.Path]::GetFileName($newPath))"
}

Write-Host "`nConversion Complete!" -ForegroundColor Green
Write-Host "Files converted from TypeScript to JavaScript" -ForegroundColor Cyan
```

## Manual Steps After Running Script

### 1. Update vite.config.ts to vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})
```

### 2. Update tsconfig files (keep or delete)
You can delete:
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json

### 3. Create jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

### 4. Update package.json
Remove TypeScript dependencies:
```json
{
  "devDependencies": {
    // Remove these:
    // "typescript": "^5.8.3",
    // "typescript-eslint": "^8.38.0",
    // "@types/node": "^22.16.5",
    // "@types/react": "^18.3.23",
    // "@types/react-dom": "^18.3.7",
    // "@types/mongoose": "^5.11.96"
  }
}
```

### 5. Update main entry point
Rename `src/main.tsx` to `src/main.jsx` and update `index.html`:
```html
<script type="module" src="/src/main.jsx"></script>
```

## Quick Command to Execute

Run this in PowerShell from the frontend directory:

```powershell
# Complete conversion in one command
Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -Exclude "*.d.ts" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw;
    $content = $content -replace ': React\.FC<.*?>', '' -replace ': React\.FC', '' -replace ': string\[\]', '' -replace ': string', '' -replace ': number', '' -replace ': boolean', '' -replace ': any', '' -replace ': void', '' -replace 'interface .*?\{[\s\S]*?\}', '' -replace 'React\.ChangeEvent<HTMLInputElement>', '' -replace 'React\.FormEvent', '' -replace 'e: .*?\)', 'e)';
    $newPath = $_.FullName -replace '\.tsx$', '.jsx' -replace '\.ts$', '.js';
    Set-Content -Path $_.FullName -Value $content -NoNewline;
    if ($_.FullName -ne $newPath) { Rename-Item -Path $_.FullName -NewName $newPath -Force };
    Write-Host "✓ $($_.Name)" -ForegroundColor Green
}

Write-Host "`n✅ All files converted to JavaScript!" -ForegroundColor Cyan
```

## After Conversion

1. Delete TypeScript config files
2. Update index.html to reference main.jsx
3. Run `npm install` to clean dependencies
4. Test the application with `npm run dev`

## Verify Conversion

```powershell
# Check remaining TypeScript files
Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -Exclude "*.d.ts" | Measure-Object
# Should show 0
```
