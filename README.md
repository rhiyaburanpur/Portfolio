# Personal Portfolio | Rhiya Buranpur

A modern, interactive personal portfolio website built to showcase my projects, skills, and experience as an AI & Data Science student. This application features a unique blend of 3D interactive elements, gamification, and developer-centric design patterns.

## Live Demo

https://rhiya.vercel.app

## Key Features

* **Interactive Hero Section:** Features a fully playable **Chrome Dino Game** integrated directly into the landing page.
* **Developer-Centric UI:** Includes a **Terminal-style Contact** section that replaces traditional forms with direct command-line-inspired interactions.
* **3D Interactivity:** Utilizes **Lanyard** to render 3D physics-based cards and interactive badge elements.
* **Dynamic Visuals:** Implements advanced UI effects such as **Ribbons** backgrounds, **Gooey Navigation**, and **Click Spark** animations for a polished user experience.
* **Project Showcase:** A **ScrollStack** layout to display projects like "VolunEra" and "SyntaxIQ" effectively.

## Known Issues

* **Mobile Responsiveness:** The website is currently optimized for **Desktop and Laptop** viewports only. Users accessing the site on mobile devices (phones/tablets) may experience layout distortions or overlapping elements. Mobile optimization is planned for a future release.

## Tech Stack

* **Core:** React.js (v18+)
* **Build Tool:** Vite
* **Styling:** CSS3, Tailwind CSS
* **Linting:** ESLint
* **Deployment:** Vercel

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/rhiyaburanpur/portfolio.git](https://github.com/rhiyaburanpur/portfolio.git)
    cd portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## Project Structure

```text
src/
├── components/
│   ├── background/    # Visual background effects (Ribbons, etc.)
│   ├── contact/       # Contact section components (TerminalContact)
│   ├── hero/          # Landing area (ChromeDinoGame, Lanyard)
│   ├── layout/        # Shared layout elements (Footer, Layout wrapper)
│   ├── projects/      # Project display components (ScrollStack)
│   ├── skills/        # Skill visualization (InfiniteMenu)
│   └── ui/            # Reusable UI elements (GooeyNav, ClickSpark)
├── context/           # React Context (ThemeContext)
├── assets/            # Static assets and images
└── App.jsx            # Main application entry point

```
## Deployment & CI/CD

This application is deployed using **Vercel** with a continuous integration pipeline.
* **Automatic Deploys:** Every push to the `main` branch triggers a production build.
* **Preview Environments:** Pull Requests automatically generate isolated preview URLs for testing before merging.
* **Framework Detection:** Vercel automatically optimizes the build settings for the **Vite** environment.

## Copyright
© 2026 Rhiya Buranpur. All Rights Reserved.

This project is the intellectual property of Rhiya Buranpur. Unauthorized copying, modification, distribution, or use of this code without explicit permission is strictly prohibited.
