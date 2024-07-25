"use client";
import Loading from "@/app/loading";
import { useGetInfo } from "@/services/anilist/queries.tanstack";
import { useParams } from "next/navigation";
import AnimeInfo from "./_components/AnimeInfo";

export default function AnimeInfoPage() {
    const { slug }: { slug: string } = useParams();
    const { data, status, error } = useGetInfo(slug);
    if (status === "pending") {
        return <Loading />;
    }
    if (status === "error") {
        console.log(error);
        return "error";
    }
    console.log(data);
    return (
        <main className="relative">
            <AnimeInfo Media={{ ...data, id: slug }} />
        </main>
    );
}
