import { useStore } from "../../../../store/useStore";
import { SearchIcon } from "../../../../components/icons";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const { search, setSearch } = useStore();

  return (
    <div className={styles.wrapper}>
      <SearchIcon />
      <input
        className={styles.input}
        type="search"
        placeholder="Search"
        aria-label="Search devices"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
