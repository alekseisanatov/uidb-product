import { z } from "zod";

const LineSchema = z.looseObject({
    id: z.string(),
    name: z.string(),
});

const ImagesSchema = z
    .looseObject({
        default: z.string().optional(),
    })
    .optional();

const ProductInfoSchema = z
    .looseObject({
        name: z.string(),
        abbrev: z.string().optional(),
    })
    .optional();

export const DeviceSchema = z.looseObject({
    id: z.string(),
    line: LineSchema.optional(),
    product: ProductInfoSchema,
    shortnames: z.array(z.string()).optional().default([]),
    images: ImagesSchema,
});

export const UidbResponseSchema = z.looseObject({
    devices: z.array(DeviceSchema),
});

export type T_Device = z.infer<typeof DeviceSchema>;
export type T_UidbResponse = z.infer<typeof UidbResponseSchema>;
