# Personal Portfolio | Rhiya Buranpur

A modern, interactive personal portfolio built to showcase projects, skills, and experience. Features a terminal/hacker aesthetic with 3D interactive elements, gamification, and a fully responsive layout across desktop and mobile.

**Live:** https://rhiya.vercel.app

---

## Key Features

- **Interactive Hero (Desktop):** 3D physics-based ID card rendered via Lanyard, alongside a fully playable Chrome Dino Game embedded in the landing page.
- **Responsive Mobile Layout:** Dedicated mobile hero with icon-based navigation and a bottom banner nudging mobile users toward the desktop experience for the full 3D view.
- **Horizontal Project Carousel:** Projects displayed in a CSS scroll-snap horizontal swipe carousel with dot indicators — works across all viewport sizes.
- **Terminal Contact Section:** Command-line-style contact interface (`rhiya@portfolio:~$`) supporting commands: `help`, `ls`, `about`, `contact`, `clear`.
- **Skills Navigator:** Tabbed skill categories (AI & Generative AI, Data Engineering, Systems & Backend, Core & Web) with an interactive InfiniteMenu icon selector.
- **Light / Dark Mode:** Toggle between themes via the top-right button.

---

## Projects Showcased

| # | Project | Stack |
|---|---|---|
| 01 | KubeWhisper | Go, Python, FastAPI, Kubernetes, ChromaDB, Gemini |
| 02 | VolunEra | Angular, Firebase |
| 03 | KontoFlow | Python, SQLModel, Pandas |
| 04 | Go Distributed Crawler | Go, Redis, PostgreSQL, Docker |
| 05 | PDF2Quiz | Python, Hugging Face Transformers |

---

## Tech Stack

- **Core:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, CSS3
- **Linting:** ESLint
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/rhiyaburanpur/Portfolio.git
cd Portfolio
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── assets/                        # Static assets (images, icons)
├── components/
│   ├── background/
│   │   └── Ribbons.jsx            # Animated ribbons background
│   ├── contact/
│   │   ├── ContactCRT.jsx         # CRT screen wrapper for contact section
│   │   └── TerminalContact.jsx    # Command-line contact interface
│   ├── hero/
│   │   ├── ChromeDinoAnimation.jsx
│   │   ├── ChromeDinoGame.jsx     # Playable Dino game (desktop hero)
│   │   ├── dino-game.css
│   │   ├── dino-logic.js
│   │   ├── Lanyard.css
│   │   ├── Lanyard.jsx            # 3D physics ID card (desktop hero)
│   │   └── MobileHero.jsx         # Mobile/tablet hero layout
│   ├── layout/                    # Shared layout elements
│   ├── projects/
│   │   └── ScrollStack.jsx        # Horizontal scroll-snap project carousel
│   ├── skills/
│   │   ├── InfiniteMenu.jsx       # Tabbed skill category navigator
│   │   └── SkillDock.jsx          # Skill icon dock
│   └── ui/
│       ├── ClickSpark.jsx
│       ├── Dock.jsx
│       ├── GooeyNav.jsx
│       ├── MobileBanner.jsx       # Bottom banner for mobile viewers
│       ├── SplashScreen.jsx
│       └── Lanyard.jsx
├── context/
│   └── ThemeContext.jsx            # Light/dark mode state
├── deprecated/                    # Archived files (not in production)
├── App.css
├── App.jsx                        # Application entry point
├── index.css
└── main.jsx
```

---

## Deployment

Deployed on Vercel with a continuous integration pipeline.

- Every push to `main` triggers a production build and deploy.
- Pull Requests generate isolated preview URLs automatically.
- Vite framework detection is handled automatically by Vercel.

---

## Copyright

© 2026 Rhiya Buranpur. All Rights Reserved.
Unauthorized copying, modification, or distribution of this code without explicit permission is prohibited.
