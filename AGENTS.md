# AGENTS

## Purpose

This document defines the working guidelines for coding agents operating in this repository. It combines explicit project preferences with conventions inferred from the codebase.

## Core Workflow

- Inspect the codebase before editing. Do not assume architecture, conventions, or tooling without checking.
- Prefer implementing the requested change directly unless the user clearly asks only for analysis or planning.
- Persist through the full task when feasible: inspect, implement, verify, and report outcomes.
- Keep progress updates short, concrete, and relevant while working.
- Do not overwrite, revert, or clean up unrelated user changes.
- Avoid destructive git commands unless explicitly requested.
- Prefer non-interactive git commands.

## Search And Editing

- Prefer `rg` and `rg --files` for code and file search.
- Use `apply_patch` for manual file edits.
- Use ASCII by default when editing files unless the file already requires Unicode.
- Add comments only when they clarify non-obvious behavior or intent.

## Code Style

### General

- Match existing patterns in the surrounding code unless there is a strong reason to improve them.
- Prefer small, local changes over broad refactors unless the task requires broader cleanup.
- Preserve existing behavior unless the task explicitly calls for behavior changes.

### JavaScript / TypeScript

- Prefer arrow functions unless there is a specific reason not to.
- Keep logic straightforward and avoid unnecessary abstraction for small features.
- Favor explicit, readable code over clever compression.

### Vue

- Follow the existing Vue 3 single-file component structure already present in the repo.
- Preserve accessibility when changing UI elements. If visible labels are removed, maintain meaningful accessible names.
- Prefer testing behavior and accessible contracts rather than purely visual details.

## Styling

### Tailwind

- This project uses Tailwind CSS v4 through the Vite plugin, not the legacy `tailwind.config.js` plus PostCSS flow.
- Tailwind theme tokens are defined in [src/style.css](src/style.css).
- Use token-backed utilities from [src/style.css](src/style.css) for colors, shadows, radii, tracking, blur, and custom sizes.
- Prefer standard Tailwind scale utilities when they express the intended value cleanly.
- Do not introduce arbitrary Tailwind values like `rounded-[...]`, `tracking-[...]`, `shadow-[...]`, `bg-[#...]`, or custom grid templates if the same result can be expressed with a theme token or standard utility.
- If a new reusable design value is needed, define it as a Tailwind v4 theme token in [src/style.css](/home/david/projects/oth3d-new/src/style.css) instead of hardcoding it in component classes.
- Prefer the reuse of existing tokens, especially colors.
- Ask for confirmation before adding a new color.
- Preserve the established visual language unless the user explicitly asks for a redesign.

### Exceptions

- Data-driven presentation values may remain inline when they are not design tokens. Example: percentage widths for progress bars.
- One-off literals should be treated as suspect and replaced with tokens unless there is a clear reason they must remain dynamic.

## Testing And Verification

- Run targeted tests for the code you changed when practical.
- For UI or styling infrastructure changes, prefer both focused tests and a production build.
- This repo uses `pnpm` for package management and `vitest` for unit tests.
- If verification cannot be completed, say so explicitly.

## Repo Assumptions

- Framework stack: Vue 3, Vite, Pinia, Tailwind CSS v4, ThreeJS.
- Package manager: `pnpm`.
- Test runner: `vitest`.
- Styling entrypoint: [src/style.css](src/style.css).

## Communication

- Be concise and direct.
- Focus on actionable information, not narration.
- In final responses, summarize what changed, note verification, and mention any remaining risk or limitation.
