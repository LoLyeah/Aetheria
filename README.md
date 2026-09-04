# Aetheria

Hardware-accelerated interactive 3D science, medical, and engineering learning platform. Built with Next.js 15, Three.js, and TypeScript.

---

## Interactive Disciplines & Labs

| Discipline | Laboratory Simulations | Key Topics |
| :--- | :--- | :--- |
| **Quantum Mechanics** | Atomic orbitals, Double-slit wave interference, Potential barrier tunneling, Bloch sphere | Wavefunctions, probability density, superposition, quantum tunneling |
| **Embryonic Biology** | 3D procedural embryo morphogenesis, Doppler ultrasound hemodynamics | Cleavage, gastrulation, organogenesis, umbilical & fetal circulation |
| **EV Battery Technology** | 4680 cylindrical jellyroll cell, regenerative braking, inverter thermals | Electrochemical intercalation, thermal runaway, C-rate, motor torque |
| **Pulmonology** | 3D airway tree & alveolar gas exchange, pneumonia consolidation | Ventilation-perfusion matching, diffusion capacity, antibiotic pharmacodynamics |
| **Cardiology (ACS)** | 3D coronary anatomy, plaque rupture, real-time 12-lead ECG telemetry | Myocardial infarction, ST elevation/depression, defibrillation & resuscitation |
| **Hypertension** | Arterial hemodynamics, vascular remodeling & stiffness | Endothelial shear stress, peripheral vascular resistance, antihypertensive titration |

---

## Features

- **Interactive 3D Simulations**: Real-time parameter controls (orbit, zoom, physical constants, time steps) powered by Three.js and WebGL.
- **Rigorous Foundations**: First-principles theory with KaTeX mathematical derivations and checkpoint assessments.
- **Bilingual Support**: Native English (`en`) and Indonesian (`id`) localization throughout all theories, parameters, and quizzes.
- **Progress & Certification**: Local persistence with completion tracking and verifiable digital completion certificates.
- **Lab Design System**: High-contrast, publication-grade scientific UI with dark mode support.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Styling & Motion**: [Tailwind CSS 4](https://tailwindcss.com/), [Motion](https://motion.dev/)
- **Mathematics**: [KaTeX](https://katex.org/)
- **Language**: TypeScript

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or bun

### Installation

```bash
git clone https://github.com/LoLyeah/Aetheria.git
cd Aetheria
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Release & Versioning

Aetheria follows semantic versioning (`x.y.z`):

```bash
npm run version:patch  # Bug fixes and visual polish (bumps z)
npm run version:minor  # New labs or curriculum modules (bumps y)
npm run version:major  # Architectural or foundational upgrades (bumps x)
```

---

## License

MIT
