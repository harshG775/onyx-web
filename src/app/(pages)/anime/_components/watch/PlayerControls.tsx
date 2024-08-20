"use client";
import { useEpState } from "@/components/providers/EpisodeState-provider";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import { EpisodesInfoType } from "@/services/gogoanime/GogoAnimeTypes";
import { useGetEpisode } from "@/services/MAL/queries.tanstack";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type PlayerControlsProps = {
    episodes: EpisodesInfoType[];
    title: string;
};
export default function PlayerControls({
    episodes,
    title,
}: PlayerControlsProps) {
    const [currentEpList, setCurrentEpList] = useState(1);
    const { data, status } = useGetEpisode("21", currentEpList);
    const { currentEp, setCurrentEp } = useEpState();
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const ep = searchParams.get("ep");
        if (ep) return setCurrentEp(Number(ep));
        setCurrentEp(1);
        router.push("?ep=1");
    }, []);

    const epArray = chunkArray(episodes, 100);
    const episodesListArray = epArray.map(
        (el: any): string => `${el[0].number}-${el[el.length - 1].number}`
    );
    return (
        <section className="h-96 lg:h-full overflow-y-auto scrollbar-thin scrollbar-color">
            <div className="sticky top-0 bg-background border-b-2 py-2">
                <SectionTitle
                    title="Playing"
                    titleRight={<>Episode:{currentEp}</>}
                />
                <p className="text-wrap text-foreground/60">{title}</p>
                <select
                    className="flex gap-4"
                    onChange={(e: any) => setCurrentEpList(e.target.value)}
                >
                    {episodesListArray.map((el, i) => (
                        <option key={i + 1} value={i + 1}>
                            {el}
                        </option>
                    ))}
                </select>
            </div>
            <ul className="space-y-1 py-1">
                {status === "success" &&
                    epArray[currentEpList - 1].map((ep: any, i: number) => {
                        const epNumb = ep.number;
                        const MALData = data.data[i];
                        return (
                            <li key={epNumb}>
                                <Button
                                    onClick={() => {
                                        setCurrentEp(epNumb);
                                        router.push(`?ep=${epNumb}`);
                                    }}
                                    className={`
                                        cursor-pointer text-sm px-2 py-1 w-full flex justify-start gap-2
                                        ${
                                            epNumb === currentEp
                                                ? "text-primary-foreground  bg-primary/80 hover:bg-primary/90"
                                                : "text-secondary-foreground bg-secondary/50 hover:bg-primary/50 "
                                        } `}
                                >
                                    {MALData?.recap ? (
                                        <span className="bg-purple-700 text-white min-w-8 h-5">
                                            {epNumb}
                                        </span>
                                    ) : MALData?.filler ? (
                                        <span className="bg-yellow-600 text-white min-w-8 h-5">
                                            {epNumb}
                                        </span>
                                    ) : (
                                        <span className="bg-green-700 text-white min-w-8 h-5">
                                            {epNumb}
                                        </span>
                                    )}
                                    <span className="text-sm">
                                        {MALData?.title}
                                    </span>
                                </Button>
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
}

const chunkArray = (array: any, chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};
