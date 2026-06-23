# Implementation Plan - AI Builders Summit 2026 Website

This document outlines the step-by-step implementation plan for building the **AI Builders Summit 2026** landing page. The project is designed as an immersive, premium, single-page digital experience built with Next.js, Tailwind CSS, shadcn/ui, Framer Motion, and Lenis smooth scrolling.

---

## User Review Required

> [!IMPORTANT]
> **Key Design & Architecture Decisions:**
> 1. **Next.js Version:** We will use **Next.js 14 (App Router)** with TypeScript.
> 2. **Double Extensions in Assets:** The provided files in the `Assets` folder have names ending in `.jpg.png` and `.png.png` (e.g. `speaker-01-ai-researcher.jpg.png`). We will import them exactly as named to avoid file reference errors.
> 3. **Google Maps Integration:** For the interactive map, we will use a standard responsive Google Maps iframe embed pointing to the Bengaluru International Convention Centre (BICC), bypassing the need for a Google Maps API Key to prevent API setup overhead.
> 4. **Registration State:** Frontend-only implementation. Form submission should show a success message. No registration data storage yet. Google Forms/Supabase integration will be added in a later phase.

---

## Open Questions

> [!NOTE]
> **Clarifications & Verification Plan Details:**
> * **Onboarding Reset:** Would you like a subtle "Reset Name" button in the footer or settings so users can re-experience the welcome onboarding modal without manually clearing their browser's local storage?
> * **Interactive Particles Engine:** Custom CSS + Framer Motion animated particles (chosen over third-party canvas engines like `tsparticles` to keep bundle size low and achieve 60 FPS performance).
> * **Schedule Mapping:** We mapped the 4 speakers to matching sessions in the timeline. Let us know if you want any specific session timings/assignments altered:
>   * *The Future of LLMs* -> **Peter Pandey**
>   * *AI for Data Analysts* -> **Hemanand V**
>   * *Building AI Agents* -> **John David**
>   * *Enterprise Automation* -> **Eliza Grace**

---

## Folder Structure

The project will follow a clean, modern Next.js structure:

```text
ai-builders-summit-2026/
├── public/
│   ├── assets/
│   │   ├── backgrounds/
│   │   │   └── assetsbackgroundsai-network-bg.jpg.png
│   │   ├── hero/
│   │   │   └── assetsherohero-main.jpg.png
│   │   ├── icons/
│   │   │   ├── ai-engineer.png.png
│   │   │   ├── business-professional.png.png
│   │   │   ├── data-analyst.png.png
│   │   │   ├── data-scientist.png.png
│   │   │   └── student.png.png
│   │   ├── registration/
│   │   │   └── registration-bg.jpg.png
│   │   ├── speakers/
│   │   │   ├── speaker-01-ai-researcher.jpg.png
│   │   │   ├── speaker-02-analytics-leader.jpg.png
│   │   │   ├── speaker-03-ai-startup-founder.jpg.png
│   │   │   └── speaker-04-automation-consultant.jpg.png
│   │   └── venue/
│   │       ├── networking-session.jpg.png
│   │       └── venue-exterior.jpg.png
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Space Grotesk / Inter fonts setup, Lenis provider
│   │   ├── page.tsx           # Entry point and layout assembly
│   │   └── globals.css        # Core styling, glassmorphism utilities, custom colors
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (dialog, button, input, accordion, etc.)
│   │   ├── sections/
│   │   │   ├── WelcomeModal.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Storytelling.tsx
│   │   │   ├── Audience.tsx
│   │   │   ├── Speakers.tsx
│   │   │   ├── Schedule.tsx
│   │   │   ├── Venue.tsx
│   │   │   └── Registration.tsx
│   │   ├── Footer.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── SmoothScrollProvider.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   └── lib/
│       └── utils.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## Proposed Changes

We will build the website step-by-step in 8 modular phases. Each phase represents a working, compile-friendly increment.

### Phase 1: Project Initialization & Theme Configuration
* **Goal**: Establish the codebase foundation, install core libraries, set up design tokens (colors, typography), and import assets.
* **Effort**: Low (approx. 2 hours)
* **Tasks**:
  1. Initialize Next.js app inside workspace: `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --src-dir --app --import-alias "@/*"` (non-interactive).
  2. Install dependencies: `lucide-react`, `framer-motion`, `@studio-freight/lenis` (or standard `lenis`), `react-hook-form`, `zod`, `@hookform/resolvers`, `clsx`, `tailwind-merge`.
  3. Initialize shadcn/ui components.
  4. Configure `tailwind.config.ts` to define primary colors:
     - Deep Space Black: `#050816`
     - Charcoal: `#111827`
     - Midnight Blue: `#0F172A`
     - Electric Blue: `#3B82F6`
     - Violet: `#8B5CF6`
     - Cyan: `#22D3EE`
     - Soft White: `#F8FAFC`
     - Muted Gray: `#94A3B8`
     - Border Gray: `#1E293B`
  5. Setup Next.js Local Fonts (`Space Grotesk` and `Inter`) in [layout.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/app/layout.tsx).
  6. Copy all files from the workspace `Assets/` directory into `public/assets/`.
