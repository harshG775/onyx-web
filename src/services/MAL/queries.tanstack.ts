import { useQuery } from "@tanstack/react-query";
import { getEpisode } from "./api";

export const useGetEpisode = (id: string, page = 1) => {
    return useQuery({
        queryKey: ["query", id, page],
        queryFn: () => getEpisode(id,page),
    });
};
