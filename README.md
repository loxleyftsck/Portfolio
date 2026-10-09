# Herald Ginting portfolio

React + TypeScript + Vite, with a procedural Three.js hero and animated project gallery.

## Run locally

Use Node.js 22.12+ or 24+.

    npm ci
    npm run dev

Build static output into dist/:

    npm run build
    npm run preview

## Edit

- Content: src/data/portfolio.ts
- Scene: src/components/visuals/HeroScene.tsx
- Styles: src/index.css
- Artwork provenance: docs/visual-direction.md

The scene is a separate chunk, capped at 30fps. It stops while offscreen, hidden, or paused, and respects reduced motion. WebP artwork appears when WebGL cannot initialize or its context is lost. GPU resources, observers and listeners are disposed on unmount.

## Optimize assets

Keep source images outside public/. Provide chrome.png, dialogue.png, attractor.png, and PhotoProfile.jpg in a source directory:

    node scripts/optimize-assets.mjs "<source-directory>"

The original profile photo is recoverable from Git history.

## Project explorer

Search matches project titles, descriptions, tools, and category names. It combines with the category buttons and announces the visible count. Each Details button opens a native modal dialog using the existing project data and real evidence images. Escape or the close button dismisses it and focus returns to the originating button. The source data remains in src/data/portfolio.ts.