* **Verification Checkpoint**:
  - Run `npm run dev`. Confirm the site compiles and displays the default welcome page.
  - Verify that local fonts load correctly and assets are fetchable via `/assets/...`.

---

### Phase 2: Core Background Particles & Smooth Scrolling
* **Goal**: Build the ambient UI layers that span the entire page, including background glows and smooth scrolling.
* **Effort**: Medium-Low (approx. 3 hours)
* **Tasks**:
  1. Create a `SmoothScrollProvider` wrapping the root layout in Lenis for premium inertia scroll.
  2. Create a lightweight `ParticleBackground` component using Custom CSS and Framer Motion animated particles.
  3. Set up the primary backdrop gradients inside [globals.css](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/app/globals.css) with subtle 20-second dynamic cycles.
  4. Add glassmorphism CSS helper utility rule:
     ```css
     .glass-card {
       backdrop-filter: blur(16px);
       background: rgba(255, 255, 255, 0.08);
       border: 1px solid rgba(255, 255, 255, 0.1);
     }
     ```
* **Verification Checkpoint**:
  - Scroll performance audit on multiple viewports to ensure inertia scroll is smooth (target 60 FPS).
  - Verify that the floating background gradients and particles load correctly without blocking thread execution.

---

### Phase 3: Onboarding Welcome Modal (Personalization Logic)
* **Goal**: Require new visitors to enter their name, store it in `localStorage`, and bypass the modal for returning visitors.
* **Effort**: Medium (approx. 4 hours)
* **Tasks**:
  1. Write a custom `useLocalStorage` hook to manage the `visitorName` key.
  2. Build [WelcomeModal.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/sections/WelcomeModal.tsx) using Framer Motion:
     - If first visit, show a blurred backdrop layout containing the onboarding glass card.
     - On Submit (with validation: 2-40 characters), store name and display success transition ("Welcome, John. Preparing your summit experience...") for 1.5s, then fade out modal.
     - If name is already in `localStorage`, display "Welcome back, John." immediately for 2s, then auto-fade out.
  3. Ensure modal keyboard traps focus and hitting "Enter" submits.
* **Verification Checkpoint**:
  - Open page in Incognito -> modal asks for name. Enter invalid inputs -> validation displays error. Enter name -> modal success fades out.
  - Refresh page -> welcome back animation displays for 2s and enters site automatically.

---

### Phase 4: Hero Section & Countdown Timer
* **Goal**: Build the primary landing hero section incorporating custom welcomes and a countdown timer.
* **Effort**: Medium-Low (approx. 3 hours)
* **Tasks**:
  1. Design the Hero component with minimum `100vh` viewport height, centering the title.
  2. Add the dynamic personalized subtitle: "Welcome back, [Name]" (conditionally visible once the Welcome Modal transitions out).
  3. Implement the countdown timer counting down to August 22, 2026 (calculates days, hours, minutes, seconds).
  4. Place the dynamic CTA "Register Now" button with scale micro-animations.
* **Verification Checkpoint**:
  - Confirm the countdown timer decrements every second and formats correctly.
  - Verify the title text handles long names elegantly on mobile screens.

---

