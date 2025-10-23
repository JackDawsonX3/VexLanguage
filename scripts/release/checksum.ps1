param([string]$Dir="dist")
Write-Host "Checksums for $Dir"
Get-ChildItem $Dir -File | ForEach-Object {
  $hash = Get-FileHash $_.FullName -Algorithm SHA256
  "$($hash.Hash)  $($_.Name)"
}
