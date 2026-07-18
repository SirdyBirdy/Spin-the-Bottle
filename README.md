# Spin — Spin the Bottle

A retro-futuristic, deep-space "spin the bottle" party game. No build tools, no dependencies — four static files. Built for 3–8 players, phone flat on the table. No names to type — just pick a headcount and go.

## Files
| File | What it holds |
|---|---|
| `index.html` | Page structure/markup only |
| `style.css` | Dark theme, layout, and animation |
| `content.js` | All game text — prompts (`PROMPTS`) and category labels/colors (`TAG_META`) |
| `app.js` | Game logic — state, rendering, spin physics, modal handling |

`index.html` loads `style.css`, then `content.js`, then `app.js` (in that order — `app.js` depends on the data in `content.js`).

## How it works
- Pick a crew size (3–8) and which prompt packs you want: Icebreaker, Dare, Wildcard, Deep Talk. No names to type — each seat is just a glowing marker around the table.
- Everyone sits around the phone. Tap the bottle to spin — it lands on a random seat, which lights up.
- A prompt card slides up (question / dare / hypothetical / deep-talk topic). Shuffle for a new one, or move to the next round.

## Host it free on GitHub Pages
1. Create a new GitHub repo (e.g. `spin`).
2. Upload `index.html`, `style.css`, `content.js`, `app.js` (and this `README.md`) to the repo — commit to `main`. Keep them all in the same folder, since `index.html` references the others by relative path.
3. Go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** → Save.
5. Wait ~1 minute, then your game is live at:
   `https://<your-username>.github.io/<repo-name>/`

That's it — share the link, everyone opens it on the phone that'll sit on the table, and you're playing.

## Customizing
- **Prompts**: edit the `PROMPTS` object in `content.js` — just add/remove strings per category. Add a whole new category by adding a key to both `PROMPTS` and `TAG_META` (give it a `label` and a `cls`, then add a matching `.tag-yourkey` color rule in `style.css`).
- **Colors**: theme colors are CSS variables at the top of `style.css` (`--cyan`, `--magenta`, `--violet`, `--amber`, `--bg`, `--surface`, etc.) — tweak freely.
- **Fonts**: display type is [Orbitron](https://fonts.google.com/specimen/Orbitron), body/labels are [Space Mono](https://fonts.google.com/specimen/Space+Mono), both loaded from Google Fonts in `index.html`.
- **Bottle graphic**: `#bottle-wrap` in `index.html` contains a self-contained inline `<svg>` bottle shape, filled with a neon gradient (defined in its `<defs>`) and glowing via CSS `filter: drop-shadow(...)`. It's inline rather than hotlinked so it always renders reliably — swap the `path d="..."` for any other bottle outline if you want a different silhouette.
- **Players**: min 3, max 8 (adjustable in the `minus-btn` / `plus-btn` handlers in `app.js` if you want a bigger table). Seats are just glowing dot markers — no names or numbers shown.
