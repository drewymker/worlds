# VEX Worlds Website - Made With vo.app

This repository currently contains two UI tracks:

- The active static site lives in `index.html`, `day.html`, `match.html`, `admin.html`, `css/`, `js/`, `images/`, and `data/`.
- A newer Next.js prototype lives in `app/`, `components/`, `hooks/`, `lib/`, `public/`, and `styles/`.

## Static Site Layout

- `js/site-data.js`: match and day data used by the static pages
- `js/app.js`: rendering, helpers, and match-page navigation logic
- `css/style.css`: static site styling, including mobile match navigation
- `data/videos.json`: JSON reference copy for future imports or migration
- `admin.html`: helper page for generating new match entries

## Working Rule

If you are updating the current live static experience, start in `js/site-data.js`, `js/app.js`, and `css/style.css`.
