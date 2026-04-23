import { useEffect } from "react";
import { useStore } from "../../../../store/useStore";
import styles from "./FilterPanel.module.css";

interface I_FilterPanelProps {
  lines: { id: string; name: string }[];
  onClose: () => void;
}

export const FilterPanel = ({ lines, onClose }: I_FilterPanelProps) => {
  const { selectedLines, toggleLine, clearLines } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        id="filter-panel"
        role="dialog"
        aria-label="Filter by product line"
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span className={styles.title}>Filter by Product Line</span>
          {selectedLines.length > 0 && (
            <button className={styles.clear} onClick={clearLines}>
              Clear
            </button>
          )}
        </div>
        <ul className={styles.list}>
          {lines.map((line) => (
            <li key={line.id}>
              <label className={styles.item}>
                <input
                  type="checkbox"
                  checked={selectedLines.includes(line.id)}
                  onChange={() => toggleLine(line.id)}
                  className={styles.checkbox}
                />
                <span>{line.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
