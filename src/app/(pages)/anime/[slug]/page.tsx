"use client";
import Loading from "@/app/loading";
import { useGetInfo } from "@/services/anilist/queries.tanstack";
import { useParams, useRouter } from "next/navigation";
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
    return (
        <main className="space-y-10 py-2">
            <img
                src={data.bannerImage}
                // alt={urlTitle}
                className="w-full h-[50%] object-cover absolute -z-10 blur-xl opacity-50"
            />
            <div className="container py-2 grid gap-y-10 gap-x-2 lg:grid-cols-[1fr_300px] lg:aspect-[21/9] shadow-md">
                <AnimeInfo Media={{ ...data, id: slug }} />
            </div>
            <div className="container grid gap-y-10 gap-x-2 lg:grid-cols-[1fr_300px]"></div>
        </main>
    );
}
