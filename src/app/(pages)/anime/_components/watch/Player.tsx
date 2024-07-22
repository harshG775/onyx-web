"use client";

import Loading from "@/app/loading";
import { useEpState } from "@/components/providers/EpisodeState-provider";
import { Button } from "@/components/ui/button";
import {
    EpisodesInfoType,
    serverType,
} from "@/services/gogoanime/GogoAnimeTypes";
import { useGetAvailableServers } from "@/services/gogoanime/queries.tanstack";
import { useEffect, useState } from "react";
type PlayerControlsProps = {
    episodes: EpisodesInfoType[];
};
export default function Player({ episodes }: PlayerControlsProps) {
    const { currentEp } = useEpState();
    const { data, status } = useGetAvailableServers(episodes[currentEp - 1].id);
    const [currentServer, setCurrentServer] = useState<serverType>();
    useEffect(() => {
        if (status === "success") {
            setCurrentServer(data[0]);
        }
    }, [data]);
    return (
        <header className="bg-secondary/50 px-2 rounded-md">
            {status === "pending" && <Loading />}
            {status === "error" && "error"}
            {status === "success" && (
                <>
                    {console.log(episodes[currentEp - 1].id)}
                    <iframe
                        src={currentServer?.url}
                        allowFullScreen={true}
                        key={currentServer?.url}
                        className="aspect-video w-full"
                    ></iframe>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 bg-secondary p-2">
                        {data?.map((server) => (
                            <Button
                                key={server.name}
                                className="h-7 text-xs font-extralight"
                                variant={
                                    currentServer?.name === server.name
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setCurrentServer(server)}
                            >
                                {server.name}
                            </Button>
                        ))}
                    </div>
                </>
            )}
        </header>
    );
}
