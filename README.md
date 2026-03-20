# Static Website Playground

A playground for static web experiments — built with vanilla HTML, CSS, and JavaScript, powered by Vite, and deployed to a GCP bucket.

Part of an agentic development pipeline: built, tested, and deployed with AI assistance.

## Links

| Resource | URL |
|----------|-----|
| **Live site** | https://storage.googleapis.com/static-website-playground-valaris/index.html |
| **GitHub repo** | https://github.com/octopuslabs-fl/static-website-playground |
| **Valaris workspace** | `static-playground` |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
  index.html              # Landing page with experiment grid
  404.html                # Custom 404 page
  shared/
    styles.css            # Shared styles across all experiments
  experiments/
    hello-world/          # Each experiment in its own folder
      index.html
dist/                     # Build output (gitignored)
```

## How to Add a New Experiment

1. Create a new folder under `src/experiments/`:
   ```
   src/experiments/my-experiment/index.html
   ```

2. The `index.html` should be a full HTML page. Use the shared styles:
   ```html
   <link rel="stylesheet" href="/shared/styles.css">
   ```

3. Add a card to the experiments grid in `src/index.html`:
   ```html
   <a href="/experiments/my-experiment/" class="experiment-card">
     <div class="card-icon">🎨</div>
     <h2>My Experiment</h2>
     <p>Description of what it does.</p>
   </a>
   ```

4. Vite automatically picks up new experiment folders with `index.html` files during build.

## Deploy

```bash
# Build
npm run build

# Deploy to GCP
gcloud storage cp -r dist/* gs://static-website-playground-valaris/ --project=valaris-base
```

## Tech Stack

- **HTML5 + CSS3 + Vanilla JS** — no frameworks, just the web platform
- **Vite** — fast dev server and optimized builds
- **GCP Cloud Storage** — static hosting
