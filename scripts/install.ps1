param(
  [string]$Repo = $env:VEX_REPO  -ne $null ? $env:VEX_REPO  : "poqgo/VexLanguage",
  [string]$Ver  = $env:VEX_VERSION -ne $null ? $env:VEX_VERSION : "0.1.0"
)
$arch = if ([Environment]::Is64BitOperatingSystem) { "x64" } else { "x64" }
$name = "vex-win-$arch-$Ver.exe"
$url  = "https://github.com/$Repo/releases/download/v$Ver/$name"
$dst  = Join-Path $PWD $name
Invoke-WebRequest -Uri $url -OutFile $dst
Write-Host "Downloaded $name"
$bin = "$env:ProgramFiles\Vex\vex.exe"
New-Item -Force -ItemType Directory (Split-Path $bin) | Out-Null
Copy-Item $dst $bin -Force
$env:Path = "$($env:ProgramFiles)\Vex;$env:Path"
Write-Host "Installed vex: " (& $bin --version)
