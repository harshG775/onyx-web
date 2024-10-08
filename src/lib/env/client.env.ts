"use client";
import { z } from "zod";
const envClientSchema = z.object({
    NEXT_PUBLIC_CMT_BASEURL: z .string() .min(1, "NEXT_PUBLIC_CMT_BASEURL not found"),
    NEXT_PUBLIC_AL_BASEURL_QL: z .string() .min(1, "NEXT_PUBLIC_AL_BASEURL_QL not found"),
    NEXT_PUBLIC_MAL_BASEURL: z .string() .min(1, "NEXT_PUBLIC_MAL_BASEURL not found"),
    NEXT_PUBLIC_SITEBASEURL: z .string() .min(1, "NEXT_PUBLIC_SITEBASEURL not found"),
});
export const envClient = envClientSchema.parse({
    NEXT_PUBLIC_CMT_BASEURL: process.env.NEXT_PUBLIC_CMT_BASEURL,
    NEXT_PUBLIC_AL_BASEURL_QL: process.env.NEXT_PUBLIC_AL_BASEURL_QL,
    NEXT_PUBLIC_MAL_BASEURL: process.env.NEXT_PUBLIC_MAL_BASEURL,
    NEXT_PUBLIC_SITEBASEURL: process.env.NEXT_PUBLIC_SITEBASEURL,
});
