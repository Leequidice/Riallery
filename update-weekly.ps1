# PowerShell script to update old weekly featured items
$content = Get-Content "src\lib\mock-data.ts" -Raw

# Replace pattern: isWeeklyFeatured: true, followed by weeklyFeatureDate: '2025-09-28'
$pattern = "isWeeklyFeatured: true,(\s*weeklyFeatureDate: '2025-09-28')"
$replacement = "isWeeklyFeatured: false,`$1"

$updatedContent = $content -replace $pattern, $replacement

# Write back to file
$updatedContent | Out-File "src\lib\mock-data.ts" -Encoding UTF8
Write-Host "Updated old weekly featured items to false"