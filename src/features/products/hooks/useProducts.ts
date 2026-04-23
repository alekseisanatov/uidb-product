import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
    fetchDevices,
    DEVICES_QUERY_KEY,
    DEVICES_STALE_TIME,
} from "../../../lib/api";
import { useStore } from "../../../store/useStore";
import { useDebounce } from "./useDebounce";

export function useProducts() {
    const { search, selectedLines } = useStore();
    const debouncedSearch = useDebounce(search, 300);

    const { data: rawDevices, ...query } = useQuery({
        queryKey: DEVICES_QUERY_KEY,
        queryFn: fetchDevices,
        staleTime: DEVICES_STALE_TIME,
    });

    const lines = useMemo(() => {
        if (!rawDevices) return [];
        const uniqueLines = new Map<string, string>();

        rawDevices.forEach((d) => {
            if (d.line?.id && d.line?.name) {
                uniqueLines.set(d.line.id, d.line.name);
            }
        });

        return Array.from(uniqueLines, ([id, name]) => ({ id, name }));
    }, [rawDevices]);

    const filtered = useMemo(() => {
        if (!rawDevices) return [];

        return rawDevices.filter((d) => {
            if (
                selectedLines.length > 0 &&
                (!d.line || !selectedLines.includes(d.line.id))
            ) {
                return false;
            }

            if (debouncedSearch.trim()) {
                const q = debouncedSearch.toLowerCase();
                const matchName = d.product?.name?.toLowerCase().includes(q);
                const matchShortname = d.shortnames?.some((s) =>
                    s.toLowerCase().includes(q),
                );

                if (!matchName && !matchShortname) return false;
            }

            return true;
        });
    }, [rawDevices, debouncedSearch, selectedLines]);

    return {
        ...query,
        devices: filtered,
        lines,
        totalCount: rawDevices?.length ?? 0,
        filteredCount: filtered.length,
    };
}
