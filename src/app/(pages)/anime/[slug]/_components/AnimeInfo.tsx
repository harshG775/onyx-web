"use client";
import { toUrlString } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type InfoProps = {
    Media: any;
};
export default function AnimeInfo({ Media }: InfoProps) {
    const urlTitle = toUrlString(Media.title.romaji);
    const router = useRouter();
    useEffect(() => {
        router.replace(`/anime/${Media.id}?${urlTitle}`);
    }, []);
    return (
        <header className="bg-secondary/50 px-2 rounded-md">
            
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 bg-secondary p-2">
                <h1>{urlTitle}</h1>
                <Link href={`/anime/watch/${urlTitle}?ep=1`}>Watch</Link>
            </div>
        </header>
    );
}
