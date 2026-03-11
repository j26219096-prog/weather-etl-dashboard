// ─────────────────────────────────────────────────────────────
//  Live City Pulse  –  app.js
//  Pure vanilla JS. No Expo, no React Native, no app needed.
//  Works in any browser. Host on GitHub Pages for free.
//
//  API key is NEVER stored in source code.
//  It lives only in the user's browser localStorage.
// ─────────────────────────────────────────────────────────────

// ─── Configuration ───────────────────────────────────────────
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Key stored only in localStorage — never in code or repo
function getApiKey() { return localStorage.getItem('owm_api_key') || ''; }
function saveApiKey(k) { localStorage.setItem('owm_api_key', k.trim()); }

let DATA_SOURCE = getApiKey() ? 'live' : 'mock';

// ─── Cities ──────────────────────────────────────────────────
const CITIES = [
    { id: 'new_york', name: 'New York', country: 'US', emoji: '🗽', lat: 40.7128, lon: -74.0060 },
    { id: 'london', name: 'London', country: 'GB', emoji: '🎡', lat: 51.5074, lon: -0.1278 },
    { id: 'tokyo', name: 'Tokyo', country: 'JP', emoji: '⛩️', lat: 35.6762, lon: 139.6503 },
    { id: 'delhi', name: 'Delhi', country: 'IN', emoji: '🕌', lat: 28.6139, lon: 77.2090 },
    { id: 'sydney', name: 'Sydney', country: 'AU', emoji: '🦘', lat: -33.8688, lon: 151.2093 },
];

// ─── AQI Metadata ────────────────────────────────────────────
const AQI_MAP = {
    1: { label: 'Good', color: '#22C55E', textColor: '#fff', icon: '😊' },
    2: { label: 'Fair', color: '#A3E635', textColor: '#fff', icon: '🙂' },
    3: { label: 'Moderate', color: '#FACC15', textColor: '#000', icon: '😐' },
    4: { label: 'Poor', color: '#F97316', textColor: '#fff', icon: '😷' },
    5: { label: 'Hazardous', color: '#EF4444', textColor: '#fff', icon: '☠️' },
};

// OWM icon code → weather emoji
const WEATHER_EMOJI = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '🌨️', '13n': '🌨️',
    '50d': '🌫️', '50n': '🌫️',
};

// ─── Mock Data ───────────────────────────────────────────────
const MOCK_DATA = [
    { id: 'new_york', name: 'New York', country: 'US', emoji: '🗽', temp: 18.4, feelsLike: 17.1, humidity: 62, description: 'Partly cloudy', weatherEmoji: '⛅', aqi: 2, windSpeed: 5.2 },
    { id: 'london', name: 'London', country: 'GB', emoji: '🎡', temp: 9.7, feelsLike: 7.3, humidity: 81, description: 'Drizzle', weatherEmoji: '🌧️', aqi: 1, windSpeed: 7.8 },
    { id: 'tokyo', name: 'Tokyo', country: 'JP', emoji: '⛩️', temp: 12.2, feelsLike: 11.0, humidity: 55, description: 'Clear sky', weatherEmoji: '☀️', aqi: 2, windSpeed: 3.4 },
    { id: 'delhi', name: 'Delhi', country: 'IN', emoji: '🕌', temp: 29.5, feelsLike: 32.1, humidity: 38, description: 'Haze', weatherEmoji: '🌫️', aqi: 5, windSpeed: 2.1 },
    { id: 'sydney', name: 'Sydney', country: 'AU', emoji: '🦘', temp: 24.8, feelsLike: 25.5, humidity: 70, description: 'Scattered showers', weatherEmoji: '🌦️', aqi: 1, windSpeed: 9.0 },
];

// ─── DOM refs ────────────────────────────────────────────────
const grid = document.getElementById('cardsGrid');
const refreshBtn = document.getElementById('refreshBtn');
const refreshIcon = document.getElementById('refreshIcon');
const refreshLabel = document.getElementById('refreshLabel');
const lastRefreshEl = document.getElementById('lastRefresh');
const errorBanner = document.getElementById('errorBanner');
const errorText = document.getElementById('errorText');
const sourceBadge = document.getElementById('sourceBadge');
const sourceSelect = document.getElementById('sourceSelect');
const keyModal = document.getElementById('keyModal');
const keyInput = document.getElementById('keyInput');
const keySaveBtn = document.getElementById('keySaveBtn');
const keySkipBtn = document.getElementById('keySkipBtn');
const keyClearBtn = document.getElementById('keyClearBtn');

