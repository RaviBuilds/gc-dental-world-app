param([string]$Path)
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap($Path)
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $bmp.Height)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$bmp.UnlockBits($data)

$minX = $bmp.Width; $minY = $bmp.Height; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $bmp.Height; $y++) {
  $rowStart = $y * $stride
  for ($x = 0; $x -lt $bmp.Width; $x++) {
    $i = $rowStart + $x * 4
    $b = $bytes[$i]; $g = $bytes[$i + 1]; $r = $bytes[$i + 2]
    if ($r -lt 242 -or $g -lt 242 -or $b -lt 242) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
Write-Output "Content bounds: x=$minX..$maxX y=$minY..$maxY"

$margin = 12
$cx = [Math]::Max(0, $minX - $margin)
$cy = [Math]::Max(0, $minY - $margin)
$cw = [Math]::Min($bmp.Width - $cx, $maxX - $minX + 1 + $margin * 2)
$ch = [Math]::Min($bmp.Height - $cy, $maxY - $minY + 1 + $margin * 2)
Write-Output "Crop rect: $cx,$cy ${cw}x${ch}"

$cropped = $bmp.Clone((New-Object System.Drawing.Rectangle($cx, $cy, $cw, $ch)), $bmp.PixelFormat)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
$tempPath = "$Path.tmp"
$cropped.Save($tempPath, $jpegCodec, $ep)
$cropped.Dispose(); $bmp.Dispose(); $ep.Dispose()
Move-Item -Force $tempPath $Path

$check = New-Object System.Drawing.Bitmap($Path)
Write-Output "Saved: $($check.Width) x $($check.Height)"
$check.Dispose()
