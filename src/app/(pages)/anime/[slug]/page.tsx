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
        <main>
            <AnimeInfo Media={{ ...data.data.data.Media, id: slug }} />
        </main>
    );
}
