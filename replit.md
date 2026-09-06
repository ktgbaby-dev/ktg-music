# Kaalim TV Channel

A frontend-only music artist website presented as a fictional broadcast channel.

## Run & Operate

- `pnpm --filter @workspace/kaalim-channel run dev` — run the Vite website
- `pnpm --filter @workspace/kaalim-channel run typecheck` — typecheck the website
- `pnpm --filter @workspace/kaalim-channel run build` — build the static website

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Motion: CSS animations and interaction state

## Where things live

- `artifacts/kaalim-channel/src/App.tsx` — artist, release, programming, schedule, social, and contact content
- `artifacts/kaalim-channel/src/index.css` — broadcast visual system and responsive layout
- `artifacts/kaalim-channel/public/` — static favicon and robots metadata

## Architecture decisions

- The site is intentionally static and frontend-only; placeholder content lives in local data structures for easy replacement.
- The TV channel concept is expressed through broadcast labels, CRT texture, scanlines, and playful collage graphics rather than external services.

## Product

- Single-page artist channel with intro ident, music player simulation, release library, video modal, schedule, social links, and contact feedback state.

## User preferences


## Gotchas

- The Vite workflow supplies `PORT` and `BASE_PATH`; do not hardcode either in the app.

## Pointers

- The frontend is deployable as static assets through the `artifacts/kaalim-channel` artifact.
