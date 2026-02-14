# Janitza's Valentine Website

> **IMPORTANT PRIVACY NOTE**: This page is intended for Janitza only. Please do not share or index publicly.

This is a private, single-page website created as a Valentine's gift. It features a custom "Antigravity" physics engine for floating words and personal media integration.

## Project Structure

- `index.html`: The main entry point.
- `styles.css`: Custom styling with CSS variables.
- `scripts.js`: Physics engine and interaction logic.
- `assets/`: Contains media files (`voice.mp3`, `hug-video.mp4`) and transcripts.

## Deployment Instructions (GitHub Pages)

1. **Upload** all files to a private GitHub repository.
2. Go to **Settings** > **Pages**.
3. Select `main` branch as the source and `/ (root)` folder.
4. **Save**.
5. The site will be published at `https://[username].github.io/[repo-name]/`.

## Media Files

You need to place the following files in the `assets/` folder:
- `voice.mp3`: Your compiled voice message.
- `hug-video.mp4`: The AI generated video.
- Any photos in `assets/photos/`.

## Deployment Checklist

- [ ] Confirm "Do not share" warning is visible in this README.
- [ ] Verify audio/video files are loaded correctly.
- [ ] Test on mobile (iPhone/Android) to ensure physics engine is performant.
- [ ] Check `prefers-reduced-motion` behavior.
