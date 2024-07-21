"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { useGetTopAiring } from "@/services/gogoanime/queries.tanstack";
import Link from "next/link";
import { useState } from "react";

export default function TopAiring() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, status } = useGetTopAiring(currentPage);
    console.log(data);
    return (
        <section className="container py-8">
            <div className="flex justify-between items-end pb-4">
                <h2 className="text-2xl font-bold text-primary/50">
                    Top Airing
                </h2>
                <div className="flex gap-2">
                    <Button
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((pre) => pre - 1)}
                        variant={"ghost"}
                        size={"sm"}
                    >
                        prev
                    </Button>
                    <Button
                        onClick={() => setCurrentPage((pre) => pre + 1)}
                        variant={"ghost"}
                        size={"sm"}
                    >
                        next
                    </Button>
                </div>
            </div>
            {status === "pending" && <Loading />}
            {status === "error" && "error"}
            {status === "success" && (
                <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {data.results.map((anime) => (
                        <li
                            key={anime.id}
                            className="flex flex-col justify-between relative"
                        >
                            <Link
                                className="w-full rounded-md overflow-hidden group"
                                href={`/anime/${anime.id}`}
                            >
                                <img
                                    src={anime.image}
                                    alt={anime.title}
                                    width={100}
                                    height={100}
                                    className="w-full block scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-2 transition-transform ease-out"
                                />
                            </Link>
                            <Link
                                className="w-full py-2 grid"
                                href={`/anime/${anime.id}`}
                            >
                                <h4 className="line-clamp-1 text-sm text-primary">
                                    {anime.title}
                                </h4>

                                <div className="flex gap-1 flex-wrap text-[0.5rem] absolute bottom-9 p-2 bg-background/50 w-full">
                                    {anime?.genres?.map((g, i) => (
                                        <span
                                            key={g + i}
                                            className="border border-primary rounded-md px-1"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
