# SmartToolsHubNg

A modern single-page product listing website for premium smart locks and digital security gadgets in Nigeria. Built with React and Vite.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![License](https://img.shields.io/badge/License-Private-red)

## Features

- **Product Catalogue** — Browse 8+ smart lock products with category filtering
- **Quick View Modal** — View detailed product descriptions without leaving the page
- **Buy Now / Order Modal** — Quantity picker, customer details form, and one-tap WhatsApp order submission
- **Full-Screen Search** — Real-time product search with instant results
- **Scroll-Reveal Animations** — Staggered entrance animations as sections come into view
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop
- **Netlify-Ready** — Pre-configured for one-click Netlify deployment

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Icons | react-icons |
| Styling | Vanilla CSS with CSS variables |
| Deployment | Netlify |
| Backend | None — WhatsApp integration for orders |

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd smarttoolshub

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Netlify

The project includes a `netlify.toml` with build settings pre-configured:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA redirect:** `/* → /index.html` (status 200)

Simply connect your Git repository to Netlify and it will deploy automatically.

## License

Private — All rights reserved.
