import styles from "../styles/WeatherSearchForm.module.css";
import { FloatingInput } from "./FloatingInput";

type Props = {
    city: string;
    onCityChange: (v: string) => void;
    onSearch: () => void;
    isLoading?: boolean;
    error?: string | null;
};

export function WeatherSearchForm({
    city,
    onCityChange,
    onSearch,
    isLoading = false,
    error = null,
}: Props) {
    const canSearch = city.trim().length > 0;
    const errorId = error ? "city-error" : undefined;

    return (
        <section className={styles.weatherSearchForm} aria-busy={isLoading}>
            <form
                className={styles.row}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (canSearch && !isLoading) {
                        onSearch();
                    }
                }}
            >
                <FloatingInput
                    id="city"
                    label="City"
                    value={city}
                    onChange={onCityChange}
                    disabled={isLoading}
                    ariaInvalid={Boolean(error)}
                    ariaDescribedBy={errorId}
                />

                <button
                    type="submit"
                    className={styles.searchBtn}
                    disabled={isLoading || !canSearch}
                    aria-label="Search weather"
                    title="Search"
                >
                    {isLoading ? (
                        <span className={styles.spinner} />
                    ) : (
                        <svg
                            className={styles.searchIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    )}
                </button>
            </form>

            {error ? (
                <div id={errorId} className={styles.error} role="alert">
                    {error}
                </div>
            ) : null}
        </section>
    );
}
