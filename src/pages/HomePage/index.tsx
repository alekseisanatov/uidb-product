import { useState, useEffect, useMemo } from "react";
import { useProducts } from "../../features/products/hooks/useProducts";
import { useStore } from "../../store/useStore";
import { SearchBar } from "../../features/products/components/SearchBar/SearchBar";
import { ViewToggle } from "../../features/products/components/ViewToggle/ViewToggle";
import { FilterPanel } from "../../features/products/components/FilterPanel/FilterPanel";
import { ProductGrid } from "../../features/products/components/ProductGrid/ProductGrid";
import { ProductList } from "../../features/products/components/ProductList/ProductList";
import { Spinner } from "../../components/Spinner/Spinner";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import styles from "./HomePage.module.css";

const PAGE_SIZE = 30;

export const HomePage = () => {
    const { devices, lines, isLoading, isError } = useProducts();
    const { viewMode, selectedLines, search } = useStore();

    const [filterOpen, setFilterOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [search, selectedLines]);

    const visibleDevices = useMemo(
        () => devices.slice(0, visibleCount),
        [devices, visibleCount],
    );

    const hasMore = visibleCount < devices.length;

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <ErrorState message="Failed to load devices. Please check your connection." />
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                    <SearchBar />
                    <span className={styles.count}>
                        {devices.length}{" "}
                        {devices.length === 1 ? "Device" : "Devices"}
                    </span>
                </div>

                <div className={styles.toolbarRight}>
                    <ViewToggle />
                    <button
                        type="button"
                        className={`${styles.filterBtn} ${
                            selectedLines.length > 0 ? styles.filterActive : ""
                        } ${filterOpen ? styles.filterOpen : ""}`}
                        onClick={() => setFilterOpen((v) => !v)}
                        aria-expanded={filterOpen}
                        aria-controls="filter-panel"
                    >
                        Filter
                    </button>
                </div>
            </div>

            {filterOpen && (
                <FilterPanel
                    lines={lines}
                    onClose={() => setFilterOpen(false)}
                />
            )}

            <div className={styles.content}>
                {devices.length === 0 ? (
                    <ErrorState message="No devices match your search." />
                ) : viewMode === "grid" ? (
                    <ProductGrid devices={visibleDevices} />
                ) : (
                    <ProductList devices={visibleDevices} />
                )}

                {hasMore && (
                    <div className={styles.loadMore}>
                        <button
                            type="button"
                            className={styles.loadMoreBtn}
                            onClick={() =>
                                setVisibleCount((c) => c + PAGE_SIZE)
                            }
                        >
                            Load more
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
