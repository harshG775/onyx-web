import axios from "axios";
import { envClient } from "@/lib/env/client.env";
const { NEXT_PUBLIC_MAL_BASEURL } = envClient;
export const MAL = axios.create({
    baseURL: NEXT_PUBLIC_MAL_BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getEpisode(id: string, page: number) {
    const { data } = await MAL.get(`/anime/${id}/episodes?page=${page}`);
    return data;
}
