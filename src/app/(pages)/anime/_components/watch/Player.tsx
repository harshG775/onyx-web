"use client";

import { useEpState } from "@/components/providers/EpisodeState-provider";
import { EpisodesInfoType } from "@/services/gogoanime/GogoAnimeTypes";
type PlayerControlsProps = {
    episodes: EpisodesInfoType[];
};
export default function Player({ episodes }: PlayerControlsProps) {
    const { currentEp } = useEpState();
    console.log(episodes[currentEp - 1]);
    return (
        <header className="bg-secondary/50 px-2 rounded-md">{currentEp}</header>
    );
}
