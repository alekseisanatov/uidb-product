import { describe, it, expect } from "vitest";
import { DeviceSchema, UidbResponseSchema } from "./product";

describe("DeviceSchema (graceful degradation)", () => {
    it("accepts a minimal device with only id", () => {
        const result = DeviceSchema.safeParse({ id: "abc" });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.shortnames).toEqual([]);
        }
    });

    it("preserves unknown top-level fields (looseObject)", () => {
        const result = DeviceSchema.safeParse({
            id: "abc",
            futureField: { nested: 42 },
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(
                (result.data as Record<string, unknown>).futureField,
            ).toEqual({ nested: 42 });
        }
    });

    it("rejects when id is missing (the only required field)", () => {
        const result = DeviceSchema.safeParse({ product: { name: "X" } });
        expect(result.success).toBe(false);
    });

    it("tolerates devices without images", () => {
        const result = DeviceSchema.safeParse({
            id: "abc",
            product: { name: "Test" },
        });
        expect(result.success).toBe(true);
    });
});

describe("UidbResponseSchema", () => {
    it("parses a response with mixed valid devices", () => {
        const result = UidbResponseSchema.safeParse({
            devices: [
                { id: "a" },
                { id: "b", product: { name: "B" }, images: { default: "x" } },
            ],
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.devices).toHaveLength(2);
        }
    });

    it("fails when devices is not an array", () => {
        const result = UidbResponseSchema.safeParse({ devices: "nope" });
        expect(result.success).toBe(false);
    });
});
