# NBA Draft Hub

This is a React app built for the Mavericks front office to use during the NBA Draft. It takes in a dataset of prospects and gives decision-makers a clean, interactive interface to evaluate players, compare scout rankings, and add their own notes.

### Links
- **Live App (Netlify):** https://stately-maamoul-24e6bb.netlify.app/
- **GitHub Repo:** https://github.com/hyrumjackson/draft-hub

---

## What It Does

- **Big Board** showing all players in order of average scout rank
- Click on any player to open a **profile** with:
  - Bio, team, nationality, and a headshot
  - A full list of scout rankings with color-coded dots
  - Athletic testing & combine measurements
  - Season stats with a toggle (per game / totals / per 36)
  - Game history
  - A form to add your own custom scouting report (saved in local state)

The whole app is data-driven, so it works no matter what players are in the dataset.

---

## How the Dots Work

### Scout Ranking Dots
Each scout’s ranking is compared to the average using a **z-score**:

- **🟢 Green dot** = Much higher than average  
- **🟢 Pale green dot** = Slightly higher than average  
- **🔴 Pale red dot** = Slightly lower than average  
- **🔴 Red dot** = Much lower than average  
- **⚪ Gray dot** = Similar to others or not enough data  

### Athletic Testing Dots
Athletic stats like sprint time and vertical jump are compared to all players using percentiles:

- **⭐ Star** = Top 10% (Elite)
- **🟢 Green dot** = Top 25%
- **🔴 Red dot** = Bottom 25%

Tooltips explain each dot if you hover.

---

## Tech Stack

- **React + Vite** (frontend framework)
- **Material UI** for components like tooltips and text fields
- **Plain JavaScript** and `useState` for managing scouting reports
- **Responsive CSS** (works best on laptop, still readable on tablet/phone)

---

## Requirements Checklist

| Feature                                                   | Done |
|-----------------------------------------------------------|------|
| React app built with Vite                                 | ✅   |
| Uses Material UI components                               | ✅   |
| Data-driven using a JSON file, no backend needed          | ✅   |
| Allows input that changes the view (stat mode toggle)     | ✅   |
| Form for adding new scouting reports (saved in `useState`) | ✅   |
| Fully dynamic, nothing hardcoded                          | ✅   |
| Works on different screen sizes                           | ✅   |
| Deployed on Netlify                                       | ✅   |

---

## Notes for Reviewers

Thanks for checking this out! I focused on clean design and clarity, making it easy for scouts and execs to glance through the big board, identify outliers, and dig deeper into prospects who stand out.