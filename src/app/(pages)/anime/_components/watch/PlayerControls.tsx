"use client";
import { useEpState } from "@/components/providers/EpisodeState-provider";
import { Button } from "@/components/ui/button";
import { EpisodesInfoType } from "@/services/gogoanime/GogoAnimeTypes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type PlayerControlsProps = {
    episodes: EpisodesInfoType[];
};
export default function PlayerControls({ episodes }: PlayerControlsProps) {
    const { currentEp, setCurrentEp } = useEpState();
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const ep = searchParams.get("ep");
        if (ep) return setCurrentEp(Number(ep));
        setCurrentEp(1);
        router.push("?ep=1");
    }, []);
    return (
        <section className="h-96 lg:h-full overflow-y-auto scrollbar-thin scrollbar-color">
            <div className="sticky top-0 bg-background border-b-2">
                episode:{currentEp}
                <ul>
                    {episodes.map((episode) => (
                        <li key={episode.id}>
                            <Button
                                onClick={() => setCurrentEp(episode.number)}
                                className={`${
                                    episode.number === currentEp
                                        ? "text-primary-foreground  bg-primary/80 hover:bg-primary/90"
                                        : "text-secondary-foreground bg-secondary/50 hover:bg-primary/50 "
                                } cursor-pointer text-sm px-2 py-1 w-full flex justify-start`}
                            >
                                Episode: {episode.number}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
