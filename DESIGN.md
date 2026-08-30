# DESIGN.md

> Full Monochrome Premium Specification for Muhamad Rivan Sahronie Portfolio

## 1. Identity & Architecture

- **Primary Heading**: **Muhamad Rivan Sahronie** (Name first, confident typographic hierarchy).
- **Core Tagline**: *"Transforming complex challenges into clean, structured digital solutions."*
- **Canvas Model**: **100% Single-Screen Focus (Zero Page Scroll)** with smooth `motion/react` cross-fades between sections.
- **Color Scheme**: **100% Pure Monochrome Premium** (Zero blue, zero AI gradients, pure timeless high-contrast grayscale).

## 2. Color System

### Dark Mode (Pitch Obsidian & Titanium Silver)
- `--color-bg`: `#080808` (Pitch Dark Canvas)
- `--color-surface`: `#111111` (Matte Solid Black Surface)
- `--color-surface-raised`: `#181818` (Elevated Card)
- `--color-fg`: `#ffffff` (Pure White Text)
- `--color-muted`: `#9e9e9e` (Readable Silver Gray, WCAG AA compliant)
- `--color-subtle`: `#616161` (Subtle Metadata)
- `--color-border`: `#222222` (Titanium Wire Border)
- `--color-border-subtle`: `#181818`
- `--color-accent`: `#ffffff` (Pure White Accent)
- `--color-accent-hover`: `#e0e0e0`
- `--color-accent-soft`: `rgba(255, 255, 255, 0.08)`
- `--color-accent-contrast`: `#000000`

### Light Mode (Pure Minimalist Chalk & Inky Black)
- `--color-bg`: `#fcfcfc` (Chalk Canvas)
- `--color-surface`: `#ffffff` (Pure Surface)
- `--color-surface-raised`: `#f4f4f5` (Subtle Raised Surface)
- `--color-fg`: `#0a0a0a` (Deep Carbon Text)
- `--color-muted`: `#52525b` (Readable Slate Gray, WCAG AA compliant)
- `--color-subtle`: `#a1a1aa` (Subtle Metadata)
- `--color-border`: `#e4e4e7` (Clean Wireframe Border)
- `--color-border-subtle`: `#f4f4f5`
- `--color-accent`: `#0a0a0a` (Carbon Black Accent)
- `--color-accent-hover`: `#27272a`
- `--color-accent-soft`: `rgba(0, 0, 0, 0.05)`
- `--color-accent-contrast`: `#ffffff`

## 3. Structural Rules & Components

- **Navigation**: Mouse wheel scroll, touch swipe, keyboard arrows (`←`/`→`, `PageUp`/`PageDown`), and floating stepper.
- **Projects**: Large grand slider card with browser frame mockup and full case study modal mounted via `createPortal`.
- **Experience**: Large executive milestone slider card with structured responsibilities and tech stack.
- **Skills**: Clean 4-pillar structured matrix mapped from data bank.
- **Contact**: Centered minimal email deck with copy-to-clipboard action.
- **Anti-Slop Hard Gates**: 0 em dashes in UI copy, 0 GPA references, 0 flashing hover borders, 0 AI commentary in code.
