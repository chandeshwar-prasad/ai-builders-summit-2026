# AI Builders Summit 2026
Interactive AI Summit Invitation & Registration Platform

An immersive, premium, single-page invitation web application built for the pseudo AI Builders Summit 2026. This app is designed with a dark-mode space aesthetic, featuring smooth animations, personalization, and a ticket pass generator.

Live Site: [https://ai-builders-summit-2026.vercel.app](https://ai-builders-summit-2026.vercel.app)

---

## 🚀 Key Features

* **Personalized Onboarding Modal:** Greets visitors and prompts them to enter their name, which is saved locally to personalize sections of the page. Includes a "Reset Onboarding" option in the footer to re-experience it.
* **Countdown Timer:** Live-updating timer counting down to the summit launch date (August 22, 2026).
* **Dynamic Schedule Day Tabs:** A custom tab selector allowing users to switch between Day 1 and Day 2 schedules. It uses React conditional rendering to mount only the active day's timeline cards or accordions, ensuring zero DOM pollution.
* **Responsive Benefit & Speaker Carousels:** Smooth grids on desktop viewports that seamlessly convert into touch-snap scrollable carousels on mobile screens.
* **Interactive Ticket Generator:** A client-side registration form prefilled with the user's name that compiles input data to generate a gorgeous custom "Full Access Pass" ticket complete with a barcode and serial key.
* **Grayscale Venue Map & Statistics:** Grayscale maps and Convention Centre statistics section emphasizing in-person attendance.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS & Custom CSS variables
* **Animations:** Framer Motion
* **Smooth Scrolling:** Lenis Scroll
* **Form & Validation:** React Hook Form & Zod Resolver
* **Icons:** Lucide React

---

## 💻 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/chandeshwar-prasad/ai-builders-summit-2026.git
cd ai-builders-summit-2026
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in your console) to view it.

### 4. Create Production Build
```bash
npm run build
npm run start
```
