# Game Structure

This project is organized around a management-sim game loop:

- `content/`: static definitions such as levels, diseases, room types, staff roles, and placeable items
- `domain/`: runtime business objects and rules for patients, staff, rooms, and the hospital
- `scene/`: Three.js presentation, input adapters, and visual-only helpers
- `simulation/`: ticking systems such as economy, scheduling, routing, and time progression
- `state/`: Pinia stores and state orchestration that bridge UI, simulation, and presentation
- `ui/`: HUD, modal panels, inspectors, and high-level game screens
- `shared/`: reusable types, helpers, constants, and utilities
