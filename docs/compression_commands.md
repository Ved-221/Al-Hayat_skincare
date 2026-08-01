# Media Compression Commands

## Video Compression (using ffmpeg)

The `public/hero_video.mp4` and other videos should be compressed for web delivery. Run these commands locally where `ffmpeg` is installed:

```bash
# Compress hero_video.mp4 to a web-optimized 1080p format (< 3MB target)
ffmpeg -i public/hero_video.mp4 -vcodec libx264 -crf 28 -preset slow -an -s 1920x1080 public/hero_video_optimized.mp4

# Convert to WebM (often smaller for web)
ffmpeg -i public/hero_video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an public/hero_video_optimized.webm

# Generate a poster frame (first frame)
ffmpeg -i public/hero_video.mp4 -vframes 1 -f image2 public/hero_video_poster.jpg
```

## Image Compression (using sharp / squoosh)

For the large images in `public/photos/` and `public/bgremoved_photos/`, you can use `sharp-cli` or `squoosh-cli`:

```bash
# Using sharp-cli to compress PNGs to WebP
npx sharp-cli -i public/photos/**/*.png -o public/photos/ -f webp -q 80
```
