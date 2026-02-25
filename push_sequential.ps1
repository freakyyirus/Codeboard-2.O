$files = git status -s | ForEach-Object { $_.Substring(3) }

if ($files.Count -eq 0) {
    Write-Host "No files to push."
    exit
}

foreach ($file in $files) {
    if ([string]::IsNullOrWhiteSpace($file)) { continue }
    
    # Handle files with spaces (git status outputs quotes if spaces exist)
    $cleanFile = $file -replace '^"|"$', ''

    Write-Host "Processing $cleanFile..."
    git add "$cleanFile"
    git commit -m "Update $cleanFile"
    git push

    Write-Host "Pushed $cleanFile. Waiting 10 seconds..."
    Start-Sleep -Seconds 10
}

Write-Host "All files pushed sequentially!"
