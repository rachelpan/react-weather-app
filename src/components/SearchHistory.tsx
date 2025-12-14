import styles from "../styles/SearchHistory.module.css";
import { IconButton } from "./IconButton";
import { DeleteIcon } from "./icons/DeleteIcon";
import { SearchIcon } from "./icons/SearchIcon";

export type SearchHistoryItem = {
    id: string;
    city: string;
    country: string;
    datetimeText: string;
};

type Props = {
    items: SearchHistoryItem[];
    onSelect: (item: SearchHistoryItem) => void; // re-search
    onDelete: (id: string) => void;
};

export function SearchHistory({ items, onSelect, onDelete }: Props) {
    return (
        <section className={styles.card}>
            <h3 className={styles.title}>Search History</h3>

            {items.length === 0 ? (
                <div className={styles.empty}>No search history</div>
            ) : (
                <ul className={styles.list}>
                    {items.map((item) => (
                        <li key={item.id} className={styles.item}>
                            <div className={styles.itemMain}>
                                <div className={styles.location}>
                                    {item.city}, {item.country}
                                </div>
                                <div className={styles.datetime}>{item.datetimeText}</div>
                            </div>

                            <div className={styles.actions}>


                                <IconButton
                                    icon={<SearchIcon size={16} />}
                                    onClick={() => onSelect(item)}
                                    ariaLabel={`Search again for ${item.city}`}
                                    title="Search again"
                                    size="sm"
                                />


                                <IconButton
                                    icon={<DeleteIcon size={16} />}
                                    onClick={() => onDelete(item.id)}
                                    ariaLabel={`Delete ${item.city}, ${item.country} from history`}
                                    title="Delete"
                                    size="sm"
                                />

                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