// ─── State ───────────────────────────────────────────────────
let isLoading = false;

// ─── Helpers ─────────────────────────────────────────────────
function getAqiInfo(aqi) {
    return AQI_MAP[aqi] ?? AQI_MAP[1];
}

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function setLoading(val) {
    isLoading = val;
    refreshBtn.disabled = val;
    if (val) {
        refreshIcon.classList.add('spinning');
        refreshLabel.textContent = 'Updating...';
    } else {
        refreshIcon.classList.remove('spinning');
        refreshLabel.textContent = 'Refresh Data';
    }
}

function showError(msg) {
    errorText.textContent = msg;
    errorBanner.style.display = 'flex';
}

function hideError() {
    errorBanner.style.display = 'none';
}

function updateSourceBadge() {
    const isLive = DATA_SOURCE === 'live';
    sourceBadge.className = `source-badge ${isLive ? 'badge-live' : 'badge-mock'}`;
    sourceBadge.innerHTML = isLive
        ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg> Live API`
        : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> Mock Data`;
}

// ─── Card Renderer ───────────────────────────────────────────
function renderSkeletons() {
    grid.innerHTML = Array(5).fill('').map(() => `
        <div class="skeleton" aria-hidden="true">
            <div class="skeleton-line"></div>
            <div class="skeleton-line skel-60"></div>
            <div class="skeleton-line skel-40"></div>
        </div>`).join('');
}

function renderCards(cities) {
    grid.innerHTML = '';
    cities.forEach((city, index) => {
        const aqiInfo = getAqiInfo(city.aqi);
        const timeStr = city.lastUpdated
            ? formatTime(city.lastUpdated)
            : formatTime(new Date());

        const card = document.createElement('article');
        card.className = 'city-card';
        card.style.borderLeftColor = aqiInfo.color;
        card.style.animationDelay = `${index * 80}ms`;
        card.setAttribute('aria-label', `${city.name} weather: ${city.temp}°C, AQI ${city.aqi} (${aqiInfo.label})`);

        card.innerHTML = `
            <!-- Header: city + temp -->
            <div class="card-header">
                <div class="city-title-block">
                    <span class="city-emoji" aria-hidden="true">${city.emoji}</span>
                    <div>
                        <div class="city-name">${city.name}</div>
                        <div class="city-country">${city.country}</div>
                    </div>
                </div>
                <div class="temp-block">
                    <span class="temp-value">${city.temp}<span class="temp-unit">°C</span></span>
                </div>
            </div>

            <!-- Weather row -->
            <div class="weather-row">
                <div class="weather-icon-wrap" aria-hidden="true">${city.weatherEmoji ?? '🌡️'}</div>
                <span class="weather-desc">${city.description}</span>
                <span class="feels-like">Feels like ${city.feelsLike}°C</span>
            </div>

            <div class="divider" role="separator"></div>

            <!-- Stats -->
            <div class="stats-row">
                <div class="stat-chip">
                    <span class="stat-icon" aria-hidden="true">💧</span>
                    <div>
                        <div class="stat-label">Humidity</div>
                        <div class="stat-value">${city.humidity}%</div>
                    </div>
                </div>
                <div class="stat-chip">
                    <span class="stat-icon" aria-hidden="true">💨</span>
                    <div>
                        <div class="stat-label">Wind</div>
                        <div class="stat-value">${city.windSpeed} m/s</div>
                    </div>
                </div>
            </div>

            <!-- AQI badge -->
            <div class="aqi-row">
                <span class="aqi-badge" style="background:${aqiInfo.color}; color:${aqiInfo.textColor}">
                    <span class="aqi-icon" aria-hidden="true">${aqiInfo.icon}</span>
                    AQI · ${city.aqi} · ${aqiInfo.label}
                </span>
                <span class="update-time">Updated ${timeStr}</span>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ─── Data Fetching ───────────────────────────────────────────
async function fetchCityLive(city) {
    const key = getApiKey();
    if (!key) throw new Error('No API key set. Use the 🔑 button to add yours.');

    const [weatherRes, aqiRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${key}`),
        fetch(`${BASE_URL}/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${key}`),
    ]);

    if (!weatherRes.ok || !aqiRes.ok) {
        const msg = weatherRes.status === 401 ? 'Invalid API key. Click 🔑 to update it.' : `API error for ${city.name} (status ${weatherRes.status})`;
        throw new Error(msg);
    }

    const weather = await weatherRes.json();
    const aqiData = await aqiRes.json();
    const iconCode = weather.weather[0]?.icon ?? '01d';

    return {
        id: city.id,
        name: city.name,
        country: city.country,
        emoji: city.emoji,
        temp: Math.round(weather.main.temp * 10) / 10,
        feelsLike: Math.round(weather.main.feels_like * 10) / 10,
        humidity: weather.main.humidity,
        description: weather.weather[0]?.description ?? 'Unknown',
        weatherEmoji: WEATHER_EMOJI[iconCode] ?? '🌡️',
        aqi: aqiData.list[0]?.main?.aqi ?? 1,
        windSpeed: Math.round((weather.wind?.speed ?? 0) * 10) / 10,
        lastUpdated: new Date(),
    };
}

