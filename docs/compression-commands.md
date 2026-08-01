# Compression Commands

This document contains the commands used to compress the large assets before migrating them to Supabase Storage.

## Images (`sharp`)
We use `sharp` (already present in the project via Next.js) inside our custom `scripts/migrate-public-assets.ts` script to compress the images.
The script processes `.png` files, resizes them (max width 800px) and converts them to `.webp` format at 80% quality, which yields massive size reductions while maintaining perfect visual quality for the web.

## Videos (`ffmpeg`)
For videos, we use `ffmpeg` to reduce the bitrate and re-encode to a web-optimized MP4 or WebM format. Run these commands locally where `ffmpeg` is installed:

### Hero Video Compression
Original size: 10.2 MB

To aggressively compress for mobile (targeting ~2MB):
```bash
ffmpeg -i public/hero_video.mp4 -vcodec libx264 -crf 28 -preset slow -an public/hero_video_optimized.mp4
```

For WebM (often smaller for web delivery):
```bash
ffmpeg -i public/hero_video.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -an public/hero_video_optimized.webm
```

*(Note: `-an` removes the audio track to save space, since the hero video is typically muted anyway.)*