### Phase 5: Storytelling & Target Audience Sections (Mobile Carousel)
* **Goal**: Create the narrative text reveal section and interactive 5-card audience section.
* **Effort**: Medium (approx. 4 hours)
* **Tasks**:
  1. Build [Storytelling.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/sections/Storytelling.tsx) featuring the "The Future Is Being Built Today" header. Apply a Framer Motion text reveal stagger animation on scroll.
  2. Build [Audience.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/sections/Audience.tsx):
     - Design cards using glassmorphism styling and icons from `/assets/icons/`.
     - Layout mappings:
       * Desktop (`lg`): 5-column grid.
       * Tablet (`md`): 2-column/3-column grid.
       * Mobile (`sm`): Horizontal scrollable snap-carousel.
* **Verification Checkpoint**:
  - Inspect mobile rendering (under 768px width) and verify cards scroll horizontally and snap correctly.
  - Verify hover glow and lift effects on desktop.

---

### Phase 6: Speakers Section (Mobile Swipeable Carousel)
* **Goal**: Implement the 4 speaker glassmorphism profile cards with interactive hover zooms and swipeable layouts.
* **Effort**: Medium (approx. 4 hours)
* **Tasks**:
  1. Build [Speakers.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/sections/Speakers.tsx).
  2. Configure speaker cards containing profile photo, name, role, topic, and a CTA "View Details".
  3. Apply hover animation zoom to the Next.js `Image` wrapper, along with a subtle gradient border glow.
  4. Ensure grid layout on desktop transforms into a swipeable carousel with CSS snap scrolling on mobile devices.
* **Verification Checkpoint**:
  - Test image loading efficiency. Ensure layout shifts are minimal.
  - Test touch swiping swipe behavior on mobile screen simulations.

---

### Phase 7: Event Schedule Timeline & Venue Section
* **Goal**: Render the timeline of events (accordion on mobile, vertical splits on desktop) and embed the BICC Google Map.
* **Effort**: Medium-High (approx. 5 hours)
* **Tasks**:
  1. Create [Schedule.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/sections/Schedule.tsx) timeline data mapping sessions.
  2. Implement layouts:
     - Desktop: Alternating vertical timeline. Day 1 on left side, Day 2 on right side, with scroll-triggered drawing line animation.
     - Mobile: Vertical list of clean accordions that expand to reveal detailed session descriptions.
  3. Create [Venue.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/sections/Venue.tsx):
     - Left column: parallax image grid displaying venue exterior and networking-session.
     - Right column: location coordinates and Google Maps iframe wrapper.
* **Verification Checkpoint**:
  - Open accordions on mobile to check layout shifts and fluid animations.
  - Check map iframe dimensions are responsive on mobile.

---

### Phase 8: Registration Form & Footer
* **Goal**: Implement the glassmorphism validation form prefilled with the onboarding user name, and add the contact footer.
* **Effort**: Medium (approx. 4 hours)
* **Tasks**:
  1. Build [Registration.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/sections/Registration.tsx) with a centered glassmorphism container.
  2. Prefill the 'Full Name' field automatically with the name stored in Local Storage.
  3. Add fields: Email, Company, Job Title, Day Attending (Select Dropdown).
  4. Connect react-hook-form + Zod schemas for client-side validations.
  5. Add states: default state, focus glow, inline errors, loading spinner, and success text. On success, show a success message without any registration data storage (frontend-only implementation).
  6. Add [Footer.tsx](file:///d:/Codebasics/AI%20Pro/ai-builders-summit-2026/src/components/Footer.tsx) with minimal summit links and a "Reset Onboarding" button.
* **Verification Checkpoint**:
  - Verify that the 'Full Name' field defaults to the onboarded name.
  - Verify Zod rules block invalid email entries and empty values.
  - Click "Reset Onboarding", refresh the page, and check if the welcome onboarding modal shows up again.

---

## Verification Plan

### Automated Verification
* Run build validations:
  ```powershell
  npm run build
  ```
* Run linter:
  ```powershell
  npm run lint
  ```

### Manual Verification
* **Cross-Browser Verification**: Check layout rendering in Chrome, Safari, and Edge.
* **Responsive Check**: Test the site across breakpoints (360px mobile, 768px tablet, 1280px+ desktop).
* **Onboarding Logic**: Validate name entry modal triggers correctly, stores string, and transitions dynamically.
* **Scroll Dynamics**: Confirm Lenis smooth scroll feels natural and scroll-triggered animations perform smoothly at 60 FPS.
