"use client";
import Loading from "@/app/loading";
import { useGetInfo } from "@/services/anilist/queries.tanstack";
import { useParams } from "next/navigation";
import AnimeInfo from "./_components/AnimeInfo";
import { DisqusAnime } from "@/services/disqus/Disqus-anime";

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
        <main className="relative">
            <AnimeInfo Media={{ ...data, id: slug }} />
            <DisqusAnime
                url={slug}
                title={data.title.userPreferred}
                id={data.id}
            />
        </main>
    );
}
