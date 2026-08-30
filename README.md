# Muhamad Rivan Sahronie — Portfolio (rivan.me)

High-performance, editorial portfolio with a single-screen zero-scroll canvas, dynamic interactive monochrome background, and multi-language support.

---

## 🏗️ Architecture & Engineering Principles

- **Single Source of Truth (SOT)**: All project, experience, education, and skill configurations are centralized in `src/config/` and localized via `src/locales/`.
- **Separation of Concerns (SOC)**:
  - `src/components/`: Reusable presentation primitives (`SpotlightCard`, `InteractiveBackground`, `BottomNavbar`, `Sidebar`, `ProjectDetailModal`, `Loading`).
  - `src/sections/`: Isolated view stages (`OverviewSection`, `ProjectsSection`, `ExperienceSection`, `SkillsSection`, `EducationSection`, `ContactSection`).
  - `src/hooks/`: Navigation and interaction logic (`useSectionNavigation`).
- **DRY (Don't Repeat Yourself)**: Shared interaction hooks, uniform tokenized styling, and centralized type contracts.

---

## ⚡ High-Concurrency & Performance Architecture (1000+ Concurrent Users)

1. **Static Edge Asset Delivery**:
   - The entire production build (`dist/`) compiles into immutable static assets (`HTML`, `CSS`, `JS`, `Images`, `PDFs`).
   - Deployed to edge CDN networks (e.g. Cloudflare Pages, Vercel Edge, GCP Cloud CDN).
2. **Chunk Splitting & Tree-Shaking**:
   - Vendor chunks (`react`, `i18n`, `icons`, `vendor`) are separated with long-term immutable caching (`Cache-Control: max-age=31536000, immutable`).
3. **Canvas Performance Guard**:
   - `InteractiveBackground.tsx` automatically pauses rendering when the browser tab is hidden or minimized (`document.hidden`), saving 100% CPU/GPU cycles.
4. **Zero-Scroll Viewport**:
   - Fixed 1-page canvas with smooth `motion/react` cross-fades between sections.
   - Mouse wheel, keyboard arrow (`←`/`→`, `PageUp`/`PageDown`), and touch swipe navigation.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Build**: Vite + Rolldown
- **Styling**: Tailwind CSS v4
- **Motion**: Motion (Framer Motion v13)
- **Icons**: Lucide React
- **Localization**: i18next + react-i18next (English default + Indonesian)

---

## 🚀 Development & Build

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm run dev

# Compile optimized production bundle
pnpm run build

# Preview production build locally
pnpm run preview
```

---

*Muhamad Rivan Sahronie · Bandung, Indonesia*
