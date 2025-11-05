# Script to download blog images from blog.kryptongame.com
# Run this script from the project root directory

$blogImageDir = "public\images\blog"
New-Item -ItemType Directory -Force -Path $blogImageDir | Out-Null

Write-Host "Downloading blog images..."
Write-Host "Please manually download images from your blog and save them with these names:"
Write-Host ""
Write-Host "1. nopixel-v.jpg - NoPixel V article"
Write-Host "2. ea-cricket-07.jpg - EA Cricket 07 article"
Write-Host "3. powera-switch-2.jpg - PowerA Switch 2 article"
Write-Host "4. ps5-pro.jpg - PS5 Pro article"
Write-Host "5. gta-6.jpg - GTA 6 article"
Write-Host "6. xbox-cloud.jpg - Xbox Cloud Gaming article"
Write-Host "7. rdr2.jpg - RDR2 article"
Write-Host ""
Write-Host "Save them to: $PWD\$blogImageDir"
Write-Host ""
Write-Host "Or manually update the image paths in src/content/blog/*.md files"

