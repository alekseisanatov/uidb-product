import { UidbResponseSchema, type T_Device } from "../types/product";

const UIDB_URL = "https://static.ui.com/fingerprint/ui/public.json";

export const DEVICES_QUERY_KEY = ["devices"] as const;
export const DEVICES_STALE_TIME = 5 * 60 * 1000;

export const fetchDevices = async (): Promise<T_Device[]> => {
    const res = await fetch(UIDB_URL);
    if (!res.ok) throw new Error(`Failed to fetch devices: ${res.status}`);
    const json = await res.json();
    const parsed = UidbResponseSchema.safeParse(json);
    if (!parsed.success) {
        throw new Error(
            `UIDB response failed schema validation: ${parsed.error.message}`,
        );
    }
    return parsed.data.devices;
};
