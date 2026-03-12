# 🌍 weather-etl-dashboard

> **Real-time ETL pipeline monitoring weather & AQI across 5 global cities — New York, London, Tokyo, Delhi & Sydney. Extracts live data from OpenWeatherMap, transforms it into key metrics, and streams it into a responsive dark dashboard. Zero backend, zero dependencies. Hosted on GitHub Pages.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-38BDF8?style=for-the-badge&logo=github)](https://j26219096-prog.github.io/weather-etl-dashboard
)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=for-the-badge)](https://openweathermap.org/api)

---

## 📸 Preview

> A dark-themed, real-time dashboard with animated city cards, color-coded AQI badges, and live weather metrics.

---

## 📌 What It Does

This project implements a **client-side ETL (Extract → Transform → Load) pipeline** entirely in the browser:

| Phase | What happens |
|-------|-------------|
| **Extract** | Fetches live weather & air pollution data from the OpenWeatherMap API for 5 cities |
| **Transform** | Normalises units, maps icon codes to emojis, converts AQI integers to human-readable labels |
| **Load** | Renders the processed data into an animated, responsive card dashboard |

---

## ✨ Features

- 🌡️ **Real-time weather** — temperature, feels-like, humidity, wind speed
- 🌫️ **Air Quality Index (AQI)** — color-coded from Good 🟢 to Hazardous 🔴
- 🏙️ **5 cities monitored** — New York, London, Tokyo, Delhi, Sydney
- 🔄 **One-click refresh** with animated loading state
- 🎲 **Mock mode** — fully functional demo without any API key
- 🔑 **Secure API key handling** — key stored in browser `localStorage` only, never in source code
- 📱 **Fully responsive** — works on desktop, tablet, and mobile
- ⚡ **Zero dependencies** — no npm, no build step, no framework
- 🚀 **GitHub Pages ready** — deploy with 3 files and a single click

---

## 🗂️ Project Structure

```
weather-etl-dashboard/
├── index.html      ← App shell, layout, API key modal
├── style.css       ← Dark theme, card styles, animations
├── app.js          ← ETL logic: fetch → transform → render
└── README.md
```

---

## 🚀 Getting Started

### Option 1 — Open directly (no setup)

Just open `index.html` in any browser. The app will load in **Mock Data** mode instantly.

### Option 2 — Use Live API data

1. Get a **free API key** at [openweathermap.org/api](https://openweathermap.org/api)
2. Open the app and click **🔑 API Key** in the header
3. Paste your key → click **Save & Use Live API**

Your key is saved in your browser's `localStorage` — it never leaves your device.

---

## 🌐 Deploy to GitHub Pages

 dashboard goes live at:
```
https://j26219096-prog.github.io/weather-etl-dashboard

```

---

## 🔌 Data Sources

| Data | Endpoint |
|------|----------|
| Weather (temp, humidity, wind, description) | `GET /weather` — OpenWeatherMap Current Weather API |
| Air Quality Index | `GET /air_pollution` — OpenWeatherMap Air Pollution API |

Both endpoints are free with a standard API key (1,000 calls/day, no credit card needed).

---

## 🎨 Design

- **Color palette** — GitHub dark (`#0D1117`, `#161B22`, `#21262D`)
- **Accent** — Sky blue `#38BDF8`
- **Typography** — [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **AQI color scale** — Green → Lime → Amber → Orange → Red
- **Animations** — staggered card entrance, spinning refresh icon, pulsing live dot

---

## 🔒 Security

The OpenWeatherMap API key is **never stored in source code or the repository**. It is:
- Entered by the user via an in-app modal
- Saved only to the user's own browser `localStorage`
- Read at fetch time and passed directly to the API

This means the repo is **safe to make public** with no secrets exposed.

---

## 📄 License

MIT — free to use, modify, and deploy.

---

## 🙌 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org) — weather & AQI data
- [Inter Font](https://rsms.me/inter/) — typography
- [GitHub Pages](https://pages.github.com) — free hosting

## 👨‍💻 GIT username: j26219096-prog
* **Name:** Jawahar R (Dhanalakshmi Srinivasan Engineering College)
* **Focus:** AI & Data Science



