import { z } from "zod";
const envSchema = z.object({
    CMT_BASEURL: z.string().min(1, "CMT_BASEURL not found"),
});
export const envServer = envSchema.parse(process.env);
