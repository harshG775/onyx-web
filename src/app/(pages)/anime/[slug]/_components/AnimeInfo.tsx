"use client";
import { toUrlString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InfoHeaderSection from "./InfoHeaderSection";
import OverviewSection from "./OverviewSection";

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
        <>
            <img
                src={Media.bannerImage}
                alt={urlTitle + "banner image"}
                className="w-full min-h-[420px] object-cover absolute -z-10 blur-sm opacity-50"
            />
            <InfoHeaderSection Media={Media} />
            <OverviewSection />
        </>
    );
}
