import styles from "../styles/ThemeToggle.module.css";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";

type Props = {
    checked: boolean;
    onChange: (next: boolean) => void;
};

export function ThemeToggle({ checked, onChange }: Props) {
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                aria-label="Toggle dark mode"
            />
            <span className={styles.track} aria-hidden="true">
                <span className={styles.knob}>{checked ? <MoonIcon /> : <SunIcon />}</span>
            </span>
        </label>
    );
}
