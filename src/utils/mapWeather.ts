import type { WeatherResponse } from "../services/weatherApi";
import type { WeatherCardData } from "../components/WeatherCard";

export function mapToWeatherCardData(data: WeatherResponse): WeatherCardData {
    const datetimeText = new Date(data.dt * 1000).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return {
        city: data.name,
        country: data.sys.country,
        tempC: data.main.temp,
        feelsLikeC: data.main.feels_like,
        tempMaxC: data.main.temp_max,
        tempMinC: data.main.temp_min,
        humidity: data.main.humidity,
        condition: data.weather[0]?.main ?? "-",
        windSpeed: data.wind.speed,
        datetimeText,
    };
}
