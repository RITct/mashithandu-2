# Git & GitHub Session Website - Project Summary

This directory contains the codebase for the Git & GitHub learning website. The site has been structured into separate, modular pages to prevent long scrolling times and is fully styled with a premium, warm off-white minimalist theme.

## 📂 File Directory

*   [index.html](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/index.html) — **Home Page**: Includes the Git vs. GitHub history timeline, conceptual differences, Git Command Cheat Sheet, and the interactive Git Lifecycle Simulator.
*   [practices.html](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/practices.html) — **Best Practices Page**: Features detailed recommendations for branching, commit hygiene, and pull request etiquette, along with a CSS-rendered branch commit graph.
*   [contributors.html](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/contributors.html) — **Contributors Wall Page**: Renders the participant showcase grid, stats counter, live client-side search bar, and holds the PR guidelines modal.
*   [data/contributors.js](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/data/contributors.js) — **Contributors Database**: The target data file that participants edit during the session's hands-on exercise.
*   [style.css](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/style.css) — **Stylesheets**: Implements the typography (Outfit & Inter), warm alabaster color tokens (`#FAF9F6`), subtle cards, and layout grid variables.
*   [script.js](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/script.js) — **Interactivity Script**: Controls copying commands, the Git lifecycle sandbox simulator state machine, live user searches, and modal transitions.

---

## 🚀 How to Run & Test Locally

Because the project uses standard JavaScript script inclusion rather than complex async resource requests (which trigger browser CORS blockers on local files), the website is **fully compatible with local browser loading**.

1.  **Direct Double-click**: Double-click [index.html](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/index.html) to run the site directly inside any browser.
2.  **Local Static Server (Recommended)**: For a live-reloading server, run Python's built-in static server from this folder:
    ```bash
    python3 -m http.server 8000
    ```
    Then, navigate to `http://localhost:8000` in your browser.

---

## 🛠 How to Use This in Your Session

1.  **Hosting**: Push this repository to GitHub and enable **GitHub Pages** in the repository settings (Settings -> Pages -> Build and deployment -> Source: Deploy from branch -> main).
2.  **Workshop Activity**:
    *   Instruct your participants to navigate to the live website and click **Join the Wall** in the Contributors section.
    *   They will follow the modal instructions: fork the repo, clone it, create a branch (`checkout -b`), edit the [data/contributors.js](file:///home/sabari/Documents/sessions/github-iste/mashithandu-2/data/contributors.js) file, commit, push, and open a Pull Request.
    *   As you merge their Pull Requests on GitHub, they can refresh the live page to instantly see their cards added to the wall!
