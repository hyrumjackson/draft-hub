# 🏀 NBA Draft Hub – Mavericks Front Office Scouting Tool

This project is a data-driven React application designed to support front office decision-makers during the 2025 NBA Draft. The goal was to create a user-friendly, insightful Draft Hub using the provided JSON dataset — treating the rankings as if they were from Mavericks scouts.

### 🚀 Live Demo
**Netlify:** [Insert Your Netlify Link Here]  
**GitHub Repo:** [Insert GitHub Repository Link Here]

---

## 📋 Features

### ✅ Big Board
- Displays all prospects in order based on average scout ranking.
- Real-time search across name, team, or league.
- Scout dots with tooltips show how high or low each scout is on a player (based on z-score).

### ✅ Player Profiles
- Click any player to view full profile.
- Includes:
  - Headshot, bio, team & league
  - Scout Rankings (with outlier color indicators)
  - Season averages toggle (Per Game / Totals / Per 36)
  - Game history and testing data
  - Measurements & Athletic Testing with percentile indicators

### ✅ Scouting Reports
- Create a custom report for any player using a simple form.
- Reports are saved in `useState` (non-persistent by design).
- Custom reports are integrated alongside official scout rankings.

---

## 💻 Technology

- **React + Vite** (Frontend framework)
- **Material UI (MUI)** – for components like `Tooltip`, `ButtonGroup`, `TextField`, etc.
- **Responsive Design** – optimized for laptops, still viewable on tablets/phones.
- **Data-Driven** – no hardcoding, entirely powered by the JSON file.

---

## 🧠 Design Highlights

### 🎯 Scout Ranking Indicators
Scout evaluations are visualized using color-coded dots:
- 🟢 Green = Top 10% (significantly higher than average)
- 🔴 Red = Bottom 10% (significantly lower)
- 🟡 Pale = mild deviations
- ⚪ Gray = no significant deviation

Tooltips explain each scout’s rank position and relation to the average.

### 🏃‍♂️ Athletic Testing Icons
Athletic stats (sprint, shuttle, vertical, etc.) feature:
- ⭐ Star for top 10% (elite)
- 🟢 Green Dot = Top 25%
- 🔴 Red Dot = Bottom 25%

All tiers calculated from the full dataset and rendered inline with tooltips.

### 🔄 Season Stat Toggle
A toggle at the top of the profile allows users to switch between:
- Per Game
- Totals
- Per 36 Minutes

---

## 🧪 Data Strategy

The app uses the provided `intern_project_data.json`, broken into:
- `bio`: Player personal info
- `scoutRankings`: Publicly sourced scout rankings
- `seasonLogs`: Player season averages
- `gameLogs`: Game-level performance
- `measurements`: Combine results and testing
- `scoutingReports`: User-entered reports

The app reads this data as if it were from an API — fully abstracted and dynamic.

---

## ✅ Requirements Checklist

| Requirement                                      | Completed |
|--------------------------------------------------|-----------|
| React + Vite                                     | ✅        |
| No backend / JSON only                           | ✅        |
| Uses Material UI                                 | ✅        |
| At least one dynamic input                       | ✅ (stat toggle) |
| Form to add scouting reports (useState)          | ✅        |
| Fully data-driven and non-hardcoded              | ✅        |
| Responsive layout                                | ✅        |
| Hosted on Netlify                                | ✅        |

---

## 🗒️ Notes to Reviewers

This app was designed with real scouts in mind. From percentile-based indicators to dynamic report creation, every element focuses on giving decision-makers clarity at a glance while respecting the constraints of a frontend-only environment.

Let me know if you'd like to see more features like:
- Save reports to local storage
- Draft simulator based on rankings
- Player comparisons side-by-side

Thanks for the opportunity!