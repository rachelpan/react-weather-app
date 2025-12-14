const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherResponse {
    name: string;
    sys: { country: string };
    main: {
        feels_like: number;
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    weather: Array<{ main: string; description: string; icon: string }>;
    dt: number;
    wind: { speed: number };
}

export async function fetchWeather(city: string, signal?: AbortSignal): Promise<WeatherResponse> {
    const q = city.trim();
    if (!q) throw new Error("Please enter a city name.");

    const params = new URLSearchParams({
        q,
        appid: API_KEY,
        units: "metric",
    });

    const url = `${BASE_URL}/weather?${params.toString()}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({} as { message?: string }));
        const apiMsg = (errorData.message || "").toLowerCase();

        const message =
            response.status === 404 || apiMsg.includes("city not found")
                ? 'City not found. Try "London" or "Johor".'
                : errorData.message || "Failed to fetch weather data.";

        throw new Error(message);
    }

    return response.json();
}