async function fetchMockData() {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 900));
    return MOCK_DATA.map(city => ({
        ...city,
        temp: parseFloat((city.temp + (Math.random() * 2 - 1)).toFixed(1)),
        humidity: Math.min(100, Math.max(0, city.humidity + Math.floor(Math.random() * 5 - 2))),
        lastUpdated: new Date(),
    }));
}

// ─── Main Load ───────────────────────────────────────────────
async function loadData() {
    if (isLoading) return;
    setLoading(true);
    hideError();
    renderSkeletons();

    try {
        let cities;
        if (DATA_SOURCE === 'live') {
            cities = await Promise.all(CITIES.map(fetchCityLive));
        } else {
            cities = await fetchMockData();
        }

        renderCards(cities);
        lastRefreshEl.textContent = `Last refreshed at ${formatTime(new Date())}`;
        lastRefreshEl.style.display = 'block';
    } catch (err) {
        console.error('[LiveCityPulse] fetch error:', err);
        showError(
            DATA_SOURCE === 'live'
                ? `Live API error: ${err.message}. Try switching to Mock Data.`
                : `Error: ${err.message}`
        );
        grid.innerHTML = '';     // clear skeletons on error
    } finally {
        setLoading(false);
    }
}

// ─── Source Switcher ─────────────────────────────────────────
function switchSource(value) {
    if (value === 'live' && !getApiKey()) {
        openKeyModal();
        sourceSelect.value = 'mock'; // revert until key is set
        return;
    }
    DATA_SOURCE = value;
    updateSourceBadge();
    loadData();
}

// ─── API Key Modal ────────────────────────────────────────────
function openKeyModal() {
    keyInput.value = getApiKey();
    keyModal.style.display = 'flex';
    keyInput.focus();
}
function closeKeyModal() {
    keyModal.style.display = 'none';
}

keySaveBtn.addEventListener('click', () => {
    const val = keyInput.value.trim();
    if (!val) { keyInput.classList.add('input-error'); return; }
    keyInput.classList.remove('input-error');
    saveApiKey(val);
    DATA_SOURCE = 'live';
    sourceSelect.value = 'live';
    updateSourceBadge();
    closeKeyModal();
    loadData();
});

keySkipBtn.addEventListener('click', () => {
    closeKeyModal();
    DATA_SOURCE = 'mock';
    sourceSelect.value = 'mock';
    updateSourceBadge();
    loadData();
});

keyClearBtn.addEventListener('click', () => {
    localStorage.removeItem('owm_api_key');
    keyInput.value = '';
    DATA_SOURCE = 'mock';
    sourceSelect.value = 'mock';
    updateSourceBadge();
    closeKeyModal();
    loadData();
});

keyInput.addEventListener('keydown', e => { if (e.key === 'Enter') keySaveBtn.click(); });

// Close modal on backdrop click
keyModal.addEventListener('click', e => { if (e.target === keyModal) closeKeyModal(); });

document.getElementById('keyOpenBtn').addEventListener('click', openKeyModal);

// ─── Init ────────────────────────────────────────────────────
updateSourceBadge();
// Show key modal on first visit if no key yet
if (!getApiKey()) {
    openKeyModal();
} else {
    loadData();
}
