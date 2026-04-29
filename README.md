# Adventura Website

Documentation-first website for the Adventura voxel survival prototype.

The site explains the current game loop, client/server architecture, local
installation flow, and links into a small static game wiki under `public/wiki/`.

## Run locally

Prerequisites:

- Node.js 20.19 or newer
- npm

```sh
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:3000/`.

## Checks

```sh
npm run lint
npm run build
```

## Wiki

The static wiki is available at `/wiki/index.html` and currently includes:

- Spielprinzip
- Architektur
- Installation
- Controls & Commands
