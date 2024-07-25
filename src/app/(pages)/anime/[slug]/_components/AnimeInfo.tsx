"use client";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import Icon from "@/lib/icons/lucide";
import { toUrlString } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InfoHeaderSection from "./InfoHeaderSection";

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

            <SectionTitle title="Overview" className="container mt-10 mb-5" />
            <section className="border border-primary container min-h-96"></section>
        </>
    );
}

const infoTabsData = [
    {
        name: "Overview",
    },
    {
        name: "Watch",
    },
    {
        name: "Characters",
    },
    {
        name: "Staff",
    },
    {
        name: "Reviews",
    },
    {
        name: "Stats",
    },
    {
        name: "Social",
    },
];
