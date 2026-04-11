# Get all tracked files
$trackedFiles = git ls-files

# Get all untracked files (excluding ignored ones)
$untrackedFiles = git ls-files --others --exclude-standard

# Combine lists
$allFiles = $trackedFiles + $untrackedFiles

# Filter out empty entries if any
$allFiles = $allFiles | Where-Object { $_ -ne "" }

Write-Host "Found $($allFiles.Count) files to push sequentially."
Write-Host "Interval: 5-20 seconds per pushed file."

foreach ($f in $allFiles) {
    if (Test-Path $f) {
        Write-Host "----------------------------------------"
        Write-Host "Processing: $f"
        
        # Stage the file
        git add $f
        
        # Commit the file (allow empty if no changes)
        git commit -m "sync: $f" --allow-empty
        
        # Push to remote
        Write-Host "Pushing to origin main..."
        git push origin main
        
        # Sequential delay
        $delay = Get-Random -Minimum 5 -Maximum 20
        Write-Host "Push successful. Waiting $delay seconds..."
        Start-Sleep -Seconds $delay
    } else {
        Write-Host "Skipping: $f (File not found)"
    }
}

Write-Host "Sequential push completed successfully."
