# Live City Pulse 🌍

> Real-time weather & AQI dashboard for 5 major cities — accessible from any browser via a single link.  
> **No app download. No Expo. No mobile connection needed.**

## 🔗 Live Demo

👉 **[https://YOUR-USERNAME.github.io/LiveCityPulse](https://YOUR-USERNAME.github.io/LiveCityPulse)**

*(Replace `YOUR-USERNAME` with your GitHub username after deploying)*

---

## Features

- **Real-time weather** via OpenWeatherMap API — temperature, feels-like, humidity, wind
- **Air Quality Index (AQI)** color-coded from Good 🟢 to Hazardous 🔴
- **5 cities monitored**: New York, London, Tokyo, Delhi, Sydney
- **Mock mode** — works without an API key, great for demos
- **Animated cards** with staggered entrance effects
- **One-click refresh** with live loading state
- **Fully responsive** — works on desktop, tablet, and mobile

---

## 📁 Project Structure

```
LiveCityPulse-Web/
├── index.html   ← The entire UI (single HTML file)
├── style.css    ← Dark theme, animations, responsive layout
├── app.js       ← All data fetching & rendering logic
└── README.md    ← This file
```

---

## 🚀 Deploy to GitHub Pages (5 minutes)

1. **Create a new GitHub repository** (e.g. `LiveCityPulse`)

2. **Upload these 3 files** to the repository root:
   - `index.html`
   - `style.css`
   - `app.js`

3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**

4. Click **Save** — your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/LiveCityPulse
   ```

That's it! 🎉

---

## ⚙️ Configuration

Edit the top of `app.js` to change settings:

```js
const API_KEY  = 'YOUR_API_KEY';  // Get free key at openweathermap.org
let DATA_SOURCE = 'live';          // 'live' or 'mock'
```

| Mode   | Description                        | API Key needed? |
|--------|------------------------------------|-----------------|
| `live` | Real-time OpenWeatherMap data      | ✅ Yes           |
| `mock` | Hardcoded demo data (randomized)   | ❌ No            |

You can also switch modes **live in the browser** using the dropdown in the UI.

---

## 🔑 Get a Free API Key

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Go to **API Keys** in your dashboard
3. Copy your key and paste it into `app.js`

---

## Technologies

- Plain **HTML5**, **CSS3**, **Vanilla JavaScript**
- [Inter](https://fonts.google.com/specimen/Inter) font via Google Fonts
- [OpenWeatherMap](https://openweathermap.org) API (weather + air pollution)
- Zero dependencies, zero build step
