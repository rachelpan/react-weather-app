import styles from "../styles/FloatingInput.module.css";

type FloatingInputProps = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    ariaInvalid?: boolean;
    ariaDescribedBy?: string;
};

export function FloatingInput({
    id,
    label,
    value,
    onChange,
    disabled = false,
    ariaInvalid,
    ariaDescribedBy,
}: FloatingInputProps) {
    const isFilled = value.trim().length > 0;

    return (
        <div
            className={`${styles.floatingField} ${isFilled ? styles.filled : ""
                }`}
        >
            <input
                id={id}
                className={styles.input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                aria-invalid={ariaInvalid}
                aria-describedby={ariaDescribedBy}
            />
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
        </div>
    );
}
