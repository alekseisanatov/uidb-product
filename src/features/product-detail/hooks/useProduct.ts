import { useQuery } from "@tanstack/react-query";
import {
    fetchDevices,
    DEVICES_QUERY_KEY,
    DEVICES_STALE_TIME,
} from "../../../lib/api";

export function useProduct(id: string | undefined) {
    const query = useQuery({
        queryKey: DEVICES_QUERY_KEY,
        queryFn: fetchDevices,
        staleTime: DEVICES_STALE_TIME,
    });

    const device = query.data?.find((d) => d.id === id);
    const allIds = query.data?.map((d) => d.id) ?? [];
    const currentIndex = id ? allIds.indexOf(id) : -1;
    const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
    const nextId =
        currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

    return { ...query, device, prevId, nextId };
}
