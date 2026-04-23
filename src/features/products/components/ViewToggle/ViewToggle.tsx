import { useStore } from "../../../../store/useStore";
import { ListIcon, GridIcon } from "../../../../components/icons";
import styles from "./ViewToggle.module.css";

export const ViewToggle = () => {
  const { viewMode, setViewMode } = useStore();

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.btn} ${viewMode === "list" ? styles.active : ""}`}
        onClick={() => setViewMode("list")}
        aria-label="List view"
      >
        <ListIcon />
      </button>
      <button
        className={`${styles.btn} ${viewMode === "grid" ? styles.active : ""}`}
        onClick={() => setViewMode("grid")}
        aria-label="Grid view"
      >
        <GridIcon />
      </button>
    </div>
  );
};
