"use client";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import Icon from "@/lib/icons/lucide";
import { createArrayFromDigit } from "@/lib/utils";
import { useGetTrendingReleasing } from "@/services/anilist/queries.tanstack";
import Link from "next/link";
import { useState } from "react";

export default function TrendingReleasing() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, status, error } = useGetTrendingReleasing(currentPage, 20);
    return (
        <section>
            <SectionTitle
                title={"Recently Updated"}
                titleRight={
                    <div className="flex gap-2 mb-2">
                        <Button
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage((pre) => pre - 1)}
                            variant={"ghost"}
                            size={"sm"}
                        >
                            <Icon name="ChevronLeft" />
                        </Button>
                        <Button
                            disabled={!data?.pageInfo?.hasNextPage}
                            onClick={() => setCurrentPage((pre) => pre + 1)}
                            variant={"ghost"}
                            size={"sm"}
                        >
                            <Icon name="ChevronRight" />
                        </Button>
                    </div>
                }
            />
            {status === "pending" && (
                <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {createArrayFromDigit(20).map((e) => (
                        <li key={e}>
                            <Skeleton className="w-full aspect-[2/3]" />
                        </li>
                    ))}
                </ul>
            )}
            {status === "error" && (
                <div className="grid place-content-center text-2xl text-red-600">
                    Error
                </div>
            )}
            <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {status === "success" &&
                    data.media.map((anime: any) => (
                        <li
                            key={anime.id}
                            className="flex flex-col justify-between relative"
                        >
                            <Link
                                href={`anime/${anime.id}`}
                                className="w-full rounded-md overflow-hidden group"
                                style={{
                                    backgroundColor: anime.coverImage.color,
                                }}
                            >
                                <img
                                    src={anime.coverImage.large}
                                    alt={anime.title.userPreferred}
                                    className="aspect-[2/3] w-full block scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-2 transition-transform ease-out duration-300"
                                />
                            </Link>
                            <Link
                                className="w-full py-2 grid"
                                href={`/anime/${anime.id}`}
                            >
                                <div className="flex gap-1 flex-wrap text-[0.5rem] absolute bottom-9 p-2 bg-background/50 w-full">
                                    {anime?.genres?.map((g: any, i: number) => (
                                        <span
                                            key={g + i}
                                            className="border border-primary rounded-md px-1"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>
                                <h4 className="line-clamp-1 text-sm text-primary">
                                    {anime.title.userPreferred}
                                </h4>
                            </Link>
                        </li>
                    ))}
            </ul>
        </section>
    );
}
