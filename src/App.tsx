import { useEffect, useRef, useState } from "react";
import styles from "./styles/App.module.css";
import { WeatherSearchForm } from "./components/WeatherSearchForm";
import { WeatherCard, type WeatherCardData } from "./components/WeatherCard";
import { SearchHistory, type SearchHistoryItem } from "./components/SearchHistory";
import { ThemeToggle } from "./components/ThemeToggle";
import { fetchWeather } from "./services/weatherApi";
import { mapToWeatherCardData } from "./utils/mapWeather";

const THEME_KEY = "theme";
const HISTORY_KEY = "weather_history_v1";
const HISTORY_LIMIT = 10;

function makeKey(city: string) {
  return city.trim().toLowerCase();
}


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const preferredMode = localStorage.getItem(THEME_KEY);
    if (preferredMode) return preferredMode === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherCardData | undefined>(undefined);

  const [history, setHistory] = useState<SearchHistoryItem[]>(() => {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as SearchHistoryItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  // Persist theme
  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  // Persist history
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);


  const runSearch = async (query: string) => {
    const q = query.trim();
    if (!q) {
      setError("Please enter a city name");
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(q, abortRef.current.signal);
      const card = mapToWeatherCardData(data);

      setWeatherData(card);

      const newHistoryItem: SearchHistoryItem = {
        id: String(Date.now()),
        city: data.name,
        country: data.sys.country,
        datetimeText: card.datetimeText,
      };

      setHistory((prev) => {
        const key = makeKey(newHistoryItem.city);
        const deduped = prev.filter((h) => makeKey(h.city) !== key);
        return [newHistoryItem, ...deduped].slice(0, HISTORY_LIMIT);
      });

    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => void runSearch(city);

  const handleSelectHistory = (item: SearchHistoryItem) => {
    setCity(item.city);
    void runSearch(item.city);
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.topBar}>
        <ThemeToggle checked={darkMode} onChange={setDarkMode} />
      </div>

      <div className={styles.container}>
        <WeatherSearchForm
          city={city}
          onCityChange={setCity}
          onSearch={handleSearch}
          isLoading={isLoading}
          error={error}
        />

        <WeatherCard data={weatherData}>
          {history.length > 0 && (
            <SearchHistory items={history} onSelect={handleSelectHistory} onDelete={handleDeleteHistory} />
          )}
        </WeatherCard>
      </div>
    </div>
  );
}

export default App;
