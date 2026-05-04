# TOPO

**Open-source social media for outdoor lovers.**

A premium, fully interactive single-page app (SPA) built with React + Vite, Tailwind CSS, and Framer Motion. Features a dark "stealth" aesthetic with SAR Orange (`#ff9100`) accents.

---

## Features

- 🏔️ **Welcome / Gateway screen** — hero screen with animated topographic background. Always shown on load, even when prior session data exists, with a "Continue" button if applicable.
- 🔐 **Sign Up / Log In** — mock authentication flow, saved to `localStorage`.
- 🎨 **Customise** — pick a preset or build your own theme: accent colour, bottom toolbar items, and enabled features.
- 📱 **Social Feed** — Twitter/Instagram-style feed with mock posts, likes, and comments.
- 🗺️ **Modular Dashboard** — drag-to-reorder widget grid (Weather, Gear Locker, Local Crew).
- 📡 **Mesh Mode** — radar UI with P2P node discovery and a BitChat-style local text burst interface.

---

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173/topo/](http://localhost:5173/topo/).

---

## Hosting on GitHub Pages

### 1. Enable GitHub Pages in your repository settings

1. Go to your repository on GitHub: `https://github.com/<your-username>/topo`
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Click **Save**.

### 2. Push to `main`

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds the app and deploys it to GitHub Pages whenever you push to the `main` branch.

```bash
git push origin main
```

### 3. Access your live site

Once the workflow completes (usually under 2 minutes), your site will be live at:

```
https://<your-username>.github.io/topo/
```

For example: `https://hamishc66.github.io/topo/`

You can monitor deployment progress under the **Actions** tab of your repository.

---

## Tech stack

| Tool | Version |
|---|---|
| React | 18 |
| Vite | 5 |
| Tailwind CSS | 4 |
| Framer Motion | 11 |
| Lucide React | 0.400+ |

