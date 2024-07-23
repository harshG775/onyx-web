import { useQuery } from "@tanstack/react-query";
import { getInfoById, TrendingReleasing } from "./api";

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
