# 🍾 Botal Ghumao — Spin the Bottle (Desi Edition)

An Apple-quality "spin the bottle" party game with a desi twist. No build tools, no dependencies — four static files. Built for 3–8 players, phone flat on the table.

## Files
| File | What it holds |
|---|---|
| `index.html` | Page structure/markup only |
| `style.css` | All theming, layout, and animation |
| `content.js` | All game text — prompts (`PROMPTS`) and category labels/colors (`TAG_META`) |
| `app.js` | Game logic — state, rendering, spin physics, modal handling |

`index.html` loads `style.css`, then `content.js`, then `app.js` (in that order — `app.js` depends on the data in `content.js`).

## How it works
- Add 3–8 players and pick which prompt packs you want: Icebreakers, Dares, Bollywood Masala, Deep Talk.
- Everyone sits around the phone. Tap the bottle to spin — it lands on a random player.
- A prompt card pops up (Hinglish icebreaker / dare / Bollywood question / deep talk). Shuffle for a new one if you don't like it, or move to the next round.

## Host it free on GitHub Pages
1. Create a new GitHub repo (e.g. `botal-ghumao`).
2. Upload `index.html`, `style.css`, `content.js`, `app.js` (and this `README.md`) to the repo — commit to `main`. Keep them all in the same folder, since `index.html` references the others by relative path.
3. Go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** → Save.
5. Wait ~1 minute, then your game is live at:
   `https://<your-username>.github.io/<repo-name>/`

That's it — share the link, everyone opens it on the phone that'll sit on the table, and you're playing.

## Customizing
- **Prompts**: edit the `PROMPTS` object in `content.js` — just add/remove strings per category. Add a whole new category by adding a key to both `PROMPTS` and `TAG_META` (give it a `label` and a `cls`, then add a matching `.tag-yourkey` color rule in `style.css`).
- **Colors**: all theme colors are CSS variables at the top of `style.css` (`--marigold`, `--gulal`, `--mehendi`, etc.) — tweak freely.
- **Players**: min 3, max 8 (adjustable in the `minus-btn` / `plus-btn` handlers in `app.js` if you want a bigger table).

Made for chai-time icebreakers. ☕️
