import styles from "../styles/WeatherCard.module.css";
import cloudIcon from "../assets/cloud.png";
import sunIcon from "../assets/sun.png";
import { WindIcon } from "./icons/WindIcon";
import { ThermometerIcon } from "./icons/ThermometerIcon";
import { HumidityIcon } from "./icons/HumidityIcon";

export type WeatherCardData = {
    city: string;
    country: string;
    tempC: number;
    tempMaxC: number;
    tempMinC: number;
    humidity: number;
    condition: string;
    datetimeText: string;
    feelsLikeC: number;
    windSpeed: number;
};

type Props = {
    data?: WeatherCardData;
    children?: React.ReactNode;
};

function getIcon(condition: string) {
    const key = condition.toLowerCase();
    if (key.includes("cloud")) return cloudIcon;
    return sunIcon;
}

function msToKmh(ms: number) {
    return ms * 3.6;
}

export function WeatherCard({ data, children }: Props) {
    return (
        <section className={styles.panel} aria-live="polite">
            {!data ? (
                <div className={styles.empty}>Search a city to see today’s weather.</div>
            ) : (
                <>
                    <div className={styles.iconWrap} aria-hidden="true">
                        <img src={getIcon(data.condition)} alt={`${data.condition} icon`} />
                    </div>

                    <div className={styles.weatherInfo}>
                        <div className={styles.label}>Today&apos;s Weather</div>
                        <div className={styles.temp}>{Math.round(data.tempC)}°</div>

                        <div className={styles.hl}>
                            Feels like {Math.round(data.feelsLikeC)}° · H:{Math.round(data.tempMaxC)}° L:
                            {Math.round(data.tempMinC)}°
                        </div>

                        <div className={styles.detailsContainer}>
                            <div className={styles.detail}>
                                <WindIcon size={24} />
                                <span className={styles.detailLabel}>Wind</span>
                                <span className={styles.detailValue}>
                                    {data.windSpeed != null
                                        ? `${Math.round(msToKmh(data.windSpeed))} km/h`
                                        : "N/A"}
                                </span>
                            </div>

                            <div className={styles.detail}>
                                <ThermometerIcon size={24} />
                                <span className={styles.detailLabel}>Temperature</span>
                                <span className={styles.detailValue}>{Math.round(data.tempC)}°C</span>
                            </div>

                            <div className={styles.detail}>
                                <HumidityIcon size={24} />
                                <span className={styles.detailLabel}>Humidity</span>
                                <span className={styles.detailValue}>{data.humidity}%</span>
                            </div>
                        </div>

                        <div className={styles.meta}>
                            <span className={styles.metaPrimary}>
                                {data.city}, {data.country}
                            </span>

                            <span className={styles.metaSecondary}>
                                {data.datetimeText}
                            </span>

                            <span className={styles.metaChip}>
                                {data.condition}
                            </span>
                        </div>

                    </div>
                </>
            )}

            {children}

        </section>
    );
}
