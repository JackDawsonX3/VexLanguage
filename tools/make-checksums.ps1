param(
  [string]$Version = "0.1.0",
  [string]$InDir = "./dist"
)
Get-ChildItem "$InDir/vex-*-$Version*" -File | ForEach-Object {
  $hash = Get-FileHash $_.FullName -Algorithm SHA256
  Set-Content -Path ("$($_.FullName).sha256") -Value ($hash.Hash.ToLower())
}
