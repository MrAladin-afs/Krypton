# Blog Images Setup

## Current Status
The blog posts are configured to use local images from `/images/blog/` but the images need to be added.

## Required Images

Please download these images from https://blog.kryptongame.com/ and save them to `public/images/blog/`:

1. **nopixel-v.jpg** - For "NoPixel V: The GTA RP Server's Next Evolution with Rockstar"
2. **ea-cricket-07.jpg** - For "EA Cricket 07: The Game That Became a Cult Classic"
3. **powera-switch-2.jpg** - For "PowerA's Switch 2 Controllers Get Hall Effect Tech"
4. **ps5-pro.jpg** - For "PS5 Pro Revision & DualSense V3 Rumors Surface"
5. **gta-6.jpg** - For "GTA 6 Leak Reveals Massive Map, 700+ Stores, & More"
6. **xbox-cloud.jpg** - For "Free Xbox Cloud Gaming Tier with Ads Confirmed"
7. **rdr2.jpg** - For "RDR2 Update Sparks Player Outrage Over Missing Content"

## How to Add Images

1. Go to https://blog.kryptongame.com/
2. For each blog post, right-click the featured image
3. Select "Save image as..." or "Copy image"
4. Save to: `public/images/blog/[filename].jpg` (use the exact filenames above)

## Image Path Format

Images are configured to use paths like:
- `/images/blog/nopixel-v.jpg`
- `/images/blog/ea-cricket-07.jpg`
- etc.

These paths are relative to the `public` folder, so they will be accessible at the root of your site.

## Alternative: Use Image URLs Directly

If you prefer to keep images on your blog server, you can update the image paths in each blog post file (`src/content/blog/*.md`) to use the full URL from blog.kryptongame.com.

