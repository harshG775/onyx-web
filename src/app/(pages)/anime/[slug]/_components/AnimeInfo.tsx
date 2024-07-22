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
        router.push(`/anime/${Media.id}?${urlTitle}`);
    }, []);
    return (
        <div>
            <h1>{Media.title.romaji}</h1>
            <Link href={`/anime/watch/${urlTitle}?ep=1`}>Watch</Link>
        </div>
    );
}
