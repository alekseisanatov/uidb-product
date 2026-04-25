import { describe, it, expect } from "vitest";
import {
    buildImageUrl,
    getDeviceImageUrl,
    GRID_IMAGE_SIZE,
    DETAIL_IMAGE_SIZE,
} from "./imageUrl";
import type { T_Device } from "../types/product";

describe("buildImageUrl", () => {
    it("matches the format from the spec", () => {
        const id = "ed67d43e-2d5c-4928-ace8-edf984baeff1";
        const imageDefault = "977c1f8c477549aeb7238727fd4ecc62";
        const url = buildImageUrl(id, imageDefault, 640);

        expect(url).toBe(
            "https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2F977c1f8c477549aeb7238727fd4ecc62.png&w=640&q=75",
        );
    });

    it("defaults size to GRID_IMAGE_SIZE when omitted", () => {
        const url = buildImageUrl("abc", "xyz");
        expect(url).toContain(`&w=${GRID_IMAGE_SIZE}`);
    });

    it("respects custom size", () => {
        const url = buildImageUrl("abc", "xyz", DETAIL_IMAGE_SIZE);
        expect(url).toContain(`&w=${DETAIL_IMAGE_SIZE}`);
    });
});

describe("getDeviceImageUrl", () => {
    it("returns null when images.default is missing", () => {
        const device = { id: "abc", images: undefined } as T_Device;
        expect(getDeviceImageUrl(device)).toBeNull();
    });

    it("returns null when images object exists but default is empty", () => {
        const device = { id: "abc", images: {} } as T_Device;
        expect(getDeviceImageUrl(device)).toBeNull();
    });

    it("returns a built URL when images.default is present", () => {
        const device = {
            id: "abc",
            images: { default: "xyz" },
        } as T_Device;
        const url = getDeviceImageUrl(device);
        expect(url).toContain("abc");
        expect(url).toContain("xyz");
    });
});
