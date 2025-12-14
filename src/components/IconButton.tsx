import styles from "../styles/IconButton.module.css";

type Props = {
    icon: React.ReactNode;
    onClick: () => void;
    ariaLabel: string;
    title?: string;
    size?: "sm" | "md";
};

export function IconButton({
    icon,
    onClick,
    ariaLabel,
    title,
    size = "md",
}: Props) {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles[size]}`}
            onClick={onClick}
            aria-label={ariaLabel}
            title={title}
        >
            {icon}
        </button>
    );
}
