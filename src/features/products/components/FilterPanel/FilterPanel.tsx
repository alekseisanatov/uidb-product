import { useEffect } from "react";
import { useStore } from "../../../../store/useStore";
import styles from "./FilterPanel.module.css";

interface I_FilterPanelProps {
    lines: { id: string; name: string }[];
    onClose: () => void;
}

export const FilterPanel = ({ lines, onClose }: I_FilterPanelProps) => {
    const { selectedLines, toggleLine, clearLines } = useStore();
    const hasFilters = selectedLines.length > 0;

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            id="filter-panel"
            role="dialog"
            aria-label="Filter by product line"
            className={styles.panel}
        >
            <div className={styles.header}>
                <span className={styles.title}>Product line</span>
            </div>
            <ul className={styles.list}>
                {lines.map((line) => {
                    const isActive = selectedLines.includes(line.id);
                    return (
                        <li key={line.id}>
                            <label
                                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => toggleLine(line.id)}
                                    className={styles.checkbox}
                                />
                                <span>{line.name}</span>
                            </label>
                        </li>
                    );
                })}
            </ul>
            <button
                type="button"
                className={`${styles.reset} ${!hasFilters ? styles.resetDisabled : ""}`}
                onClick={clearLines}
                disabled={!hasFilters}
            >
                Reset
            </button>
        </div>
    );
};
