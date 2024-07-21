"use client";
import { z } from "zod";
const envClientSchema = z.object({
    NEXT_PUBLIC_CMT_BASEURL: z.string().min(1, "NEXT_PUBLIC_CMT_BASEURL not found"),
});
export const envClient = envClientSchema.parse({
    NEXT_PUBLIC_CMT_BASEURL: process.env.NEXT_PUBLIC_CMT_BASEURL,
});
