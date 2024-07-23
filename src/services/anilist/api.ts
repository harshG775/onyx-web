import { envClient } from "@/lib/env/client.env";
import axios from "axios";
const { NEXT_PUBLIC_AL_BASEURL_QL } = envClient;

const axiosAL = axios.create({
    baseURL: NEXT_PUBLIC_AL_BASEURL_QL,
    headers: {
        accept: "application/json",
        "content-type": "application/json",
    },
});
export const ALClient = (query: string) => {
    return axiosAL.post("", {
        query: query,
    });
};

export async function getInfoById(id: string) {
    const data = await ALClient(`
        query Media {
            Media(id: ${id}) {
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                genres
                description
                streamingEpisodes {
                    title
                    thumbnail
                    url
                    site
                }
                nextAiringEpisode {
                    id
                    airingAt
                    timeUntilAiring
                    episode
                    mediaId
                }
            }
        }
    `);
    return data;
}
export async function TrendingReleasing(page: number, perPage: number) {
    const data = await ALClient(`
        {
            Page(page: ${page}, perPage: ${perPage}) {
                media(sort: TRENDING_DESC, type: ANIME, status: RELEASING, isAdult: false) {
                    id
                    episodes
                    coverImage {
                        large
                        color
                    }
                    averageScore
                    popularity
                    title {
                        romaji
                        english
                        userPreferred
                        native
                    }
                    format
                    genres
                }
                pageInfo {
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
            }
        }
    `);
    return data.data.data.Page;
}
