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

export async function getSearch(query: string, page: number, perPage: number) {
    const graphqlQuery = `
        query Page {
            Page(page: ${page}, perPage: ${perPage}) {
                media(type: ANIME, search: "${query}") {
                    id
                    title {
                        romaji
                        english
                        native
                        userPreferred
                    }
                    description
                    coverImage {
                        medium
                    }
                }
            }
        }
    `;
    const { data } = await ALClient(graphqlQuery);
    return data;
}
export async function getInfoById(id: string) {
    const data = await ALClient(`
        query Media {
            Media(id: ${id}, type: ANIME) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                description
                bannerImage
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                type
                countryOfOrigin
                season
                genres
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                status
                duration
                averageScore
                episodes
                studios(isMain: true) {
                    edges {
                        node {
                            name
                        }
                    }
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
