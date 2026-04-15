# AGENTS

## Purpose

This document defines the default working guidelines for coding agents in this repository. It combines explicit user preferences with conventions observed in the current codebase.

## Working Agreement

- Inspect the codebase before editing. Do not assume architecture, conventions, or tooling without checking.
- Prefer implementing the requested change directly unless the user clearly asks only for analysis, planning, or review.
- Persist through the task when feasible: inspect, implement, verify, and report.
- Keep progress updates short, concrete, and relevant.
- Do not overwrite, revert, or clean up unrelated user changes.
- Avoid destructive git commands unless explicitly requested.
- Prefer non-interactive git commands.

## Environment

- The project uses `nvm` for Node in at least some local environments.
- If `node` or `pnpm` are missing from `PATH`, load `nvm` explicitly before running project commands:

```sh
bash -lc 'source /home/david/.nvm/nvm.sh && pnpm <command>'
```

- Current verified environment:
  - `node`: `v24.14.1`
  - `pnpm`: `10.33.0`

## Default Workflow

1. Inspect the relevant code paths first.
2. Make the smallest reasonable change that solves the request.
3. Update tests when behavior or public contracts change.
4. Run verification after code changes.
5. Fix any errors introduced by the change automatically when they are in scope.

## Search And Editing

- Prefer `rg` and `rg --files` for code and file search.
- Use `apply_patch` for manual file edits.
- Use ASCII by default unless the file already requires Unicode.
- Add comments only when they clarify non-obvious behavior or intent.
- Prefer small, local edits over broad refactors unless broader cleanup is required.

## Verification

- Always run type-checking, tests, and eslint after code changes.
- Do not treat document-only updates as requiring code verification by default.
- Default verification commands:

```sh
bash -lc 'source /home/david/.nvm/nvm.sh && pnpm type-check'
bash -lc 'source /home/david/.nvm/nvm.sh && pnpm test:unit --run'
bash -lc 'source /home/david/.nvm/nvm.sh && pnpm lint:eslint'
```

- For UI, styling, or build-pipeline changes, also consider:

```sh
bash -lc 'source /home/david/.nvm/nvm.sh && pnpm build'
```

- If verification cannot be completed, say so explicitly.

## Tech Stack

- Vue 3 with single-file components
- Vite
- Pinia
- Tailwind CSS v4 via the Vite plugin
- Three.js
- Vitest with Testing Library
- TypeScript with `vue-tsc`

## Project Structure

- `src/content`: authored content such as levels and game data
- `src/domain`: domain-oriented concepts and future business logic areas
- `src/scene`: Three.js world setup and scene objects
- `src/simulation`: simulation-oriented systems
- `src/state`: runtime state and Pinia-backed store coordination
- `src/ui`: game-facing UI, debug tools, HUD, and modal panels
- `src/style.css`: Tailwind v4 theme tokens and styling entrypoint
- `src/test`: shared test setup

## Imports And Module Boundaries

- Prefer path aliases over long relative imports when crossing feature or top-level directory boundaries.
- Available aliases:
  - `@/*` -> `src/*`
  - `@content/*` -> `src/content/*`
  - `@domain/*` -> `src/domain/*`
  - `@scene/*` -> `src/scene/*`
  - `@shared/*` -> `src/shared/*`
  - `@simulation/*` -> `src/simulation/*`
  - `@state/*` -> `src/state/*`
  - `@ui/*` -> `src/ui/*`
- Short relative imports are still fine within the same local component or module area.

## Code Style

### General

- Match surrounding patterns unless there is a strong reason to improve them.
- Preserve existing behavior unless the task explicitly calls for a behavior change.
- Favor explicit, readable code over clever compression.
- Avoid unnecessary abstraction for small features.

### JavaScript / TypeScript

- Prefer arrow functions unless there is a specific reason not to.
- Keep logic straightforward.
- Prefer narrow, well-named local helpers over speculative abstractions.
- Never use TypeScript `enum`.
- For string IDs, prefer a pseudo-enum built with `as const` instead of repeating raw string literals throughout configs or logic.

### Vue

- Follow the existing Vue 3 SFC structure used in the repo.
- Preserve accessibility when changing UI elements.
- If visible labels are removed, preserve meaningful accessible names.
- Prefer testing behavior and accessible contracts rather than purely visual details.

### Pinia

- Follow the setup-store style already used in the repo.
- Be mindful that refs returned from stores are auto-unwrapped on the store instance.

### Three.js / Scene Runtime

- Be careful with teardown paths and event listener cleanup.
- Do not mutate Three.js child collections while traversing them.
- Prefer explicit cleanup of controls, timers, animation frames, and DOM-attached renderer resources.
- Keep scene/debug instrumentation lightweight and easy to remove.

## Styling

### Tailwind

- This project uses Tailwind CSS v4 through the Vite plugin, not the legacy `tailwind.config.js` plus PostCSS flow.
- Theme tokens are defined in [src/style.css](src/style.css).
- Use token-backed utilities from [src/style.css](src/style.css) for colors, shadows, radii, tracking, blur, and custom sizes.
- Prefer standard Tailwind scale utilities when they express the intended value cleanly.
- Do not introduce arbitrary Tailwind values like `rounded-[...]`, `tracking-[...]`, `shadow-[...]`, `bg-[#...]`, or custom grid templates if the same result can be expressed with a token or standard utility.
- If a new reusable design value is needed, define it as a Tailwind v4 theme token in [src/style.css](src/style.css) instead of hardcoding it in component classes.
- Prefer reusing existing tokens, especially colors.
- Ask for confirmation before adding a new color.
- Preserve the established visual language unless the user explicitly asks for a redesign.

### Exceptions

- Data-driven presentation values may remain inline when they are not design tokens, such as percentage widths for progress bars.
- One-off literals should be treated as suspect and replaced with tokens unless there is a clear reason they must remain dynamic.

## Asset Guidance

### Textures

- Do not default to `PNG` for every texture.
- Use `PNG` when lossless quality or alpha transparency is required.
- Use `PNG` for small tile textures, UI assets, masks, and pixel-art style textures.
- Prefer `WebP` for larger opaque textures where smaller download size matters more than exact lossless reproduction.
- Consider GPU-compressed formats such as `KTX2` later if the project grows into a heavier 3D asset pipeline.
- Remember that source image format affects download size, but browser runtime texture memory is still usually dominated by the decoded GPU texture.

## Testing Guidance

- Prefer focused unit tests near the changed behavior.
- Add regression tests for runtime bugs when practical.
- Keep tests aligned with the current rendered UI and observable behavior, not stale copy or implementation details.

## Communication

- Be concise and direct.
- Focus on actionable information rather than narration.
- In final responses, summarize what changed, note verification, and mention any remaining risk or limitation.
