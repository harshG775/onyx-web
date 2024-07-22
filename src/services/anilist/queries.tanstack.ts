import { useQuery } from "@tanstack/react-query";
import { getInfoById } from "./api";

export const useGetInfo = (id: string) => {
    return useQuery({
        queryKey: [`info-${id}`],
        queryFn: () => getInfoById(id),
    });
};
