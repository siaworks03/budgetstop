# Budget Stop Iconic

Static connect page (plain HTML, CSS and JavaScript). No build step, no dependencies.

## Structure
```
index.html          page markup (edit link URLs here)
css/style.css       all styles and animations
js/main.js          image fallback, pointer spotlight, crest tilt, gold dust
assets/crest.png    shield + crown logo
assets/wordmark.png BUDGET STOP ICONIC wordmark
assets/logo.png     favicon / share image
.nojekyll           tells GitHub Pages to serve files as-is
```

## Edit the links
Open `index.html` and search for `EDIT THE href`. Replace:
- WhatsApp: `YOUR_CHANNEL_ID`
- Google Review: `YOUR_PLACE_ID`
- Google Maps: `YOUR_MAPS_LINK`
- Instagram / Facebook: check the handle `budgetstopiconic` is correct

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000

## Deploy on GitHub Pages
1. Push these files to the **root** of a GitHub repository.
2. Repo > **Settings > Pages**, Source: **Deploy from a branch**, Branch **main**, folder **/ (root)**, Save.
3. Live at `https://<username>.github.io/<repo-name>/`.
