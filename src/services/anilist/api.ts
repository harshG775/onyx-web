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
                bannerImage
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                genres
                description
                idMal
                type
                duration
                averageScore
                status
                nextAiringEpisode {
                    id
                    airingAt
                    timeUntilAiring
                    episode
                    mediaId
                }

                relations {
                    edges {
                        relationType(version: 2)
                        node {
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
                    }
                }
            }
        }
    `);
    return data.data.data.Media;
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
