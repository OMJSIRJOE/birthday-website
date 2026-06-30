# Happy Birthday Chidinma ❤️

A luxury, fully responsive birthday website built with **Next.js 15**, **React**, **TypeScript**, and **Tailwind CSS**. Designed with a premium Apple × Cartier aesthetic — black, gold, elegant animations, and romantic surprises throughout.

---

## Features

- **Loading screen** — "Loading Memories…" with gold animation and floating hearts (4 seconds)
- **Hero page** — Birthday greeting with gold particles
- **Love letter** — Animated luxury paper card
- **Love quiz** — 5 questions, score tracking, pass/fail flows
- **Celebration** — Confetti, fireworks, and floating hearts on quiz success
- **Photo gallery** — Luxury grid with lightbox
- **Spin the wheel** — Realistic physics, one spin saved to localStorage
- **Special surprise** — Animated heart, roses, Spotify playlist button
- **Final page** — Stars, rose petals, and a heartfelt closing message
- **Extras** — Luxury cursor glow, glassmorphism, Framer Motion animations, responsive navbar

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- npm (comes with Node.js)

### Steps

1. **Open a terminal** and navigate to the project folder:

   ```bash
   cd birthday-website
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

---

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

| Command         | Description              |
|-----------------|--------------------------|
| `npm run build` | Build for production     |
| `npm run start` | Run production build     |
| `npm run lint`  | Run ESLint               |

---

## Adding Your Photos

Replace the placeholder images in the `public/images/` folder with your own photos. Keep the same filenames:

```
public/images/
├── photo1.jpg
├── photo2.jpg
├── photo3.jpg
├── photo4.jpg
├── photo5.jpg
├── photo6.jpg
├── photo7.jpg
└── photo8.jpg
```

**Tips:**
- Use `.jpg` or `.jpeg` format (PNG also works — update filenames in `utils/constants.ts` if needed)
- Recommended size: **800×800 px** or larger for best quality
- The gallery automatically displays every image in the folder (any filename)

---

## Adding Your Videos

After the spin wheel, a **cinematic video slideshow** plays your 6 memory videos one after another.

Add videos to:

```
public/videos/
├── memory1.mp4
├── memory2.mp4
├── memory3.mp4
├── memory4.mp4
├── memory5.mp4
└── memory6.mp4
```

**Tips:**
- `.mp4` (H.264) works best on phones
- Any filename works — they play in sorted order
- Keep each file under ~50MB for smooth mobile loading
- Videos auto-advance when one finishes; she can also skip with the arrows

---

## Adding Your Spotify Playlist

On the Special Surprise page, a **"Play Our Favourite Songs"** button opens your Spotify playlist.

1. Open Spotify and go to your playlist
2. Click **Share** → **Copy link to playlist**
3. Paste the link in `content/personal.ts`:

```typescript
spotifyPlaylistUrl: "https://open.spotify.com/playlist/YOUR_PLAYLIST_ID",
```

On her phone, the link opens directly in the Spotify app. On desktop, it opens in Spotify web or the app if installed.

---

## Customizing the Love Letter

Edit the letter text in:

```
components/LetterPage.tsx
```

Look for the `LETTER_CONTENT` constant at the top of the file and replace it with your personal message.

---

## Deploying on Vercel

[Vercel](https://vercel.com) is the recommended host for Next.js projects.

### Option 1: Deploy via GitHub

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project**
4. Import your GitHub repository
5. Vercel auto-detects Next.js — click **Deploy**
6. Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Run `vercel --prod` for a production deployment.

### Before deploying

- Add your photos to `public/images/`
- Add your Spotify playlist link in `content/personal.ts`
- Customize the love letter in `components/LetterPage.tsx`
- Run `npm run build` locally to verify everything compiles

---

## Project Structure

```
birthday-website/
├── app/
│   ├── globals.css          # Global styles & Tailwind
│   ├── layout.tsx           # Root layout & fonts
│   └── page.tsx             # Main app orchestrator
├── components/
│   ├── LoadingScreen.tsx
│   ├── HeroPage.tsx
│   ├── LetterPage.tsx
│   ├── QuizIntro.tsx
│   ├── Quiz.tsx
│   ├── QuizFail.tsx
│   ├── CelebrationScreen.tsx
│   ├── GalleryPage.tsx
│   ├── SpinWheelPage.tsx
│   ├── SurprisePage.tsx
│   ├── FinalPage.tsx
│   ├── Navbar.tsx
│   ├── GoldButton.tsx
│   ├── GlassCard.tsx
│   ├── FloatingHearts.tsx
│   ├── GoldParticles.tsx
│   ├── LuxuryCursor.tsx
│   ├── Fireworks.tsx
│   └── PageTransition.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   └── usePageNavigation.ts
├── utils/
│   ├── constants.ts
│   ├── quizData.ts
│   ├── wheelData.ts
│   └── cn.ts
├── styles/
│   └── animations.css
├── content/
│   └── personal.ts          # Letter, names, Spotify playlist link
├── public/
│   └── images/              # Your photos go here
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Tech Stack

- **Next.js 15** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **React Confetti** — Celebration confetti
- **Canvas Confetti** — Fireworks effect
- **Lucide React** — Icons
- **React Icons** — Additional icons

---

Made with love by Joshua, for Chidinma ❤️
