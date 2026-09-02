# AGENTS.md - Aetheria Interactive 3D Science Platform Guidelines

## 1. Project Overview & Architectural Mission
Aetheria is a premier, hardware-accelerated interactive 3D science and engineering learning platform. It empowers students, researchers, and engineers to explore complex scientific concepts through real-time 3D simulations (WebGPU/Three.js), rigorous theoretical foundations, and checkpoint assessments across three core STEM disciplines:
1. **Quantum Mechanics & Atomic Orbitals** (Wavefunctions, Double-Slit Interference, Potential Barrier Tunneling, Bloch Sphere Qubit State Vectors).
2. **Embryonic Biology & Morphogenesis** (Cellular Cleavage, Organogenesis Timelines, Doppler Ultrasound Hemodynamics).
3. **EV Battery Technology & Powertrain Dynamics** (4680 Jellyroll Electrochemical Physics, Aerodynamics, Regenerative Braking, Silicon-Carbide Inverter Efficiency).

---

## 2. Anti-Slop UI & Design System Rules
Every component in Aetheria must adhere to human-crafted, editorial, and scientific laboratory aesthetics. Actively reject generic AI clichés:

### 🚫 Banned Clichés (Anti-Slop Directives):
- **No Rainbow/Purple-to-Blue Gradients**: Do not use `bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500` or gradient text for headlines. Use solid, crisp, high-contrast typography.
- **No Nested Cards**: Never place boxed cards inside another container card. Use whitespace, typography hierarchy, and subtle 1px dividers (`border-slate-200/80` / `dark:border-slate-800`) to create structure.
- **No Cluttered Badges & Pulse Dots**: Avoid splashing 5 different bright badge colors across the screen or attaching artificial glowing drop-shadows.
- **No Generic SaaS Buzzwords**: Ban words like "supercharge", "unleash", "skyrocket". Use precise scientific, pedagogical, and engineering terminology.
- **No Abrupt View Snapping**: All view switches, tabs, modals, and list reveals must use smooth, spring-assisted motion transitions.

### 📐 Typographic & Layout Standard:
- **Display Hierarchy**: Clear contrast between display headlines, clean body copy (14px–16px, 1.6 line height), and crisp monospace tabular data (`font-mono` for metrics, equations, and timers).
- **Mathematical Padding**: Container outer padding $\ge$ inner padding (minimum 24px–32px on major containers).
- **Balanced Light / Dark System**: Default to a clean, high-contrast slate-50/white aesthetic with deep obsidian slate-950 dark mode.

---

## 3. Motion & Animation Principles (`motion/react`)
- **Page Transitions**: Always wrap multi-view navigation in `<AnimatePresence mode="wait">` with smooth cubic-bezier easing (`ease: [0.22, 1, 0.36, 1]`, duration: 0.35s).
- **Tab & Segment Transitions**: Active tabs must smoothly slide or fade into view without layout shift.
- **Interactive Affordances**: Buttons and interactive modules should feature subtle tactile feedback (`whileHover={{ y: -1 }}`, `whileTap={{ scale: 0.98 }}`).
- **Modal Physics**: Modals must scale in smoothly with spring physics and backdrop blur (`backdrop-blur-md`).

---

## 4. 3D & Simulation Performance Guidelines
- **Framework**: Use Three.js with WebGL2 and WebGPU-compatible shaders.
- **Frame Rate Target**: Maintain 60 FPS across desktop and mobile devices.
- **Particle & Mesh Management**: Always dispose geometries, materials, and requestAnimationFrame loops in `useEffect` cleanup handlers.
- **Interactive Controls**: Support orbit/rotate, zoom, and real-time physical parameter adjustment (e.g. quantum numbers $n, l, m$, gestational day, battery C-rate, motor torque).

---

## 5. Bilingual Standard (English & Indonesian)
- All user-facing strings, theories, quizzes, explanations, and lab parameter labels must exist in both English (`en`) and Indonesian (`id`) within `/lib/translations.ts` and `/lib/content/`.
- Sequential parts must always be labeled **Part 1, Part 2, Part 3, Part 4** in English and **Bagian 1, Bagian 2, Bagian 3, Bagian 4** in Indonesian.

---

## 6. State & Persistence
- **Client Storage**: User progress, completed modules, quiz scores, bookmarks, and custom notes are persisted via `localStorage` with resilient fallback.
- **Progress Tracking**: Real-time completion calculation across all disciplines with verifiable digital accreditation certificates.

---

## 7. Software Versioning & Semantic Release Protocol (`x.y.z`)
Aetheria adheres strictly to semantic versioning represented as `x.y.z`:
- **`x` (Major Update - `x.0.0`)**: Increment for breaking architectural changes, major physics engine revamps, or new foundational science disciplines. Resets `y` and `z` to 0.
- **`y` (Minor Update - `x.y.0`)**: Increment when adding new curriculum parts, new interactive laboratory apparatuses, or backward-compatible feature additions. Resets `z` to 0.
- **`z` (Patch Update - `x.y.z`)**: Increment on every pushed commit, bug fix, visual polishing, text translation, or performance tuning.
- **Automated Commit Bump**:
  - The script `/scripts/bump-version.mjs` increments the version in `package.json` and syncs `/lib/version.ts`.
  - Commands: `npm run version:patch`, `npm run version:minor`, `npm run version:major`.
  - Automated pre-push git hook (`scripts/setup-git-hooks.mjs` / `scripts/pre-push.sh`) bumps `z` before each commit push.

