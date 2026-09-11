param(
  [string]$BaseUrl = "http://localhost:3000",
  [string]$OutDir = "output/pdf/mhlc-review-packet"
)

$ErrorActionPreference = "Stop"

$edgeCandidates = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe",
  "${env:LOCALAPPDATA}\Microsoft\Edge\Application\msedge.exe"
)

$edge = $edgeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) {
  throw "Microsoft Edge was not found. Install Edge or pass a different browser exporter."
}

$pages = @(
  @{ Number = "01"; Slug = "homepage";     Title = "Homepage";            Path = "/" },
  @{ Number = "02"; Slug = "overview";     Title = "Project Overview";    Path = "/mhlc-overview.html" },
  @{ Number = "03"; Slug = "foundation";   Title = "Foundation";          Path = "/mhlc-foundation.html" },
  @{ Number = "04"; Slug = "give";         Title = "Give";                Path = "/mhlc-give.html" },
  @{ Number = "05"; Slug = "events";       Title = "Events";              Path = "/mhlc-events.html" },
  @{ Number = "06"; Slug = "contributors"; Title = "Contributors";        Path = "/mhlc-contributors.html" },
  @{ Number = "07"; Slug = "letters";      Title = "Letters of Support";  Path = "/mhlc-letters-of-support.html" },
  @{ Number = "08"; Slug = "resources";    Title = "Resources";           Path = "/mhlc-resources.html" },
  @{ Number = "09"; Slug = "contact";      Title = "Contact";             Path = "/mhlc-contact.html" }
)

$root = Resolve-Path "."
$packetDir = Join-Path $root $OutDir
$pdfDir = Join-Path $packetDir "pdfs"
$proofDir = Join-Path $packetDir "proof-images"
$tempProfile = Join-Path $packetDir "edge-profile"

New-Item -ItemType Directory -Force -Path $pdfDir, $proofDir, $tempProfile | Out-Null

$manifestRows = New-Object System.Collections.Generic.List[object]
$trackerRows = New-Object System.Collections.Generic.List[object]

foreach ($page in $pages) {
  $fileBase = "$($page.Number)-$($page.Slug)"
  $pdfPath = Join-Path $pdfDir "$fileBase.pdf"
  $url = "$BaseUrl$($page.Path)"

  if (Test-Path $pdfPath) {
    Remove-Item -LiteralPath $pdfPath -Force
  }

  $args = @(
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--user-data-dir=$tempProfile",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=10000",
    "--print-to-pdf=$pdfPath",
    $url
  )

  $process = Start-Process -FilePath $edge -ArgumentList $args -Wait -PassThru -WindowStyle Hidden
  if ($process.ExitCode -ne 0 -or -not (Test-Path $pdfPath)) {
    throw "PDF export failed for $($page.Title) at $url"
  }

  $item = Get-Item $pdfPath
  $manifestRows.Add([pscustomobject]@{
    Number = $page.Number
    Page = $page.Title
    Url = $url
    Pdf = "pdfs/$fileBase.pdf"
    Bytes = $item.Length
  })

  $trackerRows.Add([pscustomobject]@{
    Page = $page.Title
    Url = $url
    AssignedGroup = ""
    Reviewer = ""
    Location = ""
    IssueType = ""
    CurrentTextOrElement = ""
    SuggestedChange = ""
    Priority = ""
    Status = ""
  })
}

$manifestPath = Join-Path $packetDir "packet-manifest.csv"
$trackerPath = Join-Path $packetDir "review-tracker.csv"
$manifestRows | Export-Csv -NoTypeInformation -Path $manifestPath
$trackerRows | Export-Csv -NoTypeInformation -Path $trackerPath

$readmePath = Join-Path $packetDir "README.md"
$readme = @'
# MHLC Website Review Packet

Generated from: $BaseUrl
Generated on: GENERATED_AT

## Contents

- `pdfs/` contains one browser-rendered PDF per public webpage.
- `proof-images/` contains rendered first-page proof images for quick visual checks.
- `packet-manifest.csv` lists each PDF, source URL, and file size.
- `review-tracker.csv` is a starter tracker for assigning pages and collecting requested content or formatting changes.

## Review Guidance

Use the PDFs for page-by-page visual review. Record final change requests in `review-tracker.csv` so text edits, formatting notes, and priorities stay centralized.
'@
$readme = $readme.Replace('$BaseUrl', $BaseUrl).Replace('GENERATED_AT', (Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"))
$readme | Set-Content -Path $readmePath -Encoding UTF8

$poppler = Get-Command pdftoppm -ErrorAction SilentlyContinue
if ($poppler) {
  foreach ($page in $pages) {
    $fileBase = "$($page.Number)-$($page.Slug)"
    $pdfPath = Join-Path $pdfDir "$fileBase.pdf"
    $proofPrefix = Join-Path $proofDir $fileBase
    & $poppler.Source -png -f 1 -singlefile $pdfPath $proofPrefix | Out-Null
  }
}

$zipPath = Join-Path $packetDir "mhlc-review-packet.zip"
if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}
Compress-Archive -Path (Join-Path $packetDir "*") -DestinationPath $zipPath -Force

Write-Output "Review packet created: $packetDir"
Write-Output "PDF count: $($pages.Count)"
Write-Output "Zip: $zipPath"
