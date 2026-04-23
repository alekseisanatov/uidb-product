import type { T_Device } from "../types/product";

export const GRID_IMAGE_SIZE = 257;
export const LIST_IMAGE_SIZE = 64;
export const DETAIL_IMAGE_SIZE = 640;

export function buildImageUrl(
    id: string,
    imageDefault: string,
    size = GRID_IMAGE_SIZE,
): string {
    const imagePath = `https://static.ui.com/fingerprint/ui/images/${id}/default/${imageDefault}.png`;
    const encoded = encodeURIComponent(imagePath);
    return `https://images.svc.ui.com/?u=${encoded}&w=${size}&q=75`;
}

export function getDeviceImageUrl(
    device: T_Device,
    size = GRID_IMAGE_SIZE,
): string | null {
    if (!device.images?.default) return null;
    return buildImageUrl(device.id, device.images.default, size);
}
