import { useQuery } from "@tanstack/react-query";
import { getInfoById, getSearch, TrendingReleasing } from "./api";

export const useSearch = (
    debounce: string,
    query: string,
    page: number,
    perPage = 20
) => {
    return useQuery({
        queryKey: ["query", debounce, page, perPage],
        queryFn: () => getSearch(query, page, perPage),
    });
};

export const useGetInfo = (id: string) => {
    return useQuery({
        queryKey: [`info-${id}`],
        queryFn: () => getInfoById(id),
    });
};
export const useGetTrendingReleasing = (page = 1, perPage = 20) => {
    return useQuery({
        queryKey: ["Trending-Releasing", page],
        queryFn: () => TrendingReleasing(page, perPage),
    });
};
