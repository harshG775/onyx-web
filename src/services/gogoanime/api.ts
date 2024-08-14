import {
    SearchResponseType,
    StreamingLinksResponseType,
    AvailableServersResponseType,
    RecentEpisodesResponseType,
    TopAiringResponseType,
    AnimeInfoResponseType,
} from "./GogoAnimeTypes";
import axios from "axios";
import { envClient } from "@/lib/env/client.env";
import { toUrlString } from "@/lib/utils";

const { NEXT_PUBLIC_CMT_BASEURL } = envClient;
export const CMT = axios.create({
    baseURL: `${NEXT_PUBLIC_CMT_BASEURL}/anime/gogoanime`,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getSearchResult(query: string, number: number) {
    const { data } = await CMT.get<SearchResponseType>(
        `/${query}?page=${number}`
    );
    return data;
}

export async function getRecentEpisodes() {
    const { data } = await CMT.get<RecentEpisodesResponseType>(
        `/recent-episodes`
    );
    return data;
}
export async function getTopAiring(page: number) {
    const { data } = await CMT.get<TopAiringResponseType>(
        `/top-airing?page=${page}`
    );
    return data;
}

export async function getInfo(id: string) {
    const { data } = await CMT.get<AnimeInfoResponseType>(`/info/${id}`);
    return data;
}

export async function getStreamingLinks(
    episodeId: string,
    serverName: "gogocdn" | "streamsb" | "vidstreaming"
) {
    const { data } = await CMT.get<StreamingLinksResponseType>(
        `/watch/${episodeId}?server=${serverName}`
    );
    return data;
}
export async function getAvailableServers(episodeId: string) {
    const { data } = await CMT.get<AvailableServersResponseType>(
        `/servers/${episodeId}`
    );
    return data;
}

export type Title = {
    romaji?: string;
    english?: string;
    userPreferred?: string;
    native?: string;
};
export type InfoByTitleProps = {
    title: Title;
    dub?: "-dub" | "";
};
export async function getInfoByTitle({
    title: { romaji, english },
    dub = "",
}: InfoByTitleProps) {
    try {
        try {
            const id = toUrlString(english + `${dub}`);
            const { data } = await CMT.get<AnimeInfoResponseType>(
                `/info/${id}`
            );
            return data;
        } catch (error) {
            const id = toUrlString(romaji + `${dub}`);
            const { data } = await CMT.get<AnimeInfoResponseType>(
                `/info/${id}`
            );
            return data;
        }
    } catch (error) {
        try {
            const id = toUrlString(english + `${dub}`);
            const { results } = await getSearchResult(id, 1);
            if (!results[0]) return null;
            const { data } = await CMT.get<AnimeInfoResponseType>(
                `/info/${results[0]?.id}`
            );
            return data;
        } catch (error) {
            return null;
        }
    }
}
